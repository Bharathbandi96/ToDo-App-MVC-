
function App(view, DataSource) {
  this.rootElement = view.rootElement;
  this.viewInstance = view;
  this.modelInstance = DataSource;
  this.buttonValues = {
    allTasksValue: 'allTaskButton',
    completedValue: 'completedButton',
    pendingValue: 'pendingButton',
    clearCompletedValue: 'clearCompleted'
  };
  this.buttonClicked;
}

App.prototype.init = function () {
  this.viewInstance.initialize();
  this.attachEvents();
  this.onStorageSelect();
}

App.prototype.attachEvents = function () {
  var events = {
    onAddItem: this.onAddClick.bind(this),
    onStorageChange: this.onStorageSelect.bind(this),
    keypress: this.onEnter.bind(this),
    showAllTasks: this.onAllTasksClick.bind(this),
    showCompletedTasks: this.onCompletedClick.bind(this),
    showPendingTasks: this.onPendingClick.bind(this),
    onCheckBoxChange: this.onCheckBoxClick.bind(this),
    deleteButtonEvent: this.onDeleteClick.bind(this),
    clearCompletedEvent: this.onClearCompletedClick.bind(this),
  };
  for (var key in events) {
    this.rootElement.addEventListener(key, events[key]);
  }
}

App.prototype.onStorageSelect = function () {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  this.buttonClicked = '';
  var storageType = viewInstance.getStorageType();
  var storageData;
  if (storageType !== 'selectStorage') {
    if (storageType === 'webApi') {
      this.viewInstance.clearAllTasks();
      storageData = modelInstance.getItemsFromStorage(storageType, this.onResponse.bind(this));
    }
    else {
      storageData = modelInstance.getItemsFromStorage(storageType);
      viewInstance.displayStorageItems(storageData);
      this.itemsCount(storageType);
    }
  }
  else {
    viewInstance.showMessageOnInvalidStorage();
    viewInstance.displayItemsCount(0);
  }
}

App.prototype.onResponse = function (data) {
  this.displayItems(data);
}

App.prototype.displayItems = function (data) {
  var storageType = this.viewInstance.getStorageType();
  if (storageType === 'webApi')
    for (var i in data) {
      var id = this.modelInstance.getId(data[i].url);
      this.viewInstance.createItem(id, data[i].title, data[i].completed);
    }
  this.modelInstance.getItemsFromStorage('webApi', this.count.bind(this));
}

App.prototype.onEnter = function () {
  var viewInstance = this.viewInstance;
  if (event.keyCode === 13) {
    var storageType = viewInstance.getStorageType();
    var inputElement = viewInstance.getItem();
    if (inputElement !== '' && storageType !== 'selectStorage') {
      this.addNewItem(inputElement, storageType);
      viewInstance.resetAndFocusInputField();
    }
  }
}

App.prototype.onAddClick = function () {
  var viewInstance = this.viewInstance;
  var storageType = viewInstance.getStorageType();
  var inputElement = viewInstance.getItem();
  if (inputElement !== '' && storageType !== 'selectStorage') {
    this.addNewItem(inputElement, storageType);
    viewInstance.resetAndFocusInputField();
  }
}

App.prototype.addNewItem = function (inputElement, storageType) {
  var id = this.modelInstance.addItemToStorage(inputElement, this.onResponse.bind(this));
  if (this.buttonClicked !== 'completedButton' && storageType !== 'webApi') {
    this.viewInstance.createItem(id, inputElement);
    this.itemsCount(storageType);
  }
}

App.prototype.itemsCount = function (storageType) {
  var itemsCount = this.modelInstance.getItemsCount(storageType);
  this.viewInstance.displayItemsCount(itemsCount);
}

App.prototype.onCheckBoxClick = function (e) {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var itemsCount;
  var storageType = viewInstance.getStorageType();
  if (this.buttonClicked === 'completedButton' || this.buttonClicked === 'pendingButton') {
    viewInstance.deleteItemFromView(e.detail.currentElement);
  }
  if (storageType === 'webApi') {
    var status = (e.detail.checkBox.classList.value === 'checked') ? true : false;
    modelInstance.updateStorageItem(storageType, e.detail.id, status);
    modelInstance.getItemsFromStorage(storageType, this.count.bind(this));
  } else {
    modelInstance.updateItemStatus(e.detail.id, e.detail.storageType);
    itemsCount = modelInstance.getItemsCount(e.detail.storageType);
    viewInstance.displayItemsCount(itemsCount);
  }
}

