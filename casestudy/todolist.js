const KEY_TASK_DAY = "KEY_TASK_DAY";
let listTasks = [];
let listFatals = [
    new Fatal("normal", "Bình thường"),
    new Fatal("important", "Quan trọng"),
    new Fatal("veryimportant", "Rất quan trọng"),
];
let listTasksStatus = [];
let listStatus = [
    new Status("idUnFinished", "Chưa Hoàn Thành"),
    new Status("idProcessing", "Đang Thực Hiện"),
    new Status("idComplete", "Hoàn Thành"),
];
function Task(id, name, timeStart, timeEnd, fatalMode, status) {
    this.id = id;
    this.name = name;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.fatalMode = fatalMode;
    this.status = status;
}
function Fatal(value, text) {
    this.value = value;
    this.text = text;
}
function Status(value, text) {
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
function initTasks() {
    if (getLocalStorage(KEY_TASK_DAY) == null) {
        listTasks = [];
        setLocalStorage(KEY_TASK_DAY, listTasks)
    } else {
        listTasks = getLocalStorage(KEY_TASK_DAY)
    }
    showTasks();

}
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}



function deleteTask(id) {
    let confirmed = window.confirm("Bạn có muốn xóa công việc này?")
    if (confirmed) {
        listTasks = listTasks.filter(function (task) {
            return task.id != id;
        })
        setLocalStorage(KEY_TASK_DAY, listTasks)

        document.querySelector(`#li_${id}`).remove();
        showTasks(listTasks);
    }

}

function showCreateOrEdit(id) {
    // B0: Tim den nut btnEdit TAT thuoc tinh hidden, tim den nut btnCreate BAT thuoc tinh hidden
    // B1: Tim den cac element va lay gia tri cua element do
    // B2: Tim den cac element o tren form va cap nhat gia tri
    // B2: 
    //     btnUpdate
    document.getElementById("btnUpdate").hidden = false;
    document.getElementById("btnCreate").hidden = true;
    document.getElementById("idTextUpdate").value = id;

    let task = listTasks.find(
        function (task) {
            if (task.id == id) {
                return true;
            }
        }
    )




    document.getElementById("content").value = task.name;
    document.getElementById("idTimeStart").value = task.timeStart;
    document.getElementById("idTimeEnd").value = task.timeEnd;


}

function updateToDo() {
    let id = document.getElementById("idTextUpdate").value;

    let eleNameToDoValue = document.getElementById("content").value;
    let eleTimeStartToDoValue = document.getElementById("idTimeStart").value;
    let eleTimeEndToDoValue = document.getElementById("idTimeEnd").value;
    let eleSecFatalModeValue = document.getElementById("idFatalMode").value;
    let eleSecStatusValue = document.getElementById("idStatus").value

    if (checkTimeValid(eleTimeStartToDoValue, eleTimeEndToDoValue) == false) {
        alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu");
    }else{
        if (eleNameToDoValue != "") {
            let indexTaskId = listTasks.findIndex(
                function (task) {
                    if (task.id == id) {
                        return true;
                    }
                }
            )
            listTasks[indexTaskId].name = eleNameToDoValue;
            listTasks[indexTaskId].timeStart = eleTimeStartToDoValue;
            listTasks[indexTaskId].timeEnd = eleTimeEndToDoValue;
            listTasks[indexTaskId].fatalMode = eleSecFatalModeValue;
            listTasks[indexTaskId].status = eleSecStatusValue;
    
            showTasks();
            setLocalStorage(KEY_TASK_DAY, listTasks);
    
            document.getElementById("btnUpdate").hidden = true;
            document.getElementById("btnCreate").hidden = false;
            document.getElementById("idTextUpdate").value = "";
            document.getElementById("content").value = "";
            document.getElementById("idTimeStart").value = "";
            document.getElementById("idTimeEnd").value = "";
        } else {
            alert("Vui lòng nhập tên công việc!")
        }
    }
    

}


function saveToDo() {
    let eleNameToDoValue = document.getElementById("content").value;
    let eleTimeStartToDoValue = document.getElementById("idTimeStart").value;
    let eleTimeEndToDoValue = document.getElementById("idTimeEnd").value;
    let eleSecFatalModeValue = document.getElementById("idFatalMode").value;
    let eleSecStatusValue = document.getElementById("idStatus").value


    if (checkTimeValid(eleTimeStartToDoValue, eleTimeEndToDoValue) == false) {
        alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu");
    }else{
        if (eleNameToDoValue != "") {
            let index = listTasks.length;
            let task = new Task(index, eleNameToDoValue, eleTimeStartToDoValue, eleTimeEndToDoValue, eleSecFatalModeValue, eleSecStatusValue);
            listTasks.push(task);
            showTasks();
            setLocalStorage(KEY_TASK_DAY, listTasks);
            document.getElementById("content").value = "";
            document.getElementById("idTimeStart").value = "";
            document.getElementById("idTimeEnd").value = "";
        } else {
            alert("Vui lòng nhập tên công việc!")
        }
    }
    




}
function checkTimeValid(str1, str2) {
    // str1: 10:22, str2: 10:31 => Tra ve true
    // str1: 10:31, str2: 10:22 => Tra ve false

    //Date.parse('01/01/2011 10:22') > Date.parse('01/01/2011 10:21')
    let date1 = "01/01/2011 " + str1;
    let date2 = "01/01/2011 " + str2;
    if ((Date.parse(date1) > Date.parse(date2)) == true) {
        return false;
    } else {
        return true;
    }

}
function showTasks() {
    let content = "<ol style='padding-inline-start: 0px;'>";
    listTasks.forEach((task, index) => {
        let sOption = showFatalMod(task.fatalMode, task.id);
        let secStatus = showStatus(task.status);
        content += `<li id='li_${task.id}'>
                    <label>${index + 1}.</label>
                    <label style="width: 500px">${task.name}</label>
                    ${sOption}
                    <input type = "time" value = "${task.timeStart}" style="width: 70px;" disabled/>
                    <input type = "time" value = "${task.timeEnd}" style="width: 70px;" disabled/>
                    ${secStatus}
                    <a href="#" onclick="showCreateOrEdit(${task.id})">Sửa</a>
                    <a href="#" onclick="deleteTask(${task.id})">Xóa</a>
                </li>`

    })
    content += '</ol>'
    document.querySelector('#result').innerHTML = content
}
function showFatalMod(value, id) {
    console.log(value);
    let _str = `<select id="idSelectFatal${id}" disabled name="" value = "${value}" >`;
    for (let i = 0; i < listFatals.length; i++) {
        _str += "<option value=" + listFatals[i].value;
        if (listFatals[i].value == value) {
            _str += " selected ='selected' ";
        }
        _str += ">";
        _str += listFatals[i].text + "</option>";
    }
    _str += "</select>"
    return _str

}

function showStatus(value) {
    console.log(value);
    let _str = `<select disabled name="" value = "${value}" >`;
    for (let i = 0; i < listStatus.length; i++) {
        _str += "<option value=" + listStatus[i].value;
        if (listStatus[i].value == value) {
            _str += " selected ='selected' ";
        }
        _str += ">";
        _str += listStatus[i].text + "</option>";
    }
    _str += "</select>"
    return _str

}
