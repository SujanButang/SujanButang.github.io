import { Router } from "express";
import {
  handleAddTask,
  handleGetAllTasks,
  handleTaskDelete,
  handleTaskEdit,
  handleToggleCompleted,
} from "../controllers/TodoController";

const router = Router();

router.get("/", handleGetAllTasks);
router.post("/", handleAddTask);
router.delete("/:id", handleTaskDelete);
router.put("/:id", handleTaskEdit);
router.patch("/:id", handleToggleCompleted);

export { router as TodoRoutes };
