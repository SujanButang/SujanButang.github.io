import "./style.css";
import "animate.css";

import { randomWordArray, weekday } from "./constants";
import { getRandom, setAttribute, setStyle } from "./utils";
import { Task } from "./Task";
import { TaskList } from "./TaskList";

const today: HTMLElement = document.querySelector(".today") as HTMLElement;

//HEADER TEXT
const heading: HTMLElement = document.createElement("h1") as HTMLElement;
const day: number = new Date().getDay();

heading.innerText =
  randomWordArray[getRandom(0, randomWordArray.length - 1)] +
  " " +
  weekday[day];

today.appendChild(heading);

//Add new task
const taskInput: HTMLInputElement = document.querySelector(
  "input#new-task"
) as HTMLInputElement;
taskInput.onkeydown = function (event) {
  if (event.code == "Enter" && taskInput.value !== "") {
    addNewTask(taskInput.value);
    taskInput.value = "";
  }
};

//add button
const addButton: HTMLElement = document.querySelector(
  'img[alt="add"]'
) as HTMLElement;
addButton.addEventListener("click", () => {
  if (taskInput.value !== "") {
    addNewTask(taskInput.value);
    taskInput.value = "";
  }
});

//Search for a task
const searchInput: HTMLInputElement = document.querySelector(
  "input#search-input"
) as HTMLInputElement;

searchInput?.addEventListener("input", (e) => {
  const searchParam = (e.target as HTMLInputElement)?.value;

  render(searchParam);
});

const taskList = new TaskList();

/**
 * Checking for already existing tasks
 * in the local storage and creating new instances
 */
const existingTasks = JSON.parse(
  localStorage.getItem("tasks") as string
) as Task[];

existingTasks.forEach((task: Task) => {
  taskList.addTask(new Task(task.title, task.completed, task.isNewlyAdded));
});

/**
 * Create new instance of Task and add to Task List
 * @param title
 */
function addNewTask(title: string): void {
  const task = new Task(title);
  task.isNewlyAdded = true; // Set the isNewlyAdded flag
  taskList.addTask(task);
  render();
}

/**
 * Search specified string in the provided list
 * @param list
 * @param searchTerm
 * @returns TaskList
 */
function search(list: TaskList, searchTerm: string = ""): TaskList {
  const tasks = list.list.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return new TaskList(tasks);
}

/**
 * Render the searched tasks
 * @param searchParam
 */
function render(searchParam: string = "") {
  const filteredTaskList = search(taskList, searchParam);

  renderList(filteredTaskList);
}

const taskListElement: HTMLElement = document.querySelector(
  ".task-lists"
) as HTMLElement;

/**
 * Render the todo list tasks
 * @param tasks
 */
function renderList(tasks: TaskList) {
  taskListElement.innerHTML = "";

  tasks.list.forEach((task: Task) => {
    const taskElement: HTMLElement = document.createElement("div");
    taskElement.classList.add("task");

    if (task.completed) {
      taskElement.classList.add("completed");
    }
    if (task.isNewlyAdded) {
      taskElement.classList.add("animate__animated", "animate__flipInX");
      task.isNewlyAdded = false;
    }

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "checkbox");
    setStyle(inputField, { cursor: "pointer" });
    inputField.checked = task.completed;

    // Add an event listener to toggle task completion when the checkbox is changed
    inputField.addEventListener("change", () => {
      toggleTaskCompleted(task.id);
      render();
    });

    taskElement.appendChild(inputField);

    const title = document.createElement("span");
    title.innerText = task.title;

    taskElement.appendChild(title);

    const figure: HTMLElement = document.createElement("figure") as HTMLElement;
    setStyle(figure, {
      position: "absolute",
      right: "5px",
      top: "0",
      bottom: "0",
      cursor: "pointer",
    });

    const img: HTMLElement = document.createElement("img") as HTMLElement;
    setAttribute(img, {
      src: "delete.png",
      height: "15",
      width: "15",
    });

    figure.addEventListener("click", () => {
      taskElement.classList.remove("animate__animated", "animate__flipInX");
      taskElement.classList.add(
        "animate__animated",
        "animate__slideOutLeft",
        "animate__faster"
      );
      deleteTask(task.id);
    });

    figure.appendChild(img);

    taskElement.appendChild(figure);

    taskListElement.appendChild(taskElement);
  });
}

function toggleTaskCompleted(id: string) {
  const task = taskList.getTaskById(id);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  if (task) {
    task.isNewlyAdded = true;
    task.toggleCompleted();
    taskList.saveTask();
  }
}

function deleteTask(taskId: string) {
  taskList.deleteTask(taskId);
  setTimeout(() => render(), 700);
}

render();
