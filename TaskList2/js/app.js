const dom = new DOM();
let currentTask = -1;
let tasks = [];
let completed = [];

const addTask = value => {
  const color = dom.colorSelect.value;
  const item = new Item(value, color, false);
  tasks.push(item);
};

const showTaskList = () => {
  tasks.forEach((element, id) => element.showTask(id));
  completed.forEach((element, id) => element.showCompleted(id));
};

const clearUI = () => (dom.taskContainer.innerHTML = "");

const showElement = element => element.classList.remove("is-hidden");
const hideElement = element => element.classList.add("is-hidden");
const activateElement = element => element.classList.add("is-active");
const deactivateElement = element => element.classList.remove("is-active");

// Sets up the input field and select box to task values
const modalContent = id => {
  dom.modalInput.value = tasks[id].text;
  currentTask = id;
  const currentColor = tasks[currentTask].colorNum;
  dom.modalColor.classList.add(dom.colors[currentColor]);
  dom.modalColor.selectedIndex = currentColor;
};

const emptyTextDisplay = () => {
  if (tasks.length > 0 || completed.length > 0) {
    hideElement(dom.emptyText);
  } else {
    showElement(dom.emptyText);
  }
};

const emptyBtnDisplay = () =>
  completed.length > 0 ? showElement(dom.clearAll) : hideElement(dom.clearAll);

// Reset of UI
const updateTasks = () => {
  localStorage.tasks = JSON.stringify(tasks);
  localStorage.completed = JSON.stringify(completed);
  clearUI();
  showTaskList();
  emptyTextDisplay();
  emptyBtnDisplay();
};

// The Edit Modal's save button
const saveBtn = () => {
  const selectedColor = parseInt(dom.modalColor.value);
  tasks[currentTask].text = dom.modalInput.value;
  tasks[currentTask].colorNum = selectedColor;
  tasks[currentTask].color = dom.colors[selectedColor];
  updateTasks();
  deactivateElement(dom.taskEdit);
};

// Click function for 'up' botton
const shiftUp = taskID => {
  const targetObj = tasks[taskID];
  if (taskID === 0) {
    // makes the array join at the ends
    tasks.shift();
    tasks.push(targetObj);
  } else {
    // Shifting up
    tasks.splice(taskID - 1, 0, targetObj);
    tasks.splice(taskID + 1, 1);
  }
  updateTasks();
};

const shiftDown = taskID => {
  const targetObj = tasks[taskID];
  if (taskID === tasks.length - 1) {
    // Joins array at the ends
    tasks.pop();
    tasks.unshift(targetObj);
  } else {
    // Shifting Down
    tasks.splice(taskID + 2, 0, targetObj);
    tasks.splice(taskID, 1);
  }
  updateTasks();
};

// Task Controls
const buttonClick = e => {
  e.preventDefault();

  const taskID = parseInt(e.target.dataset.id);
  const btnType = e.target.dataset.btntype;
  switch (btnType) {
    case "delete-btn":
      tasks[taskID].removeTask(taskID);
      break;
    case "edit-btn":
      // Opening up the Edit Modal and adding appling the correct task
      activateElement(dom.taskEdit);
      modalContent(taskID);
      break;
    case "up-btn":
      shiftDown(taskID);
      break;
    case "down-btn":
      shiftUp(taskID);
      break;
    case "task-text":
      // Puts a line-through for completed text and moves it to the end of the list
      tasks[taskID].setTimeStamp();
      completed.push(tasks[taskID]);
      tasks.splice(taskID, 1);
      updateTasks();
      break;
    case "restore-btn":
      tasks.push(completed[taskID]);
      completed.splice(taskID, 1);
      updateTasks();
  }
};

const addEventListeners = () => {
  // Submit button for task input field
  dom.submitTask.addEventListener("click", () => {
    const value = dom.inputField.value;
    if (value) {
      addTask(value);
      updateTasks();
      dom.inputField.value = "";
    }
  });
  // Click any button inside the task container
  dom.taskContainer.addEventListener("click", e => buttonClick(e));

  // Buttons inside the Edit Modal
  dom.taskEdit.addEventListener("click", e => {
    if (e.target.id === "modal-close" || e.target.id === "modal-cancel") {
      deactivateElement(dom.taskEdit);
    } else if (e.target.id === "modal-save") {
      saveBtn();
    }
  });
  // Button to clear all completed tasks
  dom.clearAll.addEventListener("click", () => {
    completed = [];
    updateTasks();
  });
  // Mobile burger controls
  dom.burgerBtn.addEventListener("click", () => {
    if (dom.burgerBtn.classList.contains("is-active")) {
      deactivateElement(dom.burgerBtn);
      deactivateElement(dom.burgerDiv);
    } else {
      activateElement(dom.burgerBtn);
      activateElement(dom.burgerDiv);
    }
  });
};
const convertTasks = (arr, local) => {
  // Checks to see if there is saved localstorage
  if (!local) {
    arr = [];
  } else {
    // Coverts JSON objects back into Item class objects
    const taskJSON = JSON.parse(local);
    taskJSON.forEach(element => {
      const item = new Item(element.text);
      item.color = element.color;
      item.colorNum = element.colorNum;
      item.completed = element.completed;
      item.timeStamp = element.timeStamp;
      arr.push(item);
    });
  }
};

init = () => {
  convertTasks(tasks, localStorage.tasks);
  convertTasks(completed, localStorage.completed);
  updateTasks();
  addEventListeners();
};

init();
