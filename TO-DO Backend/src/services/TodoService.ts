import NotFoundError from "../errors/notFounError";
import { ITodo } from "../interface/ITodo";
import TodoModel from "../models/todoModel";

export const addTodo = async (
  title: string,
  completed: boolean,
  user: number
) => {
  try {
    const newTodo = await TodoModel.createTask({
      title,
      completed,
      created_by: user,
    });
    return { message: "Task added Successfully!🎉", status: 200 };
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  const todo = await TodoModel.findById(id);
  if (!todo) throw new NotFoundError("Task not found!");
  await TodoModel.deleteTask(id);
  return { message: "Task deleted successfully!", status: 200 };
};

export const editTodo = async (id: number, title: string) => {
  const task = await TodoModel.findById(id);
  if (!task) throw new NotFoundError("Task not found!");
  await TodoModel.updateTaskTitle(id, title);
  return { message: "Task edited successfully.", status: 200 };
};

export const toggleCompleted = async (id: number) => {
  const task = await TodoModel.findById(id);
  if (!task) throw new NotFoundError("Task not found!");
  await TodoModel.toggleCompleted(id);
  return { message: "Task status changed!", status: 200 };
};

export const getAllTasks = async (userId: number) => {
  const tasks = await TodoModel.getAllTasks(userId);
  if (tasks.length == 0) throw new NotFoundError("Tasks list empty");
  return { tasks, status: 200 };
};
