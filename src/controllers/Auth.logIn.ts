import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { AuthErrors } from "../errors/AuthError";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AuthErrors("all fields are required", 404));
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: { [Op.eq]: email } }]
      },
    });


    if (!existingUser) {
      return res.status(404).json({ message: "incorrect email or password"});
    }

    const isMatch = await bcrypt.compare(password, existingUser.get().password)

    if (isMatch) {

      const token = jwt.sign({id: existingUser.get().id}, `${process.env.secret_key}`, {
        expiresIn: "1h",
      });

      existingUser.get().token = token;
      
      const user = { 
        id: existingUser.get().id,
        Name: existingUser.get().name,
        email: existingUser.get().email,
        createdAt: existingUser.get().createdAt,
        updatedAt: existingUser.get().updatedAt,
        admin:existingUser.get().isAdmin}

      res.cookie("token", token,{ 
        httpOnly: true,
        sameSite: 'none',
        maxAge: 3600000,
        secure: true,
        domain: "localhost",
        path: "/"
      }).json({ message: "logined in",user, token });
    }
    
    return res.status(404).json({ message: "incorrect email or password"})
  
  } catch (error) {
    next(error);
  }
};
