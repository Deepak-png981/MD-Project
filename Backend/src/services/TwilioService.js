require('dotenv').config();
const twilio = require('twilio');

class TwilioService {
    constructor() {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendOtp(phone, message) {
        try {
            await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
            });
            return true;
        } catch (error) {
            console.error(`Error sending OTP: ${error}`);
            return false;
        }
    }
}

module.exports = TwilioService;
