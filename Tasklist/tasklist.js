//Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event Listeners
loadEventListeners();

//Add Task Event
function loadEventListeners() {
  //DOM Load Events
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task Event (1st step)
  form.addEventListener('submit', addTask);
  //Remove Task Event
  tasklist.addEventListener('click', removeTask);
  //Clear Task Events
  clearBtn.addEventListener('click', clearTasks);
  //Filter Tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Strage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //create Text node and Append to li
    li.appendChild(document.createTextNode(task));
    //create New Link Element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></li>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    tasklist.appendChild(li);
  });
}

//Add task Function (2nd step)
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  } else {
    //Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //create Text node and Append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create New Link Element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></li>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    tasklist.appendChild(li);
    //---------------------------------------------------------
    //Store in LS
    storeTasksInLocalStroage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
  }
}

//Remove Task Function (3rd step)
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      //--------------------------------------------------------------------------------
      //Remove task from LS
      removeTaskFromStroage(e.target.parentElement.parentElement);
    }
  }
}

//remove task from Local stroage function (in Remove Task Function)---------------
function removeTaskFromStroage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//-------------------------------------------------------------------------------------

//Clear Tasks Function (4th step)
function clearTasks() {
  // tasklist.innerHTML = '';

  //Faster Way
  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }
  //---------------------------------------------------------------------------------------
  // clear from LS
  clearTaskFromLocalStroage();
}

//clear Task From Local Stroage Function (From Clear Task Function)
function clearTaskFromLocalStroage() {
  localStorage.clear();
}

//Filter Tasks Function (5th step)
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // console.log(text);
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
//--------------------------------------------------------------------------------------------
//Store tasks in local stroage function
function storeTasksInLocalStroage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
