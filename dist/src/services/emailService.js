"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../models/user");
const crypto_1 = __importDefault(require("crypto"));
const mailgen_1 = __importDefault(require("mailgen"));
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
const sendVerificationEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const mailGenerator = new mailgen_1.default({
        theme: 'default',
        product: {
            name: 'mail',
            link: 'https://mailgen.js/'
        }
    });
    const token = crypto_1.default.randomBytes(32).toString('hex');
    const verificationUrl = `https://kalar-sever.onrender.com/verify-email?token=${token}&email=${email}`;
    let response = {
        body: {
            name: 'John Appleseed',
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${verificationUrl}`
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    let mail = mailGenerator.generate(response);
    try {
        yield user_1.User.update({ token }, { where: { email } });
        const mailOptions = {
            from: 'kliuvertegbe@gmail.com',
            to: email,
            subject: 'Verification Email',
            html: mail,
        };
        return transporter.sendMail(mailOptions);
        console.log(mailOptions);
    }
    catch (err) {
        console.log(err);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
