const inputBox = document.querySelector(".input-list input");
const addBtn = document.querySelector(".input-list button");
const taskList = document.querySelector(".task-List ul");

// Load tasks on start
window.addEventListener("DOMContentLoaded", loadTasks);

// Add task button
addBtn.addEventListener("click", () => {
  addTask(inputBox.value.trim());
});

// Add task on Enter key
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(inputBox.value.trim());
  }
});

function addTask(taskText, isCompleted = false) {
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Detect clicks on before/after area
  li.addEventListener("click", (e) => {
    const liRect = li.getBoundingClientRect();
    const clickX = e.clientX - liRect.left;

    // BEFORE area (checkbox ~35px)
    if (clickX < 35) {
      li.classList.toggle("completed");
      saveTasks();
    }
    // AFTER area (delete ~35px)
    else if (clickX > liRect.width - 35) {
      li.remove();
      saveTasks();
    }
  });

  taskList.appendChild(li);
  inputBox.value = "";
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-List li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => addTask(task.text, task.completed));
}
