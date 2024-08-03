document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      todoInput.value = "";
    }
  });

  function addTodoItem(todoText) {
    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" class="toggle-complete">
            <span class="task">${todoText}</span>
            <button class="delete-btn">삭제</button>
        `;
    todoList.appendChild(li);

    const toggleComplete = li.querySelector(".toggle-complete");
    const task = li.querySelector(".task");
    const deleteBtn = li.querySelector(".delete-btn");

    toggleComplete.addEventListener("change", function () {
      if (toggleComplete.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
    });

    deleteBtn.addEventListener("click", function () {
      li.remove();
    });
  }
});
