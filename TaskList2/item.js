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
    dom.taskContainer.insertAdjacentHTML("beforeend", this.makeTask(id));
  }
  removeTask(id) {
    document.getElementById(`task-${id}`).remove();
    tasks.splice(id, 1);
    updateTasks();
  }
}
