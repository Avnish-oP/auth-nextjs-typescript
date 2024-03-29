import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

const sendMail = async ({email, emailType, userId}:{email:string, emailType:string, userId : string})=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USERID,
              pass: process.env.MAIL_PASSWORD
            }
        });

        if (emailType === "verify"){
          await User.findByIdAndUpdate(userId, {
            verifyToken : hashedToken,
            verifyExpires : Date.now() + 1000*60*60*24
          })
        }
        else if (emailType === "reset"){
          await User.findByIdAndUpdate(userId, {
            forgotPasswordToken : hashedToken,
            forgotPasswordExpires : Date.now() + 1000*60*60*24
          })
        }

        const mailOptions = {
            from: 'vineslol1245@gmail.com', 
            to: email,
            subject: emailType === "verify" ? "Verify your email" : "Reset your password",
            html: `<h1>${emailType === "verify" ? "Verify your email" : "Reset your password"}</h1>
            <p>Click on the link below to ${emailType === "verify" ? "verify your email" : "reset your password"}</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click here</a>`, 
        };

        const response = await transport.sendMail(mailOptions);
        return response;

    } catch (error:any) {
        throw error;
    }
}

export default sendMail;