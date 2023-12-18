import { varifyToken } from "./jwt";
import { tokenDataInterface } from "./authInterfaces";

const tokeGenerator = "jwt";

const auth = (tokenFromClient: string | undefined) => {
  if (tokeGenerator === "jwt") {
    if (!tokenFromClient) throw new Error("Authentication error: please login");
    const userInfo = varifyToken(tokenFromClient) as tokenDataInterface;
    if (!userInfo) throw new Error("Authentication error: Unauthorized user");
    return userInfo;
  } else if (tokeGenerator === "not_jwt") {
    throw new Error("Authentication error: please login");
  }
};
export default auth;
