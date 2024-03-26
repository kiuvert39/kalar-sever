import { User } from '../models/user'
import { hashedPw, comparePassWord } from '../helpers/hashedpassword';
import { Request, Response, NextFunction } from 'express';
import { AuthErrors } from '../errors/AuthError';
import { databaseError } from '../errors/DatabaseError';
import {Op} from 'sequelize'



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { Name, email,password} = req.body
    try {
        if (!Name || !email || !password ) {
            return next(new AuthErrors("all fields are required"));
        }

        const userexist = await User.findOne({ where: { 
            [Op.or]: [{ Name: { [Op.eq]: Name } }, { email: { [Op.eq]: email } }] 
        }})
        
        if (userexist) {
            return res.status(200).json({ message: "User with Username or email already exist" })
        }

        const hashedPassword = await hashedPw(password)
        const user = await User.create({Name,email,password: hashedPassword})

        const newUser = {
            id : user.id,
            Name: user.Name,
            email: user.email
        }
        res.status(200).json({message: " user created", newUser})
    }
    catch (error) {
        next(error);
    }

}

export const logIn = async (req: Request, res: Response) => {
    res.send('welcome')
}

