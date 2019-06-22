class DOM {
  inputField = document.getElementById("task-input");
  colorSelect = document.getElementById("color-select");
  submitTask = document.getElementById("submit-task");
  taskContainer = document.getElementById("task-container");
  completedContainer = document.getElementById("completed-container");
  taskEdit = document.getElementById("task-edit");
  modalInput = document.getElementById("modal-text");
  modalClose = document.getElementById("modal-close");
  modalSave = document.getElementById("modal-save");
  modalCancel = document.getElementById("modal-cancel");
  modalColor = document.getElementById("modal-color");
  emptyText = document.getElementById("empty-text");
  clearAll = document.getElementById("clear-all");
  colors = ["is-success", "is-info", "is-warning", "is-danger", "is-dark"];
  getTaskHTML = (text, color, id) => {
    return `
    <article class="message ${color}" id="task-${id}">
    <div class="message-body level">
      <div class="level-left">
        <div id =""class="level-item has-text-centeredtask-box">
          <span data-id="${id}"  data-btntype="task-text" class="level-item is-size-4 ">${text}</span>
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p class="control desktop-btn"> <a data-id="${id}"  data-btntype="edit-btn" class="button is-inline">Edit</a></p>
        </div>


    <div class="level-item">
      <div class="field has-addons">
      <p class="control mobile-btn"> <a data-id="${id}"  data-btntype="edit-btn" class="button is-inline">Edit</a></p>
        <p class="control"> <a data-id="${id}"  data-btntype="up-btn" class="button is-inline"><i class="fas fa-chevron-up"></i>"</a></p>
        <p class="control"> <a data-id="${id}" id="down-btn" class="button is-inline"><i class="fas fa-chevron-down"></i></a></p>
        <p class="control mobile-btn"> <a data-id="${id}" data-btntype="delete-btn" class="button is-inline is-danger"><i class="fas fa-times"></i></a></p>
      </div>
    </div>

  <div class="level-right">
    <div class="level-item">
      <p class="control desktop-btn"> <a data-id="${id}"  data-btntype="delete-btn" class="button is-inline is-danger">Remove</a></p>
    </div>
  </div>
</div>
</article>`;
  };
  getCompletedHTML = (text, id) => {
    return `
    <article class="message" id="completed-${id}">
    <div class="message-body level">
      <div class="level-left">
        <div id ="task-box"class="level-item has-text-centered">
          <span id="completed-text" data-btntype="task-text-complete" class="level-item is-size-4 ">${text}</span>
          </div>
      </div>




  <div class="level-right">
    <div class="level-item">
      <p class="control desktop-btn"> <a data-id="${id}" data-btntype="restore-btn" class="button is-inline is-success">Restore</a></p>
    </div>
  </div>
</div>
</article>`;
  };
}
