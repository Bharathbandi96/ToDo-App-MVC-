
function createControllerInstance(){
    return new Controller();
}

createControllerInstance().attachEventListner();
createControllerInstance().showMessageOnInvalidStorage();

function Controller(){

  var self = this;

  this.attachEventListner = function(){
    document.getElementById('myInput').addEventListener('keypress',self.getItemOnEnter);
    document.getElementById('selectStorage').addEventListener('change',self.tasksOnStorageType);
  }

  this.showMessageOnInvalidStorage = function(){
    var storageMessage = 'Please select your required storage to store data...';
    document.getElementById('displayArea').innerHTML = storageMessage;
  }

  this.getStorageType = function(){
    return document.getElementById("selectStorage").value;
  }

  this.tasksOnStorageType = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      var storageData = self.getItemsFromStorage();
      self.displayStorageItems(storageData);
    } else {
      self.showMessageOnInvalidStorage();
      self.displayItemsCount(0);
    }
  }

  this.displayStorageItems = function(storageData){
    self.clearTaskDisplayArea(document.getElementById('displayArea'));
    for(var i = 0; i < storageData.length; i++){
      createViewInstance().createItem(storageData[i].id,storageData[i].name,storageData[i].status);
    }
    self.displayItemsCount(storageData.length);
  }

  this.createStorageManagerInstance = function(storageType){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      return new StorageManager(storageType,'myTodoItems');
    }
    else{
      return '';
    }
  }

  this.getItemsFromStorage = function(){
    return self.createStorageManagerInstance('localStorage').getData();
  }

  this.clearTaskDisplayArea = function(displayAreaId){
    displayAreaId.innerHTML = '';
  }

  this.getItemOnEnter = function(){
    var enterKeyCode = 13;
    var inputText = document.getElementById('myInput');
    if (event.keyCode === enterKeyCode){
      self.newItemTasks(inputText);
    }
  }

  this.attachEventToAddTaskButton = function(button){
    button.addEventListener('click', self.getItemOnAddButtonClick);
  }

  this.getItemOnAddButtonClick = function(){
    var inputText = document.getElementById('myInput');
    self.newItemTasks(inputText);
  }
  
  this.newItemTasks = function(inputText){
    var selectedStorage = self.getStorageType();  
    if(inputText.value !== '' && (selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage')){
      var id = Date.now();
      self.allItems();
      self.addItemToAnArray(id,inputText.value);
      createViewInstance().createItem(id,inputText.value);
      self.inputFieldReset(inputText);
      self.displayItemsCount(self.getItemsFromStorage().length);
    }
  }

  this.addItemToAnArray = function(id,item){
    var storageData = self.getItemsFromStorage();
    storageData.push({id:id,name:item,status:false});
    self.addItemsToStorage(storageData);
  }

  this.addItemsToStorage = function(storageData){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      self.createStorageManagerInstance('localStorage').setData(storageData);
      self.createStorageManagerInstance('sessionStorage').setData(storageData);
    }
  }

  this.attachEventToCheckButton = function(checkButton){
    checkButton.addEventListener('click',self.setItemStatus);
  }

  this.setItemStatus = function(){
    var storageData = self.getItemsFromStorage();
    var item = this.parentElement.id;
    this.classList.toggle('checked');
    var currentItem = storageData.find(function(array){
        return array.id === Number(item);
    });
    self.setStatusValueToStorage(this.classList.value,storageData.indexOf(currentItem));
  }

  this.setStatusValueToStorage = function(classValue,itemIndex){
    var storageData = self.getItemsFromStorage();
    (classValue === '') ? storageData[itemIndex].status = false : storageData[itemIndex].status = true;
    self.addItemsToStorage(storageData);
  }

  this.setItemClassValue = function(checkButton,status){
    if(status === true){
      checkButton.classList = 'checked';
    }
  }

  this.attachEventToDeleteButton = function(deleteButton){
    deleteButton.addEventListener('click',self.deleteItem);
  }

  this.deleteItem = function(){
    var item = this.parentElement.id;
    this.parentElement.remove();
    self.deleteItemFromStorage(item);
    self.displayItemsCount(self.getItemsFromStorage().length);
  }

  this.deleteItemFromStorage = function(item){
    var storageData = self.getItemsFromStorage();
    var currentItem = storageData.find(function(array){
        return array.id === Number(item);
    });
    storageData.splice(storageData.indexOf(currentItem),1);
    self.addItemsToStorage(storageData);
  }

  this.inputFieldReset = function(inputText){
    inputText.value = '';
    inputText.focus();
  }
  
  this.attachEventToAllTaskButton = function(button){
    button.addEventListener('click', self.allItems);
  }
  
  this.attachEventToCompletedTaskButton = function(button){
    button.addEventListener('click', self.completedItems);
  }
  
  this.attachEventToPendingTaskButton = function(button){
    button.addEventListener('click', self.pendingItems);  
  }

  this.allItems = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      var storageData = self.getItemsFromStorage();
      self.displayStorageItems(storageData);
    }
  }

  this.completedItems = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      self.clearTaskDisplayArea(document.getElementById('displayArea'));
      var storageData = self.getItemsFromStorage();
      self.displayItemsCount(self.displayItemsOnStatus(storageData,true));
    }
  }

  this.pendingItems = function(){
    var selectedStorage = self.getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      self.clearTaskDisplayArea(document.getElementById('displayArea'));
      var storageData = self.getItemsFromStorage();
      self.displayItemsCount(self.displayItemsOnStatus(storageData,false));
    }
  }

  this.displayItemsOnStatus = function(storageData,itemStatus){
    var count = 0;
    for(var i = 0; i < storageData.length; i++){
      if(storageData[i].status === itemStatus){
        createViewInstance().createItem(storageData[i].id,storageData[i].name,storageData[i].status);
        count++;
      }
    }
    return count;
  }

  this.displayItemsCount = function(count){
    document.getElementById('myCount').innerHTML = count;
  }
}