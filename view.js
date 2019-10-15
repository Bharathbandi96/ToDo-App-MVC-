
// var completedText = 'Completed tasks in your list : ';
// var allText = 'Total number of tasks in your list : ';
// var pendingText = 'Pending tasks in your list : ';
// var pending;
// var check = document.getElementsByClassName('checked');
// var li;
// var span;

function display(item){
  var li = document.createElement("li");
  createCheckButton(li);
  //attachEventListnerToCheckItem();
  createTextContent(li,item);
  createDeleteButton(li);
  appendItemToList(li);
}

function appendItemToList(item){
  var displayAreaId = document.getElementById('displayArea');
  displayAreaId.appendChild(item);
}

function displayCompletedItemsCountFromSelectedStorage(){
var check = document.getElementsByClassName('checked');
var completedText = 'Completed tasks in your list : ';
alert(completedText + check.length);
}

function displayTotalItemsCountFromSelectedStorage(){
var allText = 'Total number of tasks in your list : ';  
  alert(allText + storageData.length);
}

function displayPendingItemsCountFromselectedStorage(){
  var pendingText = 'Pending tasks in your list : ';
  var check = document.getElementsByClassName('checked');
  var pending = storageData.length-check.length
  alert(pendingText + pending);
}
