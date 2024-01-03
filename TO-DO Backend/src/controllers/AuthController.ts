import { NextFunction, Request, Response } from "express";
import { registerUser, userLogin } from "../services/AuthService";

interface AuthRequest {
  body: {
    username: string;
    password: string;
  };
}

export const handleRegisterUser = async (req: AuthRequest, res: Response, next:NextFunction) => {
  const { username, password } = req.body;

  try {
    const newUser = await registerUser(username, password);
    res.status(newUser.status).json(newUser.message);
  } catch (error) {
    next(error)
  }
};

export const handleUserLogin = async (req: AuthRequest, res: Response, next:NextFunction) => {
  const { username, password } = req.body;
  try {
    const login = await userLogin(username, password);
    res
      .cookie("token", login?.accessToken)
      .cookie("refreshToken", login?.refreshToken)
      .status(login?.status)
      .json(login?.message);
  } catch (error) {
    next(error)
  }
};

export const handleLogOut = async (req: Request, res: Response) => {
  const { token, refreshToken } = req.cookies;
  res.clearCookie("token");
  res.clearCookie("accessToken");
  res.status(200).json("User logged Out!");
};
