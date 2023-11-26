import UserInterface from "./UserInterface";
import { comparePassword, generateUserPassword } from "./helpers/bcrypt";
import { getUserByEmail, addUser } from "./users.dal";
import chalk from "chalk";

export const register = async (user: UserInterface) => {
  try {
    const userExist = await getUserByEmail(user.email);
    if (userExist) throw new Error("This user is already registered!");
    user.password = generateUserPassword(user.password);
    const insertedUser = await addUser(user);
    return insertedUser;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const login = async (userFromClient: UserInterface) => {
  try {
    const userInDB = (await getUserByEmail(
      userFromClient.email
    )) as unknown as UserInterface;
    if (!userInDB) throw new Error("The email is incorrect!");
    if (!comparePassword(userFromClient.password, userInDB.password))
      throw new Error("The email or password is incorrect!");
    return userInDB;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
