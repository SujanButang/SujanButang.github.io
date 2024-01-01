import { Router } from "express";
import { AuthRoutes } from "./AuthRoute";
import { TodoRoutes } from "./TodoRoute";
import authCheck from "../middlewares/AuthMiddleware";

const router = Router();

router.use("/auth", AuthRoutes);
router.use('/task',authCheck, TodoRoutes)

export default router;
