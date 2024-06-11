import { Request, Response, NextFunction } from "express";



export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token").status(200).json({message:"User logged successful"})
       
  
  } catch (error) {
    next(error);
  }
};
