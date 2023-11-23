import { tokenDataInterface, varifyToken } from "./Provider/jwt";
import { handleError } from "../../utils/handleErrors";
import { Request, Response, NextFunction } from "express";

export interface UserRequest extends Request {
  user?: Partial<tokenDataInterface>;
}
const tokeGenerator = "jwt";
const auth = (req: UserRequest, res: Response, next: NextFunction) => {
  if (tokeGenerator === "jwt") {
    try {
      const tokenFromClient = req.headers["access_token"];
      // const cookies = req.cookies
      // if (!cookies.access_token) res.status(401).json({message: "you are not provided cookie for token"})

      // const tokenFromClient = cookies.access_token
    //   console.log("tokenFromClient: ", tokenFromClient);
      if (typeof tokenFromClient === "string") {
        if (!tokenFromClient)
          throw new Error("Authentication error: please login");
        const userInfo = varifyToken(tokenFromClient) as tokenDataInterface;
        if (!userInfo)
          throw new Error("Authentication error: Unauthorize user");
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
