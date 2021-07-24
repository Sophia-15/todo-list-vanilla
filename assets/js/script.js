const Storage = {
  saveData() {
    localStorage.setItem('todo-item', JSON.stringify(tasks))
  },
  getData() {
    return  JSON.parse(localStorage.getItem('todo-item')) || []
  }

}

let tasks = Storage.getData()


function createId() {
  let timestamp = new Date()

  let id = timestamp.getHours().toString() +
  timestamp.getMinutes().toString() +
  timestamp.getSeconds().toString() +
  timestamp.getMilliseconds().toString()

  return id
}

function createTask() {
  let newTask = document.querySelector('input').value
  if (!newTask.match(/^(\s)+$/) && newTask != '') {
    let task = {
      id: createId(),
      data: {
        description: newTask,
        isDone: false
      }
    }
  
    tasks.push(task)
    addTask(task)
    Storage.saveData()
  } else {
    alert('This field cannot be blank!')
  }
}

function render() {
  let list = '<ul>'

  tasks.forEach(task => {
    list += `
    <li id-data=${task.id} isDone=${task.data.isDone} class="animation-list">
    
    ${task.data.description}
    <div class="list-options">
      <img src="assets/img/undone.svg" alt="Mark as done" onclick="taskDoneAndUndone(this)" class="checkmark" id-data=${task.id}> 

      <img src="assets/img/trash.svg" alt="Delete" onclick="deleteTask(this)" id-data=${task.id}>
    </div>
    </li>`
  })

  list += '</ul>'

  document.querySelector('.todo-list').innerHTML = list
  document.querySelector('input').value = ''
}

function addTask(task) {
  let list = '<ul>'
    
  list += `
  <li id-data=${task.id} isDone=${task.data.isDone} class="animation-list">
  
  ${task.data.description}
  <div class="list-options">
    <img src="assets/img/undone.svg" alt="Mark as done" onclick="taskDoneAndUndone(this)" class="checkmark" id-data=${task.id}> 

    <img src="assets/img/trash.svg" alt="Delete" onclick="deleteTask(this)" id-data=${task.id}>
  </div>
  </li>`

  list += '</ul>'

  const node = new DOMParser().parseFromString(list, 'text/html').body.firstElementChild

document.querySelector('.todo-list').appendChild(node)
document.querySelector('input').value = ''
}


function deleteTask(element) {
  console.log(element)
  const target = document.querySelector(`li[id-data="${element.getAttribute('id-data')}"]`)
 

  tasks = tasks.filter(task => task.id != element.getAttribute('id-data'))

  const actualIndex = tasks.findIndex(task => task.id == element.getAttribute('id-data'))
  const existInLocalStorage = actualIndex != -1
  if(existInLocalStorage){
    tasks.splice(actualIndex, 1)
  }


  Storage.saveData()
  target.remove()
}

function taskDoneAndUndone(element) {
  const target = document.querySelector(`li[id-data="${element.getAttribute('id-data')}"]`)
  console.log(target)
  const targetImg = document.querySelector(`img[id-data="${element.getAttribute('id-data')}"]`)

  const actualTask = tasks.find(task => task.id ==   element.getAttribute('id-data'))
  const actualIndex = tasks.findIndex(task => task.id == element.getAttribute('id-data'))
  if (actualTask.data.isDone == false){
    actualTask.data.isDone = true    
    tasks[actualIndex] = actualTask
    Storage.saveData()
    target.setAttribute('isdone', 'true')
    targetImg.setAttribute('src', 'assets/img/check.svg')
  }else {
    actualTask.data.isDone = false
    tasks[actualIndex] = actualTask
    Storage.saveData()
    target.setAttribute('isdone', 'false')
    targetImg.setAttribute('src', 'assets/img/undone.svg')
  }
}

window.onload = render()




