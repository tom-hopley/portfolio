class Item {
  constructor(text, colorNum, completed) {
    this.text = text;
    this.color = dom.colors[colorNum];
    this.colorNum = colorNum;
    this.completed = completed;
  }
  makeTask(id) {
    return dom.getTaskHTML(this.text, this.color, id);
  }
  makeCompleted(id) {
    return dom.getCompletedHTML(this.text, id);
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
}
