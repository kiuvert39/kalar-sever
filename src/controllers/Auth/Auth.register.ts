import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AuthErrors } from '../../errors/AuthError';
import { User } from '../../models/user';
import { Op } from 'sequelize';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '../../services/emailService';

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

        await sendVerificationEmail(email);

        // const newUser: object = {
        //     id: user.get('id'),
        //     Name: user.get('Name'), // Access the 'Name' property using the get method
        //     email: user.get('email'),
        //     password: user.get('password')
        // };
       
        // const token = jwt.sign({},`${process.env.secret_key}`, {expiresIn: '1s'} )

        // const options = {
        //     expires: new Date(Date.now() + 1000),
        //     httpOnly: true
        // };

        res.status(201).json({message: " user created", })
    }
    catch (error) {
        next(error);
    }

}


export const verifyEmail = async (req: Request, res: Response) => {
  const { token, email } = req.query;

  if (typeof token !== 'string' || typeof email !== 'string') {
    return res.status(400).send('Invalid query parameters');
  }

  try {
    const user = await User.findOne({ where: { email, token } });

    if (user) {
      user.get().verified = true;
      user.get().token = null;
      await user.save();
      return res.status(200).send('Email verified successfully');
    }

    res.status(400).send('Invalid or expired token');
  } catch (error) {
    res.status(500).send('Error verifying email');
  }
};