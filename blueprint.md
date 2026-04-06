# Visão Geral do Projeto

Este projeto é um Sistema de Gerenciamento de Tarefas projetado para Equipes Remotas. O objetivo é fornecer uma interface visual e intuitiva para que as equipes possam criar, atribuir e acompanhar o progresso das tarefas em um fluxo de trabalho claro. A aplicação será construída como um aplicativo de página única (SPA) usando tecnologias web padrão (HTML, CSS e JavaScript), sem depender de frameworks externos.

## Plano de Implementação

O desenvolvimento seguirá uma abordagem baseada em componentes, aproveitando os Web Components para criar elementos de UI reutilizáveis e encapsulados.

### Estrutura de Arquivos

```
/
|-- index.html        # Ponto de entrada principal da aplicação
|-- style.css         # Folha de estilos principal
|-- main.js           # Lógica principal da aplicação e registro dos componentes
|-- blueprint.md      # Documentação do projeto e plano
/components/
  |-- TaskCard.js       # Componente para exibir um único cartão de tarefa
  |-- TaskColumn.js     # Componente para a coluna da "lista de tarefas" (ex: A Fazer, Em Progresso)
  |-- CreateTaskForm.js # Componente para o formulário de criação de nova tarefa
  |-- EditTaskForm.js   # Componente para o formulário de edição de tarefa
  |-- LimitWarning.js   # Componente para o pop-up de aviso de limite de tarefas
```

### Design e Estilo

- **Tema:** Um tema escuro e moderno para reduzir a fadiga ocular e proporcionar uma aparência profissional.
- **Layout:** Um layout de quadro Kanban com colunas que representam os diferentes estágios do fluxo de trabalho (A Fazer, Em Progresso, Concluído).
- **Componentes Visuais:**
    - **Cartões de Tarefa:** Efeito "levantado" com sombras profundas para se destacarem do fundo.
    - **Interatividade:** Efeitos de "brilho" sutis em elementos interativos como botões e ao arrastar cartões.
    - **Tipografia:** Hierarquia de fontes clara para títulos, descrições e outros textos.
- **Responsividade:** O layout se adaptará a diferentes tamanhos de tela, garantindo a usabilidade em desktops e dispositivos móveis.

### Funcionalidades

1.  **Visualização de Tarefas:** As tarefas serão exibidas em suas respectivas colunas de status.
2.  **Criação de Tarefas:** Um formulário modal permitirá aos usuários adicionar novas tarefas com título, descrição, responsável e prazo.
3.  **Limite de Tarefas:** O sistema permitirá um máximo de 10 tarefas no total. Um pop-up personalizado será exibido ao atingir o limite.
4.  **Mover e Editar Tarefas:** Os usuários poderão editar os detalhes de uma tarefa e movê-la entre as colunas.
5.  **Persistência de Dados:** (Futura) Os dados das tarefas serão armazenados no `localStorage` do navegador para persistir entre as sessões.

## Passos para a Versão Atual

1.  **Componente `LimitWarning`:** Criar um novo Web Component para exibir um pop-up de aviso.
2.  **Integrar o Pop-up:** No `main.js`, substituir o `alert()` pelo novo componente de pop-up quando o limite de tarefas for atingido.
