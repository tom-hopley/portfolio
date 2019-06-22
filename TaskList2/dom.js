class DOM {
  inputField = document.getElementById("task-input");
  colorSelect = document.getElementById("color-select");
  submitTask = document.getElementById("submit-task");
  taskContainer = document.getElementById("task-container");
  taskEdit = document.getElementById("task-edit");
  modalInput = document.getElementById("modal-text");
  modalClose = document.getElementById("modal-close");
  modalSave = document.getElementById("modal-save");
  modalCancel = document.getElementById("modal-cancel");
  modalColor = document.getElementById("modal-color");
  emptyText = document.getElementById("empty-text");
  colors = ["is-success", "is-info", "is-warning", "is-danger", "is-dark"];
  getTaskHTML = (text, color, id) => {
    return `
    <article class="message ${color}" id="task-${id}">
    <div class="message-body level">
      <div class="level-left">
        <div id ="task-box"class="level-item has-text-centered">
          <span class="level-item is-size-4 ">${text}</span>
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p class="control desktop-btn"> <a data-id="${id}" class="edit-btn button is-inline">Edit</a></p>
        </div>


    <div class="level-item">
      <div class="field has-addons">
      <p class="control mobile-btn"> <a data-id="${id}" class="edit-btn button is-inline">Edit</a></p>
        <p class="control"> <a data-id="${id}" class="up-btn button is-inline"><i class="fas fa-chevron-up"></i>"</a></p>
        <p class="control"> <a data-id="${id}" class="down-btn button is-inline"><i class="fas fa-chevron-down"></i></a></p>
        <p class="control mobile-btn"> <a data-id="${id}" class="delete-btn button is-inline is-danger"><i class="fas fa-times"></i></a></p>
      </div>
    </div>

  <div class="level-right">
    <div class="level-item">
      <p class="control desktop-btn"> <a data-id="${id}" class="delete-btn button is-inline is-danger">Remove</a></p>
    </div>
  </div>
</div>
</article>`;
  };
}
