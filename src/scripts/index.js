import "../styles/reset.css";
import "../styles/header-styles.scss";
import "../styles/footer-styles.scss";
import "../styles/main-styles.scss";

import { addNewTask, getAllTasks, removeTask, updateTask } from "./async";


const binPicture = require("../img/bin-icon.png");

const socImg = document.querySelectorAll(".social-img");
socImg.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("hovered");
    });
    element.addEventListener("mouseout", () => {
        element.classList.remove("hovered");
    });
});



var list = [];

const topBar = document.getElementById("top-bar");
const taskInput = document.getElementById("task-input");
const taskDateInput = document.getElementById("task-date-input");

const taskList = document.getElementById("task-list");

taskInput.addEventListener("input", (event) => {
    event.target.classList.remove("error");
})
topBar.addEventListener("click", (event) => {
    if(event.target.closest("#task-button") && taskInput.value.trim() == "") {
        taskInput.classList.add("error");
    }else if(event.target.closest("#task-button")) {
        const newTask = {
            uniqId: new Date().getTime(),
            content: taskInput.value,
            deadline: taskDateInput.value,
            task_status: false,
        };
        createTask(newTask);
    }else if(event.target.closest("#upload-button")) {
        uploadTasks();
    }else if(event.target.closest("#sort-button")) {
        sorting()
    }
});

function createTask(taska) {
    const newElement = document.createElement("div");
    newElement.classList.add("list__item");
    newElement.setAttribute("uniqId", taska.id);
    newElement.innerHTML = `
    <div class="item__container">
        <div class="item__text">${taska.content}</div>
        <input type="checkbox" class="item__checkbox">
        <img src=${binPicture} alt="" class="item-image">
    </div>`;

    const checkbox = newElement.querySelector(".item__checkbox");
    const binButton = newElement.querySelector(".item-image");
    
    checkbox.addEventListener("click", (event) => {
        if(event.target.checked && !taskList.classList.contains("done")) {
            taskList.classList.add("done");
            updateTask({ ...taska, task_status: true});
        }else if(event.target.checked && taskList.classList.contains("done")) {
            taskList.classList.add("done");
            updateTask({ ...taska, task_status: false});
        }else if(!event.target.checked && taskList.classList.contains("done")) {
            taskList.classList.remove("done");
            updateTask({ ...taska, task_status: false});
        }else {
            taskList.classList.remove("done");
            updateTask({ ...taska, task_status: false});
        }
    });
    binButton.addEventListener("click", (event) => {
        newElement.remove();
        removeTask(taska.uniqId);
    });

    addNewTask(taska);
    taskList.append(newElement);
    taskInput.value = "";
}
function uploadTasks() {
    taskList.innerHTML = "";
    getAllTasks()
    .then(data => {
        data.forEach(element => {
            createTask(element);
        });
    });
}
async function sorting() {
    taskList.innerHTML = "";
    list = await getAllTasks();
    console.log(list);
    list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    list.forEach(element => {
        createTask(element);
    });
}