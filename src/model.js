
function LocalStorage(storageKey) {
    this.key = storageKey,
    this.getData = function () { return JSON.parse(localStorage.getItem(this.key)) || []; },
    this.setData = function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
}
  
function SessionStorage(storageKey) {
    this.key = storageKey,
    this.getData = function () { return JSON.parse(sessionStorage.getItem(this.key)) || []; },
    this.setData = function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
}

function Model(storageKey){
    this.storageKey = storageKey;
}

Model.prototype.addItemToAnArray = function(itemId,item,selectedStorage){
    var storageData = this.getItemsFromStorage(selectedStorage);
    storageData.push({id:itemId,name:item,status:false});
    this.addItemsToStorage(selectedStorage,storageData);
}

Model.prototype.createId = function(){
    return Date.now().toString();
}

Model.prototype.addItemsToStorage = function(selectedStorage,storageData){
    this.createStorageManagerInstance(selectedStorage).setData(storageData);
}

Model.prototype.setItemStatus = function(id,selectedStorage){
    var storageData = this.getItemsFromStorage(selectedStorage);
    var itemId = id;
    var itemIndex = storageData.findIndex(function(object){
      return object.id === itemId;
    });
    this.updateStatusValueInStorage(itemIndex,storageData,selectedStorage);
  }

Model.prototype.updateStatusValueInStorage = function(itemIndex,storageData,selectedStorage){
    storageData[itemIndex].status = !storageData[itemIndex].status;
    this.addItemsToStorage(selectedStorage,storageData);
}

Model.prototype.getItemsByStatus = function (itemStatus,selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function (item) {
      return item.status === itemStatus;
    });
    return items;
  }

Model.prototype.updateStorage = function(id,selectedStorage){
    var storageData = this.getItemsFromStorage(selectedStorage);
    var updatedArray = this.deleteItemFromArray(id,storageData)
    this.addItemsToStorage(selectedStorage,updatedArray);
}

Model.prototype.getUpdatedArray = function(id,storageData){
    var updatedArray = this.deleteItemFromArray(id,storageData)
    return updatedArray;
}

Model.prototype.deleteItemFromArray = function(id,storageData){
    var itemIndex = storageData.findIndex(function(object){
        return object.id === id;
    });
    storageData.splice(itemIndex,1);
    return storageData;
}

Model.prototype.getItemsCount = function(selectedStorage){
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function (item) {
        return item.status === false;
    });
    return items.length;
}

Model.prototype.getItemsFromStorage = function(selectedStorage){
    return this.createStorageManagerInstance(selectedStorage).getData();
}

Model.prototype.createStorageManagerInstance = function(selectedStorage){
    return new StorageManager(selectedStorage,this.storageKey);
}