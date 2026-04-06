class TaskColumn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupDragAndDrop();
    }

    render() {
        const title = this.getAttribute('title') || 'Column';
        this.shadowRoot.innerHTML = `
            <style>
                .task-column {
                    background-color: var(--column-bg-color, #2a2a2a);
                    border-radius: 8px;
                    padding: 15px;
                    height: 100%;
                }
                h3 {
                    margin-top: 0;
                    border-bottom: 1px solid var(--accent-color, #00aaff);
                    padding-bottom: 10px;
                }
                .tasks {
                    min-height: 100px;
                }
            </style>
            <div class="task-column">
                <h3>${title}</h3>
                <div class="tasks">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    setupDragAndDrop() {
        const column = this.shadowRoot.querySelector('.task-column');
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text/plain');
            const taskElement = document.getElementById(taskId);
            if (taskElement) {
                this.querySelector('.tasks').appendChild(taskElement);
            }
        });
    }
}

customElements.define('task-column', TaskColumn);
