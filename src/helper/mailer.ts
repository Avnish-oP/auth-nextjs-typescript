import { verify } from "crypto";
import nodemailer from "nodemailer";

const sendMail = async ({email, emailType, userId}:{email:string, emailType:string, userId : string})=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'vineslol1245@gmail.com', 
            to: email,
            subject: emailType==="verify"? "Verify your email":"Reset your password",
            html: "<b>Hello world?</b>", 
          };

          const response = await transporter.sendMail(mailOptions);
          return response;

    } catch (error:any) {
        throw new Error(error.message);
        
    }
}