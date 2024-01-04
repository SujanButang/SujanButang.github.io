import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import NotFoundError from "../errors/notFounError";
import UnauthenticatedError from "../errors/unAuthenticatedError";
import UserModel from "../models/usersModel";
dotenv.config();

interface RegistrationResponse {
  message: string;
  status: number;
}

export const registerUser = async (
  username: string,
  password: string
): Promise<RegistrationResponse> => {
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(password, SALT);
  const userExists = await UserModel.getByUserName(username);
  
  if (userExists) {
    throw new UnauthenticatedError("User is already registered");
  }
  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });
  return { message: "New User Successfully created. 😁", status: 200 };
};

interface LoginResponse {
  message: string;
  status: number;
  accessToken?: string;
  refreshToken?: string;
}

export const userLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const user = await UserModel.getByUserName(username)
  if (!user) throw new NotFoundError("User not found");
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    return {
      message: "Log in Success! 🎉",
      status: 200,
      accessToken,
      refreshToken,
    };
  } else {
    return { message: "Incorrect password.", status: 401 };
  }
};
