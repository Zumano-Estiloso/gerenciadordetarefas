class CreateTaskForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#close-btn').addEventListener('click', () => this.close());
        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-content {
                    background-color: var(--column-bg-color, #2a2a2a);
                    padding: 20px;
                    border-radius: 8px;
                    width: 400px;
                }
                input, textarea {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                }
                button {
                    background-color: var(--accent-color, #00aaff);
                    color: var(--text-color, #f0f0f0);
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                }
            </style>
            <div class="modal-overlay">
                <div class="modal-content">
                    <form>
                        <h2>Nova Tarefa</h2>
                        <input type="text" id="task-title" placeholder="Título da Tarefa" required>
                        <textarea id="task-description" placeholder="Descrição"></textarea>
                        <input type="text" id="task-assignee" placeholder="Responsável">
                        <input type="date" id="task-due-date">
                        <button type="submit">Criar Tarefa</button>
                        <button type="button" id="close-btn">Fechar</button>
                    </form>
                </div>
            </div>
        `;
    }

    handleSubmit() {
        const title = this.shadowRoot.querySelector('#task-title').value;
        const description = this.shadowRoot.querySelector('#task-description').value;
        const assignee = this.shadowRoot.querySelector('#task-assignee').value;
        const dueDate = this.shadowRoot.querySelector('#task-due-date').value;

        this.dispatchEvent(new CustomEvent('taskCreated', {
            detail: { title, description, assignee, dueDate }
        }));

        this.close();
    }

    open() {
        this.style.display = 'block';
    }

    close() {
        this.style.display = 'none';
    }
}

customElements.define('create-task-form', CreateTaskForm);
