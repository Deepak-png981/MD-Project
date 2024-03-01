const User = require('../models/User');

class ProfileController {
    static async getUserProfile(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    static async updateUserProfile(req, res) {
        const { fullName, address, age, dateOfBirth } = req.body;
        const profilePhoto = req.file ? req.file.path : null;

        try {
            const user = await User.findById(req.user.id);

            if (user) {
                user.fullName = fullName || user.fullName;
                user.address = address || user.address;
                user.age = age || user.age;
                user.dateOfBirth = dateOfBirth || user.dateOfBirth;
                if (profilePhoto) {
                    const baseUrl = 'http://localhost:5000';
                    user.profilePhoto = `${baseUrl}/${profilePhoto.replace(/\\/g, '/')}`;
                }

                await user.save();
                // console.log("user : ", user);
                const updatedUser = user.toObject();
                // console.log("updatedUser : ", updatedUser);
                delete updatedUser.password;

                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = ProfileController;
