
function View(rootId) {
  this.rootElement = document.querySelector(rootId);
}

View.prototype.initialize = function(){
  this.createHeader();
  this.createTaskDisplayArea();
  this.createFooter();
  }

View.prototype.createHeader = function () {
  var header = this.createAnElement('div', { id: 'header' });
  this.rootElement.appendChild(header);
  this.createAppTitle();
  this.createInputField();
  this.createAddButton();
}

View.prototype.createAppTitle = function () {
  var title = this.createAnElement('h2', {});
  title.innerText = 'My  To-Do  List';
  this.appendElementToHeader(title);
}

View.prototype.createInputField = function () {
  var inputField = this.createAnElement('input', { 
    type: 'text',
    id: 'taskInputField',
    placeholder: 'Add your list items here...'
  });
  this.appendElementToHeader(inputField);
}

View.prototype.createAddButton = function () {
  var me = this;
  var addButton = me.createAnElement('button',{id : 'addButton'});
  addButton.innerText = 'Add';
  me.appendElementToHeader(addButton);
  var addEvent = new Event('onAddItem');
  addButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(addEvent);
  });
}

View.prototype.createTaskDisplayArea = function () {
  var displayArea = this.createAnElement('ul', { id: 'displayArea' });
  this.rootElement.appendChild(displayArea);
}

View.prototype.createFooter = function () {
  var footer = this.createAnElement('div', { id: 'footer' });
  this.rootElement.appendChild(footer);
  this.createItemCountView();
  this.createAllTaskButton();
  this.createCompletedTaskButton();
  this.createPendingTaskButton();
  this.createSelectElement();
}

View.prototype.createItemCountView = function () {
  var countMessage = this.createAnElement('span', { id: 'countMessage' });
  var taskCount = this.createAnElement('span', { id: 'taskCount' });
  countMessage.innerText = 'No. of Item(s) left: ';
  taskCount.innerText = 0;
  countMessage.appendChild(taskCount);
  this.appendElementToFooter(countMessage);
}

View.prototype.createAllTaskButton = function () {
  var me = this;
  var allTaskButton = me.createAnElement('button',{id : 'allTaskButton'});
  allTaskButton.innerText = 'All Tasks';
  me.appendElementToFooter(allTaskButton);
  var allTaskEvent = new Event('showAllTasks');
  allTaskButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(allTaskEvent);
  });
}

View.prototype.createCompletedTaskButton = function () {
  var me = this;
  var completedTaskButton = me.createAnElement('button',{id : 'completedTaskButton'});
  completedTaskButton.innerText = 'Completed';
  me.appendElementToFooter(completedTaskButton);
  var completedEvent = new Event('showCompletedTasks');
  completedTaskButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(completedEvent);
  });
}

View.prototype.createPendingTaskButton = function () {
  var me = this;
  var pendingTaskButton = me.createAnElement('button',{id : 'pendingTaskButton'});
  pendingTaskButton.innerText = 'Pending';
  me.appendElementToFooter(pendingTaskButton);
  var pendingEvent = new Event('showPendingTasks');
  pendingTaskButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(pendingEvent);
  });
}

View.prototype.createSelectElement = function () {
  var me = this;
  var selectElement = me.createAnElement('select', { id: 'storageDropDown' });
  var option1 = me.createAnElement('option', { value: 'selectStorage' });
  option1.innerText = 'Select Storage';
  var option2 = me.createAnElement('option', { 
    value: 'localStorage',
    selected : "selected" 
  });
  option2.innerText = 'Local Storage';
  var option3 = me.createAnElement('option', { value: 'sessionStorage' });
  option3.innerText = 'Session Storage';
  me.appendOptions(selectElement, [option1, option2, option3]);
  me.appendElementToFooter(selectElement);
  var selectEvent = new Event('onStorageChange');
  selectElement.addEventListener('change',function(){
    me.rootElement.dispatchEvent(selectEvent);
  });
}

View.prototype.appendOptions = function (select, array) {
  array.forEach(function (option) {
    select.appendChild(option);
  });
}

View.prototype.appendElementToHeader = function (element) {
  var headerId = this.rootElement.querySelector('#header');
  headerId.appendChild(element);
}

View.prototype.appendElementToFooter = function (element) {
  var footerId = this.rootElement.querySelector('#footer');
  footerId.appendChild(element);
}

View.prototype.showMessageOnInvalidStorage = function () {
  this.rootElement.querySelector('#displayArea').innerHTML = 'Please select your required storage to store data...';
}

View.prototype.createItem = function (itemId, item, status) {
  var li = this.createAnElement('li',{id : itemId});
  this.createCheckButton(li, status,itemId);
  this.createTextContent(li, item);
  this.createDeleteButton(li,itemId);
  this.appendItemToList(li);
}

View.prototype.createCheckButton = function (li, status, itemId) {
  var me = this;
  var checkBox = me.createAnElement('span',{id : 'check'});
  me.setItemClassName(checkBox, status);
  var checkBoxEvent = new CustomEvent('onCheckBoxChange',{detail :{
    id: itemId,
    currentElement:li
  }});
  checkBox.addEventListener('click',function(){
    checkBox.classList.toggle('checked');
    me.rootElement.dispatchEvent(checkBoxEvent);
  });
  li.appendChild(checkBox);
}

View.prototype.createTextContent = function (li, item) {
  var taskNode = this.createAnElement('SPAN',{});
  taskNode.innerText = item;
  li.appendChild(taskNode);
}

View.prototype.createDeleteButton = function (li,itemId) {
  var me = this;
  var deleteButton = me.createAnElement('SPAN',{class : 'close'});
  deleteButton.innerText = '\u00D7';
  li.appendChild(deleteButton);
  var deleteEvent = new CustomEvent('deleteButtonEvent',{detail :{
    id: itemId ,
    currentElement:li
  }});
  deleteButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(deleteEvent);
  });
}

View.prototype.createAnElement = function (elementType, attributes) {
  var element = document.createElement(elementType, attributes);
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

View.prototype.appendItemToList = function (item) {
  this.rootElement.querySelector('#displayArea').appendChild(item);
}

View.prototype.deleteItemFromList = function(item){
  item.remove();
}

View.prototype.setItemClassName = function(checkBox,status){
  if(status === true){
    checkBox.classList = 'checked';
  }
}

View.prototype.displayStorageItems = function (storageData) {
  this.clearAllTasks(this.rootElement.querySelector('#displayArea'));
  for(var key in storageData){
    this.createItem(storageData[key].id, storageData[key].name, storageData[key].status);
  }
}

View.prototype.clearAllTasks = function (element) {
  element.innerHTML = '';
}

View.prototype.resetInputField = function () {
  this.rootElement.querySelector('#taskInputField').value = '';
  this.rootElement.querySelector('#taskInputField').focus();
}

View.prototype.displayItemsCount = function (count) {
  this.rootElement.querySelector('#taskCount').innerHTML = count;
}

View.prototype.getStorageType = function(){
  return this.rootElement.querySelector('#storageDropDown').value;
}