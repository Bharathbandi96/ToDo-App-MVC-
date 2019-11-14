
function LocalStorage(key) {
    this.key = key,
    this.getData = function () { return JSON.parse(localStorage.getItem(this.key)) || []; },
    this.setData = function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
 }
  
function SessionStorage(key) {
    this.key = key,
    this.setData = function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
}

function Model(storageKey){
    this.storageKey = storageKey;
}

Model.prototype.addItemToAnArray = function(id,item){
    var storageData = this.getItemsFromStorage();
    storageData.push({id:id,name:item,status:false});
    this.addItemsToStorage(storageData);
}

Model.prototype.addItemsToStorage = function(storageData){
    this.createStorageManagerInstance('localStorage').setData(storageData);
    this.createStorageManagerInstance('sessionStorage').setData(storageData);
}

Model.prototype.updateStatusValueInStorage = function(statusValue,itemIndex){
    var storageData = this.getItemsFromStorage();
    storageData[itemIndex].status = (statusValue === '') ?  false : true;
    this.addItemsToStorage(storageData);
}

Model.prototype.getItemsByStatus = function (storageData, itemStatus) {
    var items = storageData.filter(function (item) {
      return item.status === itemStatus;
    });
    return items;
  }

Model.prototype.updateStorage = function(id){
    var storageData = this.getItemsFromStorage();
    var itemId = Number(id);
    var currentItem = storageData.find(function(object){
        return object.id === itemId;
    });
    storageData.splice(storageData.indexOf(currentItem),1);
    this.addItemsToStorage(storageData);
}

Model.prototype.getItemsFromStorage = function(){
    return this.createStorageManagerInstance('localStorage').getData();
}

Model.prototype.createStorageManagerInstance = function(storageType){
    return new StorageManager(storageType,this.storageKey);
}

Model.prototype.getStorageType = function(rootId){
    return rootId.querySelector('#storageDropDown').value;
}