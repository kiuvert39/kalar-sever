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
exports.verifyEmail = exports.signUp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const AuthError_1 = require("../../errors/AuthError");
const user_1 = require("../../models/user");
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailService_1 = require("../../services/emailService");
dotenv_1.default.config();
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, email, password } = req.body;
    try {
        if (!Name || !email || !password) {
            return next(new AuthError_1.AuthErrors("all fields are required", 404));
        }
        const userexist = yield user_1.User.findOne({ where: {
                [sequelize_1.Op.or]: [{ Name: { [sequelize_1.Op.eq]: Name } }, { email: { [sequelize_1.Op.eq]: email } }]
            } });
        if (userexist) {
            return res.status(200).json({ message: "User with Username or email already exist" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = yield user_1.User.create({ Name, email, password: hashedPassword });
        yield (0, emailService_1.sendVerificationEmail)(email);
        const newUser = {
            id: user.get('id'),
            Name: user.get('Name'),
            email: user.get('email'),
            password: user.get('password')
        };
        res.status(201).json({ message: " user created", newUser });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, email } = req.query;
    if (typeof token !== 'string' || typeof email !== 'string') {
        return res.status(400).send('Invalid query parameters');
    }
    try {
        const user = yield user_1.User.findOne({ where: { email, token } });
        if (user) {
            user.set({
                verified: true,
                token: null
            });
            yield user.save();
            console.log('User verified:', user);
            return res.redirect('https://mail.google.com/');
        }
        return res.status(400).send('Invalid or expired token');
    }
    catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).send('Error verifying email');
    }
});
exports.verifyEmail = verifyEmail;
