import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/User";
import dotenv from "dotenv";
dotenv.config();

interface RegistrationResponse {
  message: string;
  status: number;
}

export const registerUser = async (
  username: string,
  password: string
): Promise<RegistrationResponse> => {
  try {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT);
    const userExists = await Users.findOne({
      where: { username: username },
    });
    if (userExists) {
      return { message: "User is already registered.", status: 403 };
    }
    const newUser = await Users.create({
      username,
      password: hashedPassword,
    });
    return { message: "New User Successfully created. 😁", status: 200 };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
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
  try {
    const user = await Users.findOne({
      where: { username: username },
    });
    if (!user) return { message: "User is not registered!!!", status: 404 };
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
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};


