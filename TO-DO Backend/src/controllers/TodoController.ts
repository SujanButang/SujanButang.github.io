import { PaginationQuery } from "../interface/pagination";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getAllTasks,
  toggleCompleted,
} from "../services/TodoService";
import { Request, Response } from "express";

interface TodoRequest {
  body: {
    title: string;
    completed: boolean;
  };
}

export const handleAddTask = async (req: TodoRequest, res: Response) => {
  const { title, completed } = req.body;
  const user = res.locals.user.id;
  try {
    const newTask = await addTodo(title, completed, user);
    res.status(newTask.status).json(newTask.message);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

interface DeleteRequest {
  params: {
    id: number;
  };
}

export const handleTaskDelete = async (req: DeleteRequest, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await deleteTodo(id);
    res.status(deleted.status).json(deleted.message);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

interface IEditRequest {
  params: {
    id: number;
  };
  body: {
    title: string;
  };
}

export const handleTaskEdit = async (req: IEditRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const edited = await editTodo(id, title);
    res.status(edited.status).json(edited.message);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const handleToggleCompleted = async (
  req: DeleteRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const toggled = await toggleCompleted(id);
    res.status(toggled.status).json(toggled.message);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const handleGetAllTasks = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user.id;
    const query = req.query;

    const tasks = await getAllTasks(query as unknown as PaginationQuery, user);
    res.status(tasks.status).json(tasks.tasks);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};
