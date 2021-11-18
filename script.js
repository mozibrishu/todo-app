const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".footer button");
showTasks();
inputBox.onkeyup = () => {
    let userInput = inputBox.value;
    if (userInput.trim().length != 0){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active");
    }
}

addBtn.onclick = () => {
    let userInput = inputBox.value;
    let getLocalStorage = localStorage.getItem("new todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userInput);
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTasks();
}

// showing tasklist
function showTasks(){
    let getLocalStorage = localStorage.getItem("new todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }

    if(listArr.length > 0){
        clearAllBtn.classList.add("active");
    }else{
        clearAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    const pendingTaskNum = document.querySelector(".pendingTaskNum");
    pendingTaskNum.textContent = listArr.length;
    listArr.forEach((elm,index) => {
        newLiTag += `<li> ${elm}<span onclick="deleteTask(${index})"><i class="fa fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
    addBtn.classList.remove("active");
}

// delete task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("new todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTasks();
}