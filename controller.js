// <script src = 'model.js'></script>

var close = document.getElementsByClassName("close");
var ulList = document.querySelector('ul');
var todos = [];
var all = 0;
var enterKeyCode = 13;
var onEmptyListShowMessage = 'OOPS... Your List Is Empty'
var onEmptyInputFiled = 'You must write something!'
var completedText = 'Completed tasks in your list : '
var allText = 'Total number of tasks in your list : '
var pendingText = 'Pending tasks in your list : '
var selectedStorage;

function init(){
  attachEventListners();
  displayTodoListItems();
  isEmpty();
}

function attachEventListners(){
  document.getElementById('addButton').addEventListener('click', displayNewItem,false);
  document.getElementById('myInput').addEventListener('keypress',addItemOnEnter,false);
  document.getElementById('addButton').addEventListener('click', deleteItemFromList,false);
  ulList.addEventListener('click',changeItemState,false);
  document.getElementById('completedTaskButton').addEventListener('click', displayCompletedItemsCount,false);
  document.getElementById('allTaskButton').addEventListener('click', displayTotalItemsCount,false);
  document.getElementById('pendingTaskButton').addEventListener('click', displayPendingItemsCount,false);
  //document.getElementById('selectStorage').addEventListener('onchange',changeDataStorage);
}

function changeDataStorage(){
  selectedStorage = document.getElementById("selectStorage").value;
}

function addItemOnEnter() {
  var input = document.getElementById("myInput").value;
    if (event.keyCode === enterKeyCode) {
      if (input === '') {
        alert(onEmptyInputFiled);
      } 
    else 
    {
      todos.push(input);
      addItemToLocalStorage();
      renderItemsFromLocalStorage();
      display(input);
      deleteItemFromList();
      inputFieldReset();
    }
  }
}

function displayNewItem() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert(onEmptyInputFiled);
  } else {
    todos.push(inputValue);
    addItemToLocalStorage();
    renderItemsFromLocalStorage();
    display(inputValue);
    isEmpty();
  }
  inputFieldReset();
}

function inputFieldReset(){
  document.getElementById("myInput").value = "";
  document.getElementById('myInput').focus();
}

function isEmpty(){
  var hasItems = document.getElementById("displayArea").hasChildNodes();
  if(!hasItems){
    document.getElementById("displayArea").append(onEmptyListShowMessage);
  }
}

function changeItemState(ev){
  if (ev.target.tagName === 'LI')
    ev.target.classList.toggle('checked');
}

function deleteItemFromList(){
  renderItemsFromLocalStorage();
  for (var i = 0; i < close.length; i++) {
      close[i].onclick = function(i) {
        var div = this.parentElement;     
        deleteItemFromArray(div.textContent);
        div.remove();
        addItemToLocalStorage();
        isEmpty();
      }
  }
}

function deleteItemFromArray(deletedText){
  var itemDeleted = deletedText.substr(0,deletedText.length-1);
  var itemIndex = todos.indexOf(itemDeleted);
  todos.splice(itemIndex,1)
}

init();
