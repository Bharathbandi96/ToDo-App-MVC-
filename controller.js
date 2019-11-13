
function Controller(rootId,key,view,model){
  var self = this;

  self.rootId = document.querySelector(rootId);
  self.key = key;
  self.viewInstance = view;
  self.modelInstance = model

  this.init = function(){
    self.viewInstance.initialize();
    this.addTaskEvent();
    this.allTaskEvent();
    this.completedTasksEvent();
    this.checkEvent();
    this.deleteEvent();
    this.pendingTasksEvent();
    this.attachEvents();
  }

  this.onStorageSelect = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'selectStorage'){
      var storageData = self.modelInstance.getItemsFromStorage();
      self.viewInstance.displayStorageItems(storageData);
    }else {
      self.viewInstance.showMessageOnInvalidStorage();
      self.viewInstance.displayItemsCount(0);
    }
  }

  this.getItemOnEnter = function(){
    var enterKeyCode = 13;
    var inputElement = self.rootId.querySelector('#taskInputField');
    var selectedStorage = self.getStorageType(); 
    if(event.keyCode === enterKeyCode && inputElement.value !== '' && selectedStorage !== 'selectStorage'){
      self.onAddNewItem(inputElement);
    }
  }

  this.getItemOnAddClick = function(){
    var inputElement = self.rootId.querySelector('#taskInputField');
    var selectedStorage = self.getStorageType(); 
    if(inputElement.value !== '' && selectedStorage !== 'selectStorage'){
      self.onAddNewItem(inputElement);
    }
  }

  // this.setItemStatus = function(e){
  //   var storageData = self.modelInstance.getItemsFromStorage();
  //   var id = e.target.parentElement.id;
  //   e.target.classList.toggle('checked');
  //   var currentItem = storageData.find(function(object){
  //     return object.id === Number(id);
  //   });
  //   self.modelInstance.updateStatusValueInStorage(e.target.classList.value,storageData.indexOf(currentItem));
  // }

  this.deleteItemFromList = function(e){
    var id = e.target.parentElement.id;
    e.target.parentElement.remove();
    self.modelInstance.updateStorage(id);
    self.viewInstance.displayItemsCount(self.rootId.querySelectorAll('li').length);
  }

  this.onAllTasksClick = function(){
    // debugger;
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
      var storageData = self.modelInstance.getItemsFromStorage();
      self.viewInstance.displayStorageItems(storageData);
    }
  }

  this.onCompletedClick= function(){
    var storageData = self.modelInstance.getItemsFromStorage();
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
      self.viewInstance.displayItems(storageData,true);
    }
  }

  this.onPendingClick = function(){
    var storageData = self.modelInstance.getItemsFromStorage();
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
      self.viewInstance.displayItems(storageData,false);
    }
  }

  this.addTaskEvent = function(){
    this.rootId.querySelector('#addButton').addEventListener('add',this.getItemOnAddClick)
  }

  this.allTaskEvent = function(){
    this.rootId.querySelector('#allTaskButton').addEventListener('showAllTasks',this.onAllTasksClick)
  }

  this.completedTasksEvent = function(){
    this.rootId.querySelector('#completedTaskButton').addEventListener('showCompletedTasks',this.onCompletedClick)
  }

  this.pendingTasksEvent = function(){
    this.rootId.querySelector('#pendingTaskButton').addEventListener('showPendingTasks',this.onPendingClick)
  }

  this.checkEvent = function(){
    self.rootId.addEventListener('checkBoxEvent',this.modelInstance.setItemStatus.bind(this.modelInstance))
  }

  this.deleteEvent = function(){
    self.rootId.addEventListener('deleteButtonEvent',this.deleteItemFromList)
  }
}

Controller.prototype.attachEvents = function(){
  this.rootId.querySelector('#storageDropDown').addEventListener('change',this.onStorageSelect);
  this.rootId.querySelector('#taskInputField').addEventListener('keypress',this.getItemOnEnter);
}

Controller.prototype.getStorageType = function(){
  return this.rootId.querySelector('#storageDropDown').value;
}

Controller.prototype.onAddNewItem = function(inputElement){
  var id = Date.now();
  this.modelInstance.addItemToAnArray(id,inputElement.value);
  this.viewInstance.createItem(id,inputElement.value);
  this.viewInstance.inputFieldReset(inputElement);
  this.viewInstance.displayItemsCount(this.modelInstance.getItemsFromStorage().length);
}
