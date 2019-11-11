
function Controller(configs){
  var self = this;

  self.key = configs.storageKey;
  self.storageOne = configs.storageOne;
  self.storageTwo = configs.storageTwo;

  this.onStorageSelect = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'selectStorage'){
      var storageData = self.getItemsFromStorage();
      viewInstance.displayStorageItems(storageData);
    }else {
      viewInstance.showMessageOnInvalidStorage();
      viewInstance.displayItemsCount(0);
    }
  }

  this.getItemOnEnter = function(){
    var enterKeyCode = 13;
    var inputElement = document.querySelector('#taskInputField');
    var selectedStorage = self.getStorageType(); 
    if(event.keyCode === enterKeyCode && inputElement.value !== '' && selectedStorage !== 'selectStorage'){
      self.onAddNewItem(inputElement);
    }
  }

  this.getItemOnAddClick = function(){
    var inputElement = document.querySelector('#taskInputField');
    var selectedStorage = self.getStorageType(); 
    if(inputElement.value !== '' && selectedStorage !== 'selectStorage'){
      self.onAddNewItem(inputElement);
    }
  }

  this.setItemStatus = function(){
    var storageData = self.getItemsFromStorage();
    var id = this.parentElement.id;
    this.classList.toggle('checked');
    var currentItem = storageData.find(function(object){
        return object.id === Number(id);
    });
    ModelInstance.updateStatusValueInStorage(this.classList.value,storageData.indexOf(currentItem));
  }

  this.deleteItemFromList = function(){
    var id = this.parentElement.id;
    this.parentElement.remove();
    ModelInstance.updateStorage(id);
    viewInstance.displayItemsCount(self.getItemsFromStorage().length);
  }

  this.attachEventToButton = function(element,functionCallBack){
    element.addEventListener('click',functionCallBack);
  }

  this.onAllTasksClick = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
      var storageData = self.getItemsFromStorage();
      viewInstance.displayStorageItems(storageData);
    }
  }

  this.onCompletedClick= function(){
    var storageData = self.getItemsFromStorage();
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
      viewInstance.displayItemsCount(viewInstance.displayItems(storageData,true));
    }
  }

  this.onPendingClick = function(){
    var storageData = self.getItemsFromStorage();
    var selectedStorage = self.getStorageType();
    if(selectedStorage !== 'undefined' && selectedStorage !== 'selectStorage'){
      viewInstance.displayItemsCount(viewInstance.displayItems(storageData,false));
    }
  }
}

Controller.prototype.attachEvents = function(){
  document.querySelector('#storageDropDown').addEventListener('change',this.onStorageSelect);
  document.querySelector('#taskInputField').addEventListener('keypress',this.getItemOnEnter);
}

Controller.prototype.getStorageType = function(){
  return document.querySelector('#storageDropDown').value;
}

Controller.prototype.createStorageManagerInstance = function(storageType){
  return new StorageManager(storageType,this.key);
}

Controller.prototype.getItemsFromStorage = function(){
  return this.createStorageManagerInstance(this.storageOne).getData();
}

Controller.prototype.onAddNewItem = function(inputElement){
  var id = Date.now();
  ModelInstance.addItemToAnArray(id,inputElement.value);
  viewInstance.createItem(id,inputElement.value);
  viewInstance.inputFieldReset(inputElement);
  viewInstance.displayItemsCount(this.getItemsFromStorage().length);
}


Controller.prototype.setItemClassName = function(checkBox,status){
  if(status === true){
    checkBox.classList = 'checked';
  }
}

// var controllerInstance = new Controller({
//   storageKey : 'myTodoItems',
//   storageOne : 'localStorage',
//   storageTwo : 'sessionStorage'
// });
