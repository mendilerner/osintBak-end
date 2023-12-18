import { Request } from "express";

export interface tokenDataInterface{
    email: string;
    isAdmin: boolean;
}

export interface UserRequest extends Request {
    user?: Partial<tokenDataInterface>;
  }

