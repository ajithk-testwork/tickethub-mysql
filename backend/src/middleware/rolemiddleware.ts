import { NextFunction, Response } from "express";
import { AuthRequest } from "./authmiddleware";


export const adminOnly = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            message: "Admin Denied. Admin Only" 
        });
    }
    next();
}