
function StorageManager(storageType, key) {
    this.storageType = storageType,
    this.key = key,

    this.setData = function(data) {
        getStorageInstance(this.storageType,this.key).setData(data);
    },
    this.getData = function() {
        return getStorageInstance(this.storageType,this.key).getData();
    }
}

function getStorageInstance(storageType,key) {
    var storage = {
        'localStorage' : function() {
            return new LocalStorage(key) 
        },

        'sessionStorage' : function() {
            return new SessionStorage(key) 
        }
    }
    return storage[storageType]();
}