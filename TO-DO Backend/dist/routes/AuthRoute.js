import { Router } from "express";
import { handleRegisterUser } from "../controllers/AuthController";
const router = Router();
router.post("/", handleRegisterUser);
export { router as AuthRoutes };
//# sourceMappingURL=AuthRoute.js.map