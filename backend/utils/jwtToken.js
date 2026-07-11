import jwt from "jsonwebtoken";

export const generateJWTToken = async(user,message,statusCode,res)=>{
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
       
        return res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .json({
            success: true,
            message,
            token,
            user,
        });
};