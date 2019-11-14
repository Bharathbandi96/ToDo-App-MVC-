
function View(rootId) {
  
  this.rootId = document.querySelector(rootId);

  this.initialize = function(){
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
    var header = this.createAnElement('div', { id: 'header' });
    this.rootId.appendChild(header);
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
    var button = this.createAnElement('button',{id : 'addButton'});
    button.appendChild(this.createNewTextNode('Add'));
    this.appendHeaderElements(button);
    var event = new Event('add');
    button.addEventListener('click',(function(){
      this.rootId.dispatchEvent(event);
    }).bind(this));
  }

  this.createTaskDisplayArea = function () {
    var displayArea = this.createAnElement('ul', { id: 'displayArea' });
    this.rootId.appendChild(displayArea);
    return displayArea;
  }

  this.createFooter = function () {
    var footer = this.createAnElement('div', { id: 'footer' });
    this.rootId.appendChild(footer);
    return footer;
  }

  this.createItemCountView = function () {
    var countMessage = this.createAnElement('span', { id: 'countMessage' });
    var taskCount = this.createAnElement('span', { id: 'taskCount' });
    countMessage.appendChild(this.createNewTextNode('No. of Item(s) left: '));
    taskCount.innerText = 0;
    countMessage.appendChild(taskCount);
    this.appendFooterElements(countMessage);
  }

  this.createAllTaskButton = function () {
    var button = this.createAnElement('button',{id : 'allTaskButton'});
    button.appendChild(this.createNewTextNode('All Tasks'));
    this.appendFooterElements(button);
    var event = new Event('showAllTasks');
    button.addEventListener('click',(function(){
      this.rootId.dispatchEvent(event);
    }).bind(this));
  }

  this.createCompletedTaskButton = function () {
    var button = this.createAnElement('button',{id : 'completedTaskButton'});
    button.appendChild(this.createNewTextNode('Completed'));
    this.appendFooterElements(button);
    var event = new Event('showCompletedTasks');
    button.addEventListener('click',(function(){
      this.rootId.dispatchEvent(event);
    }).bind(this));
  }

  this.createPendingTaskButton = function () {
    var button = this.createAnElement('button',{id : 'pendingTaskButton'});
    button.appendChild(this.createNewTextNode('Pending'));
    this.appendFooterElements(button);
    var event = new Event('showPendingTasks');
    button.addEventListener('click',(function(){
      this.rootId.dispatchEvent(event);
    }).bind(this));
  }

  this.createSelectElement = function () {
    var selectElement = this.createAnElement('select', { id: 'storageDropDown' });
    var option1 = this.createAnElement('option', { value: 'selectStorage' });
    option1.innerText = 'Select Storage';
    var option2 = this.createAnElement('option', { value: 'localStorage' });
    option2.innerText = 'Local Storage';
    var option3 = this.createAnElement('option', { value: 'sessionStorage' });
    option3.innerText = 'Session Storage';
    this.appendOptions(selectElement, [option1, option2, option3]);
    this.appendFooterElements(selectElement);
  }

  this.appendOptions = function (select, array) {
    array.forEach(function (option) {
      select.appendChild(option);
    });
  }

  this.appendHeaderElements = function (element) {
    var headerId = this.rootId.querySelector('#header');
    headerId.appendChild(element);
  }
  
  this.appendFooterElements = function (element) {
    var footerId = this.rootId.querySelector('#footer');
    footerId.appendChild(element);
  }
}

View.prototype.showMessageOnInvalidStorage = function () {
  var storageMessage = 'Please select your required storage to store data...';
  this.rootId.querySelector('#displayArea').innerHTML = storageMessage;
}

View.prototype.createItem = function (itemId, item, status) {
  var li = this.createAnElement('li',{id : itemId});
  this.createCheckButton(li, status,itemId);
  this.createTextContent(li, item);
  this.createDeleteButton(li,itemId);
  this.appendItemToList(li);
}

View.prototype.createCheckButton = function (li, status, itemId) {
  var checkBox = this.createAnElement('span',{id : 'check'});
  this.setItemClassName(checkBox, status);
  var event = new CustomEvent('checkBoxEvent',{detail :{ id: itemId,name:checkBox.classList}});
  checkBox.addEventListener('click',(function(){
    checkBox.classList.toggle('checked');
    this.rootId.dispatchEvent(event);
  }).bind(this));
  li.appendChild(checkBox);
}

View.prototype.createTextContent = function (li, item) {
  var taskNode = this.createAnElement('SPAN',{});
  taskNode.appendChild(this.createNewTextNode(item));
  li.appendChild(taskNode);
}

View.prototype.createDeleteButton = function (li,itemId) {
  var deleteButton = this.createAnElement('SPAN',{class : 'close'});
  deleteButton.appendChild(this.createNewTextNode('\u00D7'));
  li.appendChild(deleteButton);
  var event = new CustomEvent('deleteButtonEvent',{detail :{ id: itemId , name:li}});
  deleteButton.addEventListener('click',(function(){
    this.rootId.dispatchEvent(event);
  }).bind(this));
}

View.prototype.createAnElement = function (elementType, attributes) {
  var element = document.createElement(elementType, attributes);
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

View.prototype.createNewTextNode = function(text){
  return document.createTextNode(text);
}

View.prototype.setItemClassName = function(checkBox,status){
  if(status === true){
    checkBox.classList = 'checked';
  }
}

View.prototype.appendItemToList = function (item) {
  var displayAreaId = this.rootId.querySelector('#displayArea');
  displayAreaId.appendChild(item);
}

View.prototype.displayStorageItems = function (storageData) {
  this.clearAllTasks(this.rootId.querySelector('#displayArea'));
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
  this.rootId.querySelector('#taskCount').innerHTML = count;
}