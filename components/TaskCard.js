class TaskCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Untitled';
        const description = this.getAttribute('description') || '';
        const assignee = this.getAttribute('assignee') || 'Unassigned';
        const dueDate = this.getAttribute('due-date') || 'No due date';

        this.shadowRoot.innerHTML = `
            <style>
                .task-card {
                    background-color: var(--card-bg-color, #3a3a3a);
                    border-radius: 8px;
                    padding: 15px;
                    box-shadow: var(--card-shadow, 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23));
                    cursor: grab;
                }
                h4 {
                    margin: 0 0 10px 0;
                }
                p {
                    margin: 0 0 15px 0;
                    font-size: 0.9rem;
                }
                .details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .assignee, .due-date {
                    font-size: 0.8rem;
                    color: #ccc;
                }
                .edit-btn {
                    background: none;
                    border: none;
                    color: var(--accent-color, #00aaff);
                    cursor: pointer;
                }
            </style>
            <div class="task-card" draggable="true">
                <h4>${title}</h4>
                <p>${description}</p>
                <div class="details">
                    <div>
                        <span class="assignee">${assignee}</span>
                        <span class="due-date">${dueDate}</span>
                    </div>
                    <button class="edit-btn">Editar</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.task-card').addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', this.id);
            e.dataTransfer.effectAllowed = 'move';
        });

        this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('editTask', { detail: { taskId: this.id } }));
        });
    }
}

customElements.define('task-card', TaskCard);
