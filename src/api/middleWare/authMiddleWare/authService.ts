import { varifyToken } from "./jwt";
import { handleError } from "../../../utils/handleErrors";
import { Response, NextFunction } from "express";
import { UserRequest, tokenDataInterface } from "./authInterfaces";


const tokeGenerator = "jwt";
const auth = (req: UserRequest, res: Response, next: NextFunction) => {
  if (tokeGenerator === "jwt") {
    try {
      const tokenFromClient = req.headers["access_token"];
      if (typeof tokenFromClient === "string") {
        if (!tokenFromClient)
          throw new Error("Authentication error: please login");
        const userInfo = varifyToken(tokenFromClient) as tokenDataInterface;
        if (!userInfo)
          throw new Error("Authentication error: Unauthorized user");
        req.user = userInfo;
        return next();
      }
    } catch (err) {
      return handleError(res, err, 401);
    }
  } else if (tokeGenerator === "not_jwt") {
    return handleError(res, new Error("you do not use jwt"), 503);
  }
};
export default auth;
