import nodemailer from "nodemailer";
import { ENV } from "../lib/env.js";
export const sendMail = async (email,subject,template)=>{
    try {
        const config = nodemailer.createTransport({
            service: "gmail",
            auth :{
                user: ENV.SENDER_EMAIL,
                pass: ENV.SENDER_PASSWORD
            }
        })
        const options = {
            from: ENV.SENDER_EMAIL,
            to: email, 
            subject: subject,
            html: template
        }
        await config.sendMail(options); 
        return true;
    } catch (error) {
        return false; 
    }
}