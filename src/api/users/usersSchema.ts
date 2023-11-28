import mongoose, { Schema, Model} from "mongoose";
import UserInterface from "./UserInterface";

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>(
  { 
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: false, versionKey: false }
);
const UserModel: Model<UserInterface> = mongoose.model<UserInterface>("user", UserSchema);
export default UserModel;
