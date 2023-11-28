import UserInterface from "./UserInterface";
import { comparePassword, generateUserPassword } from "./helpers/bcrypt";
import { getUserByEmail, addUser } from "./users.dal";
import chalk from "chalk";
import nodemailer from "nodemailer";

const emailPassword = process.env.NODEMAILER_PASSWORD || "not_password_provided"
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 587,
    secure: false,
  auth: {
    user: "osmteam4@gmail.com",
    pass: emailPassword,
  },
});

export const register = async (user: UserInterface) => {
  try {
    const userExist = await getUserByEmail(user.email);
    if (userExist) throw new Error("This user has already registered!");
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

export async function sendEmailToJoin(_email: string, _name: string) {
  try {
    const mailOptions = {
      from: "osmteam4@gmail.com", 
      to: "osmteam4@gmail.com", 
      subject: `joining-request to OSM from ${_name} `, 
      html:`
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello!</h2>
          <p>The user <strong>${_name}</strong> sent a request to join the site with this email: ${_email}</p>
          <p>Thank you!</p>
        </body>
      </html>
    `, 
    }
    const info = await transporter.sendMail(mailOptions);
    if (info && info.messageId) {
      console.log(`Email sent successfully. Message ID: ${info.messageId}`);
      return true;
    } else {
      console.log("Failed to obtain messageId after sending the email.");
      throw new Error("Email sending failed.");
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
}
