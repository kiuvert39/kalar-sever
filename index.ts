import  express, { NextFunction, Response,Request }  from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection } from "./src/database/dbConnection";
import {register,login, dash, Authstatus, logOut }from "./src/routes/Auth";
import 'express-async-errors'
import { NotFoundError } from "./src/errors/NotFoundErrors";
import { get_products, get_productsByID, new_product } from "./src/routes/product.router";


dbConnection()
dotenv.config()
const app = express()
const PORT: number = parseInt(process.env.PORT!, 10);

app.use(cors({
    origin: ["http://localhost:3000","https://kalartech.netlify.app","https://deploy-preview-23--kalartech.netlify.app","https://kalar.vercel.app"],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth/', register);
app.use('/api/auth/', login);
app.use('/api/auth/', logOut);
app.use('/api/auth/', Authstatus);
app.use('/api/auth/', dash);
app.use('/api/product', new_product)
app.use('/api/product', get_products)
app.use('/api/product/', get_productsByID )



app.all('*',(req: Request, res: Response, next:NextFunction)=>{
   throw new NotFoundError('Resource not Found', 404);
   
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