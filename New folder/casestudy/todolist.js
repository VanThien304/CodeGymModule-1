const KEY_TASK_DAY = "KEY_TASK_DAY";
let listTasks = [];
let listFatals = [
    new Fatal("normal", "Bình thường"),
    new Fatal("important", "Quan trọng"),
    new Fatal("veryimportant", "Rất quan trọng"),
];
let listTasksStatus = [];
let listStatus = [
    new Status("idUnFinished","Chưa Hoàn Thành"),
    new Status("idProcessing","Đang Thực Hiện"),
    new Status("idComplete","Hoàn Thành"),
];
function Task(id, name,timeStart,timeEnd,fatalMode, status) {
    this.id = id;
    this.name = name;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.fatalMode = fatalMode;
    this.status = status;
}
function Fatal(value, text){
    this.value = value;
    this.text = text;
}
function Status(value, text){
    this.value = value;
    this.text = text;
}
let btnAddTaskEl = document.querySelector('button')
let inputTime = document.querySelector('time')
let secFatalMode = document.querySelector('value')
let taskNameEl = document.querySelector('#content')
let secStatus = document.querySelector('value')

/**
 * Khoi tao ban dau
 */
function initTasks(){
    if(getLocalStorage(KEY_TASK_DAY) == null){
        listTasks = [];
        setLocalStorage(KEY_TASK_DAY, listTasks)
    }else{
        listTasks = getLocalStorage(KEY_TASK_DAY)
    }
    showTasks();

}
function setLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}



function deleteTask(id){
    let confirmed = window.confirm("Bạn có muốn xóa công việc này?")
    if(confirmed){
        listTasks = listTasks.filter(function(task){
            return task.id != id;
        })
        setLocalStorage(KEY_TASK_DAY, listTasks)
       
        document.querySelector(`#li_${id}`).remove();
        showTasks(listTasks);
        // những task mới thêm vào thì k xóa đc
    }
    
}
function createOrEdit(id){
    
    document.getElementById("content").value = vIdTextTask;
    if(id==-1){
        saveToDo();
        document.getElementById("btnCreateOrEdit").innerHTML = "SAVE";
    }else{
        updateToDo();
        document.getElementById("btnCreateOrEdit").innerHTML = "UPDATE";
    }
}
function showCreateOrEdit(id){
    // B0: Tim den nut btnEdit TAT thuoc tinh hidden, tim den nut btnCreate BAT thuoc tinh hidden
    // B1: Tim den cac element va lay gia tri cua element do
    // B2: Tim den cac element o tren form va cap nhat gia tri
    // B2: 
    //     
    let vIdTextTask = document.getElementById(`idTextTask${id}`).value;
    let vIdSelectTask = document.getElementById(`idSelectFatal${id}`).value;
    let vIDTimeStartTask = document.getElementById(`idSelectFatal${id}`).value;



}

function updateToDo(id){
    let eleNameToDoValue = document.getElementById("content").value;
    let eleTimeStartToDoValue = document.getElementById("idTimeStart").value;
    let eleTimeEndToDoValue = document.getElementById("idTimeEnd").value;
    let eleSecFatalModeValue = document.getElementById("idFatalMode").value;
    let eleSecStatusValue = document.getElementById("idStatus").value
    
    let indexTaskId =  listTasks.findIndex(
        function(task){
            if(task.id==id){
                return true;
            }
        }
    )
    listTasks[indexTaskId].name = eleNameToDoValue;

    showTasks();
    setLocalStorage(KEY_TASK_DAY, listTasks);
}


function saveToDo() {
    let eleNameToDoValue = document.getElementById("content").value;
    let eleTimeStartToDoValue = document.getElementById("idTimeStart").value;
    let eleTimeEndToDoValue = document.getElementById("idTimeEnd").value;
    let eleSecFatalModeValue = document.getElementById("idFatalMode").value;
    let eleSecStatusValue = document.getElementById("idStatus").value
    

    let index = listTasks.length;
    let task = new Task(index,eleNameToDoValue,eleTimeStartToDoValue,eleTimeEndToDoValue,eleSecFatalModeValue,eleSecStatusValue);
    listTasks.push(task);
    showTasks();
    setLocalStorage(KEY_TASK_DAY, listTasks);
}
function showTasks() {
    let content = "<ol>";
    listTasks.forEach((task, index) => {
        let sOption = showFatalMod(task.fatalMode, task.id);
        let secStatus = showStatus(task.status);
        content += `<li id='li_${task.id}'>
                    <div class="task-name"><input id="idTextTask${task.id}" disabled type="text" value="${index + 1}. ${task.name}" /></div>
                    ${sOption}
                    <input type = "time" value = "${task.timeStart}" style="width: 300px;" disabled/>
                    <input type = "time" value = "${task.timeEnd}" style="width: 300px;" disabled/>
                    ${secStatus}
                    <a href="#" onclick="createOrEdit(${index})">Sửa</a>
                    <a href="#" onclick="deleteTask(${index})">Xóa</a>
                </li>`

    })
    content += '</ol>'
    document.querySelector('#result').innerHTML = content
}
function showFatalMod(value, id){
    console.log(value);
    let _str = `<select id="idSelectFatal${id}" disabled name="" value = "${value}" >`;
    for(let i = 0;i<listFatals.length;i++){
        _str += "<option value=" + listFatals[i].value ;
        if(listFatals[i].value==value){
            _str += " selected ='selected' ";
        }
        _str += ">";
        _str += listFatals[i].text + "</option>";
    }
    _str += "</select>"
    return _str

}

function showStatus(value){
    console.log(value);
    let _str = `<select disabled name="" value = "${value}" >`;
    for(let i = 0;i<listStatus.length;i++){
        _str += "<option value=" + listStatus[i].value ;
        if(listStatus[i].value==value){
            _str += " selected ='selected' ";
        }
        _str += ">";
        _str += listStatus[i].text + "</option>";
    }
    _str += "</select>"
    return _str

}
