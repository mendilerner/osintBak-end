import Joi from "joi";
import UserInterface from "./UserInterface";

const registerValidation = (user: UserInterface) => {
  const schema = Joi.object({
    _id: Joi.string().allow(""),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'user "mail" must be a valid mail' })
      .required(),
    password: Joi.string()
      .ruleset.regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .rule({
        message:
          'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
      })
      .required(),
      userName: Joi.string()
      .min(4)
      .max(20)
      .message('User "userName" must be between 4 and 20 characters')
      .required(),
      isAdmin: Joi.boolean().default(false),
  });
  return schema.validate(user);
};

export default registerValidation;
