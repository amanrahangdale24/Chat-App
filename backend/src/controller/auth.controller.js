import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
import { sendMail } from "../emails/emailHandler.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";
import { ENV } from "../lib/env.js";

export const signup = async (req,res)=>{
    const {fullname, email, password} = req.body; 
    try {
        if(!fullname||!email||!password){
            return res.status(400).json({message:"All fields are required"}); 
        }

        if(password.length <6){
            return res.status(400).json({message:"Password must be alteast 6 characters"});
        }

        // check if email is valid: regex 
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const user = await User.findOne({email}); 
        if(user){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        // hash the password 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password,salt); 

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })

        // following the modern flow, after successfull sign up -> Client receives token and treats user as logged in

        if(newUser){
            await newUser.save(); 
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

            // send a welcome email 
            try {
                await sendMail(newUser.email, "Welcome to messenger app", createWelcomeEmailTemplate(newUser.fullname,ENV.CLIENT_URL))
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }

        }else{
            res.status(400).json({
                message: "Invalid user data"
            })
        }
    } catch (error) {
        console.log("Error in signup controller:",error); 
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const login = async(req,res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email}); 
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); 
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        generateToken(user._id, res); 

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("error in login container", error); 
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const logout = async(_,res)=>{
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message:"Logged out successfully"}); 
}