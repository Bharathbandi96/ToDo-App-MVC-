
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

function Model(){
}

Model.prototype.addItemToAnArray = function(id,item){
    var storageData = controllerInstance.getItemsFromStorage();
    storageData.push({id:id,name:item,status:false});
    this.addItemsToStorage(storageData);
}

Model.prototype.addItemsToStorage = function(storageData){
    controllerInstance.createStorageManagerInstance(controllerInstance.storageOne).setData(storageData);
    controllerInstance.createStorageManagerInstance(controllerInstance.storageTwo).setData(storageData);
}

Model.prototype.updateStatusValueInStorage = function(statusValue,itemIndex){
    var storageData = controllerInstance.getItemsFromStorage();
    storageData[itemIndex].status = (statusValue === '') ?  false : true;
    this.addItemsToStorage(storageData);
}

Model.prototype.updateStorage = function(id){
    var storageData = controllerInstance.getItemsFromStorage();
    var currentItem = storageData.find(function(object){
        return object.id === Number(id);
    });
    storageData.splice(storageData.indexOf(currentItem),1);
    this.addItemsToStorage(storageData);
}

// var ModelInstance = new Model();