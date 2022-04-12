
// const date = new Date();
// const months = date.getMonth();

// console.log(month)
let btnAddTaskEl = document.querySelector('button')
let taskNameEl = document.querySelector('#content')

let tasks = getTaskFromLocalStorage()
renderTasks(tasks)


btnAddTaskEl.addEventListener('click',function(){
    if(!taskNameEl.value){
    alert('Vui lòng nhập tên công việc');
    return false
}
let taskId = this.getAttribute('id')
let tasks = getTaskFromLocalStorage()
let task = {name: taskNameEl.value}

        if(taskId==0 || taskId){
            tasks[taskId] = task
            this.removeAttribute('id')
        }else{
            tasks.push(task)
        }
        taskNameEl.value = '';


// let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
// tasks.push({name: taskNameEl.value})
taskNameEl.value = ''
localStorage.setItem('tasks',JSON.stringify(tasks))
renderTasks(tasks)
})

function editTask(id){
    let tasks = getTaskFromLocalStorage()
    if(tasks.length > 0){
        taskNameEl.value = tasks[id].name
        btnAddTaskEl.setAttribute('id', id)
    }

}
function deleteTask(id){
    if (confirm('Bạn có thật sự muốn xóa?')){
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id,1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }

}
function renderTasks(tasks=[]){
    let content = '<ol>'
    tasks.forEach((task,index) => {
        content +=`<li>
                    <div class="task-name">${task.name}</div>
                    <a href="#" onclick="editTask(${index})">Sửa</a>
                    <a href="#" onclick="deleteTask(${index})">Xóa</a>
                </li>`
        
    })
    content += '</ol>'
    document.querySelector('#result').innerHTML = content
}
function getTaskFromLocalStorage(){
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}  