const dom = new DOM();
let currentTask = 0;
let tasks = [];
let completed = [];

// Task Controls
const buttonClick = e => {
  e.preventDefault;

  const taskID = parseInt(e.target.dataset.id);
  const btnType = e.target.dataset.btntype;
  console.log(e.target.dataset.btntype);
  switch (btnType) {
    case "delete-btn":
      tasks[taskID].removeTask(taskID);
      break;
    case "edit-btn":
      // Opening up the Edit Modal and adding appling the correct task
      dom.taskEdit.classList.add("is-active");
      modalContent(taskID);
      break;
    case "up-btn":
      shiftDown(taskID);
      break;
    case "down-btn":
      shiftUp(taskID);
      break;
    case "task-text":
      completed.push(tasks[taskID]);
      tasks.splice(taskID, 1);
      updateTasks();
      break;
    case "restore-btn":
      tasks.push(completed[taskID]);
      completed.splice(taskID, 1);
      updateTasks();
      break;
  }
};

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

// For closing the Edit Modal
const close = () => dom.taskEdit.classList.remove("is-active");

const closeModal = () => {
  dom.taskEdit.classList.remove("is-active");
};

// Sets up the input field and select box to task values
const modalContent = id => {
  dom.modalInput.value = tasks[id].text;
  currentTask = id;
  const currentColor = tasks[currentTask].colorNum;
  dom.modalColor.classList.add(dom.colors[currentColor]);
  dom.modalColor.selectedIndex = currentColor;
};

// Reset of UI
const updateTasks = () => {
  localStorage.tasks = JSON.stringify(tasks);
  localStorage.completed = JSON.stringify(completed);
  clearUI();
  showTaskList();
  if (tasks.length > 0 || completed.length > 0) {
    dom.emptyText.classList.add("is-hidden");
  } else {
    dom.emptyText.classList.remove("is-hidden");
  }
  if (completed.length > 0) {
    dom.clearAll.classList.remove("is-hidden");
  } else {
    dom.clearAll.classList.add("is-hidden");
  }
};

// Edit Modal's save button
const saveBtn = () => {
  const selectedColor = parseInt(dom.modalColor.value);
  tasks[currentTask].text = dom.modalInput.value;
  tasks[currentTask].colorNum = selectedColor;
  tasks[currentTask].color = dom.colors[selectedColor];
  updateTasks();
  close();
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
  dom.taskContainer.addEventListener("click", function(e) {
    buttonClick(e);
  });
  // Buttons inside the Edit Modal
  dom.taskEdit.addEventListener("click", function(e) {
    if (e.target.id === "modal-close" || e.target.id === "modal-cancel") {
      close();
    } else if (e.target.id === "modal-save") {
      saveBtn();
    }
  });
  dom.clearAll.addEventListener("click", () => {
    completed = [];
    updateTasks();
  });
  dom.burgerBtn.addEventListener("click", () => {
    if (dom.burgerBtn.classList.contains("is-active")) {
      dom.burgerBtn.classList.remove("is-active");
      dom.burgerDiv.classList.remove("is-active");
    } else {
      dom.burgerBtn.classList.add("is-active");
      dom.burgerDiv.classList.add("is-active");
    }
  });
};

const convertTasks = (arr, local) => {
  if (!local) {
    arr = [];
  } else {
    const taskJSON = JSON.parse(local);
    // Coverts JSON objects back into Item class objects
    taskJSON.forEach(element => {
      const item = new Item(element.text);
      item.color = element.color;
      item.colorNum = element.colorNum;
      item.completed = element.completed;
      arr.push(item);
    });
  }
};

init = () => {
  // Checks to see if there is saved localstorage
  convertTasks(tasks, localStorage.tasks);
  convertTasks(completed, localStorage.completed);
  updateTasks();
  addEventListeners();
};

init();
