
function displayItem(item,status){
  var li = document.createElement("li");
  createCheckButton(li,status);
  createTextContent(li,item);
  createDeleteButton(li);
  appendItemToList(li);
}

function appendItemToList(item){
  var displayAreaId = getAnElementByItsId('displayArea');
  displayAreaId.appendChild(item);
}

