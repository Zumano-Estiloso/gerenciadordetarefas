import './components/TaskCard.js';
import './components/TaskColumn.js';
import './components/CreateTaskForm.js';
import './components/EditTaskForm.js';
import './components/LimitWarning.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskBoard = document.getElementById('task-board');
    const addTaskBtn = document.getElementById('add-task-btn');
    let taskCount = 0;

    const columns = [
        { title: 'A Fazer', id: 'todo' },
        { title: 'Em Progresso', id: 'in-progress' },
        { title: 'Concluído', id: 'done' }
    ];

    columns.forEach(column => {
        const taskColumn = document.createElement('task-column');
        taskColumn.setAttribute('title', column.title);
        taskColumn.id = column.id;
        taskBoard.appendChild(taskColumn);
    });

    const createTaskForm = document.createElement('create-task-form');
    document.body.appendChild(createTaskForm);
    createTaskForm.style.display = 'none';

    const editTaskForm = document.createElement('edit-task-form');
    document.body.appendChild(editTaskForm);
    editTaskForm.style.display = 'none';

    const limitWarning = document.createElement('limit-warning');
    document.body.appendChild(limitWarning);
    limitWarning.style.display = 'none';

    addTaskBtn.addEventListener('click', () => {
        if (taskCount >= 10) {
            limitWarning.open();
            return;
        }
        createTaskForm.open();
    });

    createTaskForm.addEventListener('taskCreated', (e) => {
        const { title, description, assignee, dueDate } = e.detail;
        const taskCard = document.createElement('task-card');
        taskCard.id = `task-${Date.now()}`;
        taskCard.setAttribute('title', title);
        taskCard.setAttribute('description', description);
        taskCard.setAttribute('assignee', assignee);
        taskCard.setAttribute('due-date', dueDate);

        const todoColumn = document.getElementById('todo');
        todoColumn.appendChild(taskCard);
        taskCount++;

        taskCard.addEventListener('editTask', (e) => {
            const task = document.getElementById(e.detail.taskId);
            editTaskForm.open(task);
        });
    });

    editTaskForm.addEventListener('taskUpdated', (e) => {
        const { taskId, title, description, assignee, dueDate, status } = e.detail;
        const taskCard = document.getElementById(taskId);

        taskCard.setAttribute('title', title);
        taskCard.setAttribute('description', description);
        taskCard.setAttribute('assignee', assignee);
        taskCard.setAttribute('due-date', dueDate);

        const newColumn = document.getElementById(status);
        if (newColumn !== taskCard.parentElement) {
            newColumn.appendChild(taskCard);
        }
        // Re-render the card to reflect changes
        taskCard.render();
    });
});
