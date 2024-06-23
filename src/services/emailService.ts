import nodemailer from "nodemailer";
import { User } from "../models/user";
import crypto from "crypto";
import Mailgen from "mailgen";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string,name:string) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "mail",
      link: "https://mailgen.js/",
    },
  });
  const token = crypto.randomBytes(32).toString("hex");
  const verificationUrl = `https://kalar-sever.onrender.com/verify-email?token=${token}&email=${email}`;
  let response = {
    body: {
      name: `${name}`,
      intro: "Welcome to TechGrove! We're thrilled to have you with us.",
      action: {
        instructions: "To complete your registration and verify your email address, please click the button below:",
        button: {
          color: "#22BC66", // Button color
          text: "Confirm Your Account",
          link: `${verificationUrl}`,
        },
      },
      outro: "If you have any questions or need assistance, simply reply to this email. Our team is here to help you.",
      signature: "Best regards,\nThe TechGrove Team",
    },
  };
  
  let mail = mailGenerator.generate(response);

  try {
    await User.update({ token }, { where: { email } });

    const mailOptions = {
      from: "kliuvertegbe@gmail.com",
      to: email,
      subject: "Verification Email",
      html: mail,
    };

    return transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
