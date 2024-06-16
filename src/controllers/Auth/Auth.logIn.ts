import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { AuthErrors } from "../../errors/AuthError";
import { User } from "../../models/user";


interface Verify{
  verified:string
}

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

    if (!existingUser.get().verified) {
      return res.status(400).json({message:'Email not verified. Please check your inbox.'});
    }

    const isMatch = await bcrypt.compare(password, existingUser.get().password)

    if (isMatch) {

      const token = jwt.sign({id: existingUser.get().id}, `${process.env.secret_key}`, {
        expiresIn: "1h",
      });

      existingUser.get().token = token;
      
      const user = { 
        id: existingUser.get().id,
        Name: existingUser.get().Name,
        email: existingUser.get().email,
        createdAt: existingUser.get().createdAt,
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
