import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unAuthenticatedError";

interface DecodedToken {
  id: string;
}

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new UnauthenticatedError("User is not logged in.");
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: unknown, decoded?: unknown) => {
        if (err) {
          throw new UnauthenticatedError("Token not valid");
        }

        res.locals.user = decoded;

        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export default authCheck;
