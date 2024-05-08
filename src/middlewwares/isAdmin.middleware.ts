import {Response,Request, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  
  const user = getUserFromToken(req.headers.authorization);
    if (req.users && req.users.isAdmin) {
        console.log(req.users.isAdmin);        
      next();
    } else {  
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };

function getUserFromToken(authorization: string | undefined) {
  throw new Error("Function not implemented.");
}
