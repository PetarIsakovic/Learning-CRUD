const allTasks = document.getElementById("allTasks");
const takeInTask = document.getElementById("takeInTask");
const addTaskForm = document.getElementById("addTaskForm");
const popUp = document.getElementById("popUp");
const updatedText = document.getElementById("updatedText");
const innerPopUp = document.getElementById("innerPopUp");
const error = document.getElementById("error");

async function displayTasks(){
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    for(let i = 0; i < data.length; i++){
        const newTask = document.createElement("div");
        const newButton = document.createElement("button");
        newButton.className = "deleteButton";

        newButton.addEventListener("click", function(e){
            //stopping bubbling
            e.stopPropagation();
            deleteTask(data[i].id);
        });
        newTask.addEventListener("click", function(){
            popUp.style.display = 'flex';
            updatedText.value = data[i].task;
            innerPopUp.addEventListener("submit", function(e){
                e.preventDefault();
                let task = {
                    "task": updatedText.value,
                    "id": data[i].id
                };
                replace(task, data[i].id);
            });
        });

        newTask.innerHTML = data[i].task;
        newTask.className = "newTask";
        newButton.innerHTML = "X"
        newTask.appendChild(newButton);
        allTasks.appendChild(newTask);
    }
}

async function create(task){
    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

async function deleteTask(id){
    const response = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE"
    })
}

async function main(){
    displayTasks();
   
    addTaskForm.addEventListener("submit", function(e){
        e.preventDefault();
        if(takeInTask.value != ""){
            let task = {
                "task": takeInTask.value
            };
            create(task);
        }
        else{
            error.style.display = "block";
        }
    });
}

async function replace(task, id){
    const response = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

main();