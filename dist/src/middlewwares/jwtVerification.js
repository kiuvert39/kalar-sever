"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyJwt = (req, res, next) => {
    const token1 = req.header('authorization') || req.query.token || req.body.token || req.cookies;
    const token = req.header('authorization') || req.query.token || req.body.token || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log(token);
    const auth = token;
    try {
        if (!process.env.secret_key || typeof process.env.secret_key !== 'string') {
            throw new Error('Secret key not found or not a string in environment variables.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.secret_key, (error, decoded) => {
            if (error) {
                return res.status(403);
            }
            req.id = decoded.id;
            next();
        });
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token.', error });
    }
};
exports.verifyJwt = verifyJwt;
