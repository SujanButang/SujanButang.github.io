import Joi from "joi";

const getUserSchema = Joi.object({
  username: Joi.string().email().required().messages({
    "string.base": "username should be valid email",
  }),
  password: Joi.string().required().min(8).messages({
    "string:base": "Enter valid password of length minimum 8s",
  }),
});

export { getUserSchema };
