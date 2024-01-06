import BaseModel from "./baseModel";
import { ITodo } from "../interface/ITodo";

export default class TodoModel extends BaseModel {
  static async getAllTasks(params: any) {
    const query = this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        completed: "completed",
      })
      .from("todos")
      .where("created_by", "=", params.userId);

    query.offset(params.offset).limit(params.limit);

    return query;
  }

  static async createTask(task: ITodo) {
    return this.queryBuilder().insert(task).table("todos");
  }

  static async findById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        completed: "completed",
      })
      .where({ id });
  }
  static async deleteTask(id: number) {
    return this.queryBuilder().table("todos").where({ id }).del();
  }

  static async toggleCompleted(id: number) {
    const currentTask = await this.queryBuilder()
      .table("todos")
      .where({ id })
      .first();

    if (currentTask) {
      const updatedTask = {
        completed: !currentTask.completed,
      };

      return this.queryBuilder()
        .table("todos")
        .where({ id })
        .update(updatedTask);
    }

    return null; // Return null if the task with the specified id is not found
  }

  static async updateTaskTitle(id: number, title: string) {
    const updatedTask = {
      title: title,
    };

    return this.queryBuilder().table("todos").where({ id }).update(updatedTask);
  }
}
