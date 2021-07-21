let tasks =[]

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
  tasks = tasks.filter(task => {
    task.id == element.getAttribute('id-data')
    task.data.isDone = true
    updateScreen();
  })
}

