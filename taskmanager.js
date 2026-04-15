console.log("JS loaded");
alert("JS connected!");

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

//add Task
function addTask(columnId, task) {

    const column = document.querySelector('#' + columnId + ' .task-list');

    const card = createTaskCard(task);

    column.appendChild(card);

    updateCounter();
}

//update counter
function updateCounter() {
    taskCount.textContent = tasks.length + " Tasks";
}

//detele task
function deleteTask(taskId) {

    const card = document.querySelector('[data-id="' + taskId + '"]');

    card.classList.add('fade-out');

    setTimeout(() => {
        card.remove();
        tasks = tasks.filter(t => t.id !== taskId);
        updateCounter();
    }, 500);
}

//event delegation
const lists = document.querySelectorAll('.task-list');

lists.forEach(list => {
    list.addEventListener('click', function (event) {

        const action = event.target.getAttribute('data-action');
        const id = event.target.getAttribute('data-id');

        if (!action || !id) return;

        const taskId = parseInt(id);

        if (action === 'delete') {
            deleteTask(taskId);
        }

        if (action === 'edit') {
            editTask(taskId);
        }
    });
});


//edit task
function editTask(taskId) {

    const task = tasks.find(t => t.id === taskId);

    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.description;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-date').value = task.date;

    modal.classList.remove('hidden');

    editingTaskId = taskId;
}

//update task
if (editingTaskId !== null) {

    updateTask(editingTaskId, {
        title,
        description: desc,
        priority,
        date
    });

    editingTaskId = null;
    modal.classList.add('hidden');
    return;
}

function updateTask(taskId, data) {

    const task = tasks.find(t => t.id === taskId);

    task.title = data.title;
    task.description = data.description;
    task.priority = data.priority;
    task.date = data.date;

    const card = document.querySelector('[data-id="' + taskId + '"]');

    card.children[0].textContent = data.title;
    card.children[1].textContent = data.description;
    card.children[2].textContent = "Priority: " + data.priority;
    card.children[3].textContent = data.date;
}

//inline editing
lists.forEach(list => {
    list.addEventListener('dblclick', function (event) {

        if (event.target.tagName !== 'SPAN') return;

        const span = event.target;
        const input = document.createElement('input');

        input.value = span.textContent;

        span.replaceWith(input);
        input.focus();

        function save() {
            span.textContent = input.value;
            input.replaceWith(span);
        }

        input.addEventListener('blur', save);

        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') save();
        });
    });
});

//priority filter
document.getElementById('priority-filter').addEventListener('change', function () {

    const value = this.value;

    const cards = document.querySelectorAll('.task-card');

    cards.forEach(card => {

        const text = card.children[2].textContent;

        const match = text.includes(value);

        if (value === 'all') {
            card.classList.remove('is-hidden');
        } else {
            card.classList.toggle('is-hidden', !match);
        }
    });
});

//clear done
document.getElementById('clear-done').addEventListener('click', function () {

    const doneList = document.querySelector('#done .task-list');
    const cards = doneList.querySelectorAll('.task-card');

    cards.forEach((card, index) => {

        setTimeout(() => {
            card.classList.add('fade-out');

            setTimeout(() => {
                card.remove();
            }, 500);

        }, index * 100);
    });

    tasks = tasks.filter(t => t.column !== 'done');
    updateCounter();
});