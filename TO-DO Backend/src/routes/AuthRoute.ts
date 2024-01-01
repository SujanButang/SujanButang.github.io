import { Router } from "express";
import { handleLogOut, handleRegisterUser, handleUserLogin } from "../controllers/AuthController";

const router = Router();

router.post("/register", handleRegisterUser);
router.post("/login",handleUserLogin)
router.get("/logout",handleLogOut)

export { router as AuthRoutes };
