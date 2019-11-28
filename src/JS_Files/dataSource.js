
function LocalStorage(storageKey) {
    this.key = storageKey;
    this.getData = function () {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    };
    this.setData = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
}

function SessionStorage(storageKey) {
    this.key = storageKey;
    this.getData = function () {
        return JSON.parse(sessionStorage.getItem(this.key)) || [];
    };
    this.setData = function (data) {
        sessionStorage.setItem(this.key, JSON.stringify(data));
    };
}

function WebApi(callback) {
    this.xhr = new XMLHttpRequest();
    this.url = 'https://todo-backend-express.herokuapp.com/';
    // console.log(callback)
    this.getData = function () {
        this.xhr.open('GET', this.url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/JSON');
        this.xhr.send(null);
        this.xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                callback(JSON.parse(this.response));
            }
        };
    };

    this.setData = function (data) {
        this.xhr.open('POST', this.url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/JSON');
        this.xhr.send(JSON.stringify(data));
        this.xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                callback([JSON.parse(this.response)]);
            }
        };
    };

    this.deleteItem = function (id) {
        this.xhr.open('DELETE', this.url + id, true);
        this.xhr.send(null);
    };

    this.updateItem = function (id, status) {
        this.xhr.open('PATCH', this.url + id, true);
        this.xhr.setRequestHeader('Content-type', 'application/json');
        this.xhr.send(JSON.stringify({ 'completed': status }));
    };
}

function DataSource(storageKey) {
    this.storageKey = storageKey;
    this.storageTypes = {
        localStorage: 'localStorage',
        sessionStorage: 'sessionStorage',
        webApi: 'webApi'
    };
}

DataSource.prototype.addItemToStorage = function (item, callback) {
    var itemId = this.createId();
    for (var key in this.storageTypes) {
        if (this.storageTypes[key] !== 'webApi') {
            var storageData = this.getItemsFromStorage(this.storageTypes[key]);
            storageData.push({ id: itemId, title: item, completed: false });
            this.setItemsToStorage(this.storageTypes[key], storageData);
        } else {
            var data = { 'title': item, 'order': null, 'completed': '', 'url': '' };
            this.setItemsToStorage(this.storageTypes[key], data, callback);
        }
    }
    return itemId;
}

DataSource.prototype.createId = function () {
    return Date.now().toString();
}

DataSource.prototype.getId = function (item) {
    return item.slice(42).toString();
}

DataSource.prototype.setItemsToStorage = function (selectedStorage, storageData, callback) {
    this.createStorageManagerInstance(selectedStorage, callback).setData(storageData);
}

DataSource.prototype.updateItemStatus = function (id, selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var itemIndex = storageData.findIndex(function (object) {
        return object.id === id;
    });
    storageData[itemIndex].completed = !storageData[itemIndex].completed;
    this.setItemsToStorage(selectedStorage, storageData);
}

DataSource.prototype.getItemsByStatus = function (itemStatus, selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function (item) {
        return item.completed === itemStatus;
    });
    return items;
}

DataSource.prototype.updateStorage = function (id, selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var updatedArray = this.updateArray(id, storageData);
    this.setItemsToStorage(selectedStorage, updatedArray);
}
//deleteItemFromArray
DataSource.prototype.updateArray = function (id, storageData) {
    return storageData.filter(function (item) {
        return item.id !== id;
    });
}

DataSource.prototype.getItemsCount = function (selectedStorage) {
    var storageData = this.getItemsFromStorage(selectedStorage);
    var items = storageData.filter(function (item) {
        return item.completed === false;
    });
    return items.length;
}

DataSource.prototype.getItemsFromStorage = function (selectedStorage, callback) {
    return this.createStorageManagerInstance(selectedStorage, callback).getData();
}

DataSource.prototype.deleteItemFromStorage = function (selectedStorage, id) {
    this.createStorageManagerInstance(selectedStorage).deleteItem(id);
}

DataSource.prototype.updateStorageItem = function (selectedStorage, id, status) {
    this.createStorageManagerInstance(selectedStorage).updateItem(id, status)
}

DataSource.prototype.createStorageManagerInstance = function (selectedStorage, callback) {
    return new AbstractDataSource(selectedStorage, callback, this.storageKey);
}

DataSource.prototype.getItemsUsingStatus = function (data, status) {
    var items = data.filter(function (item) {
        return item.completed === status;
    });
    return items;
}