
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");
let templateElement = document.getElementById("list-item-template");
let template = templateElement.innerHTML;
var showActiveButton = document.getElementById("show-active");
var showAllButton = document.getElementById("show-all");
var showCompletedButton = doument.getElementById("show-completed")


/* Locate where <script> tag which contains our template  */

/* Lets get the template, which is just all the HTML beteen the <script> tag */


function saveTasks(name, isCompleted){
    localStorage.setItem(name, isCompleted);
}

/* So we have now found everything in the HTML document, now we just need to
write the function to insert the new task into the DOm tree and link it so when
the click even on the 'Add Task" button activate our function will execute */




/* Step 2. Lets write the function to handle the 'click' event
---------------------------------------------------------------*/
function onAddTaskClicked(event) {
    let taskName = newTaskInput.value;
    newTaskInput.value = "";
    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('beforeend', taskHTML);

    saveTasks(taskName, false)
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


function showAllTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        tasks[i].style.display = "block";
    }
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

/* Step 3 make the event trigger our functions
-----------------------------------------------*/ 
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);
showActiveButton.addEventListener('click',showActiveTasks);
showAllButton.addEventListerner('click', showAllTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);

renderTasks()