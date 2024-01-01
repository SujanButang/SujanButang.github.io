import { Request, Response } from "express";
import { registerUser, userLogin } from "../services/AuthService";

interface AuthRequest {
  body: {
    username: string;
    password: string;
  };
}

export const handleRegisterUser = async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;

  try {
    const newUser = await registerUser(username, password);
    res.status(newUser.status).json(newUser.message);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const handleUserLogin = async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;
  try {
    const login = await userLogin(username, password);
    res
      .cookie("token", login?.accessToken)
      .cookie("refreshToken", login?.refreshToken)
      .status(login?.status)
      .json(login?.message);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const handleLogOut = async (req: Request, res: Response) => {
  const { token, refreshToken } = req.cookies;
  res.clearCookie("token");
  res.clearCookie("accessToken");
  res.status(200).json("User logged Out!");
};
