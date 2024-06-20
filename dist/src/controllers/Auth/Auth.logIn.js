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
exports.verifyOtp = exports.logIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AuthError_1 = require("../../errors/AuthError");
const user_1 = require("../../models/user");
const speakeasy_1 = __importDefault(require("speakeasy"));
const Otp_service_1 = require("../../services/Otp.service");
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AuthError_1.AuthErrors("all fields are required", 404));
        }
        const existingUser = yield user_1.User.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email: { [sequelize_1.Op.eq]: email } }]
            },
        });
        if (!existingUser) {
            return res.status(404).json({ message: "incorrect email or password" });
        }
        if (!existingUser.get().verified) {
            return res.status(400).json({ message: 'Email not verified.check your inbox.' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, existingUser.get().password);
        if (isMatch) {
            const otp = speakeasy_1.default.totp({
                secret: `${process.env.EMAIL}`,
                encoding: 'base32',
            });
            const token = jsonwebtoken_1.default.sign({ id: existingUser.get().id }, `${process.env.secret_key}`, {
                expiresIn: "1h",
            });
            yield user_1.User.update({ otp, token }, { where: { id: existingUser.get().id } });
            try {
                (0, Otp_service_1.sendOTP)(email, otp);
                existingUser.get().token = token;
                const user = {
                    id: existingUser.get().id,
                    Name: existingUser.get().Name,
                    email: existingUser.get().email,
                    createdAt: existingUser.get().createdAt,
                    admin: existingUser.get().isAdmin
                };
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: 'none',
                    maxAge: 3600000,
                    secure: true,
                    domain: "localhost",
                    path: "/"
                }).json({ message: "OTP sent. Please verify to continue", user, token });
            }
            catch (err) {
                console.error('Failed to send OTP email:', err);
                return res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
            }
        }
        return res.status(404).json({ message: "incorrect email or password" });
    }
    catch (error) {
        next(error);
    }
});
exports.logIn = logIn;
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        // Find the user record in the database
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const verified = speakeasy_1.default.totp.verify({
            secret: `${process.env.EMAIL}`,
            encoding: 'base32',
            token: otp,
            window: 1800,
        });
        if (verified && user.get().otp === otp) {
            // Clear the OTP field after successful verification
            yield user_1.User.update({ otp: null, verified: true }, // Mark the user as verified
            { where: { id: user.get().id } });
            return res.status(200).json({ message: 'OTP verified successfully' });
        }
        else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.verifyOtp = verifyOtp;
