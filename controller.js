
function Controller(view,model){
  this.myApp = view.myApp;
  this.key = model.storageKey;
  this.viewInstance = view;
  this.modelInstance = model;
  this.buttonClicked;
}

Controller.prototype.init = function(){
  this.viewInstance.initialize();
  this.addTaskEvent();
  this.allTaskEvent();
  this.completedTasksEvent();
  this.checkBoxEvent();
  this.deleteEvent();
  this.storageEvent();
  this.pendingTasksEvent();
  this.keyPressEvent();
}



Controller.prototype.attachEvent = function(object){
  debugger
  for (var key in object) {
    this.myApp.addEventListener(`${key}`, `${object[key]}`);
  }
}

Controller.prototype.addTaskEvent = function(){
  this.myApp.addEventListener('onAddItem',this.getItemOnAddClick.bind(this));
}

Controller.prototype.storageEvent = function(){
  this.myApp.addEventListener('onStorageChange',this.onStorageSelect.bind(this));
}

Controller.prototype.keyPressEvent = function(){
  this.myApp.querySelector('#taskInputField').addEventListener('keypress',this.getItemOnEnter.bind(this));
}

Controller.prototype.allTaskEvent = function(){
  this.myApp.addEventListener('showAllTasks',this.onAllTasksClick.bind(this));
}

Controller.prototype.completedTasksEvent = function(){
  this.myApp.addEventListener('showCompletedTasks',this.onCompletedClick.bind(this));
}

Controller.prototype.pendingTasksEvent = function(){
  this.myApp.addEventListener('showPendingTasks',this.onPendingClick.bind(this));
}

Controller.prototype.checkBoxEvent = function(){
  this.myApp.addEventListener('onCheckBoxChange',this.onCheckBoxClick.bind(this));
}

Controller.prototype.deleteEvent = function(){
  this.myApp.addEventListener('deleteButtonEvent',this.onDeleteClick.bind(this));
}

Controller.prototype.onStorageSelect = function(){
  var myViewInstance = this.viewInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(selectedStorage !== 'selectStorage'){
    var storageData = this.modelInstance.getItemsFromStorage(selectedStorage);
    myViewInstance.displayStorageItems(storageData);
    this.getItemsCount(selectedStorage);
  }else {
    myViewInstance.showMessageOnInvalidStorage();
    myViewInstance.displayItemsCount(0);
  }
}

Controller.prototype.getItemOnEnter = function(e){
  var enterKeyCode = 13;
  if(event.keyCode === enterKeyCode){
    this.getNewItem();
  }
}

Controller.prototype.getItemOnAddClick = function(){
  this.getNewItem();
}

Controller.prototype.getNewItem = function(){
  var inputElement = this.myApp.querySelector('#taskInputField').value;
  var selectedStorage = this.viewInstance.getStorageType(); 
  if(inputElement!== '' && selectedStorage !== 'selectStorage'){
    this.onAddNewItem(inputElement,selectedStorage);
  }
}

Controller.prototype.onAddNewItem = function(inputElement,selectedStorage){
  var myViewInstance = this.viewInstance;
  var myModelInstance = this.modelInstance;
  var id;
  id = myModelInstance.addItemToAnArray(inputElement,'localStorage');
  myModelInstance.addItemToAnArray(inputElement,'sessionStorage');
  if(this.buttonClicked !== 'completedButton'){
    myViewInstance.createItem(id,inputElement);
  }
  myViewInstance.inputFieldReset();
  myViewInstance.displayItemsCount(myModelInstance.itemsCount(false,selectedStorage));
}

Controller.prototype.onCheckBoxClick = function(e){
  var myViewInstance = this.viewInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(this.buttonClicked === 'completedButton' || this.buttonClicked === 'pendingButton'){
    myViewInstance.deleteItemFromList(e.detail.currentElement);
  }
  this.modelInstance.setItemStatus(e.detail.id,selectedStorage);
  this.getItemsCount(selectedStorage);
}

Controller.prototype.onDeleteClick = function(e){
  var myViewInstance = this.viewInstance;
  var selectedStorage = myViewInstance.getStorageType();
  myViewInstance.deleteItemFromList(e.detail.currentElement);
  this.modelInstance.updateStorage(e.detail.id,selectedStorage);
  this.getItemsCount(selectedStorage);
}

Controller.prototype.getItemsCount = function(selectedStorage){
    this.viewInstance.displayItemsCount(this.modelInstance.itemsCount(false,selectedStorage));
}

Controller.prototype.onAllTasksClick = function(){
  var myViewInstance = this.viewInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(selectedStorage !== 'selectStorage'){
    this.buttonClicked = 'allTaskButton';
    var storageData = this.modelInstance.getItemsFromStorage(selectedStorage);
    myViewInstance.displayStorageItems(storageData);
  }
}

Controller.prototype.onCompletedClick= function(){
    var buttonClicked = 'completedButton';
    this.getStorageItems(buttonClicked,true);
}

Controller.prototype.onPendingClick = function(){
  var buttonClicked = 'pendingButton';
  this.getStorageItems(buttonClicked,false);
}

Controller.prototype.getStorageItems = function(buttonClicked,status){
  var myViewInstance = this.viewInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(selectedStorage !== 'selectStorage'){
    this.buttonClicked = buttonClicked;
    myViewInstance.displayStorageItems(this.modelInstance.getItemsByStatus(status,selectedStorage));
    this.getItemsCount(selectedStorage);
  }
}