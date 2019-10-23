
function displayItem(item,status){
  this.item = item;
  this.status = status;
  this.createItem = function(){ createAnItem(this.item,this.status); }
}

function appendItemToList(item){
  var displayAreaId = getAnElementByItsId('displayArea');
  displayAreaId.appendChild(item);
}

