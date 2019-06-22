class Item {
  constructor(text, colorNum) {
    this.text = text;
    this.color = dom.colors[colorNum];
    this.colorNum = colorNum;
  }
  makeTask(id) {
    return dom.getTaskHTML(this.text, this.color, id);
  }
  showTask(id) {
    // Gets returned html element from maketask's getTaskHTML() call. is called in foreach loop by showTaskList()
    dom.taskContainer.insertAdjacentHTML("beforeend", this.makeTask(id));
  }
  removeTask(id) {
    document.getElementById(`task-${id}`).remove();
    tasks.splice(id, 1);
    updateTasks();
  }
}
