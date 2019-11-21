
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
  var events = {
    onAddItem : this.onAddClick.bind(this),
    onStorageChange : this.onStorageSelect.bind(this),
    keypress : this.onEnter.bind(this),
    showAllTasks : this.onAllTasksClick.bind(this),
    showCompletedTasks : this.onCompletedClick.bind(this),
    showPendingTasks : this.onPendingClick.bind(this),
    onCheckBoxChange : this.onCheckBoxClick.bind(this),
    deleteButtonEvent : this.onDeleteClick.bind(this)
  };
  for(var key in events){
    this.rootElement.addEventListener(key,events[key]);
  }
}
//need to handel in manager
Controller.prototype.onStorageSelect = function(){
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var storageType = viewInstance.getStorageType();
  if(storageType !== 'selectStorage'){
    var storageData = modelInstance.getItemsFromStorage(storageType);
    var itemsCount = modelInstance.getItemsCount(storageType);
    viewInstance.displayStorageItems(storageData);
    viewInstance.displayItemsCount(itemsCount);
  }else {
    viewInstance.showMessageOnInvalidStorage();
    viewInstance.displayItemsCount(0);
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
//renderNewItem
Controller.prototype.getNewItem = function(){
  var inputElement = this.rootElement.querySelector('#taskInputField').value;
  var storageType = this.viewInstance.getStorageType();
  if(inputElement!== '' && storageType !== 'selectStorage'){
    var viewInstance = this.viewInstance;
    var modelInstance = this.modelInstance;
    var id = modelInstance.createId();
    if(this.buttonClicked !== 'completedButton'){
      viewInstance.createItem(id,inputElement);
    }
    modelInstance.addItemToAnArray(id,inputElement,'localStorage');
    modelInstance.addItemToAnArray(id,inputElement,'sessionStorage');
    var itemsCount = modelInstance.getItemsCount(storageType);
    viewInstance.resetAndFocusInputField();
    viewInstance.displayItemsCount(itemsCount);
  }
}

Controller.prototype.onCheckBoxClick = function(e){
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var itemsCount;
  if(this.buttonClicked === 'completedButton' || this.buttonClicked === 'pendingButton'){
    viewInstance.deleteItemFromView(e.detail.currentElement);
  }
  modelInstance.setItemStatus(e.detail.id,e.detail.storageType);
  itemsCount = modelInstance.getItemsCount(e.detail.storageType);
  viewInstance.displayItemsCount(itemsCount);
}

Controller.prototype.onDeleteClick = function(e){
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var itemsCount;
  viewInstance.deleteItemFromView(e.detail.currentElement);
  modelInstance.updateStorage(e.detail.id,e.detail.storageType);
  itemsCount = modelInstance.getItemsCount(e.detail.storageType);
  viewInstance.displayItemsCount(itemsCount);
}

Controller.prototype.onAllTasksClick = function(){
  var viewInstance = this.viewInstance;
  var storageType = viewInstance.getStorageType();
  if(storageType !== 'selectStorage'){
    this.buttonClicked = 'allTaskButton';
    var storageData = this.modelInstance.getItemsFromStorage(storageType);
    viewInstance.displayStorageItems(storageData);
  }
}

Controller.prototype.onCompletedClick= function(){
  this.buttonClicked = 'completedButton';
  this.getItemsBasedOnStatus(true);
}

Controller.prototype.onPendingClick = function(){
  this.buttonClicked = 'pendingButton';
  this.getItemsBasedOnStatus(false);
}

Controller.prototype.getItemsBasedOnStatus = function(status){
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var storageType = viewInstance.getStorageType();
  if(storageType !== 'selectStorage'){
    var items = modelInstance.getItemsByStatus(status,storageType)
    var itemsCount = modelInstance.getItemsCount(storageType)
    viewInstance.displayStorageItems(items);
    viewInstance.displayItemsCount(itemsCount);
  }
}