
function AbstractDataSource(storageType, callback, key) {
    this.storageType = storageType;
    this.key = key;
    this.callback = callback;

    this.setData = function (data) {
        getStorageInstance(this.storageType, this.key, this.callback).setData(data);
    };

    this.getData = function () {
        return getStorageInstance(this.storageType, this.key, this.callback).getData();
    };

    this.deleteItem = function (id) {
        getStorageInstance(this.storageType).deleteItem(id)
    };

    this.updateItem = function (id, status) {
        getStorageInstance(this.storageType).updateItem(id, status)
    };
}

function getStorageInstance(storageType, key, callback) {
    var storage = {
        'localStorage': function () {
            return new LocalStorage(key);
        },

        'sessionStorage': function () {
            return new SessionStorage(key);
        },

        'webApi': function () {
            return new WebApi(callback);
        }
    }
    return storage[storageType]();
}