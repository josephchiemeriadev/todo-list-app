let input = document.getElementById("input");
let btn = document.querySelector("#btn");
let list = document.getElementById("list");
const allTask = document.querySelector(".all");
const activeTask = document.querySelector(".active");
const completeTask = document.querySelector(".complete");
const deleteComp = document.querySelector("#delete-comp");
const everyTask = document.querySelector(".all-task");
const completeNoTask = document.querySelector(".complete-task");
const imageText = document.querySelector(".image-text");

window.addEventListener("load", loadTask);
let tasks = [];
let currentFilter = "All";
btn.addEventListener("click", () => {
  let invalue = input.value.trim();
  if (!invalue) {
    alert("enter task");
    return;
  }
  input.value = "";

  const task = {
    id: Date.now(),
    text: invalue,
    completed: false,
  };

  tasks.push(task);

  renderTask();
  saveTask();
});

function renderTask() {
  list.innerHTML = "";
  updateCount();
  updateImage();
  let filterTask = tasks;
  if (currentFilter === "Active") {
    filterTask = tasks.filter((task) => {
      return task.completed === false;
    });
  } else if (currentFilter === "Completed") {
    filterTask = tasks.filter((task) => {
      return task.completed === true;
    });
  }

  filterTask.forEach((task) => {
    const li = document.createElement("li");
    const spanText = document.createElement("span");
    const checkBox = document.createElement("input");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const divbtn = document.createElement("div");
    const divtext = document.createElement("div");

    spanText.textContent = task.text;

    checkBox.type = "checkbox";

    checkBox.checked = task.completed;

    if (checkBox.checked === true) {
      spanText.style.textDecoration = "line-through";
      spanText.style.color = "#666";
    }

    checkBox.addEventListener("change", () => {
      task.completed = checkBox.checked;

      saveTask();
      renderTask();
    });

    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.addEventListener("click", () => {
      li.remove();
      deleteTask(task);
      renderTask();
    });

    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.addEventListener("click", () => {
      let newTask = prompt("Edit your task", task.text);
      if (newTask === null) {
        return;
      }
      newTask = newTask.trim();

      if (!newTask) {
        alert("enter task");
        return;
      }

      task.text = newTask;
      renderTask();
      saveTask();
    });

    divbtn.appendChild(editBtn);
    divbtn.appendChild(delBtn);
    divtext.appendChild(checkBox);
    divtext.appendChild(spanText);
    li.appendChild(divtext);
    li.appendChild(divbtn);
    list.appendChild(li);
  });
}

function deleteTask(task) {
  tasks = tasks.filter((item) => {
    return item.id !== task.id;
  });

  saveTask();
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
  tasks = JSON.parse(localStorage.getItem("tasks") || []);
  renderTask();
}

allTask.addEventListener("click", () => {
  currentFilter = "All";
  changeSelected(allTask);
  renderTask();
});

activeTask.addEventListener("click", () => {
  currentFilter = "Active";
  changeSelected(activeTask);
  renderTask();
});

completeTask.addEventListener("click", () => {
  currentFilter = "Completed";
  changeSelected(completeTask);
  renderTask();
});

function changeSelected(button) {
  allTask.classList.remove("change");
  activeTask.classList.remove("change");
  completeTask.classList.remove("change");
  button.classList.add("change");
}

deleteComp.addEventListener("click", () => {
  tasks = tasks.filter((task) => {
    return task.completed === false;
  });
  saveTask();
  renderTask();
});

function updateCount() {
  everyTask.textContent = tasks.length;
  completeNoTask.textContent = tasks.filter((task) => {
    return task.completed === true;
  }).length;
}

function updateImage() {
  if (tasks.length === 0) {
    imageText.style.display = "block";
  } else {
    imageText.style.display = "none";
  }
}
