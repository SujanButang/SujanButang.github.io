import { Task } from "./Task";

export interface ITaskList {
  list: Task[];

  getTaskById: (id: string) => Task | null;
  getTaskByIndex: (index: number) => Task | null;

  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  saveTask: () => void;
}

export class TaskList implements ITaskList {
  list: Task[];

  constructor(task?: Task[]) {
    this.list = task || [];
  }

  /**
   * Add task to the to do list
   * @param task
   */
  addTask(task: Task) {
    this.list.push(task);
    this.saveTask();
  }

  /**
   * Returns the task with specified id
   * @param id
   * @returns Task
   */
  getTaskById(id: string) {
    return this.list.find((item) => item.id === id) || null;
  }

  /**
   * Returns the task at specified index
   * @param index
   * @returns Task
   */
  getTaskByIndex(index: number) {
    return this.list[index];
  }

  deleteTask(id: string) {
    this.list = this.list.filter((task) => task.id !== id);
    this.saveTask();
  }

  saveTask() {
    localStorage.setItem("tasks", JSON.stringify(this.list));
  }
}
