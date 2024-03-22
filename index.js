import  express  from "express";
import  dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { dbConnection } from "./src/database/dbConnection.js";
import {Authrout }from "./src/routes/Auth.js";
import { sequelize } from "./src/database/dbConnection.js";

dbConnection()
dotenv.config()
const app = express()
const PORT = process.env.PORT | 5000


app.use(cors())
app.use(cookieParser())


app.use('/api/auth/signUp', Authrout)
app.use('/api/auth/logIn', Authrout)

sequelize.sync({})
.then(() =>{
    console.log('User model sync to database');
  })
  .catch((err)=>{
    console.log('error occured');
  })
app.listen(PORT,()=>{console.log(`Listening at port ${PORT}`)})