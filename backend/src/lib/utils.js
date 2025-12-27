import jwt from "jsonwebtoken"

export const generateToken = async(userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d" 
    })
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*100, // milisecs 7d
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV == "development" ? false : true
    })

    return token; 
}