import UserInterface from "./UserInterface";
import {
  register,
  login,
} from "./users.service";
import { handleError } from "../../utils/handleErrors";

import registerValidation from "./registerValidation"
import loginValidation from "./loginValidation";
import { Request, Response } from "express";
import { generateAuthToken } from "../middleWare/Provider/jwt";
import { UserRequest } from "../middleWare/authService";

export const handleUserRegistration = async (req: UserRequest, res: Response) => {
  try {
    const user: UserInterface = req.body;
    const registeratorAdmin = req.user?.isAdmin
    if (!registeratorAdmin) return res.status(401).send('only admin allowed to add new users')
    const { error } = registerValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);
    const userFromDB = await register(user);
    return res.status(200).json({message: "registered successfully", user: userFromDB});
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const userFromClient: UserInterface = req.body;
    const { error } = loginValidation(userFromClient);
    if (error?.details[0].message) throw new Error(error?.details[0].message);
    const user = await login(userFromClient);
    const token = generateAuthToken({email: user.email, isAdmin: user.isAdmin})
    // res.cookie('access_token', token, {
    //   httpOnly: true, // Makes the cookie inaccessible to JavaScript in the frontend
    //   //secure: process.env.NODE_ENV === 'production', // Ensures cookie transmission only over HTTPS in production
    //   //sameSite: 'strict', // Controls when cookies are sent in cross-origin requests
    //   maxAge: 24 * 60 * 60 * 1000, // Expiry time of the cookie in milliseconds (24 hours in this case)
    // });
    //res.header("access_token", token)
    res.status(200).json({access_token: token});
  } catch (error) {
    handleError(res, error, 401);
  }
};
