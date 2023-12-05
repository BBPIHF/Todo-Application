import { v4 as uuidV4 } from "uuid";

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const clearBtn = document.querySelector<HTMLButtonElement>(".clearBtn");

let tasks: User[] = loadTasks();
tasks.forEach(addListItem);

interface User {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

form?.addEventListener("click", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return;

  const newTask: User = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTask();

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: User) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    item.classList.toggle("active");
    saveTask();
  });
}

function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): User[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

clearBtn?.addEventListener("click", () => {
  localStorage.removeItem("TASKS");
  while (list?.firstChild) {
    list.removeChild(list.firstChild);
  }
});
