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
exports.logIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AuthError_1 = require("../../errors/AuthError");
const user_1 = require("../../models/user");
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
            return res.status(400).json({ message: 'Email not verified. Please check your inbox.' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, existingUser.get().password);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser.get().id }, `${process.env.secret_key}`, {
                expiresIn: "1h",
            });
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
            }).json({ message: "logined in", user, token });
        }
        return res.status(404).json({ message: "incorrect email or password" });
    }
    catch (error) {
        next(error);
    }
});
exports.logIn = logIn;
