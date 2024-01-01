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
  try {
    const todo = await Todos.findByPk(id);
    if (!todo) return { message: "Not found!", status: 404 };
    await Todos.destroy({
      where: { id: id },
    });
    return { message: "Task deleted successfully!", status: 200 };
  } catch (error) {
    throw error;
  }
};

export const editTodo = async (id: string, title: string) => {
  try {
    const task = await Todos.findByPk(id);
    if (!task) return { message: "Task not found", status: 404 };
    task.title = title;
    task.save();
    return { message: "Task edited successfully.", status: 200 };
  } catch (error) {
    throw error;
  }
};

export const toggleCompleted = async (id: string) => {
  try {
    const task = await Todos.findByPk(id);
    if (!task) return { message: "Task not found", status: 404 };
    task.completed = !task.completed;
    task.save();
    return { message: "Task status changed!", status: 200 };
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async (userId: string) => {
  try {
    const tasks = await Todos.findAll({ where: { userId: userId } });
    if (tasks.length==0) return { message: "Tasks empty!", status: 404 };
    return { tasks, status: 200 };
  } catch (error) {
    throw error;
  }
};
