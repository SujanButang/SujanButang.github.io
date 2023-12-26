import { ID_LENGTH } from "./constants";
import { getRandomString } from "./utils";

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  isNewlyAdded: boolean;

  toggleCompleted: () => void;
}

export class Task implements ITask {
  id: string;
  title: string;
  completed: boolean;
  isNewlyAdded: boolean;

  constructor(title = "", completed = false, isNewlyAdded = true) {
    this.id = getRandomString(ID_LENGTH);
    this.title = title;
    this.completed = completed;
    this.isNewlyAdded = isNewlyAdded;
  }

  /**
   * set completed status to true if false and vice versa
   */
  toggleCompleted() {
    this.completed = !this.completed;
  }
}
