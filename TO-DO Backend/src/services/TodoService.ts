import NotFoundError from "../errors/notFounError";
import Todos from "../models/Todo";

export const addTodo = async (
  title: string,
  completed: boolean,
  user: string
) => {
  try {
    const newTodo = await Todos.create({
      title,
      completed,
      userId: user,
    });
    return { message: "Task added Successfully!🎉", status: 200 };
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  const todo = await Todos.findByPk(id);
  if (!todo) throw new NotFoundError("Task not found!");
  await Todos.destroy({
    where: { id: id },
  });
  return { message: "Task deleted successfully!", status: 200 };
};

export const editTodo = async (id: string, title: string) => {
  const task = await Todos.findByPk(id);
  if (!task) throw new NotFoundError("Task not found!");
  task.title = title;
  task.save();
  return { message: "Task edited successfully.", status: 200 };
};

export const toggleCompleted = async (id: string) => {
  const task = await Todos.findByPk(id);
  if (!task) throw new NotFoundError("Task not found!");
  task.completed = !task.completed;
  task.save();
  return { message: "Task status changed!", status: 200 };
};

export const getAllTasks = async (userId: string) => {
  const tasks = await Todos.findAll({ where: { userId: userId } });
  if (tasks.length == 0) throw new NotFoundError("Tasks list empty");
  return { tasks, status: 200 };
};
