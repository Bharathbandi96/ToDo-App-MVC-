
function addItemToLocalStorage(){
  localStorage.setItem(myTodoItems, JSON.stringify(localStorageArray));
}

function renderItemsFromLocalStorage(){
  var todoItems = localStorage.getItem(myTodoItems);
  if(todoItems!=null){
    localStorageArray = JSON.parse(todoItems);
  }
  return localStorageArray;
}

function addItemToSessionStorage(){
  sessionStorage.setItem(myTodoItems, JSON.stringify(sessionStorageArray));
}

function renderItemsFromSessionStorage(){
  var todoItems = sessionStorage.getItem(myTodoItems);
  if(todoItems!=null){
    sessionStorageArray = JSON.parse(todoItems);
  }
  return sessionStorageArray;
}