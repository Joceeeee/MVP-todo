/* Step 1: Find the element */
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");
let templateElement = document.getElementById("list-item-template");
let template = templateElement.innerHTML;
var showActiveButton = document.getElementById("show-active");
var showAllButton = document.getElementById("show-all");
var showCompletedButton = doument.getElementById("show-completed");

/* Step 2: Write the behaviour */

function onAddTaskClicked(event) {
    var taskName = newTaskInput.value;
    newTaskInput.value = "";
    var taskHTML = template.replace("<!--Task_Name-->", taskName);
    todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);

    saveTasks(taskName, false);
}

function onTodolistClicked(event) {
    /* We need to know which element triggered the click event */
    let targetElement = event.target;
    while (!targetElement.classList.contains("task")) {
        targetElement = targetElement.parentElement;
    }
    let checkbox = targetElement.querySelector(".checkbox");
    if (checkbox.checked) {
        targetElement.classList.add("completed");
    } else {
        targetElement.classList.remove("completed");
    }
    var taskNameElement = targetElement.querySelector(".task-name")
    var taskName = taskNameElement.innerText;

    saveTasks(taskName, checkbox.checked)
}

function showActiveTasks() {
    var tasks = document.getElementsByClassName("task");
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].classlist.contains("completed")){
            tasks[i].style.display = "none";
        } else {
            tasks[i].style.display = "block";
        }
    }
}

function showAllTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        tasks[i].style.display = "block";
    }
}
    

function showCompletedTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].classlist.contains("completed")){
            tasks[i].style.display = "block";
        } else {
            tasks[i].style.display = "none";
        }
    }
}

function renderTasks(){
    for (i = 0; i<localStorage.length; i++){
        var taskName = localStorage.key(i);
        var isCompleted = localStorage.getItem(taskName) == "true";
        var taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        if (!isCompleted){
            todoListContainer.insertAdjacentElement('afterbegin',taskHTML);
        }
    }
}


function saveTasks(name, isCompleted){
    localStorage.setItem(name, isCompleted);
}

/* Step 3: make the event trigger our functions (link to event handler*/ 
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);
showActiveButton.addEventListener('click',showActiveTasks);
showAllButton.addEventListerner('click', showAllTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);

renderTasks()