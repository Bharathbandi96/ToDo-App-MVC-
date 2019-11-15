
function LocalStorage(key) {
    this.key = key,
    this.getData = function () { return JSON.parse(localStorage.getItem(this.key)) || []; },
    this.setData = function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
 }
  
function SessionStorage(key) {
    this.key = key,
    this.getData = function () { return JSON.parse(sessionStorage.getItem(this.key)) || []; },
    this.setData = function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
}

function Model(storageKey){
    this.storageKey = storageKey;
}

Model.prototype.addItemToAnArray = function(item,selectedStorage){
    var id = Date.now();
    var storageData = this.getItemsFromStorage(selectedStorage);
    storageData.push({id:id,name:item,status:false});
    this.addItemsToStorage(storageData);
    return id;
}

Model.prototype.addItemsToStorage = function(storageData){
    this.createStorageManagerInstance('localStorage').setData(storageData);
    this.createStorageManagerInstance('sessionStorage').setData(storageData);
}

Model.prototype.setItemStatus = function(id,selectedStorage){
    var storageData = this.getItemsFromStorage(selectedStorage);
    var id = Number(id);
    // e.target.classList.toggle('checked')
    var itemIndex = storageData.findIndex(function(object){
      return object.id === id;
    });
    this.updateStatusValueInStorage(itemIndex,storageData);
  }

Model.prototype.updateStatusValueInStorage = function(itemIndex,storageData){
    storageData[itemIndex].status = !storageData[itemIndex].status;
    this.addItemsToStorage(storageData);
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
    var itemId = Number(id);
    var itemIndex = storageData.findIndex(function(object){
        return object.id === itemId;
    });
    storageData.splice(itemIndex,1);
    this.addItemsToStorage(storageData);
}

Model.prototype.itemsCount = function(itemStatus,selectedStorage){
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function (item) {
        return item.status === itemStatus;
    });
    return items.length;
}

Model.prototype.getItemsFromStorage = function(selectedStorage){
    return this.createStorageManagerInstance(selectedStorage).getData();
}

Model.prototype.createStorageManagerInstance = function(storageType){
    return new StorageManager(storageType,this.storageKey);
}
