const inputTodo = document.getElementById('todo');
const addTodo = document.querySelector('.icon-add');
const resultTodo = document.querySelector('.row.result');
const message = document.querySelector('.message');

let dataTodo = [];

window.onload = function () {
  if (localStorage.getItem('todoList') != null) {
    dataTodo = JSON.parse(localStorage.getItem('todoList'));
    display();
  }
};

function display() {
  let list = '';
  for ([i, data] of dataTodo.entries()) {
    list += `
        <div class="text col-12 mb-2 d-flex justify-content-between">
          <p class="text-capitalize">${data.activities}</p>
          <i class="fas fa-trash-alt" onclick="removeTodo(${i}, this)"></i>
        </div> 
    `;
  }
  resultTodo.innerHTML = list;
}

addTodo.addEventListener('click', () => {
  if (!inputTodo.value) {
    message.innerHTML = `<div><p class="text-danger">Input your activities</p></div>`;
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
  } else {
    const createDataTodo = {
      activities: inputTodo.value,
      create: Date.now(),
    };
    dataTodo.push(createDataTodo);
    localStorage.setItem('todoList', JSON.stringify(dataTodo));
    display();
  }
});

function removeTodo(i, el) {
  dataTodo.splice(i, 1);
  el.parentElement.remove();
  localStorage.setItem('todoList', JSON.stringify(dataTodo));
  display();
}
