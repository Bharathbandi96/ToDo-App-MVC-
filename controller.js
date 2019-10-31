
function Controller(configs){
  var self = this;

  self.key = configs.storageKey;
  self.storageOne = configs.storageOne;
  self.storageTwo = configs.storageTwo;

  this.onStorageType = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === self.storageOne || selectedStorage === self.storageTwo){
      var storageData = self.getItemsFromStorage();
      self.displayStorageItems(storageData);
    } else {
        self.showMessageOnInvalidStorage();
        self.displayItemsCount(0);
      }
  }

  this.getItemOnEnter = function(){
    var enterKeyCode = 13;
    var inputElement = document.getElementById('myInputField');
    var selectedStorage = self.getStorageType(); 
    if(event.keyCode === enterKeyCode && inputElement.value !== '' && (selectedStorage === self.storageOne || selectedStorage === self.storageTwo)){
      self.onNewItem(inputElement);
    }
  }

  this.getItemOnAddClick = function(){
    var inputElement = document.getElementById('myInputField');
    var selectedStorage = self.getStorageType(); 
    if(inputElement.value !== '' && (selectedStorage === self.storageOne || selectedStorage === self.storageTwo)){
      self.onNewItem(inputElement);
    }
  }

  this.setItemStatus = function(){
    var storageData = self.getItemsFromStorage();
    var id = this.parentElement.id;
    this.classList.toggle('checked');
    var currentItem = storageData.find(function(object){
        return object.id === Number(id);
    });
    self.setStatusValueToStorage(this.classList.value,storageData.indexOf(currentItem));
  }

  this.deleteItemFromList = function(){
    var id = this.parentElement.id;
    this.parentElement.remove();
    self.updateStorage(id);
    self.displayItemsCount(self.getItemsFromStorage().length);
  }

  this.updateStorage = function(id){
    var storageData = self.getItemsFromStorage();
    var currentItem = storageData.find(function(object){
        return object.id === Number(id);
    });
    storageData.splice(storageData.indexOf(currentItem),1);
    self.addItemsToStorage(storageData);
  }

  this.attachEventToButton = function(element,functionCallBack){
    element.addEventListener('click',functionCallBack);
  }

  this.onAllTasksClick = function(){
    var storageData = self.getItemsFromStorage();
    self.displayStorageItems(storageData);
  }

  this.onCompletedClick= function(){
    self.clearAllTasks(document.getElementById('displayArea'));
    var storageData = self.getItemsFromStorage();
    self.displayItemsCount(self.displayItems(storageData,true));
  }

  this.onPendingClick = function(){
    self.clearAllTasks(document.getElementById('displayArea'));
    var storageData = self.getItemsFromStorage();
    self.displayItemsCount(self.displayItems(storageData,false));
  }
}

Controller.prototype.attachEvents = function(){
  document.getElementById('selectStorage').addEventListener('change',this.onStorageType);
  document.getElementById('myInputField').addEventListener('keypress',this.getItemOnEnter);
}

Controller.prototype.showMessageOnInvalidStorage = function(){
  var storageMessage = 'Please select your required storage to store data...';
  document.getElementById('displayArea').innerHTML = storageMessage;
}

Controller.prototype.getStorageType = function(){
  return document.getElementById("selectStorage").value;
}

Controller.prototype.displayStorageItems = function(storageData){
  this.clearAllTasks(document.getElementById('displayArea'));
  for(var i = 0; i < storageData.length; i++){
    createViewInstance().createItem(storageData[i].id,storageData[i].name,storageData[i].status);
  }
  this.displayItemsCount(storageData.length);
}

Controller.prototype.createStorageManagerInstance = function(storageType){
  return new StorageManager(storageType,this.key);
}

Controller.prototype.getItemsFromStorage = function(){
  return this.createStorageManagerInstance(this.storageOne).getData();
}

Controller.prototype.clearAllTasks = function(element){
  element.innerHTML = '';
}

Controller.prototype.inputFieldReset = function(inputElement){
  inputElement.value = '';
  inputElement.focus();
}

Controller.prototype.displayItemsCount = function(count){
  document.getElementById('myCount').innerHTML = count;
}

Controller.prototype.onNewItem = function(inputElement){
  var id = Date.now();
  // self.onAllTasksClick();
  this.addItemToAnArray(id,inputElement.value);
  createViewInstance().createItem(id,inputElement.value);
  this.inputFieldReset(inputElement);
  this.displayItemsCount(this.getItemsFromStorage().length);
}

Controller.prototype.addItemToAnArray = function(id,item){
  var storageData = this.getItemsFromStorage();
  storageData.push({id:id,name:item,status:false});
  this.addItemsToStorage(storageData);
}

Controller.prototype.addItemsToStorage = function(storageData){
  this.createStorageManagerInstance(this.storageOne).setData(storageData);
  this.createStorageManagerInstance(this.storageTwo).setData(storageData);
}

Controller.prototype.setStatusValueToStorage = function(classValue,itemIndex){
  var storageData = this.getItemsFromStorage();
  storageData[itemIndex].status = (classValue === '') ?  false : true;
  this.addItemsToStorage(storageData);
}

Controller.prototype.setItemClassValue = function(checkBox,status){
  if(status === true){
    checkBox.classList = 'checked';
  }
}

Controller.prototype.displayItems = function(storageData,itemStatus){
  var count = 0;
  for(var i = 0; i < storageData.length; i++){
    if(storageData[i].status === itemStatus){
      createViewInstance().createItem(storageData[i].id,storageData[i].name,storageData[i].status);
      count++;
    }
  }
  return count;
}

// var config = {
//   storageKey : 'myTodoItems',
//   storageOne : 'localStorage',
//   storageTwo : 'sessionStorage'
// }

// var controllerInstance = new Controller(prompt());
var controllerInstance = new Controller({
  storageKey : 'myTodoItems',
  storageOne : 'localStorage',
  storageTwo : 'sessionStorage'
});

(function() {
  controllerInstance.attachEvents();
  controllerInstance.showMessageOnInvalidStorage();
})();