
function View() {
  // var self = this;

  this.init = function(){
  this.createHeader();
  this.createAppTitle();
  this.createInputField();
  this.createAddTaskButton();
  this.createTaskDisplayArea();
  this.createFooter();
  this.createItemCountView();
  this.createAllTaskButton();
  this.createCompletedTaskButton();
  this.createPendingTaskButton();
  this.createSelectElement();
  this.showMessageOnInvalidStorage();
  }

  this.createHeader = function () {
    var header = this.createAnElement('div', { id: 'header' })
    document.querySelector('#app').appendChild(header)
    return header;
  }

  this.createAppTitle = function () {
    var title = this.createAnElement('h2', {});
    title.innerText = 'My  To-Do  List';
    this.appendHeaderElements(title);
  }

  this.createInputField = function () {
    var inputField = this.createAnElement('input', { type: 'text', id: 'taskInputField', placeholder: 'Add your list items here...' });
    this.appendHeaderElements(inputField);
  }

  this.createAddTaskButton = function () {
    var button = this.createAnElement('button',{id : 'addButton'})
    button.appendChild(document.createTextNode('Add'));
    this.appendHeaderElements(button);
    controllerInstance.attachEventToButton(button, controllerInstance.getItemOnAddClick);
  }

  this.createTaskDisplayArea = function () {
    var displayArea = this.createAnElement('ul', { id: 'displayArea' });
    document.querySelector('#app').appendChild(displayArea)
    return displayArea;
  }

  this.createFooter = function () {
    var footer = this.createAnElement('div', { id: 'footer' })
    document.querySelector('#app').appendChild(footer)
    return footer;
  }

  this.createItemCountView = function () {
    var countMessage = this.createAnElement('span', { id: 'countMessage' });
    var taskCount = this.createAnElement('span', { id: 'taskCount' });
    countMessage.appendChild(document.createTextNode('No. of Item(s) left: '));
    taskCount.innerText = 0;
    countMessage.appendChild(taskCount);
    this.appendFooterElements(countMessage);
  }

  this.createAllTaskButton = function () {
    var button = this.createAnElement('button',{id : 'allTaskButton'});
    button.appendChild(document.createTextNode('All Tasks'));
    this.appendFooterElements(button);
    controllerInstance.attachEventToButton(button, controllerInstance.onAllTasksClick);
  }

  this.createCompletedTaskButton = function () {
    var button = this.createAnElement('button',{id : 'completedTaskButton'});
    button.appendChild(document.createTextNode('Completed'));
    this.appendFooterElements(button);
    controllerInstance.attachEventToButton(button, controllerInstance.onCompletedClick);
  }

  this.createPendingTaskButton = function () {
    var button = this.createAnElement('button',{id : 'pendingTaskButton'});
    button.appendChild(document.createTextNode('Pending'));
    this.appendFooterElements(button);
    controllerInstance.attachEventToButton(button, controllerInstance.onPendingClick);
  }

  this.createSelectElement = function () {
    var selectElement = this.createAnElement('select', { id: 'storageDropDown' });
    var option1 = this.createAnElement('option', { value: 'selectStorage' })
    option1.innerText = 'Select Storage';
    var option2 = this.createAnElement('option', { value: 'localStorage' })
    option2.innerText = 'Local Storage';
    var option3 = this.createAnElement('option', { value: 'sessionStorage' })
    option3.innerText = 'Session Storage';
    this.appendOptions(selectElement, [option1, option2, option3])
    this.appendFooterElements(selectElement);
  }

  this.appendOptions = function (select, array) {
    array.forEach(function (ele) {
      select.appendChild(ele);
    });
  }
}

View.prototype.showMessageOnInvalidStorage = function () {
  var storageMessage = 'Please select your required storage to store data...';
  document.querySelector('#displayArea').innerHTML = storageMessage;
}

View.prototype.createItem = function (itemId, item, status) {
  var li = this.createAnElement('li',{id : itemId})
  this.createCheckButton(li, status)
  this.createTextContent(li, item);
  this.createDeleteButton(li);
  this.appendItemToList(li);
}

View.prototype.createCheckButton = function (li, status) {
  var checkBox = this.createAnElement('span',{id : 'check'})
  controllerInstance.setItemClassName(checkBox, status);
  controllerInstance.attachEventToButton(checkBox, controllerInstance.setItemStatus);
  li.appendChild(checkBox);
}

View.prototype.createTextContent = function (li, item) {
  var taskNode = this.createAnElement('SPAN',{});
  taskNode.appendChild(document.createTextNode(item));
  li.appendChild(taskNode);
}

View.prototype.createDeleteButton = function (li) {
  var deleteButton = this.createAnElement('SPAN',{class : 'close'})
  deleteButton.appendChild(document.createTextNode('\u00D7'));
  li.appendChild(deleteButton);
  controllerInstance.attachEventToButton(deleteButton, controllerInstance.deleteItemFromList);
}

View.prototype.createAnElement = function (elementType, attributes) {
  var element = document.createElement(elementType, attributes);
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

View.prototype.appendItemToList = function (item) {
  var displayAreaId = document.querySelector('#displayArea');
  displayAreaId.appendChild(item);
}

View.prototype.appendHeaderElements = function (element) {
  var headerId = document.querySelector('#header');
  headerId.appendChild(element);
}

View.prototype.appendFooterElements = function (element) {
  var footerId = document.querySelector('#footer');
  footerId.appendChild(element);
}

View.prototype.displayItems = function (storageData, itemStatus) {
  this.clearAllTasks(document.querySelector('#displayArea'));
  var items = storageData.filter(function (item) {
    return item.status === itemStatus;
  })
  for (var i = 0; i < items.length; i++) {
    this.createItem(items[i].id, items[i].name, items[i].status);
  }
  return items.length;
}

View.prototype.displayStorageItems = function (storageData) {
  this.clearAllTasks(document.querySelector('#displayArea'));
  for (var i = 0; i < storageData.length; i++) {
    this.createItem(storageData[i].id, storageData[i].name, storageData[i].status);
  }
  this.displayItemsCount(storageData.length);
}

View.prototype.clearAllTasks = function (element) {
  element.innerHTML = '';
}

View.prototype.inputFieldReset = function (inputElement) {
  inputElement.value = '';
}

View.prototype.displayItemsCount = function (count) {
  document.querySelector('#taskCount').innerHTML = count;
}

// var viewInstance = new View();

(function () {
  controllerInstance.attachEvents();
})();