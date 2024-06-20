import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { AuthErrors } from "../../errors/AuthError";
import { User } from "../../models/user";
import speakeasy from "speakeasy"
import { sendOTP } from "../../services/Otp.service";




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
      return res.status(400).json({message:'Email not verified.check your inbox.'});
    }

    const isMatch = await bcrypt.compare(password, existingUser.get().password)

    if (isMatch) {

      const otp = speakeasy.totp({
        secret: `${process.env.EMAIL}`,
        encoding: 'base32',
      });

      const token = jwt.sign({id: existingUser.get().id}, `${process.env.secret_key}`, {
        expiresIn: "1h",
      });

      await User.update(
        { otp, token },
        { where: { id: existingUser.get().id } }
      );

      try{
        sendOTP(email, otp);

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
        }).json({ message: "OTP sent. Please verify to continue",user, token });
      }catch(err){
        console.error('Failed to send OTP email:', err);
        return res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
      }
     
    }
    
    return res.status(404).json({ message: "incorrect email or password"})
  
  } catch (error) {
    next(error);
  }
};


export const verifyOtp = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(404).json({ message: 'Email and OTP are required' });
    }

    // Find the user record in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verified = speakeasy.totp.verify({
      secret: `${process.env.EMAIL}`,
      encoding: 'base32',
      token: otp,
      window: 1800,
    });

    if (verified && user.get().otp === otp) {
      // Clear the OTP field after successful verification
      await User.update(
        { otp: null, verified: true }, // Mark the user as verified
        { where: { id: user.get().id } }
      );
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    next(error);
  }
};