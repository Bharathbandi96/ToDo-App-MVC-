
var localStorageArray = [];
var sessionStorageArray = [];
var myTodoItems = 'myTodoItems';
var todoItems;

function setItemToLocalStorage(){
  localStorage.setItem(myTodoItems, JSON.stringify(localStorageArray));
}

function getItemsFromLocalStorage(){
  localStorageArray = JSON.parse(localStorage.getItem(myTodoItems)) || [];
  return localStorageArray;
}

function setItemToSessionStorage(){
  sessionStorage.setItem(myTodoItems, JSON.stringify(sessionStorageArray));
}

function getItemsFromSessionStorage(){
  sessionStorageArray = JSON.parse(sessionStorage.getItem(myTodoItems)) || [];
  return sessionStorageArray;
}