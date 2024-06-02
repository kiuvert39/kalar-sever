import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request, Response } from 'express';

export const loginLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 7 * 60 * 1000, // 7 minutes
    max: 5, 
    keyGenerator: (req: Request): string => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        console.log(ip);
        return Array.isArray(ip) ? ip[0] : ip;      
    },
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            message: 'Too many attempts. Try again later.'
        });
    }
});
