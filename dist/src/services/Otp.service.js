"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const emailService_1 = require("./emailService");
function sendOTP(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };
    emailService_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.sendOTP = sendOTP;
