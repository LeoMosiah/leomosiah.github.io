function renderListOfTodo(list = []) {
    const todoList = document.getElementById("todoList");
    const todosLeft = document.getElementById("todosLeft")
    todosLeft.innerHTML = `${list.filter(elem => !elem.completed).length} tasks left`
    todoList.innerHTML = ""
    list.forEach((todo) => {
        todoList.appendChild(createTodoElement(todo))
    })
}

function onLoad () {
    const list = getItemFromLocalStorage("todoList") || []
    renderListOfTodo(list.sort(byAscendingId))
}

function onEnterPressed(event) {
    if (event.keyCode === "Enter" || event.keyCode === 13) {
        addTodo()
    }
}

function addTodo() {
    const list = getItemFromLocalStorage("todoList") || []
    const todoList = document.getElementById("todoList");
    const todoEntryInput = document.getElementById("todoEntry");
    const { value } = todoEntryInput;
    if (value && value.trim() !== "") {
        const todo = saveTodo(value)
        todoList.appendChild(createTodoElement(todo));
        const todosLeft = document.getElementById("todosLeft")
        todosLeft.innerHTML = `${list.filter(elem => !elem.completed).length + 1} tasks left`
        todoEntryInput.value = '';
    }
}

function createTodoElement({content, id, completed }) {
    const listItem = document.createElement("div");
    listItem.id  = id
    const todoContent = document.createElement("div")
    todoContent.setAttribute("class", "todo")
    const checkbox = document.createElement('div')
    checkbox.setAttribute("class", "checkbox")
    checkbox.onclick = function () {
        listItem.setAttribute("class", "completed")
        const todoList = getItemFromLocalStorage("todoList")
        const newTodo = {
            content,
            id,
            completed: true
        }
        addItemToLocalStorage("todoList", JSON.stringify(todoList.filter(element => element.id !== id).concat(newTodo)))
        const todosLeft = document.getElementById("todosLeft")
        todosLeft.innerHTML = `${todoList.filter(elem => !elem.completed).length -1} tasks left`
        checkbox.innerHTML = "X"
    }
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "X"
    deleteButton.onclick = function () {
        const todoList = getItemFromLocalStorage("todoList")
        addItemToLocalStorage("todoList", JSON.stringify(todoList.filter(todo => todo.id !== id)))
        listItem.parentNode.removeChild(listItem)
    }
    const entry = document.createElement("span")
    if (completed) {
        listItem.setAttribute("class", "completed")
        checkbox.innerHTML = "X"
    }
    entry.innerHTML = content;
    todoContent.appendChild(checkbox)
    todoContent.appendChild(entry)
    todoContent.appendChild(deleteButton)
    listItem.appendChild(todoContent)
    return  listItem;
}

function saveTodo (content) {
    const id = Date.now()
    const todoList = getItemFromLocalStorage("todoList")
    const todo = {
        id,
        content,
        completed: false
    }
    if (!todoList) {
        addItemToLocalStorage("todoList", JSON.stringify([todo]))
        return todo
    }
    addItemToLocalStorage("todoList", JSON.stringify([...todoList, todo]))
    return todo
}

function filterCompleted() {
    const list = getItemFromLocalStorage("todoList") || []
    renderListOfTodo(list.filter(element => element.completed))

}

function filterIncomplete() {
    const list = getItemFromLocalStorage("todoList") || []
    renderListOfTodo(list.filter(element => !element.completed))
}

function byAscendingId(a, b) {
    return a.id - b.id
}