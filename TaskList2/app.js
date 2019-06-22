const dom = new DOM();
let currentTask = 0;
let tasks = [];

const buttonClick = e => {
  e.preventDefault;
  const taskID = parseInt(e.target.dataset.id);
  if (e.target.classList.contains("delete-btn")) {
    tasks[taskID].removeTask(taskID);
  } else if (e.target.classList.contains("edit-btn")) {
    dom.taskEdit.classList.add("is-active");
    modalContent(taskID);
  } else if (e.target.classList.contains("up-btn")) {
    shiftUp(taskID);
  } else if (e.target.classList.contains("down-btn")) {
    shiftDown(taskID);
  }
};

const addTask = value => {
  const color = dom.colorSelect.value;
  const item = new Item(value, color);
  tasks.push(item);
};

const showTaskList = () => {
  tasks.forEach((element, id) => {
    console.log(element);
    element.showTask(id);
  });
};

const clearUI = () => (dom.taskContainer.innerHTML = "");

const close = () => dom.taskEdit.classList.remove("is-active");

const closeModal = () => {
  dom.taskEdit.classList.remove("is-active");
};

const modalContent = id => {
  dom.modalInput.value = tasks[id].text;
  currentTask = id;
  const currentColor = tasks[currentTask].colorNum;
  dom.modalColor.classList.add(dom.colors[currentColor]);
  dom.modalColor.selectedIndex = currentColor;
};

const updateTasks = () => {
  localStorage.tasks = JSON.stringify(tasks);
  clearUI();
  showTaskList();
  if (tasks.length > 0) {
    dom.emptyText.classList.add("is-hidden");
    console.log(tasks.length);
  } else {
    dom.emptyText.classList.remove("is-hidden");
  }
};

const saveBtn = () => {
  const selectedColor = parseInt(dom.modalColor.value);
  tasks[currentTask].text = dom.modalInput.value;
  tasks[currentTask].colorNum = selectedColor;
  tasks[currentTask].color = dom.colors[selectedColor];
  updateTasks();
  close();
};

const shiftUp = taskID => {
  const targetObj = tasks[taskID];
  if (taskID === 0) {
    tasks.shift();
    tasks.push(targetObj);
  } else {
    tasks.splice(taskID - 1, 0, targetObj);
    tasks.splice(taskID + 1, 1);
  }
  updateTasks();
};

const shiftDown = taskID => {
  const targetObj = tasks[taskID];
  if (taskID === tasks.length - 1) {
    tasks.pop();
    tasks.unshift(targetObj);
  } else {
    tasks.splice(taskID + 2, 0, targetObj);
    tasks.splice(taskID, 1);
  }
  updateTasks();
};

const addEventListeners = () => {
  dom.submitTask.addEventListener("click", () => {
    const value = dom.inputField.value;
    if (value) {
      addTask(value);
      updateTasks();
    }
  });

  dom.taskContainer.addEventListener("click", function(e) {
    buttonClick(e);
  });

  dom.taskEdit.addEventListener("click", function(e) {
    if (e.target.id === "modal-close" || e.target.id === "modal-cancel") {
      close();
    } else if (e.target.id === "modal-save") {
      saveBtn();
    }
  });
};

init = () => {
  if (!localStorage.tasks) {
    tasks = [];
  } else {
    tasks = [];
    taskJSON = JSON.parse(localStorage.tasks);

    taskJSON.forEach(element => {
      const item = new Item(element.text);
      item.color = element.color;
      item.colorNum = element.colorNum;
      tasks.push(item);
    });
  }

  updateTasks();
  addEventListeners();
};

init();
