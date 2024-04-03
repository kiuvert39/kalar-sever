import { Request,Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import { AuthErrors } from "../errors/AuthError";

dotenv.config()

export const verifyJwt =  (req: Request, res: Response, next:NextFunction) =>{
  try {
    // Get token from header, query string, or body
    const token = req.header('Authorization') || req.query.token || req.body.token;
  
    // Check if token is provided
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    if (!process.env.secret_key || typeof process.env.secret_key !== 'string') {
      throw new Error('Secret key not found or not a string in environment variables.');
    }
      // Verify token
      const decoded = jwt.verify(token, process.env.secret_key);
        console.log('middleware')
        
      // Add user from payload to request object
      req.id = decoded.toString();
  
      // Proceed to next middleware or route handler
      next();
    } catch (error) {
      // Token is invalid
      console.log('middleware');

      return res.status(403).json({ message: 'Invalid token.' });
      
    }
  }