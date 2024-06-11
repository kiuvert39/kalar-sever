import { Request, Response, NextFunction } from 'express';

export const status = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.cookies.token) {
      res.status(200).json({ authenticated: true });
     
    } else {
      res.status(200).json({ authenticated: false })
    }
  };
  