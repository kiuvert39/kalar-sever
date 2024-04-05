import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthErrors } from "../errors/AuthError";
import { error } from "console";

dotenv.config();

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization') || req.query.token || req.body.token;
  
    
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  console.log(token)
  const auth = token.split(' ')[1]
  try {  
     
    if (!process.env.secret_key || typeof process.env.secret_key !== 'string') {
      throw new Error('Secret key not found or not a string in environment variables.');
    }
   
    const decoded = jwt.verify(auth, process.env.secret_key,(error: any, decoded: any)=> {
        if (error){
         return res.status(403)
      }

      req.id = decoded.id;
      next();
    } );

  
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.',error });
    }
};
