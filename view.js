
var completedText = 'Completed tasks in your list : ';
var allText = 'Total number of tasks in your list : ';
var pendingText = 'Pending tasks in your list : ';
var pending;
var check = document.getElementsByClassName('checked');
var li;
var span;

function display(item){
  li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  span = document.createElement("SPAN");
  span.className = "close";
  span.appendChild(document.createTextNode("\u00D7"));
  li.appendChild(span);
  appendItemToList(li);
}

function displayCompletedItemsCount(){
  alert(completedText + check.length);
}

function displayItemsCountFromLocalStorage(){
  alert(allText + localStorageArray.length);
}

function displayPendingItemsCountFromLocalStorage(){
  pending = localStorageArray.length-check.length
  alert(pendingText + pending);
}

function displayItemsCountFromSessionStorage(){
  alert(allText + sessionStorageArray.length);
}

function displayPendingItemsCountFromSessionStorage(){
  pending = sessionStorageArray.length-check.length
  alert(pendingText + pending);
}