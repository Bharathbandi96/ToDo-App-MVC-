
function LocalStorage(key) {
    this.key = key,
    this.getData = function () { return JSON.parse(localStorage.getItem(this.key)) || []; },
    this.setData = function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
 }
  
function SessionStorage(key) {
    this.key = key,
    // this.getData = function () { return JSON.parse(sessionStorage.getItem(this.key)) || []; },
    this.setData = function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
}

function Model(storageKey){
    var self = this;
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

Model.prototype.setItemStatus = function(e){
    // debugger;
    var storageData = this.getItemsFromStorage();
    var id = e.target.parentElement.id;
    e.target.classList.toggle('checked');
    var currentItem = storageData.find(function(object){
      return object.id === Number(id);
    });
    this.updateStatusValueInStorage(e.target.classList.value,storageData.indexOf(currentItem));
  }

Model.prototype.updateStatusValueInStorage = function(statusValue,itemIndex){
    var storageData = this.getItemsFromStorage();
    storageData[itemIndex].status = (statusValue === '') ?  false : true;
    this.addItemsToStorage(storageData);
}

Model.prototype.updateStorage = function(id){
    var storageData = this.getItemsFromStorage();
    var currentItem = storageData.find(function(object){
        return object.id === Number(id);
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
