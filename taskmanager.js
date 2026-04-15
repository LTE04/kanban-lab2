// Store all tasks
let tasks = [];
let currentId = 0;
let currentColumn = null;
let editingTaskId = null;

// DOM Elements
const modal = document.getElementById('task-modal');
const saveBtn = document.getElementById('save-task');
const cancelBtn = document.getElementById('cancel-task');
const addButtons = document.querySelectorAll('.add-btn');
const taskCount = document.getElementById('task-count');

// Open modal
addButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        modal.classList.remove('hidden');
        currentColumn = btn.getAttribute('data-column');
    });
});

// Close modal
cancelBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
});

// create task objek and save
saveBtn.addEventListener('click', function () {

    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const priority = document.getElementById('task-priority').value;
    const date = document.getElementById('task-date').value;

    if (!title) return;

    const task = {
        id: currentId++,
        title: title,
        description: desc,
        priority: priority,
        date: date,
        column: currentColumn
    };

    tasks.push(task);

    addTask(currentColumn, task);

    modal.classList.add('hidden');
});

//create taskCard
function createTaskCard(task) {

    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.classList.add('task-card');

    const title = document.createElement('span');
    title.textContent = task.title;
    li.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = task.description;
    li.appendChild(desc);

    const prio = document.createElement('span');
    prio.textContent = "Priority: " + task.priority;
    li.appendChild(prio);

    const date = document.createElement('p');
    date.textContent = task.date;
    li.appendChild(date);

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.setAttribute('data-action', 'edit');
    editBtn.setAttribute('data-id', task.id);
    li.appendChild(editBtn);

    // Delete Button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.setAttribute('data-action', 'delete');
    delBtn.setAttribute('data-id', task.id);
    li.appendChild(delBtn);

    return li;
}