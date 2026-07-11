import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { catchAsyncError } from './catchAsyncError.middleware.js';


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "user not authenticated,Please Sign In"
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.id);
            if(!user){
                return res.status(401).json({
                    success: false,
                    message: "User not found, please sign in again"
                });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired, please sign in again"
            });
        }
    });