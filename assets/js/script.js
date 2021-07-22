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
  if (newTask != '') {
    let task = {
      id: createId(),
      data: {
        description: newTask,
        isDone: false
      }
    }
  
    tasks.push(task)
    
    Storage.saveData()
    updateScreen()
  }
}


function updateScreen() {
  let list = '<ul>'

  tasks.forEach(task => {
    list += `<li id-data=${task.id} isDone=${task.data.isDone} >${task.data.description}</li>`
    list += `<button onclick="deleteTask(this)" id-data=${task.id} class="remove">Excluir</button>`
    list += `<button onclick="taskDone(this)" id-data=${task.id}>Done</button>`
  })

  list += '</ul>'

  document.querySelector('.todo-list').innerHTML = list
  document.querySelector('input').value = ''
}

function deleteTask(element) {
  console.log(element)

  tasks = tasks.filter(task => task.id != element.getAttribute('id-data'))

  updateScreen();
}

function taskDone(element) {
  const actualTask = tasks.find(task => task.id ==   element.getAttribute('id-data'))
  const actualIndex = tasks.findIndex(task => task.id == element.getAttribute('id-data'))
  if (actualTask.data.isDone == false){
    actualTask.data.isDone = true
    tasks[actualIndex] = actualTask
    updateScreen()
  }else {
    actualTask.data.isDone = false
    tasks[actualIndex] = actualTask
    updateScreen()
  }
}





