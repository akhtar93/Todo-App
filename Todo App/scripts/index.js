let body;
const todoListItem = [];
/* 
--TODO-- 

1. count should be updated whenever you add a todo Item
2. FOrmat the date and time in human readable form DD/MM/YYYY HH:MM
*/
document.addEventListener('DOMContentLoaded', onDomLoaded);
function onDomLoaded() {
  body = document.querySelector('body');
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('wrapper');
  const header = createHeader();
  const todoBody = createBody();
  const footer = createFooter();
  wrapperDiv.append(header, todoBody, footer);
  body.append(wrapperDiv);
}
function createHeader() {
  const header = document.createElement('header');
  header.classList.add('todo-header');
  const btn = createAddButton();
  const inputUser = createUserInput();
  header.append(inputUser, btn);
  return header;
}
function createAddButton() {
  const addButton = document.createElement('button');
  addButton.classList.add('add-button');
  addButton.innerText = 'Add Item';
  addButton.addEventListener('click', addTodoListITem);
  return addButton;
}
function createUserInput() {
  const input = document.createElement('input');
  input.name = "todoInput";
  input.id = 'todoItemInput';
  input.classList.add('todo-input');
  input.placeholder = 'Enter todo item';
  input.value = '';
  return input;
}

function createBody() {
  const todoBody = document.createElement('div');
  todoBody.classList.add('todo-body');
  todoBody.id = 'todoBody';
  let content = createTodoList();
  todoBody.append(content);
  return todoBody;
}
function createTodoList() {
  const ul = document.createElement('ul');
  ul.id = 'todoListWrap';
  ul.classList.add('todo-list');
  for(let item of todoListItem) {
    const li = document.createElement('li');
    li.classList.add('todo-list-item')
    li.innerText = item;
    ul.append(li);
  }
  return ul;

}
function createFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('todo-footer');
  const count = displayCount();
  const date = displayDateAndTime();
  footer.append(count, date);
  return footer;
}
function displayCount() {
  const count = todoListItem.length;
  const countDiv = document.createElement('div');
  countDiv.classList.add('count-wrapper');
  const span = document.createElement('span');
  span.classList.add('item-count');
  span.innerText = count;
  countDiv.append(span);
  return countDiv;
}
function displayDateAndTime() {
  const date = new Date();
  const element = document.createElement('div');
  element.classList.add('todo-date');
  const span = document.createElement('span');
  span.classList.add('date-info');
  span.innerText = date;
  element.append(span);
  return element;
}


function addTodoListITem() {
  const inputValue = document.getElementById('todoItemInput');
  todoListItem.push(inputValue.value);
  refreshBody();
  inputValue.value = '';
}
function refreshBody() {
  const ulWrap = document.getElementById('todoListWrap');
  const bdy = document.getElementById('todoBody');
  bdy.removeChild(ulWrap);
  const list = createTodoList();
  bdy.append(list);
}