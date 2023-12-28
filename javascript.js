
class TodoListManager {
    constructor() {
        this.addTaskForm = document.getElementById("add-task-form");
        this.todoList = document.getElementById("todo-list");

        document.getElementById("add-task-button").addEventListener("click", () => this.addTask());

        this.loadTasksFromLocalStorage();
        this.time();
    }

    addTask() {
        const name = this.getValue("name");
        const age = this.getValue("age");
        const address = this.getValue("address");
        const task = this.getValue("task");

        if (!name || !age || !address || !task) {
            alert("Please fill in all fields");
            return;
        }

        const newRow = this.todoList.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${age}</td><td>${address}</td><td>${task}</td><td class="actions"><button onclick="todoListManager.editTask(this)">Edit</button><button onclick="todoListManager.deleteTask(this)">Delete</button></td>`;

        this.saveTasksToLocalStorage(); 
        this.addTaskForm.reset();
    }

    editTask(button) {
        const row = button.closest("tr");
        const cells = row.getElementsByTagName("td");

        this.setValue("name", cells[0].innerText);
        this.setValue("age", cells[1].innerText);
        this.setValue("address", cells[2].innerText);
        this.setValue("task", cells[3].innerText);

        this.deleteTask(button);
    }

    deleteTask(button) {
        button.closest("tr").remove();
        this.saveTasksToLocalStorage(); 
    }

    loadTasksFromLocalStorage() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(task => {
            const newRow = this.todoList.insertRow();
            newRow.innerHTML = `<td>${task.name}</td><td>${task.age}</td><td>${task.address}</td><td>${task.task}</td><td class="actions"><button onclick="todoListManager.editTask(this)">Edit</button><button onclick="todoListManager.deleteTask(this)">Delete</button></td>`;
        });
    }

    saveTasksToLocalStorage() {
        const tasks = Array.from(this.todoList.rows).map(row => ({
            name: row.cells[0].innerText,
            age: row.cells[1].innerText,
            address: row.cells[2].innerText,
            task: row.cells[3].innerText,
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getValue(id) {
        return document.getElementById(id).value;
    }

    setValue(id, value) {
        document.getElementById(id).value = value;
    }

    time() {
        const currentDate = new Date();
        const dateElement = document.getElementById("date");
        const hourElement = document.getElementById("hour");

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = currentDate.toLocaleDateString('en-US', options);
        const hourString = currentDate.toLocaleTimeString();

        dateElement.textContent = dateString;
        hourElement.textContent = hourString;
    }
}
const data = new Date();

const todoList = document.getElementById("todo-list");

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

function time() {
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();

    if (h < 10)
        h = "0" + h;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;

    document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
    setTimeout('time()', 500);
}

time();
const todoListManager = new TodoListManager();
