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