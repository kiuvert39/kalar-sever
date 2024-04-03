import { NextFunction, Response, Request } from "express"


export const dashIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
   
    res.json({ message: 'hello' })
  };
  