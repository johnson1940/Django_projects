const API_BASE_URL = "http://127.0.0.1:8000/api/tasks/";

// Load tasks on page load
document.addEventListener("DOMContentLoaded", fetchTasks);

// Fetch tasks from API
function fetchTasks() {
    fetch(API_BASE_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const listItem = document.createElement("li");
                const createdDate = new Date(task.created_at).toLocaleString('en-US', { 
                    weekday: 'short',  // "Fri"
                    month: 'short',    // "Mar"
                    day: 'numeric',    // "15"
                    year: 'numeric',   // "2025"
                    hour: 'numeric',   // "4"
                    minute: '2-digit', // "30"
                    hour12: true       // "PM"
                });
                
                listItem.classList.add("task-item");
                listItem.innerHTML = `
                    <div class="task-content">
                        <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
                        <small class="date-text">${createdDate}</small>
                    </div>
                    <div class="task-buttons">
                        <button class="complete-btn" onclick="toggleTask(${task.id}, ${task.completed})">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
}

// Add new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskTitle = taskInput.value.trim();

    if (taskTitle === "") {
        alert("Task cannot be empty!");
        return;
    }

    fetch(API_BASE_URL + "create/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: taskTitle }),
    })
        .then(response => response.json())
        .then(() => {
            taskInput.value = "";
            fetchTasks();
        })
        .catch(error => console.error("Error adding task:", error));
}

// Toggle task completion status
function toggleTask(taskId, currentStatus) {
    fetch(API_BASE_URL + `update/${taskId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !currentStatus }),
    })
        .then(response => response.json())
        .then(() => fetchTasks())
        .catch(error => console.error("Error updating task:", error));
}

// Delete a task
function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    fetch(API_BASE_URL + `delete/${taskId}/`, {
        method: "DELETE",
    })
        .then(() => fetchTasks())
        .catch(error => console.error("Error deleting task:", error));
}
