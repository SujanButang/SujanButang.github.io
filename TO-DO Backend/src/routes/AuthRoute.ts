import { Router } from "express";
import {
  handleLogOut,
  handleRegisterUser,
  handleUserLogin,
} from "../controllers/AuthController";
import { validateReqBody } from "../middlewares/validator";
import { getUserSchema } from "../schema/user";

const router = Router();

router.post("/register", validateReqBody(getUserSchema), handleRegisterUser);
router.post("/login",validateReqBody(getUserSchema), handleUserLogin);
router.get("/logout", handleLogOut);

export { router as AuthRoutes };
