
var localStorageArray = [];
var sessionStorageArray = [];
var myTodoItems = 'myTodoItems';
var todoItems;

function LocalStorage(){

  function setItem(){
    localStorage.setItem(myTodoItems, JSON.stringify(localStorageArray));
  }

  function getItem(){
    localStorageArray = JSON.parse(localStorage.getItem(myTodoItems)) || [];
    return localStorageArray;
  }
}

function SessionStorage(){

  function setItem(){
    sessionStorage.setItem(myTodoItems, JSON.stringify(sessionStorageArray));
  }

  function getItem(){
    sessionStorageArray = JSON.parse(sessionStorage.getItem(myTodoItems)) || [];
    return sessionStorageArray;
  }
}