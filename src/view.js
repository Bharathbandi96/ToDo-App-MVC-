
function View(rootId) {
  this.rootElement = document.querySelector(rootId);
}

View.prototype.initialize = function(){
  this.renderHeader();
  this.renderTaskDisplayArea();
  this.renderFooter();
  }

View.prototype.renderHeader = function () {
  var header = this.createAnElement('div', { id: 'header' });
  this.rootElement.appendChild(header);
  this.renderAppTitle();
  this.renderInputField();
  this.renderAddButton();
}

View.prototype.renderAppTitle = function () {
  var title = this.createAnElement('h2', {});
  title.innerText = 'My  To-Do  List';
  this.appendElementToHeader(title);
}

View.prototype.renderInputField = function () {
  var inputField = this.createAnElement('input', { 
    type: 'text',
    id: 'taskInputField',
    placeholder: 'Add your list items here...'
  });
  this.appendElementToHeader(inputField);
}

View.prototype.renderAddButton = function () {
  var me = this;
  var addButton = me.createAnElement('button',{id : 'addButton'});
  addButton.innerText = 'Add';
  me.appendElementToHeader(addButton);
  var addEvent = new Event('onAddItem');
  addButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(addEvent);
  });
}
//createTasksViewArea
View.prototype.renderTaskDisplayArea = function () {
  var displayArea = this.createAnElement('ul', { id: 'displayArea' });
  this.rootElement.appendChild(displayArea);
}

View.prototype.renderFooter = function () {
  var footer = this.createAnElement('div', { id: 'footer' });
  this.rootElement.appendChild(footer);
  this.renderItemCountView();
  this.renderAllTaskButton();
  this.renderCompletedTaskButton();
  this.renderPendingTaskButton();
  this.renderSelectElement();
}

View.prototype.renderItemCountView = function () {
  var countMessage = this.createAnElement('span', { id: 'countMessage' });
  var taskCount = this.createAnElement('span', { id: 'taskCount' });
  countMessage.innerText = 'No. of Item(s) left: ';
  taskCount.innerText = 0;
  countMessage.appendChild(taskCount);
  this.appendElementToFooter(countMessage);
}

View.prototype.renderAllTaskButton = function () {
  var me = this;
  var allTaskButton = me.createAnElement('button',{id : 'allTaskButton'});
  allTaskButton.innerText = 'All Tasks';
  me.appendElementToFooter(allTaskButton);
  var allTaskEvent = new Event('showAllTasks');
  allTaskButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(allTaskEvent);
  });
}

View.prototype.renderCompletedTaskButton = function () {
  var me = this;
  var completedTaskButton = me.createAnElement('button',{id : 'completedTaskButton'});
  completedTaskButton.innerText = 'Completed';
  me.appendElementToFooter(completedTaskButton);
  var completedEvent = new Event('showCompletedTasks');
  completedTaskButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(completedEvent);
  });
}

View.prototype.renderPendingTaskButton = function () {
  var me = this;
  var pendingTaskButton = me.createAnElement('button',{id : 'pendingTaskButton'});
  pendingTaskButton.innerText = 'Pending';
  me.appendElementToFooter(pendingTaskButton);
  var pendingEvent = new Event('showPendingTasks');
  pendingTaskButton.addEventListener('click',function(){
    me.rootElement.dispatchEvent(pendingEvent);
  });
}

View.prototype.renderSelectElement = function () {
  var me = this;
  var selectElement = me.createAnElement('select', { id: 'storageDropDown' });
  this.renderOption(selectElement,'Select Storage',{value : 'selectStorage'});
  this.renderOption(selectElement,'Local Storage',{value : 'localStorage',selected : 'selected'})
  this.renderOption(selectElement,'Session Storage',{value : 'sessionStorage'})
  me.appendElementToFooter(selectElement);
  var selectEvent = new Event('onStorageChange');
  selectElement.addEventListener('change',function(){
    me.rootElement.dispatchEvent(selectEvent);
  });
}

View.prototype.renderOption = function(selectElement,elementName,elementAttributes){
  var me = this;
  var option = me.createAnElement('option', elementAttributes);
  option.innerText = elementName;
  me.appendOptions(selectElement, option);
}

View.prototype.appendOptions = function (selectElement, option) {
    selectElement.appendChild(option);
}

View.prototype.appendElementToHeader = function (element) {
  var headerElement = this.rootElement.querySelector('#header');
  headerElement.appendChild(element);
}

View.prototype.appendElementToFooter = function (element) {
  var footerElement = this.rootElement.querySelector('#footer');
  footerElement.appendChild(element);
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
    id : itemId,
    currentElement : li,
    storageType : this.getStorageType()
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
    currentElement:li,
    storageType : this.getStorageType()
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

View.prototype.deleteItemFromView = function(item){
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

View.prototype.resetAndFocusInputField = function () {
  var inputFieldElement  = this.rootElement.querySelector('#taskInputField')
  inputFieldElement.value = '';
  inputFieldElement.focus();
}

View.prototype.displayItemsCount = function (count) {
  this.rootElement.querySelector('#taskCount').innerHTML = count;
}

View.prototype.getStorageType = function(){
  return this.rootElement.querySelector('#storageDropDown').value;
}