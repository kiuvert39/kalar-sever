"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 7 * 60 * 1000, // 7 minutes
    max: 5,
    keyGenerator: (req) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        console.log(ip);
        return Array.isArray(ip) ? ip[0] : ip;
    },
    handler: (req, res) => {
        res.status(429).json({
            message: 'Too many attempts. Try again later.'
        });
    }
});
