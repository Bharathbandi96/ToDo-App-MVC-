
function createViewInstance(){
  return new View();
}

createViewInstance().createAddTaskButton();
createViewInstance().createAllTaskButton();
createViewInstance().createCompletedTaskButton();
createViewInstance().createPendingTaskButton();

function View(){

  var self = this;

  this.createItem = function(id,item,status){
    var li = document.createElement("li");
    li.id = id;
    self.createCheckButton(li,status);
    self.createTextContent(li,item);
    self.createDeleteButton(li);
    self.appendItemToList(li);
  }

  this.createCheckButton = function(li,status){
    var checkButton = document.createElement("SPAN");
    checkButton.id = "check";
    createControllerInstance().setItemClassValue(checkButton,status);
    createControllerInstance().attachEventToCheckButton(checkButton);
    li.appendChild(checkButton);
  }

  this.createTextContent = function(li,item){
    var taskNode = document.createElement("SPAN");
    taskNode.appendChild(document.createTextNode(item));
    li.appendChild(taskNode);
  }

  this.createDeleteButton = function(li){
    var deleteButton = document.createElement("SPAN");
    deleteButton.className = "close";
    deleteButton.appendChild(document.createTextNode("\u00D7"));
    li.appendChild(deleteButton);
    createControllerInstance().attachEventToDeleteButton(deleteButton);
  }

  this.appendItemToList = function(item){
    var displayAreaId = document.getElementById('displayArea');
    displayAreaId.appendChild(item);
  }

  this.appendAddButton = function(button){
    var headerId = document.getElementById('header');
    headerId.appendChild(button);
  }

  this.appendTaskButtons = function(button){
    var footerId = document.getElementById('footer');
    footerId.appendChild(button);
  }

  this.createAddTaskButton = function(){
    var button = document.createElement("BUTTON");
    button.id = 'addButton';
    button.appendChild(document.createTextNode("Add"));
    self.appendAddButton(button);
    createControllerInstance().attachEventToAddTaskButton(button);
  }

  this.createAllTaskButton = function(){
    var button = document.createElement("BUTTON");
    button.id = 'allTaskButton';
    button.appendChild(document.createTextNode("All Tasks"));
    self.appendTaskButtons(button);
    createControllerInstance().attachEventToAllTaskButton(button);
  }

  this.createCompletedTaskButton = function(){
    var button = document.createElement("BUTTON");
    button.id = 'completedTaskButton';
    button.appendChild(document.createTextNode("Completed"));
    self.appendTaskButtons(button);
    createControllerInstance().attachEventToCompletedTaskButton(button);
  }

  this.createPendingTaskButton = function(){
    var button = document.createElement("BUTTON");
    button.id = 'pendingTaskButton';
    button.appendChild(document.createTextNode("Pending"));
    self.appendTaskButtons(button);
    createControllerInstance().attachEventToPendingTaskButton(button);
  }
}

