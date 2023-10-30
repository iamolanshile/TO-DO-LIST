// Function to add new to-do items to the list
function addTask() {
    const newTaskText = document.getElementById("newTask").value.trim();
    if (newTaskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("taskList");
    const newTask = document.createElement("li");
    newTask.textContent = newTaskText;
    newTask.addEventListener("click", () => {
        // When a task item is clicked, it becomes editable
        const originalText = newTask.textContent;
        newTask.innerHTML = `<input type="text" value="${originalText}">`;
        const editInput = newTask.querySelector("input");
        editInput.focus();

        // Save changes when Enter key is pressed
        editInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                newTask.innerHTML = editInput.value;
                updateLocalStorage();
            }
        });
    });
    taskList.appendChild(newTask);

    // Save the task to local storage
    updateLocalStorage();

    // Clear the input field
    document.getElementById("newTask").value = "";
}

// Function to update local storage with current task list
function updateLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];
    taskList.querySelectorAll("li").forEach((task) => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    tasks.forEach((taskText) => {
        const newTask = document.createElement("li");
        newTask.textContent = taskText;
        newTask.addEventListener("click", () => {
            // When a task item is clicked, it becomes editable
            const originalText = newTask.textContent;
            newTask.innerHTML = `<input type="text" value="${originalText}">`;
            const editInput = newTask.querySelector("input");
            editInput.focus();

            // Save changes when Enter key is pressed
            editInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    newTask.innerHTML = editInput.value;
                    updateLocalStorage();
                }
            });
        });
        taskList.appendChild(newTask);
    });
}

// Attach the addTask function to the "Add" button
document.getElementById("addButton").addEventListener("click", addTask);

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();


