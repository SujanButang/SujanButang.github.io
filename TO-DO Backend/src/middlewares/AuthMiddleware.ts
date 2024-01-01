//@ts-nocheck
import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface DecodedToken {
  id: string;
  // Add other properties as needed
}

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).json("User is not logged in.");
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded?: DecodedToken) => {
      if (err) {
        return res.status(403).json("Token not valid");
      }

      // Store the decoded user information in res.locals.user
      res.locals.user = decoded;

      // Call the next middleware or route handler
      next();
    }
  );
};

export default authCheck;
