interface UserInterface {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface requsetToJoinInterface {
  name: string;
  email: string;
}

export default UserInterface;
