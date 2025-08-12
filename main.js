const todoForm = document.querySelector(".todo-form");
const taskName = document.querySelector("#todo-input");
const tasksList = document.querySelector("#task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

todoForm.onsubmit = (e) => {
  e.preventDefault();

  const newTask = {
    name: taskName.value.trim(),
    isCompleted: false,
  };
  if (!newTask.name) {
    alert("Vui lòng nhập ghi chú!");
    return;
  }
  const existTask = tasks.find((task) => {
    return task.name === newTask.name;
  });
  if (existTask) {
    alert(`Ghi chú ${existTask.name} đã tồn tại!`);
    return;
  }
  tasks.unshift(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  taskName.value = "";
};

function renderTasks() {
  if (!tasks.length) {
    tasksList.innerHTML = `<li class="task-item">Danh sách trống</li>`;
    return;
  }

  const html = tasks
    .map((task) => {
      return `<li class="task-item">
                    <span class="task-title">${task.name}</span>
                    <div class="task-action">
                        <button class="task-btn edit">Edit</button>
                        <button class="task-btn done">Mark as done</button>
                        <button class="task-btn delete">Delete</button>
                    </div>
                </li>`;
    })
    .join("");

  tasksList.innerHTML = html;
}

renderTasks();
