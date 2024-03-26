import { Request,Response, NextFunction } from "express";
import { CustomeError } from "../utils/CustomError";
;

export const golbalerror =  (error:Error, req:Request, res:Response, next:NextFunction)=>{
      if(error instanceof CustomeError){
            return res.status(error.statusCode).json({message: error.serialize()})
      }
      
      return res.status(400).json({message: "something went wrong"})

}