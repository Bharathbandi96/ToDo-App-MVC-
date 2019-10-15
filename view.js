
function display(item){
  var li = document.createElement("li");
  createCheckButton(li);
  createTextContent(li,item);
  createDeleteButton(li);
  appendItemToList(li);
}

function appendItemToList(item){
  var displayAreaId = getElementById('displayArea');
  displayAreaId.appendChild(item);
}

function displayCompletedItemsCountFromSelectedStorage(){
  var check = getElementsByClassName('checked');
  var completedText = 'Completed tasks in your list : ';
  alert(completedText + check.length);
}

function displayTotalItemsCountFromSelectedStorage(){
  var allText = 'Total number of tasks in your list : ';  
  alert(allText + storageData.length);
}

function displayPendingItemsCountFromselectedStorage(){
  var pendingText = 'Pending tasks in your list : ';
  var check = getElementsByClassName('checked');
  var pending = storageData.length-check.length
  alert(pendingText + pending);
}
