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