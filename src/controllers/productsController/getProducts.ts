import { Request, Response, NextFunction } from "express";
import { Products } from "../../models/products";



export const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 try{
        const products = await Products.findAll()      
        res.status(200).json({message:products})
    } 
   catch (error) {
    next(error);
    console.log(error);
   }
};
