
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
  span = document.createElement("SPAN");
  span.id = "close1";
  li.appendChild(span)
  li.appendChild(document.createTextNode(item));
  span = document.createElement("SPAN");
  span.className = "close";
  span.appendChild(document.createTextNode("\u00D7"));
  li.appendChild(span);
  appendItemToList(li);
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
