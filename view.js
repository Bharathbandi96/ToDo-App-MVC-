//import './controller.js'
// <script src = './controller.js'></script>

function display(item){
  var li = document.createElement("li");
  var inputValue = item;
  var textNode = document.createTextNode(inputValue);
  li.appendChild(textNode);
  document.getElementById("displayArea").appendChild(li);
  var span = document.createElement("SPAN");
  var cancel = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(cancel);
  li.appendChild(span);
}


function displayTodoListItems(){
  renderItemsFromLocalStorage();
  for(var i=0; i<todos.length; i++){
    display(todos[i]);
    isEmpty();
    addItemToLocalStorage();
    deleteItemFromList();
  }
}

function displayCompletedItemsCount(){
  var check = document.getElementsByClassName('checked');
  alert(completedText + check.length);
}

function displayTotalItemsCount(){
  alert(allText + todos.length);
}

function displayPendingItemsCount(){
  var check = document.getElementsByClassName('checked');
  var pending = todos.length-check.length
  alert(pendingText + pending);
}