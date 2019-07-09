class TodoComponent {
    constructor(componentElement) {
        // Assign outer TodoComponent Element. We should do all of our searching within here, not `document`.
        this.componentElement = componentElement;
        // Get the todos container element
        this.todosElement = this.componentElement.querySelector('.todos-container');
        // instantiate the Todos class with it
        this.todos = new Todos(this.todosElement);
        // Do the same with form Element
        this.formElement = this.componentElement.querySelector('.todo-form');
        // I've given you a hint here. Look at the TodoForm constructor.
        this.form = new TodoForm(this.formElement, this.todos)
    }
}

class Todos {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }
    addTodo(text) {
        // Add a todo element to the container, and instantiate its class
        console.log(text)
        let todoElement = document.createElement('div');
        todoElement.className = 'todo';
        todoElement.textContent = text;
        this.containerElement.appendChild(todoElement);
        todoElement = new Todo(todoElement);
        
    }
}

class Todo {
    constructor(todoElement) {
        this.todoElement = todoElement;
        this.todoElement.addEventListener('click',() => this.toggle())
        // What do we need to add to make our element to make `this.toggle` work?
    }
    toggle() {
        // Toggle the element being 'done'
        this.todoElement.classList.toggle('done');
    }
}

class TodoForm {
    // Note the second argument, `todos`. It is an instance of the `Todos` class
    constructor(formElement, todos) {
        this.formElement = formElement;
        this.todos = todos;
        this.input = this.formElement.querySelector('input');
        this.addButton = this.formElement.querySelector('.add');
        this.addButton.addEventListener('click', () => this.submitTodo())

        // stretch - make a button clear all completed todos
        this.clearButton = this.formElement.querySelector('.clear');
        this.clearButton.addEventListener('click', () => this.clearTodo());

        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
    }

    clearTodo() {
        event.preventDefault();
        const todos = document.querySelectorAll('.todo');
        console.log(todos)
        todos.forEach(todo => {
            if(todo.classList.contains('done')){
                todo.classList.add('hide');
            }
        })
    }
    submitTodo() {
        event.preventDefault();
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
        // see 'value'. 

        // We need to actually add a todo to the page. If only we had access to
        // a class that has a member function that does just that.
        console.log(this.input.value)
        this.todos.addTodo(this.input.value);
        

    }
}

// Instantiate TodoComponent Classes
document.querySelectorAll('.todo-component')
    .forEach(todoElem => new TodoComponent(todoElem));

