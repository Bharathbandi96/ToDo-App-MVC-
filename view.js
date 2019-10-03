
function display(item){
  var li = document.createElement("li");
  var textNode = document.createTextNode(item);
  li.appendChild(textNode);
  document.getElementById(displayAreaId).appendChild(li);
  var span = document.createElement("SPAN");
  var cancel = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(cancel);
  li.appendChild(span);
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