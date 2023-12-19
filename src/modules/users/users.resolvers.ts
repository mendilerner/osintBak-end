import auth from "../../auth/authFunction";
import { generateAuthToken } from "../../auth/jwt";
import loginValidation from "./users.validators/loginValidation";
import registerValidation from "./users.validators/registerValidation";
import { login, register, sendEmailToJoin } from "./users.service";
import UserInterface from "./UserInterface";

const resolvers = {
  Mutation: {
    addUser: async (
      parent: any,
      { newUser }: { newUser: UserInterface },
      { token }: { token: string }
    ) => {
      const tokenInfo = auth(token);
      const registeratorAdmin = tokenInfo?.isAdmin;
      if (!registeratorAdmin)
        throw new Error("Authentication error: Unauthorized user");
      const { error } = registerValidation(newUser);
      if (error?.details[0].message) throw new Error(error?.details[0].message);
      const userFromDB = await register(newUser);
      return { message: "registered successfully", user: userFromDB };
    },
    loginUser: async (
      parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const { error } = loginValidation({ email: email, password: password });
      if (error?.details[0].message) throw new Error(error?.details[0].message);
      const user = await login({ email, password });
      const token = generateAuthToken({
        email: user.email,
        isAdmin: user.isAdmin,
      });
      return { access_token: token };
    },
    sendEmailToJoin: async (
      parent: any,
      { email, userName }: { email: string; userName: string }
    ) => {
      const success = await sendEmailToJoin(email, userName);
      if (success) return { message: "mail sended successfully" };
    },
  }

};

export default resolvers;
