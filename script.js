import {FirstData} from './data.js'
import tasks from './class.js'


if(JSON.parse(localStorage.getItem('data')) === null) {
    localStorage.setItem('data', JSON.stringify(FirstData))
}
const data = JSON.parse(localStorage.getItem('data'))


const tasksContainer = document.getElementById('tasks-container')
const addBtn = document.getElementById('add-btn')
const inputEl = document.getElementById('new-task-input')
const navTypes = document.querySelectorAll('.nav-type')
const typesContainer = document.getElementById('types-container')
const pushChangesBtn = document.getElementById('push-changes-btn')

pushChangesBtn.onclick = () => {
    
    localStorage.setItem('data', JSON.stringify(data))
}

typesContainer.addEventListener('click', (event) => {
    const type = event.target.dataset.type 
    if(type) {
        displayType(type)
    }
})

navTypes.forEach((nav) => {
    
    nav.onclick = () => {
        navTypes.forEach((nav)=> {
            nav.classList.remove('nav-active-item')
        })
        nav.classList.add('nav-active-item')
    }
})

addBtn.addEventListener('click', addData)

tasksContainer.addEventListener('click', (e) => {
    if(e.target.id) {
        if(e.target.id && e.target.dataset.action === 'update') {
            updateTask(e.target.id)
        } else if (e.target.id && e.target.dataset.action === 'delete') {
            removeTask(e.target.id)
        }
    }
})
function displayType(type) {
    if(type === 'active') {
        let html = ''
        data.forEach((data)=>{
           if(!data.completed) {
            html += `<li>
            <input id='${data.id}' ${data.completed ? 'checked' : ''} type="checkbox" aria-label="check" data-action='update'>
            ${data.content}
            <i class="fa-solid fa-trash" id='${data.id}' data-action='delete'></i>
            </li>`
           } 
    })
      if(html === '') {
        html = 'You have no active tasks'
      }
        tasksContainer.innerHTML = html
    }
    if(type === 'completed') {
        let html = ''
        data.forEach((data)=>{
           if(data.completed) {
            html += `<li>
            <input id='${data.id}' ${data.completed ? 'checked' : ''} type="checkbox" aria-label="check" data-action='update'>
            ${data.content}
            <i class="fa-solid fa-trash" id='${data.id}' data-action='delete'></i>
            </li>`
           }
    })
    if(html === '') {
        html = 'You have no completed tasks'
      }
        tasksContainer.innerHTML = html
    }

    if(type === 'all') {
        fetchData()
    }
}

function removeTask(id) {
    const taskToBeRemoved = data.find((data, index) => {
        return data.id === Number(id)
    })
    const index = data.indexOf(taskToBeRemoved)
    data.splice(index, 1)
    fetchData()
}

function updateTask(id) {
    const taskToBeUpdated = data.find((data, index) => {
        return data.id === Number(id)
    })
    const index = data.indexOf(taskToBeUpdated)

    if(taskToBeUpdated.completed) {
        taskToBeUpdated.completed = false
    } else {
        taskToBeUpdated.completed = true
    }

    data.splice(index, 1, taskToBeUpdated)
}
function addData () {
    const newContent = inputEl.value
    if(newContent === '') {
        document.getElementById('alert').textContent = "Please enter data!!"
    } else  {
        const newData = {
            id: data.length + 1,
            content: newContent,
            completed: false
        }
        data.push(newData)
        fetchData()
        inputEl.value = ''
        document.getElementById('alert').textContent = ""
    }
}

function fetchData(){
    navTypes.forEach((nav)=> {
        nav.classList.remove('nav-active-item')
    })
    document.getElementById('all-type').classList.add('nav-active-item')
    let html = ''
    data.forEach((data)=>{
            html += `<li>
            <input id='${data.id}' ${data.completed ? 'checked' : ''} type="checkbox" aria-label="check" data-action='update'>
            ${data.content}
            <i class="fa-solid fa-trash" id='${data.id}' data-action='delete'></i>
            </li>`
    })
    if(html === '') {
        html = 'You have no tasks. Add some'
    }
    tasksContainer.innerHTML = html
}
fetchData()