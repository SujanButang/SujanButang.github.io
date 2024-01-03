import { Router } from "express";
import { AuthRoutes } from "./AuthRoute";
import { TodoRoutes } from "./TodoRoute";
import authCheck from "../middlewares/AuthMiddleware";
import { logger } from "../middlewares/logger";

const router = Router();

router.use("/auth", logger, AuthRoutes);
router.use("/task", logger, authCheck, TodoRoutes);

export default router;
