
function Controller(rootId,key,view,model){
  // var self = this;
  // var me = this;

  this.rootId = document.querySelector(rootId);
  this.key = key;
  this.viewInstance = view;
  this.modelInstance = model

  this.init = function(){
    this.viewInstance.initialize();
    this.addTaskEvent();
    this.allTaskEvent();
    this.completedTasksEvent();
    this.checkEvent();
    this.deleteEvent();
    this.pendingTasksEvent();
    this.attachEvents();
  }

  this.attachEvents = function(){
    this.rootId.querySelector('#storageDropDown').addEventListener('change',this.onStorageSelect.bind(this));
    this.rootId.querySelector('#taskInputField').addEventListener('keypress',this.getItemOnEnter.bind(this));
  }

  this.addTaskEvent = function(){
    this.rootId.addEventListener('add',this.getItemOnAddClick.bind(this))
  }

  this.allTaskEvent = function(){
    this.rootId.addEventListener('showAllTasks',this.onAllTasksClick.bind(this))
  }

  this.completedTasksEvent = function(){
    this.rootId.addEventListener('showCompletedTasks',this.onCompletedClick.bind(this))
  }

  this.pendingTasksEvent = function(){
    // debugger
    this.rootId.addEventListener('showPendingTasks',this.onPendingClick.bind(this))
  }

  this.checkEvent = function(){
    this.rootId.addEventListener('checkBoxEvent',this.setItemStatus.bind(this));
  }

  this.deleteEvent = function(){
    this.rootId.addEventListener('deleteButtonEvent',this.onDeleteClick.bind(this));
  }
}

Controller.prototype.onStorageSelect = function(){
  var selectedStorage = this.modelInstance.getStorageType(this.rootId);
  if(selectedStorage !== 'selectStorage'){
    var storageData = this.modelInstance.getItemsFromStorage();
    this.viewInstance.displayStorageItems(storageData);
  }else {
    this.viewInstance.showMessageOnInvalidStorage();
    this.viewInstance.displayItemsCount(0);
  }
}

Controller.prototype.getItemOnEnter = function(){
  var enterKeyCode = 13;
  var inputElement = this.rootId.querySelector('#taskInputField');
  var selectedStorage = this.modelInstance.getStorageType(this.rootId); 
  if(event.keyCode === enterKeyCode && inputElement.value !== '' && selectedStorage !== 'selectStorage'){
    this.onAddNewItem(inputElement);
  }
}

Controller.prototype.getItemOnAddClick = function(){
  var inputElement = this.rootId.querySelector('#taskInputField');
  var selectedStorage = this.modelInstance.getStorageType(this.rootId); 
  if(inputElement.value !== '' && selectedStorage !== 'selectStorage'){
    this.onAddNewItem(inputElement);
  }
}

Controller.prototype.onAddNewItem = function(inputElement){
  var id = Date.now();
  this.modelInstance.addItemToAnArray(id,inputElement.value);
  this.viewInstance.createItem(id,inputElement.value);
  this.viewInstance.inputFieldReset(inputElement);
  this.viewInstance.displayItemsCount(this.modelInstance.getItemsFromStorage().length);
}

Controller.prototype.setItemStatus = function(e){
  var storageData = this.modelInstance.getItemsFromStorage();
  // e.target.classList.toggle('checked')
  console.log(e.target.classList)
  var id = Number(e.detail.id);
  var currentItem = storageData.find(function(object){
    return object.id === id;
  });
  this.modelInstance.updateStatusValueInStorage(e.detail.name.value,storageData.indexOf(currentItem));
}

Controller.prototype.onDeleteClick = function(e){
  e.detail.name.remove();
  this.modelInstance.updateStorage(e.detail.id);
  this.viewInstance.displayItemsCount(this.rootId.querySelectorAll('li').length);
}

Controller.prototype.onAllTasksClick = function(){
  var selectedStorage = this.modelInstance.getStorageType(this.rootId);
  if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
    var storageData = this.modelInstance.getItemsFromStorage();
    this.viewInstance.displayStorageItems(storageData);
  }
}

Controller.prototype.onCompletedClick= function(){
  var selectedStorage = this.modelInstance.getStorageType(this.rootId);
  if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
  var storageData = this.modelInstance.getItemsFromStorage();
  this.viewInstance.displayStorageItems(this.modelInstance.getItemsByStatus(storageData,true));
  }
}

Controller.prototype.onPendingClick = function(){
  var selectedStorage = this.modelInstance.getStorageType(this.rootId);
  if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
  var storageData = this.modelInstance.getItemsFromStorage();
  this.viewInstance.displayStorageItems(this.modelInstance.getItemsByStatus(storageData,false));
  }
}