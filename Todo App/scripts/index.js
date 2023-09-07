let body;
const todoListItem = [];
let isUpdating = false;
let updatingIndex;
/* 
--TODO-- 

1. count should be updated whenever you add a todo Item
2. FOrmat the date and time in human readable form DD/MM/YYYY HH:MM

// 07/09/2023
1. Update list item
2. Delete List Item
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
  const logo = headerLogo();
  const btn = createAddButton();
  const inputUser = createUserInput();
  header.append(logo, inputUser, btn);
  return header;
}
function headerLogo() {
  const div = document.createElement('div');
  div.classList.add('todo-header-logo');
  const span = document.createElement('span');
  span.classList.add('logo-text');
  span.innerText = 'Todo App'
  div.append(span);
  return div;
}
function createAddButton() {
  const addButton = document.createElement('button');
  addButton.id = 'addListItem'
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
  for(let i = 0; i < todoListItem.length; i++) {
    const li = document.createElement('li');
    li.classList.add('todo-list-item')
    li.append(createListItemContent(todoListItem[i], i));
    ul.append(li);
  }
  return ul;

}
function createListItemContent(item, index) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('list-item-wrapper');
  // div for text for todo list
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('list-text');
  contentDiv.innerText = item;
  // div for list item actions
  const actionDiv = document.createElement('div');
  actionDiv.classList.add('list-action');
  const button = document.createElement('button');
  button.classList.add('update-button');
  button.innerText = 'Update';
  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteListItem(index);
  });
  actionDiv.append(button, deleteButton);
  button.addEventListener('click', function(event){
    updateListItem(event, index)
  });
  wrapper.append(contentDiv, actionDiv);
  return wrapper
}
function updateListItem(event, index) {
  isUpdating = true;
  const currentListItem = todoListItem[index];
  const inputText = document.getElementById('todoItemInput');
  inputText.value = currentListItem;
  updatingIndex = index;
  const addButton = document.getElementById('addListItem');
  addButton.innerText = 'Update Item'
}
function deleteListItem(index) {
  // find the item on the index;
  // remove that item from the array
  // refresh body and count
  todoListItem.splice(index, 1);
  refreshBody();
  refreshCount();
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
  span.id = 'countSpan';
  span.classList.add('item-count');
  span.innerText = count;
  countDiv.append(span);
  return countDiv;
}
function displayDateAndTime() {
  const element = document.createElement('div');
  element.classList.add('todo-date');
  const span = document.createElement('span');
  span.classList.add('date-info');
  const result = formatDate();
  span.innerText = result;
  element.append(span);
  return element;
}


function addTodoListITem() {
  const inputValue = document.getElementById('todoItemInput');
  const value = inputValue.value;
  if (value) {
    if (isUpdating) {
      todoListItem[updatingIndex] = value;
      isUpdating = false;
      updatingIndex = null;
    } else {
      todoListItem.push(value);
    }
    refreshBody();
    refreshCount();
    inputValue.value = '';
  }
}
function refreshBody() {
  const ulWrap = document.getElementById('todoListWrap');
  const bdy = document.getElementById('todoBody');
  bdy.removeChild(ulWrap);
  const list = createTodoList();
  bdy.append(list);
  const addButton = document.getElementById('addListItem');
  addButton.innerText = 'Add Item'
}

function refreshCount() {
  const countspan = document.getElementById('countSpan');
  countspan.innerText = todoListItem.length;
}

function formatDate() {
  // 07/09/2023 19:46
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  const date = `${day}/${month}/${year}`;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const time = `${hours}:${minutes}`;
  const result = date + ' ' + time;
  return result;
}