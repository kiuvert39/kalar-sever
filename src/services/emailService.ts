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
        theme: 'default',
        product:{
            name: 'mail',
            link: 'https://mailgen.js/'
        }
    })  
    const token = crypto.randomBytes(32).toString('hex');
    const verificationUrl = `https://kalar-sever.onrender.com/verify-email?token=${token}&email=${email}`;
    let response = {
        body: {
            name: 'John Appleseed',
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${verificationUrl}`
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
    let mail = mailGenerator.generate(response)
   

   
    try{ 
        await User.update({ token }, { where: { email } });

        const mailOptions = {
            from: 'kliuvertegbe@gmail.com',
            to: email,
            subject: 'Verification Email',
            html: mail,    
          };

        return transporter.sendMail(mailOptions);    

    }
    catch(err){ 
       console.log(err);
       
    }
}

