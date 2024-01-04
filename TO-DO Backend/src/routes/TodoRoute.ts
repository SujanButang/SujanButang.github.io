import { Router } from "express";
import {
  handleAddTask,
  handleGetAllTasks,
  handleTaskDelete,
  handleTaskEdit,
  handleToggleCompleted,
} from "../controllers/TodoController";
import { validateReqBody, validateReqParams } from "../middlewares/validator";
import { getTaskSchema } from "../schema/task";

const router = Router();

router.get("/", handleGetAllTasks);
router.post("/", validateReqBody(getTaskSchema), handleAddTask);
router.delete("/:id", handleTaskDelete);
router.put("/:id", handleTaskEdit);
router.patch("/:id", handleToggleCompleted);

export { router as TodoRoutes };
