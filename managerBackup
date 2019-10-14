function StorageManager(storageType, key) {
    return {
        storageType: storageType,
        key: key,
        
        setData: function (data) {
            getStorageInstance(this.storageType,this.key).setData(data);
        },
        getData: function () {
            return getStorageInstance(this.storageType,this.key).getData();
        },
    };
}

function getStorageInstance(storageType,key) {
    var test = {
        'LocalStorage' : function () { return new LocalStorage(key) },

        'SessionStorage' : function () { return new SessionStorage(key) }
    }
    return test[storageType]();
}