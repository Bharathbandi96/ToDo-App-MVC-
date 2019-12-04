
// var App = (function () {
function App(View, DataSource) {
  this.rootElement = View.rootElement;
  this.viewInstance = View;
  this.modelInstance = DataSource;
  this.storageTypes = this.modelInstance.storageTypes;
  this.buttonValues = {
    allTasks: 'allTaskButton',
    completed: 'completedButton',
    pending: 'pendingButton',
    clearCompleted: 'clearCompleted'
  };
  this.buttonClicked;
  this.storageType;
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
  this.buttonClicked = '';
  this.storageType = viewInstance.getStorageType();
  var storageData;
  if (this.storageType !== 'selectStorage') {
    this.viewInstance.clearAllTasks();
    storageData = this.modelInstance.getItemsFromStorage(this.storageType, this.onResponse.bind(this));
    viewInstance.displayStorageItems(storageData);
    (this.storageType !== this.storageTypes.webAPI) ? this.itemsCount(storageData) : null;
  }
  else {
    viewInstance.showMessageOnInvalidStorage();
    viewInstance.displayItemsCount(0);
  }
}

App.prototype.onEnter = function () {
  var viewInstance = this.viewInstance;
  if (event.keyCode === 13) {
    var inputElement = viewInstance.getItem();
    if (inputElement !== '' && this.storageType !== 'selectStorage') {
      this.addNewItem(inputElement, this.storageType);
      viewInstance.resetAndFocusInputField();
    }
  }
}

App.prototype.onAddClick = function () {
  var viewInstance = this.viewInstance;
  var inputElement = viewInstance.getItem();
  if (inputElement !== '' && this.storageType !== 'selectStorage') {
    this.addNewItem(inputElement, this.storageType);
    viewInstance.resetAndFocusInputField();
  }
}

App.prototype.addNewItem = function (inputElement, storageType) {
  var modelInstance = this.modelInstance;
  var id = modelInstance.addItemToStorage(inputElement, this.onResponse.bind(this));
  if (storageType !== this.storageTypes.webAPI) {
    if (this.buttonClicked !== this.buttonValues.completed) {
      this.viewInstance.createItem(id, inputElement);
    }
    this.itemsCount(modelInstance.getItemsFromStorage(storageType));
  }
}

App.prototype.onResponse = function (data) {
  if (this.storageType === this.storageTypes.webAPI) {
    if (this.buttonClicked !== this.buttonValues.completed) {
      this.displayItems(data);
    }
    this.modelInstance.getItemsFromStorage(this.storageType, this.itemsCount.bind(this));
  }
}

App.prototype.displayItems = function (data) {
  for (var i in data) {
    var id = this.modelInstance.getId(data[i].url);
    this.viewInstance.createItem(id, data[i].title, data[i].completed);
  }
}

App.prototype.itemsCount = function (storageData) {
  var itemsCount = this.modelInstance.getItemsUsingStatus(storageData, false).length;
  this.viewInstance.displayItemsCount(itemsCount);
}

App.prototype.onCheckBoxClick = function (e) {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  if (this.buttonClicked === this.buttonValues.completed || this.buttonClicked === this.buttonValues.pending) {
    viewInstance.deleteItemFromView(e.detail.currentElement);
  }
  if (e.detail.storageType === this.storageTypes.webAPI) {
    var status = (e.detail.checkBox.classList.value === 'checked') ? true : false;
    modelInstance.updateStorageItem(e.detail.storageType, e.detail.id, status);
    modelInstance.getItemsFromStorage(e.detail.storageType, this.itemsCount.bind(this));
  } else {
    modelInstance.updateItemStatus(e.detail.id, e.detail.storageType);
    var itemsCount = modelInstance.getItemsCount(e.detail.storageType);
    viewInstance.displayItemsCount(itemsCount);
  }
}

App.prototype.onDeleteClick = function (e) {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  viewInstance.deleteItemFromView(e.detail.currentElement);
  if (e.detail.storageType === this.storageTypes.webAPI) {
    modelInstance.deleteItemFromStorage(e.detail.storageType, e.detail.id);
    modelInstance.getItemsFromStorage(e.detail.storageType, this.itemsCount.bind(this));
  } else {
    modelInstance.updateStorage(e.detail.id, e.detail.storageType);
    var itemsCount = modelInstance.getItemsCount(e.detail.storageType);
    viewInstance.displayItemsCount(itemsCount);
  }
}

App.prototype.onAllTasksClick = function () {
  var viewInstance = this.viewInstance;
  if (this.storageType !== 'selectStorage') {
    this.buttonClicked = this.buttonValues.allTasks;
    var storageData = this.modelInstance.getItemsFromStorage(this.storageType, this.onButtonClickResponse.bind(this));
    viewInstance.displayStorageItems(storageData);
  }
}

App.prototype.onCompletedClick = function () {
  this.buttonClicked = this.buttonValues.completed;
  this.getItemsBasedOnStatus(true);
}

App.prototype.onPendingClick = function () {
  this.buttonClicked = this.buttonValues.pending;
  this.getItemsBasedOnStatus(false);
}

App.prototype.getItemsBasedOnStatus = function (status) {
  var viewInstance = this.viewInstance;
  var modelInstance = this.modelInstance;
  if (this.storageType !== 'selectStorage') {
    var items = modelInstance.getItems(status, this.storageType, this.onButtonClickResponse.bind(this));
    var itemsCount = (this.storageType !== this.storageTypes.webAPI) ? modelInstance.getItemsCount(this.storageType) : null;
    viewInstance.displayStorageItems(items);
    viewInstance.displayItemsCount(itemsCount);
  }
}

App.prototype.onButtonClickResponse = function (data) {
  var items;
  var modelInstance = this.modelInstance;
  var viewInstance = this.viewInstance;
  viewInstance.clearAllTasks();
  if (this.buttonClicked === this.buttonValues.allTasks) {
    this.displayItems(data);
  }
  if (this.buttonClicked === this.buttonValues.completed) {
    items = modelInstance.getItemsUsingStatus(data, true);
    this.displayItems(items);
  }
  if (this.buttonClicked === this.buttonValues.pending) {
    items = modelInstance.getItemsUsingStatus(data, false);
    this.displayItems(items);
  }
  if (this.buttonClicked === this.buttonValues.clearCompleted) {
    items = modelInstance.getItemsUsingStatus(data, true);
    for (var i in items) {
      var id = modelInstance.getId(items[i].url);
      modelInstance.deleteItemFromStorage(this.storageType, id);
    }
    modelInstance.getItemsFromStorage(this.storageType, this.onResponse.bind(this));
  }
  modelInstance.getItemsFromStorage(this.storageType, this.itemsCount.bind(this));
}

App.prototype.onClearCompletedClick = function () {
  if (this.storageType !== 'selectStorage') {
    this.buttonClicked = this.buttonValues.clearCompleted;
    (this.storageType === this.storageTypes.webAPI) ? this.modelInstance.getItemsFromStorage(this.storageType, this.onButtonClickResponse.bind(this)) : this.clearCompletedTasks(this.storageType);
  }
}

App.prototype.clearCompletedTasks = function (storageType) {
  var modelInstance = this.modelInstance;
  var items = modelInstance.getItems(true, storageType);
  var storageData = modelInstance.getItemsFromStorage(storageType);
  for (var i in items) {
    storageData = modelInstance.updateArray(items[i].id, storageData);
  }
  modelInstance.setItemsToStorage(storageType, storageData);
  this.viewInstance.displayStorageItems(storageData);
}

//   return new App(view, model)
// })();
