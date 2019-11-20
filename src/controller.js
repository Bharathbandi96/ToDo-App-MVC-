
function Controller(view,model){
  this.rootElement = view.rootElement;
  this.viewInstance = view;
  this.modelInstance = model;
  this.buttonClicked;
}

Controller.prototype.init = function(){
  this.viewInstance.initialize();
  this.attachEvents();
  this.onStorageSelect();
}

Controller.prototype.attachEvents = function(){
  var myEvents = {
    onAddItem : this.onAddClick.bind(this),
    onStorageChange : this.onStorageSelect.bind(this),
    keypress : this.onEnter.bind(this),
    showAllTasks : this.onAllTasksClick.bind(this),
    showCompletedTasks : this.onCompletedClick.bind(this),
    showPendingTasks : this.onPendingClick.bind(this),
    onCheckBoxChange : this.onCheckBoxClick.bind(this),
    deleteButtonEvent : this.onDeleteClick.bind(this)
  };
  for(var key in myEvents){
    this.rootElement.addEventListener(key,myEvents[key]);
  }
}

Controller.prototype.onStorageSelect = function(){
  var myViewInstance = this.viewInstance;
  var myModelInstance = this.modelInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(selectedStorage !== 'selectStorage'){
    var storageData = myModelInstance.getItemsFromStorage(selectedStorage);
    myViewInstance.displayStorageItems(storageData);
    myViewInstance.displayItemsCount(myModelInstance.getItemsCount(selectedStorage));
  }else {
    myViewInstance.showMessageOnInvalidStorage();
    myViewInstance.displayItemsCount(0);
  }
}

Controller.prototype.onEnter = function(){
  var enterKeyCode = 13;
  if(event.keyCode === enterKeyCode){
    this.getNewItem();
  }
}

Controller.prototype.onAddClick = function(){
  this.getNewItem();
}

Controller.prototype.getNewItem = function(){
  var inputElement = this.rootElement.querySelector('#taskInputField').value;
  var selectedStorage = this.viewInstance.getStorageType(); 
  if(inputElement!== '' && selectedStorage !== 'selectStorage'){
    this.onAddNewItem(inputElement,selectedStorage);
  }
}

Controller.prototype.onAddNewItem = function(inputElement,selectedStorage){
  var myViewInstance = this.viewInstance;
  var myModelInstance = this.modelInstance;
  var id = myModelInstance.addItemToAnArray(inputElement,'localStorage');
  myModelInstance.addItemToAnArray(inputElement,'sessionStorage');
  if(this.buttonClicked !== 'completedButton'){
    myViewInstance.createItem(id,inputElement);
  }
  myViewInstance.resetInputField();
  myViewInstance.displayItemsCount(myModelInstance.getItemsCount(selectedStorage));
}

Controller.prototype.onCheckBoxClick = function(e){
  var myViewInstance = this.viewInstance;
  var myModelInstance = this.modelInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(this.buttonClicked === 'completedButton' || this.buttonClicked === 'pendingButton'){
    myViewInstance.deleteItemFromList(e.detail.currentElement);
  }
  myModelInstance.setItemStatus(e.detail.id,selectedStorage);
  myViewInstance.displayItemsCount(myModelInstance.getItemsCount(selectedStorage));
}

Controller.prototype.onDeleteClick = function(e){
  var myViewInstance = this.viewInstance;
  var myModelInstance = this.modelInstance;
  var selectedStorage = myViewInstance.getStorageType();
  myViewInstance.deleteItemFromList(e.detail.currentElement);
  myModelInstance.updateStorage(e.detail.id,selectedStorage);
  myViewInstance.displayItemsCount(myModelInstance.getItemsCount(selectedStorage));
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
  this.buttonClicked = 'completedButton';
  this.getStorageItems(true);
}

Controller.prototype.onPendingClick = function(){
  this.buttonClicked = 'pendingButton';
  this.getStorageItems(false);
}

Controller.prototype.getStorageItems = function(status){
  var myViewInstance = this.viewInstance;
  var myModelInstance = this.modelInstance;
  var selectedStorage = myViewInstance.getStorageType();
  if(selectedStorage !== 'selectStorage'){
    myViewInstance.displayStorageItems(myModelInstance.getItemsByStatus(status,selectedStorage));
    myViewInstance.displayItemsCount(myModelInstance.getItemsCount(selectedStorage));
  }
}