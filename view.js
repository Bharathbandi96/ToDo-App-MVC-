
var completedText = 'Completed tasks in your list : ';
var allText = 'Total number of tasks in your list : ';
var pendingText = 'Pending tasks in your list : ';
var pending;
var check = document.getElementsByClassName('checked');
var li;
var span;
// var span1

function display(item){
  li = document.createElement("li");
  createCheckButton();
  createTextContent(item);
  createDeleteButton();
  appendItemToList(li);
}

function appendItemToList(item){
  displayAreaId.appendChild(item);
  span.addEventListener(clickEvent,deleteItemFromList);
}

function createCheckButton(){
  span = document.createElement("SPAN");
  span.id = "close1";
  li.appendChild(span)
}

function createTextContent(item){
  span = document.createElement("SPAN");
  span.appendChild(document.createTextNode(item));
  li.appendChild(span);
}

function createDeleteButton(){
  span = document.createElement("SPAN");
  span.className = "close";
  span.appendChild(document.createTextNode("\u00D7"));
  li.appendChild(span);
}

function displayCompletedItemsCountFromSelectedStorage(){
  alert(completedText + check.length);
}

function displayTotalItemsCountFromSelectedStorage(){
  alert(allText + storageData.length);
}

function displayPendingItemsCountFromselectedStorage(){
  pending = storageData.length-check.length
  alert(pendingText + pending);
}
