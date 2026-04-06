class LimitWarning extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#close-btn').addEventListener('click', () => this.close());
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
                    width: 300px;
                    text-align: center;
                }
                button {
                    background-color: var(--accent-color, #00aaff);
                    color: var(--text-color, #f0f0f0);
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 15px;
                }
            </style>
            <div class="modal-overlay">
                <div class="modal-content">
                    <p>Você atingiu o limite de 10 tarefas.</p>
                    <button id="close-btn">Entendi</button>
                </div>
            </div>
        `;
    }

    open() {
        this.style.display = 'block';
    }

    close() {
        this.style.display = 'none';
    }
}

customElements.define('limit-warning', LimitWarning);
