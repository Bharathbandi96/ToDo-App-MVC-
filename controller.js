
function Controller(view,model){
  this.rootId = view.rootId;
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
  this.keyPressEvents();
}

Controller.prototype.addTaskEvent = function(){
  this.rootId.addEventListener('add',this.getItemOnAddClick.bind(this));
}

Controller.prototype.storageEvent = function(){
  this.rootId.addEventListener('storageEvent',this.onStorageSelect.bind(this));
}

Controller.prototype.keyPressEvents = function(){
  this.rootId.querySelector('#taskInputField').addEventListener('keypress',this.getItemOnEnter.bind(this));
}

Controller.prototype.allTaskEvent = function(){
  this.rootId.addEventListener('showAllTasks',this.onAllTasksClick.bind(this));
}

Controller.prototype.completedTasksEvent = function(){
  this.rootId.addEventListener('showCompletedTasks',this.onCompletedClick.bind(this));
}

Controller.prototype.pendingTasksEvent = function(){
  this.rootId.addEventListener('showPendingTasks',this.onPendingClick.bind(this));
}

Controller.prototype.checkBoxEvent = function(){
  this.rootId.addEventListener('checkBoxEvent',this.onCheckBoxClick.bind(this));
}

Controller.prototype.deleteEvent = function(){
  this.rootId.addEventListener('deleteButtonEvent',this.onDeleteClick.bind(this));
}

Controller.prototype.onStorageSelect = function(){
  var selectedStorage = this.viewInstance.getStorageType();
  if(selectedStorage !== 'selectStorage'){
    var storageData = this.modelInstance.getItemsFromStorage(selectedStorage);
    this.viewInstance.displayStorageItems(storageData);
  }else {
    this.viewInstance.showMessageOnInvalidStorage();
    this.viewInstance.displayItemsCount(0);
  }
}

Controller.prototype.getItemOnEnter = function(e){
  var enterKeyCode = 13;
  // var inputElement = this.rootId.querySelector('#taskInputField').value;
  // var selectedStorage = this.viewInstance.getStorageType(); 
  // if(event.keyCode === enterKeyCode && inputElement !== '' && selectedStorage !== 'selectStorage'){
  //   this.onAddNewItem(inputElement,selectedStorage);
  // }
  if(event.keyCode === enterKeyCode){
    this.getNewItem();
  }
}

Controller.prototype.getItemOnAddClick = function(){
  // var inputElement = this.rootId.querySelector('#taskInputField').value;
  // var selectedStorage = this.viewInstance.getStorageType(); 
  // if(inputElement!== '' && selectedStorage !== 'selectStorage'){
  //   this.onAddNewItem(inputElement,selectedStorage);
  // }
  this.getNewItem();
}

Controller.prototype.getNewItem = function(){
  var inputElement = this.rootId.querySelector('#taskInputField').value;
  var selectedStorage = this.viewInstance.getStorageType(); 
  if(inputElement!== '' && selectedStorage !== 'selectStorage'){
    this.onAddNewItem(inputElement,selectedStorage);
  }
}

Controller.prototype.onAddNewItem = function(inputElement,selectedStorage){
  var id = this.modelInstance.addItemToAnArray(inputElement,selectedStorage);
  if(this.buttonClicked !== 'completedButton'){
    this.viewInstance.createItem(id,inputElement);
  }
  this.viewInstance.inputFieldReset();
  this.viewInstance.displayItemsCount(this.modelInstance.getItemsFromStorage(selectedStorage).length);
}

Controller.prototype.onCheckBoxClick = function(e){
  var selectedStorage = this.viewInstance.getStorageType();
  if(this.buttonClicked === 'completedButton' || this.buttonClicked === 'pendingButton'){
    this.viewInstance.deleteItemFromList(e.detail.currentElement);
  }
  this.modelInstance.setItemStatus(e.detail.id,selectedStorage);
  this.getItemsCount(selectedStorage);
}

Controller.prototype.onDeleteClick = function(e){
  var selectedStorage = this.viewInstance.getStorageType();
  this.viewInstance.deleteItemFromList(e.detail.currentElement);
  this.modelInstance.updateStorage(e.detail.id,selectedStorage);
  this.getItemsCount(selectedStorage);
  // var count = (this.buttonClicked === 'allTaskButton') ? :
  // this.viewInstance.displayItemsCount(this.rootId.querySelectorAll('li').length);
  // this.viewInstance.displayItemsCount(this.modelInstance.itemsCount(true,this.viewInstance.getStorageType()));
}

Controller.prototype.getItemsCount = function(selectedStorage){
  if(this.buttonClicked === 'completedButton'){
    this.viewInstance.displayItemsCount(this.modelInstance.itemsCount(true,this.viewInstance.getStorageType()));
  }
  else if(this.buttonClicked === 'pendingButton'){
    this.viewInstance.displayItemsCount(this.modelInstance.itemsCount(false,this.viewInstance.getStorageType()));
  }
  else{
    this.viewInstance.displayItemsCount(this.modelInstance.getItemsFromStorage(selectedStorage).length);
  }
}

Controller.prototype.onAllTasksClick = function(){
  var selectedStorage = this.viewInstance.getStorageType();
  if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
    this.buttonClicked = 'allTaskButton';
    var storageData = this.modelInstance.getItemsFromStorage(selectedStorage);
    this.viewInstance.displayStorageItems(storageData);
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
  var selectedStorage = this.viewInstance.getStorageType();
  if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
    this.buttonClicked = buttonClicked;
    this.viewInstance.displayStorageItems(this.modelInstance.getItemsByStatus(status,selectedStorage));
  }
}