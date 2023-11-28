import UserInterface, { requsetToJoinInterface } from "./UserInterface";
import { register, login, sendEmailToJoin } from "./users.service";
import { handleError } from "../../utils/handleErrors";

import registerValidation from "./registerValidation";
import loginValidation from "./loginValidation";
import { Request, Response } from "express";
import { generateAuthToken } from "../middleWare/authMiddleWare/jwt";
import { UserRequest } from "../middleWare/authMiddleWare/authInterfaces";

export const handleUserRegistration = async (
  req: UserRequest,
  res: Response
) => {
  try {
    const user: UserInterface = req.body;
    const registeratorAdmin = req.user?.isAdmin;
    if (!registeratorAdmin)
      return res.status(401).send("Authentication error: Unauthorized user");
    const { error } = registerValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);
    const userFromDB = await register(user);
    return res
      .status(200)
      .json({ message: "registered successfully", user: userFromDB });
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
    const token = generateAuthToken({
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    handleError(res, error, 401);
  }
};


export const handleSendEmailToJoin = async (req: Request, res: Response) => {
  try {
    const {email, name}  = req.body as requsetToJoinInterface
    const success = await sendEmailToJoin(email, name)
    if (success)
    res.status(200).json({ message: 'mail sended successfully' });
  } catch (error) {
    handleError(res, error, 401);
  }
};
