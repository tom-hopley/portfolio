class Item {
  constructor(text, colorNum, completed) {
    this.text = text;
    this.color = dom.colors[colorNum];
    this.colorNum = colorNum;
    this.completed = completed;
    this.timeStamp;
  }
  makeTask(id) {
    return dom.getTaskHTML(this.text, this.color, id);
  }
  makeCompleted(id) {
    return dom.getCompletedHTML(this.text, id, this.timeStamp);
  }
  showTask(id) {
    // Gets returned html element from maketask's getTaskHTML() call. is called in foreach loop by showTaskList()
    dom.taskContainer.insertAdjacentHTML("afterbegin", this.makeTask(id));
  }
  showCompleted(id) {
    // The same function for the completed tasks section
    dom.taskContainer.insertAdjacentHTML("beforeend", this.makeCompleted(id));
  }
  removeTask(id) {
    document.getElementById(`task-${id}`).remove();
    tasks.splice(id, 1);
    updateTasks();
  }
  // Timestamping function below
  setTimeStamp() {
    const date = new Date();
    const min = function() {
      // Gives a leading 0 to minutes, also hours
      return (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    };
    const hours = function() {
      return (date.getHours() < 10 ? "0" : "") + date.getHours();
    };
    this.timeStamp = `Completed on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${hours()}:${min()}`;
  }
}
