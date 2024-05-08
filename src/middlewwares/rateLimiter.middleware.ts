import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request} from "express"




export  const loginLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 7*60 * 1000, 
    max: 5, 
    message: 'Too many login attempts, please try again later.',
    keyGenerator: (req: Request): string => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        console.log(ip);
        return Array.isArray(ip) ? ip[0] : ip;      
    }
  });