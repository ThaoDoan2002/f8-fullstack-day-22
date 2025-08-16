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
    taskName.value = "";
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

  tasksList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    const span = document.createElement("span");
    span.className = "task-title";
    span.textContent = task.name;
    li.appendChild(span);
    const div = document.createElement("div");
    div.className = "task-action";

    const btn1 = document.createElement("button");
    btn1.className = "task-btn edit";
    btn1.textContent = "Edit";
    const btn2 = document.createElement("button");
    btn2.className = "task-btn done";
    btn2.textContent = "Mark as done";
    const btn3 = document.createElement("button");
    btn3.className = "task-btn delete";
    btn3.textContent = "Delete";
    div.appendChild(btn1);
    div.appendChild(btn2);
    div.appendChild(btn3);
    li.appendChild(div);

    tasksList.append(li);
  });

  // const html = tasks
  //   .map((task) => {
  //     return `<li class="task-item">
  //                   <span class="task-title">${task.name}</span>
  //                   <div class="task-action">
  //                       <button class="task-btn edit">Edit</button>
  //                       <button class="task-btn done">Mark as done</button>
  //                       <button class="task-btn delete">Delete</button>
  //                   </div>
  //               </li>`;
  //   })
  //   .join("");

  // tasksList.innerHTML = html;
}

renderTasks();
