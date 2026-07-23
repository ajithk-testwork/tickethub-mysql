import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import Jwt from "jsonwebtoken";



export const userRegister = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      res.status(400).json({ message: "All filed Required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(409).json({
        message: "Email already exists!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Registered  successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
        success: false,
        message: "Register Failed User!",
        error,
    });
}
};


export const userLogin = async ( req: Request, res: Response) : Promise<void> => {
    try{

        const { email, password } = req.body;
        console.log(req.body);

        if(!email || !password){
            res.status(400).json({
                success: false,
                message: "Email and Password are Required"
            });
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(!user){
            res.status(404).json({
                success: false,
                message: "User not Found!"
            }); 
            return;
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            res.status(401).json({
                sucess: false,
                message: "Invalid Password"
            });
            return;
        }


        const token = Jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );


        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phoner: user.phoneNumber,
                role: user.role
            },
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: "User Login Failed"
        })
    }
}


export const userLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout Successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Logout Failed"
    });
  }
};


