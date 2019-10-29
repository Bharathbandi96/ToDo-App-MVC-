
function DisplayItem(id,item,status){
  this.id = id;
  this.item = item;
  this.status = status;
  this.createItem = function(){ createAnItem(this.id,this.item,this.status); }
}

function appendItemToList(item){
  var displayAreaId = document.getElementById('displayArea');
  displayAreaId.appendChild(item);
}

function appendAddButton(button){
  var headerId = document.getElementById('header');
  headerId.appendChild(button);
}

function appendTaskButtons(button){
  var footerId = document.getElementById('footer');
  footerId.appendChild(button);
}

//createAddButtonAndSetEvent
function createAddTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'addButton';
  button.appendChild(document.createTextNode("Add"));
  appendAddButton(button);
  var instance = new Controller();
  button.addEventListener('click', instance.getItemOnAddButtonClick);
}
//createAllTaskButtonAndSetEvent
function createAllTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'allTaskButton';
  button.appendChild(document.createTextNode("All Tasks"));
  appendTaskButtons(button);
  var instance = new Controller();
  button.addEventListener('click', instance.getAllItems);
}
//createCompletedButtonAndSetEvent
function createCompletedTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'completedTaskButton';
  button.appendChild(document.createTextNode("Completed"));
  appendTaskButtons(button);
  var instance = new Controller();
  button.addEventListener('click', instance.getCompletedItems);
}
//createPendingButtonAndSetEvent
function createPendingTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'pendingTaskButton';
  button.appendChild(document.createTextNode("Pending"));
  appendTaskButtons(button);
  var instance = new Controller();
  button.addEventListener('click', instance.getPendingItems);
}