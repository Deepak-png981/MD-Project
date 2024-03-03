const User = require('../models/User');
const TwilioService = require('../services/TwilioService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class AuthController {
    static async register(req, res) {
        const { email, phone } = req.body;
        console.log("Inside the register");
        try {
            let user = await User.findOne({ email }) || await User.findOne({ phone });
            if (user) return res.status(400).json({ message: 'User already exists' });

            // Generate OTP and its expiry
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 300 * 1000); // OTP expires in 5 minutes

            user = new User({ email, phone, otp, otpExpiry });
            await user.save();

            // Send OTP via Twilio
            // const twilioService = new TwilioService();
            // const message = `Your OTP is ${otp}. It will expire in 5 minutes.`;
            // await twilioService.sendOtp(phone, message);
            console.log("OTP is : ", otp);
            res.status(201).json({ message: 'OTP sent successfully. Please verify to continue.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async verifyOtp(req, res) {
        const { email, otp, password } = req.body;
        console.log("Inside verifyOtp..", password);
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'User does not exist.' });

            // Check OTP validity
            if (user.otp !== otp || user.otpExpiry < Date.now()) {
                return res.status(400).json({ message: 'Invalid or expired OTP.' });
            }

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Update user with hashed password & clear OTP fields
            user.password = hashedPassword;
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();

            res.status(200).json({ message: 'OTP verified and password set successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

}

module.exports = AuthController;
