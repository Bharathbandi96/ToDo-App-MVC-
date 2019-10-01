// <script src = 'controller.js'></script>

function addItemToLocalStorage(){
  localStorage.setItem('myTodoItems', JSON.stringify(todos));
}

function renderItemsFromLocalStorage(){
  var todoItems = localStorage.getItem('myTodoItems');
  if(todoItems!=null){
  todos = JSON.parse(todoItems);
  }
  return todos;
}
