// <script src = 'controller.js'></script>

function addItemToLocalStorage(){
  if(selectedStorage == 'LocalStorage'){
  localStorage.setItem('myTodoItems', JSON.stringify(todos));
  }
  else if(selectedStorage == 'SessionStorage'){
    sessionStorage.setItem('myTodoItems', JSON.stringify(todos));
  }
}

function renderItemsFromLocalStorage(){
  var todoItems = localStorage.getItem('myTodoItems');
  if(todoItems!=null){
  todos = JSON.parse(todoItems);
  }
  return todos;
}
