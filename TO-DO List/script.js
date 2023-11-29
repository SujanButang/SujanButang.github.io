const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("open-modal-button");
const closeModalButton = document.getElementById("close-modal");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const allTab = document.getElementById("all");
const completedTab = document.getElementById("completed");
const remainingTab = document.getElementById("remaining");

// opening the modal
function openModal() {
  modal.style.display = "flex";
}

//closing the modal
function closeModal() {
  modal.style.display = "none";
}

// Event listeners for modal buttons
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

// adding task
function addTask() {
  const taskInput = document.getElementById("task-input").value;

  if (taskInput !== "") {
    const newTask = {
      title: taskInput,
      completed: false,
    };

    tasks.push(newTask);
    document.getElementById("task-input").value = "";
  }
  handleTabClick(allTab);
}

// Event listener for adding a task
addTaskButton.addEventListener("click", addTask);

//event listeners for "Mark Done" buttons
function addMarkDoneEventListeners() {
  tasks.forEach((task, index) => {
    const markDoneButton = document.getElementById(`done-${index}`);

    if (markDoneButton) {
      markDoneButton.addEventListener("click", () => markCompleted(index));
    }
  });
  closeModal();
}

// mark a task as completed
function markCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  const taskElement = document.getElementById(`task-${index}`);
  console.log("Task completed:", tasks[index].completed);

  if (tasks[index].completed === true) {
    taskElement.style.textDecoration = "line-through";
  } else {
    taskElement.style.textDecoration = "none";
  }

  // Get the active tab to determine which tasks to display
  const activeTab = document.querySelector(".tabs .active");
  handleTabClick(activeTab);
}

//event listeners
allTab.addEventListener("click", () => handleTabClick(allTab));
completedTab.addEventListener("click", () => handleTabClick(completedTab));
remainingTab.addEventListener("click", () => handleTabClick(remainingTab));

function handleTabClick(clickedTab) {
  // Remove the 'active' class from all tabs
  allTab.classList.remove("active");
  completedTab.classList.remove("active");
  remainingTab.classList.remove("active");

  // Add the 'active' class to the clicked tab
  clickedTab.classList.add("active");

  // Filter tasks based on the clicked tab
  if (clickedTab === allTab) {
    updateTasksDisplay(tasks);
  } else if (clickedTab === completedTab) {
    const completedTasks = tasks.filter((task) => task.completed);
    updateTasksDisplay(completedTasks);
  } else if (clickedTab === remainingTab) {
    const remainingTasks = tasks.filter((task) => !task.completed);
    updateTasksDisplay(remainingTasks);
  }
}

// Function to update the task display
function updateTasksDisplay(filteredTasks = []) {
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("id", `list-${index}`);
    listItem.innerHTML = `
      <span id="task-${index}">${index + 1}. ${task.title}</span>
      <button id="done-${index}" class="mark-done">${
      task.completed ? "Completed" : "Mark Done"
    }</button>
    `;
    taskList.appendChild(listItem);

    // Stylings
    listItem.style.paddingBottom = "20px";
    const doneButton = document.getElementById(`done-${index}`);
    doneButton.style.padding = "5px";
    doneButton.style.backgroundColor = task.completed ? "gray" : "#5eb4ef";
    doneButton.style.color = "white";
    doneButton.style.borderRadius = "5px";
    doneButton.style.cursor = "pointer";
  });

  // Save tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Add event listeners for "Mark Done" buttons in the updated display
  addMarkDoneEventListeners();
}

// Initial display of tasks from local storage
console.log(tasks);
updateTasksDisplay(tasks);
