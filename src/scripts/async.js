function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("ToDoDb", 2);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        }
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const store = db.createObjectStore("Task", { keyPath: 'uniqId'});

            // const index = store.createIndex();
        }
    });
}


export async function addTask(taska) {
    const db = await openDatabase();
    const transaction = db.transaction("Task", "readwrite");

    const store = transaction.objectStore("Task");

    const Query = store.put({uniqId: taska.uniqId, text: taska.text, done: false});

    Query.onsuccess = function() {
        console.log("added task");
    }
    Query.onerror = function(event) {
        console.log(event.error);
    }
}

export function getAllTasks() {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction("Task", "readwrite");

        const store = transaction.objectStore("Task");

        const Query = store.getAll();

        Query.onsuccess = function(event) {
            resolve(event.target.result);
        }
        Query.onerror = function(event) {
           reject(event.target.error);
        }
    });
}
export async function removeTask(taskId) {
    const db = await openDatabase();
    const transaction = db.transaction("Task", "readwrite");

    const store = transaction.objectStore("Task");

    const request = store.delete(taskId);

    request.onsuccess = function() {

    }
    request.onerror = function(event) {
        console.log("Error - -> " + event.target.result);
    }
}

export async function taskStatus(taskId, status) {
    const db = await openDatabase();
    const transaction = db.transaction("Task", "readwrite");

    const store = transaction.objectStore("Task");

    const request = store.get(taskId);

    request.onsuccess = function(event) {
        const request2= store.put({ uniqId: taskId, text: request.result.text, done: status});
    }
    request.onerror = function(event) {
        console.error("Error - -> " + event.error);
    }
}