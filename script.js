let tasks = []

try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || []
} catch (e) {
    tasks = []
}

function detectPriority(text) {

    text = text.toLowerCase()

    if (text.includes("urgent") || text.includes("important"))
        return "High 🔴"

    if (text.includes("soon"))
        return "Medium 🟡"

    return "Low 🟢"

}

function renderTasks(filter = "all") {

    const list = document.getElementById("taskList")

    if (!list) return

    list.innerHTML = ""

    tasks.forEach((task, index) => {

        if (filter === "pending" && task.completed) return
        if (filter === "completed" && !task.completed) return

        const li = document.createElement("li")

        if (task.completed) li.classList.add("completed")

        li.innerHTML = `

<div class="task-content">

<span class="text">${task.text}</span>

<small class="priority-badge">${task.priority}</small>

</div>

<div class="task-buttons">

<button onclick="toggleTask(${index})" title="Complete">✅</button>
<button onclick="editTask(${index})" title="Edit">✏️</button>
<button onclick="deleteTask(${index})" title="Delete">🗑️</button>

</div>

`

        list.appendChild(li)

    })

}

function addTask() {

    const input = document.getElementById("taskInput")

    if (!input) return

    const text = input.value.trim()

    if (!text) return

    tasks.push({

        text: text,

        priority: detectPriority(text),

        completed: false

    })

    input.value = ""

    saveTasks()

}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed

    saveTasks()

}

function deleteTask(index) {

    tasks.splice(index, 1)

    saveTasks()

}

function editTask(index) {

    const newText = prompt("Update task:", tasks[index].text)

    if (newText) {

        tasks[index].text = newText

        tasks[index].priority = detectPriority(newText)

        saveTasks()

    }

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTasks()

}

function filterTasks(type) {

    renderTasks(type)

}

document.addEventListener("DOMContentLoaded", () => {

    renderTasks()

    document.getElementById("taskInput").addEventListener("keypress", function (e) {

        if (e.key === "Enter") addTask()

    })

    document.getElementById("addTaskBtn").addEventListener("click", addTask)

})