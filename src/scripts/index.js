import "../styles/reset.css";
import "../styles/header-styles.scss";
import "../styles/footer-styles.scss";
import "../styles/main-styles.scss";
import "./async.js";
import "./test.js";

import { addTask, getAllTasks, removeTask, taskStatus } from "./async.js";

// const path = require("path");
const binPic = require("../img/bin-icon.png");

const socImg = document.querySelectorAll(".social-img");
socImg.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("hovered");
    });
    element.addEventListener("mouseout", () => {
        element.classList.remove("hovered");
    });
});

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const topBar = document.querySelector(".top-bar__container");

topBar.addEventListener("click", event => {
    if(event.target.closest("#task-button")) {
        var newTask = { 
            uniqId: new Date().getTime().toString(),
            text: taskInput.value, 
            done: false 
        };
        addTaskToList(newTask);
    }else if(event.target.closest("#upload-button")) {
        uploadData();
    }
});
taskInput.addEventListener("input", event => {
    if(taskInput.classList.contains("error")) {
        taskInput.classList.remove("error");
    }
});



function addTaskToList(object) {
    try {
        if(taskInput.value.trim().length == 0) {
            taskInput.classList.add("error");
            taskInput.value = "";
            return 0;
        };

        const newItem = document.createElement("div");
        newItem.classList.add("list__item");
        newItem.setAttribute("uniq-id", object.uniqId);
        newItem.innerHTML = `
        <div class="item__container">
            <div class="item__text">${object.text}</div>
            <input type="checkbox" class="item__checkbox">
            <img src=${binPic} alt="" class="item-image">
        </div>`;

        const checkbox = newItem.querySelector(".item__checkbox");
        const bin = newItem.querySelector(".item-image");
        const item = checkbox.parentNode;
        
        checkbox.addEventListener("click", () => {
            if(checkbox.checked && !item.classList.contains("done")) {
                item.classList.add("done");
                taskStatus(object.uniqId, true);
            }else if(checkbox.checked && item.classList.contains("done")){
                item.classList.add("done");
                taskStatus(object.uniqId, true);
            }else if(!checkbox.checked && item.classList.contains("done")) {
                item.classList.remove("done");
                taskStatus(object.uniqId, false);
            }else {
                item.classList.remove("done");
                taskStatus(object.uniqId, false);
            }
        });
        bin.addEventListener("click", () => {
            newItem.remove();
            console.log(newItem.getAttribute("uniq-id"));
            removeTask(newItem.getAttribute("uniq-id"));
        });

        addTask(object);
        taskList.append(newItem);

        taskInput.value = "";
    }catch(error) {
        console.log("error: " + error);
    }
};

function uploadData() {
    getAllTasks()
    .then(data => {
        document.getElementById("task-list").innerHTML = "";
        data.forEach(element => {
            addUploadingTask(element);
        });
    });
};
function addUploadingTask(task) {   
    try {
        const newItem = document.createElement("div");
        newItem.classList.add("list__item");
        newItem.setAttribute("uniq-id", task.uniqId);
        newItem.innerHTML = `
        <div class="item__container">
            <div class="item__text">${task.text}</div>
            <input type="checkbox" class="item__checkbox" ${ task.done && "checked" }>
            <img src=${binPic} alt="" class="item-image">
        </div>`;


        const checkbox = newItem.querySelector(".item__checkbox");
        const bin = newItem.querySelector(".item-image");
        const item = checkbox.parentNode;

        checkbox.addEventListener("click", () => {
            if(checkbox.checked && !item.classList.contains("done")) {
                item.classList.add("done");
                taskStatus(task.uniqId, true);
            }else if(checkbox.checked && item.classList.contains("done")){
                item.classList.add("done");
                taskStatus(task.uniqId, true);
            }else if(!checkbox.checked && item.classList.contains("done")) {
                item.classList.remove("done");
                taskStatus(task.uniqId, false);
            }else {
                item.classList.remove("done");
                taskStatus(task.uniqId, false);
            }
        });
        bin.addEventListener("click", () => {
            newItem.remove();
            console.log(newItem.getAttribute("uniq-id"));
            removeTask(newItem.getAttribute("uniq-id"));
        });

        taskList.append(newItem);
        taskInput.value = "";
    }catch(error) {
        console.error("Error - -> " + error);
    }
};