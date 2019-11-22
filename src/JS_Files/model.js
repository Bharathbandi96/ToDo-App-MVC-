
function LocalStorage(storageKey) {
    this.key = storageKey,
    this.getData = function() { 
        return JSON.parse(localStorage.getItem(this.key)) || []; 
    },
    this.setData = function(data) { 
        localStorage.setItem(this.key, JSON.stringify(data)); 
    }
}
  
function SessionStorage(storageKey) {
    this.key = storageKey,
    this.getData = function() { 
        return JSON.parse(sessionStorage.getItem(this.key)) || []; 
    },
    this.setData = function(data) { 
        sessionStorage.setItem(this.key, JSON.stringify(data)); 
    }
}

function Model(storageKey) {
    this.storageKey = storageKey;
    this.storageTypes = {
        localStorage : 'localStorage',
        sessionStorage : 'sessionStorage'
    }
}

Model.prototype.addItemToStorage = function(item) {
    var itemId = this.createId();
    for(var key in this.storageTypes){
        var storageData = this.getItemsFromStorage(this.storageTypes[key]);
        storageData.push({id:itemId,name:item,status:false});
        this.setItemsToStorage(this.storageTypes[key],storageData);
    }
    return itemId;
}

Model.prototype.createId = function() {
    return Date.now().toString();
}

Model.prototype.setItemsToStorage = function(selectedStorage,storageData) {
    this.createStorageManagerInstance(selectedStorage).setData(storageData);
}

Model.prototype.updateItemStatus = function(id,selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var itemIndex = storageData.findIndex(function(object) {
        return object.id === id;
    });
    storageData[itemIndex].status = !storageData[itemIndex].status;
    this.setItemsToStorage(selectedStorage,storageData);
}

Model.prototype.getItemsByStatus = function(itemStatus,selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function(item) {
      return item.status === itemStatus;
    });
    return items;
}

Model.prototype.updateStorage = function(id,selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var updatedArray = this.updateArray(id,storageData)
    this.setItemsToStorage(selectedStorage,updatedArray);
}
//deleteItemFromArray
Model.prototype.updateArray = function(id,storageData) {
    return storageData.filter(function(item) {
        return item.id !== id;
    });
}

Model.prototype.getItemsCount = function(selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function(item) {
        return item.status === false;
    });
    return items.length;
}

Model.prototype.getItemsFromStorage = function(selectedStorage) {
    return this.createStorageManagerInstance(selectedStorage).getData();
}

Model.prototype.createStorageManagerInstance = function(selectedStorage) {
    return new StorageManager(selectedStorage,this.storageKey);
}