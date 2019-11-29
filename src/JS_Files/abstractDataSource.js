
function AbstractDataSource(storageType, key) {
    this.storageType = storageType;
    this.key = key;
    // this.storageInstance = getStorageInstance(this.storageType,this.key,this.callback)

    this.setData = function (data, callback) {
        getStorageInstance(this.storageType, this.key).setData(data, callback);
    };

    this.getData = function (callback) {
        return getStorageInstance(this.storageType, this.key).getData(callback);
    };

    this.deleteItem = function (id) {
        getStorageInstance(this.storageType).deleteItem(id)
    };

    this.updateItem = function (id, status) {
        getStorageInstance(this.storageType).updateItem(id, status)
    };
}

function getStorageInstance(storageType, key) {
    var storage = {
        'localStorage': function () {
            return new LocalStorage(key);
        },

        'sessionStorage': function () {
            return new SessionStorage(key);
        },

        'webAPI': function () {
            return new webAPI();
        }
    }
    return storage[storageType]();
}