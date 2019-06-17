const taskList = document.getElementById("task-list");
const completed = document.getElementById("completed");
const inputField = document.getElementById("task");
const taskBtn = document.getElementById("add-task-btn");
const filter = document.getElementById("filter");
const taskListCard = document.getElementById("tasks-list-card");
const parseTasks = JSON.parse(localStorage.getItem("tasks"));
const colorBtnStr = document.querySelector(".color");
const colorBtn = function(color) {
  return `<div class="color-btn ${color}">
<div id="color-picker">
  <div class="color-box">
    <div class="color c-red"></div>
  </div>
  <div class="color-box">
    <div class="color c-blue"></div>
  </div>
  <div class="color-box">
    <div class="color c-green"></div>
  </div>
  <div class="color-box">
    <div class="color c-yellow"></div>
  </div>
  <div class="color-box">
    <div class="color c-purple"></div>
  </div>
  <div class="color-box">
    <div class="color c-orange"></div>
</div>
</div>`;
};
class Item {
  constructor(name, color, done = false) {
    this.name = name;
    this.color = color;
    this.done = done;
  }
}
let tasks;
if (parseTasks) {
  tasks = parseTasks;
} else {
  tasks = [];
}
showTasks();
taskBtn.addEventListener("click", btnClick);
taskListCard.addEventListener("click", function(e) {
  console.log(e.target);
  const taskLI = e.target.parentNode;
  if (e.target.className === "item") {
    targetID = parseInt(e.target.parentNode.dataset.id);
    if (tasks[targetID].done) {
      tasks[targetID].done = false;
    } else {
      tasks[targetID].done = true;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearUI();
    showTasks();
  } else if (
    e.target.className === "btn-delete" ||
    e.target.parentNode.className === "btn-delete"
  ) {
    const taskID = taskLI.dataset.id;
    console.log(taskID);
    tasks.splice(taskID, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearUI();
    showTasks();
  } else if (e.target.classList.contains("color")) {
    const targetID = parseInt(
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.id
    );
    tasks[targetID].color = e.target.className;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearUI();
    showTasks();
  } else if (e.target.id === "clear-tasks") {
    tasks = [];
    clearUI();
    localStorage.removeItem("tasks");
  } else if (e.target.className === "shift-up") {
    const targetID = parseInt(e.target.parentNode.dataset.id);
    const targetText = tasks[targetID];
    if (targetID === 0) {
      tasks.shift();
      tasks.push(targetText);
    } else {
      tasks.splice(targetID - 1, 0, targetText);
      tasks.splice(targetID + 1, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearUI();
    showTasks();
  } else if (e.target.className === "shift-down") {
    const targetID = parseInt(e.target.parentNode.dataset.id);
    const targetText = tasks[targetID];
    if (targetID === tasks.length - 1) {
      tasks.pop();
      tasks.unshift(targetText);
    } else {
      tasks.splice(targetID + 2, 0, targetText);
      tasks.splice(targetID, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearUI();
    showTasks();
  }
});
filter.addEventListener("keydown", filterTasks);

function btnClick(e) {
  e.preventDefault();
  if (inputField.value) {
    const getInput = new Item(inputField.value, "c-red");
    // TASK OBJECTS
    tasks.push(getInput);
    clearUI();
    inputField.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}
function createNewTask(element, id, color, done) {
  const newListItem = document.createElement("li");

  const textInput = document.createTextNode(element);
  const textDiv = document.createElement("div");
  const shiftUpBtn = document.createElement("a");
  const shiftDownBtn = document.createElement("a");
  shiftUpBtn.setAttribute("href", "#");
  shiftUpBtn.setAttribute("class", "shift-up");
  shiftDownBtn.setAttribute("href", "#");
  shiftDownBtn.setAttribute("class", "shift-down");
  shiftUpBtn.innerHTML = `<i class="fas fa-chevron-up"></i>`;
  shiftDownBtn.innerHTML = `<i class="fas fa-chevron-down"></i>`;
  textDiv.classList.add("item");
  textDiv.appendChild(textInput);
  newListItem.insertAdjacentHTML("afterBegin", colorBtn(color));
  newListItem.appendChild(textDiv);
  newListItem.appendChild(shiftDownBtn);
  newListItem.appendChild(shiftUpBtn);
  newListItem.appendChild(addDeleteBtn());
  newListItem.setAttribute("data-id", id);

  return newListItem;
}
function addDeleteBtn() {
  const deleteBtn = document.createElement("a");
  deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
  deleteBtn.setAttribute("href", "#");
  deleteBtn.setAttribute("class", "btn-delete");
  return deleteBtn;
}
clearUI = () => {
  const listItems = document.querySelectorAll("li");
  listItems.forEach(element => {
    element.remove();
  });
};

function showTasks() {
  tasks.forEach((element, id) => {
    if (element.done) {
      completed.appendChild(createNewTask(element.name, id, element.color));
    } else {
      taskList.appendChild(createNewTask(element.name, id, element.color));
    }
  });
}
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll("li").forEach(function(task) {
    const item = task.textContent;
    console.log(item);
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
