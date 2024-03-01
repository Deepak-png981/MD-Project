const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullName: { type: String },
    address: { type: String },
    age: { type: Number },
    dateOfBirth: { type: Date },
    profilePhoto: { type: String },
    otp: { type: String },
    otpExpiry: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