App.prototype.onDeleteClick = function (e) {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var storageType = viewInstance.getStorageType();
  var itemsCount;
  viewInstance.deleteItemFromView(e.detail.currentElement);
  if (storageType === 'webApi') {
    modelInstance.deleteItemFromStorage(storageType, e.detail.id);
    modelInstance.getItemsFromStorage(storageType, this.count.bind(this));
  } else {
    modelInstance.updateStorage(e.detail.id, e.detail.storageType);
    itemsCount = modelInstance.getItemsCount(e.detail.storageType);
    viewInstance.displayItemsCount(itemsCount);
  }
}

App.prototype.onAllTasksClick = function () {
  var viewInstance = this.viewInstance;
  var storageType = viewInstance.getStorageType();
  if (storageType !== 'selectStorage') {
    this.buttonClicked = this.buttonValues.allTasksValue;
    if (storageType !== 'webApi') {
      var storageData = this.modelInstance.getItemsFromStorage(storageType);
      viewInstance.displayStorageItems(storageData);
    } else {
      this.modelInstance.getItemsFromStorage(storageType, this.onButtonClick.bind(this));
    }
  }
}

App.prototype.onCompletedClick = function () {
  this.buttonClicked = this.buttonValues.completedValue;
  this.getItemsBasedOnStatus(true);
}

App.prototype.onPendingClick = function () {
  this.buttonClicked = this.buttonValues.pendingValue;
  this.getItemsBasedOnStatus(false);
}

App.prototype.getItemsBasedOnStatus = function (status) {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var storageType = viewInstance.getStorageType();
  if (storageType !== 'selectStorage') {
    if (storageType !== 'webApi') {
      var items = modelInstance.getItemsByStatus(status, storageType);
      var itemsCount = modelInstance.getItemsCount(storageType);
      viewInstance.displayStorageItems(items);
      viewInstance.displayItemsCount(itemsCount);
    } else {
      modelInstance.getItemsFromStorage(storageType, this.onButtonClick.bind(this));
    }
  }
}

App.prototype.onButtonClick = function (data) {
  var items;
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  if (this.buttonClicked === this.buttonValues.allTasksValue) {
    viewInstance.clearAllTasks();
    this.displayItems(data);
  }
  if (this.buttonClicked === this.buttonValues.completedValue) {
    items = modelInstance.getItemsUsingStatus(data, true);
    viewInstance.clearAllTasks();
    this.displayItems(items);
  }
  if (this.buttonClicked === this.buttonValues.pendingValue) {
    viewInstance.clearAllTasks();
    items = modelInstance.getItemsUsingStatus(data, false);
    this.displayItems(items);
  }
  if (this.buttonClicked === this.buttonValues.clearCompletedValue) {
    items = modelInstance.getItemsUsingStatus(data, true);
    for (var i in items) {
      var id = modelInstance.getId(items[i].url);
      modelInstance.createStorageManagerInstance('webApi').deleteItem(id);
    }
    viewInstance.clearAllTasks();
    modelInstance.getItemsFromStorage('webApi', this.onResponse.bind(this));
  }
  modelInstance.getItemsFromStorage('webApi', this.count.bind(this));
}

App.prototype.onClearCompletedClick = function () {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  var storageType = viewInstance.getStorageType();
  if (storageType !== 'selectStorage') {
    this.buttonClicked = this.buttonValues.clearCompletedValue;
    if (storageType !== 'webApi') {
      var storageData = modelInstance.getItemsFromStorage(storageType);
      var items = modelInstance.getItemsByStatus(true, storageType);
      for (var i in items) {
        storageData = modelInstance.updateArray(items[i].id, storageData);
      }
      modelInstance.setItemsToStorage(storageType, storageData);
      viewInstance.displayStorageItems(storageData);
    } else {
      modelInstance.getItemsFromStorage(storageType, this.onButtonClick.bind(this));
    }
  }
}

App.prototype.count = function (data) {
  var itemsCount = this.modelInstance.getItemsUsingStatus(data, false).length;
  this.viewInstance.displayItemsCount(itemsCount);
}
