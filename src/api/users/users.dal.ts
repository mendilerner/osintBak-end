import { handleCallDbError} from "../../utils/handleErrors";
import UserModel from "./usersSchema";
import UserInterface from "./UserInterface";


export const addUser = async (newUser: UserInterface): Promise<UserInterface> => {
  try {
    const user = new UserModel(newUser);
    const insertedUser = await user.save();
    return insertedUser;
  } catch (error) {
    return handleCallDbError(error);
  }
};

export const getUserByEmail = async (email: string): Promise<UserInterface|void> => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) return user;
  } catch (error) {
    return handleCallDbError(error);
  }
};