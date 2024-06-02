import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AuthErrors } from '../errors/AuthError';
import { User } from '../models/user';
import { Op } from 'sequelize';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

dotenv.config()

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { Name, email,password} = req.body
    try {
        if (!Name || !email || !password ) {
            return next(new AuthErrors("all fields are required",404));
        }

        const userexist = await User.findOne({ where: { 
            [Op.or]: [{ Name: { [Op.eq]: Name } }, { email: { [Op.eq]: email } }] 
        }})
        
        if (userexist) {
            return res.status(200).json({ message: "User with Username or email already exist" })
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = await User.create({Name,email,password: hashedPassword})

        const newUser: object = {
            id: user.get('id'),
            Name: user.get('Name'), // Access the 'Name' property using the get method
            email: user.get('email'),
            password: user.get('password')
        };
       
        const token = jwt.sign({},`${process.env.secret_key}`, {expiresIn: '1s'} )

        const options = {
            expires: new Date(Date.now() + 1000),
            httpOnly: true
        };

        res.status(201).cookie("token", token, options).json({message: " user created", newUser, token})
    }
    catch (error) {
        next(error);
    }

}


const refreshToken = (req: Request, res:Response) =>{
    try{

        const cook = req.cookies

        if(!cook?.jwt) return res.status(401)

    }catch(error){
        
    }
}