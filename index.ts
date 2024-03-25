import  express, { NextFunction, Response,Request }  from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection } from "./src/database/dbConnection";
import {Authrout }from "./src/routes/Auth";
import { golbalerror } from "./src/middlewwares/golbalError.middleware";
import 'express-async-errors'
import { AuthErrors  } from "./src/errors/AuthError";
import { NotFoundError } from "./src/errors/NotFoundErrors";

dbConnection()
dotenv.config()
const app = express()
const PORT: number = parseInt(process.env.PORT!, 10);


app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/auth/signUp', Authrout)
app.use('/api/auth/logIn', Authrout)



app.all('*',(req: Request, res: Response, next:NextFunction)=>{
   throw new NotFoundError('Resource not Found')
   
})


function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    
   console.error('Global Error Handler:', err);

   const statusCode: number = (err as any).statusCode || 500;
 
   res.status(statusCode).json({
       error: {
           message: err.message || 'Internal Server Error'
       }
   });
}

app.use(errorHandler)

app.listen(PORT,()=>{console.log(`Listening at port ${PORT}`)})