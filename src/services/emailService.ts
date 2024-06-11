import nodemailer from 'nodemailer';
import { User } from '../models/user';
import crypto from 'crypto';
import Mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  

export const sendVerificationEmail = async (email: string) => { 
    const mailGenerator = new Mailgen({ 
        theme:"default",
        product:{
            name: 'mail',
            link: 'https://mailgen.js/'
        }
    })  
    const token = crypto.randomBytes(32).toString('hex');

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }
    let mail = mailGenerator.generate(response)
    const verificationUrl = `https://kalar-sever.onrender.com/verify-email?token=${token}&email=${email}`;

   
    try{ 
        await User.update({ token }, { where: { email } });

        const mailOptions = {
            from: 'kliuvertegbe@gmail.com',
            to: email,
            subject: mail,
            text: `Click this link to verify your email: ${verificationUrl}`,
          };

        return transporter.sendMail(mailOptions);  
        console.log(mailOptions);
        

    }
    catch(err){ 
       console.log(err);
       
    }
}

