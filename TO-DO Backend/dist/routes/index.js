import { Router } from "express";
import { AuthRoutes } from "./AuthRoute";
const router = Router();
router.use("/auth", AuthRoutes);
export default router;
//# sourceMappingURL=index.js.map