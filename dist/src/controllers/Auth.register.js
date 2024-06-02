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
exports.signUp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const AuthError_1 = require("../errors/AuthError");
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
        const newUser = {
            id: user.get('id'),
            Name: user.get('Name'), // Access the 'Name' property using the get method
            email: user.get('email'),
            password: user.get('password')
        };
        const token = jsonwebtoken_1.default.sign({}, `${process.env.secret_key}`, { expiresIn: '1s' });
        const options = {
            expires: new Date(Date.now() + 1000),
            httpOnly: true
        };
        res.status(201).cookie("token", token, options).json({ message: " user created", newUser, token });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const refreshToken = (req, res) => {
    try {
        const cook = req.cookies;
        if (!(cook === null || cook === void 0 ? void 0 : cook.jwt))
            return res.status(401);
    }
    catch (error) {
    }
};
