function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("toDoDatabase", 1);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        }
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const store = db.createObjectStore("Task", { keyPath: 'uniqId', autoincrement: false});
        }
    });
}

export async function addNewTask(task) {
    const db = await openDatabase();
    const transaction = db.transaction("Task", "readwrite");

    const store = transaction.objectStore("Task");

    store.put(task);

    transaction.onsuccess = function() {

    }
    transaction.onerror = function(event) {
        console.error("Error - -> " + event.target.error);
    }
}
export async function updateTask(task) {
    const db = await openDatabase();
    const transaction = db.transaction("Task", "readwrite");

    const store = transaction.objectStore("Task");

    const request = store.put(task);
    request.onsuccess = function(event) {

    }
    request.onerror = function(event) {
        console.error("Error - -> " + event.target.error);
    }
}
export async function removeTask(uniqId) {
    const db = await openDatabase();
    const transaction = db.transaction("Task", "readwrite");

    const store = transaction.objectStore("Task");

    const request = store.delete(uniqId);

    request.onsuccess = function(event) {
        
    }
    request.onerror = function(event) {
        console.error("Error - -> " + event.target.error);
    }
}
export function getAllTasks() {
    return new Promise(async(resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction("Task", "readwrite");

        const store = transaction.objectStore("Task");

        const request = store.getAll();
        request.onsuccess = function(event) {
            resolve(event.target.result);
        }
        request.onerror = function(event) {
            console.error("Error - -> " + event.target.error);
        }
    })
}