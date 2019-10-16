
function display(item,status){
  var li = document.createElement("li");
  createCheckButton(li,status);
  createTextContent(li,item);
  createDeleteButton(li);
  appendItemToList(li);
}

function appendItemToList(item){
  var displayAreaId = toGetElementById('displayArea');
  displayAreaId.appendChild(item);
}
