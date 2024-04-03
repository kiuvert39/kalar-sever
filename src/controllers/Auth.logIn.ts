import { User } from "../models/user";
import { comparePassWord } from "../helpers/hashedpassword";
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
        [Op.or]: [{ email: { [Op.eq]: email } }],
      },
    });

    //checking is user exist for signing in
    if (!existingUser) {
      return next(
        new AuthErrors("User with email does not exist! please register ", 404)
      );
    }

    const isMatch = await bcrypt.compare(password, existingUser.get(password))

    if (isMatch) {

      const token = jwt.sign({'id': existingUser.get('id')}, `${process.env.secret_key}`, {
        expiresIn: "30s",
      });

      existingUser.get().token = token;
      
      const options = {
        expires: new Date(Date.now() + 1000),
        httpOnly: true,
      };

      res
        .status(200)
        .cookie("token", token, options)
        .json({ message: "logined in", token })
    }
  } catch (error) {
    next(error);
  }
};
