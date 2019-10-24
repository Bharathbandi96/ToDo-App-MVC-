
invalidStorageMessage();
attachEventListners();
createAddTaskButton();
createAllTaskButton();
createCompletedTaskButton();
createPendingTaskButton();

function attachEventListners(){
  document.getElementById('myInput').addEventListener('keypress',getItemOnEnter);
  document.getElementById('selectStorage').addEventListener('change',getStorageItems);
}

function createAddTaskButton(){
 var button = document.createElement("BUTTON");
 button.id = 'addButton';
 button.appendChild(document.createTextNode("Add"));
 appendAddButton(button);
 attachEventToAddButton(button);
}

//addButtonEvent
function attachEventToAddButton(button){
  button.addEventListener('click', getItemOnAddButtonClick);
}

function createAllTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'allTaskButton';
  button.appendChild(document.createTextNode("All Tasks"));
  appendTaskButtons(button);
  attachEventToAllTaskButton(button);
}

//AllTaskButtonEvent
function attachEventToAllTaskButton(button){
  button.addEventListener('click', getAllItems);
}

function createCompletedTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'completedTaskButton';
  button.appendChild(document.createTextNode("Completed"));
  appendTaskButtons(button);
  attachEventToCompletedTaskButton(button);
}

//completedButtonEvent
function attachEventToCompletedTaskButton(button){
  button.addEventListener('click', getCompletedItems);
}

function createPendingTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'pendingTaskButton';
  button.appendChild(document.createTextNode("Pending"));
  appendTaskButtons(button);
  attachEventToPendingTaskButton(button);
}

//pendingButtonEvent 
function attachEventToPendingTaskButton(button){
  button.addEventListener('click', getPendingItems);
}

//showInvalidStorageMessage
function invalidStorageMessage(selectedStorage){
  var storageMessage = 'Please select your required storage to store data...';
  if(selectedStorage ==='SelectStorage'||'undefined'){
    document.getElementById('displayArea').innerHTML = storageMessage;
  }
}

function getStorageType(){
  return document.getElementById("selectStorage").value;
}

function getStorageItems(){
  var selectedStorage = getStorageType();
  // createStorageManagerInstance();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    createRenderStorageItemsInstance(storageData).renderItems();
  } else {
    invalidStorageMessage(selectedStorage);
    displayItemsCount(0);
  }
}

function createRenderStorageItemsInstance(storageData){
  return new RenderStorageItems(storageData);
}

function RenderStorageItems(storageData){
  this.storageData = storageData;
  this.renderItems = function(){renderStorageData(this.storageData)}
}

function renderStorageData(storageData){
  clearDisplayArea(document.getElementById('displayArea'));
  for(var i = 0; i < storageData.length; i++){
    createDisplayItemInstance(storageData[i].name,storageData[i].status);
  }
  displayItemsCount(storageData.length);
}

function createDisplayItemInstance(item,status){
  return new DisplayItem(item,status).createItem();
}

function createStorageManagerInstance(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    return new StorageManager(selectedStorage,'myTodoItems');
  }
  else{
    return '';
  }
}

function getItemsFromStorage(){
   return createStorageManagerInstance().getData();
  }

function clearDisplayArea(displayAreaId){
  displayAreaId.innerHTML = '';
}

function getItemOnEnter() {
  var enterKeyCode = 13;
  var inputText = document.getElementById('myInput');
  if (event.keyCode === enterKeyCode){
  displayTask(inputText);
  }
}

function getItemOnAddButtonClick() {
  var inputText = document.getElementById('myInput');
  displayTask(inputText);
}

//tasksToPerform
function displayTask(inputText){
  var selectedStorage = getStorageType();  
  if(inputText.value !== '' && (selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage')){
    getAllItems();
    addItemToAnArray(inputText.value);
    createDisplayItemInstance(inputText.value);
    inputFieldReset(inputText);
    displayItemsCount(getItemsFromStorage().length);
  }
}

function addItemToAnArray(item){
  var storageData = getItemsFromStorage();
  storageData.push({id:Date.now(),name:item,status:false});
  addItemsToStorage(storageData);
}

function addItemsToStorage(storageData){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    createStorageManagerInstance().setData(storageData);
  }
}

function createAnItem(item,status){
  var li = document.createElement("li");
  createCheckButton(li,status);
  createTextContent(li,item);
  createDeleteButton(li);
  appendItemToList(li);
}

function createCheckButton(li,status){
  var span = document.createElement("SPAN");
  span.id = "check";
  attachEventToCheckButton(span);
  setClassValue(span,status);
  li.appendChild(span);
}

function attachEventToCheckButton(span){
  span.addEventListener('click',getItemToChangeStatus);
}

function getItemToChangeStatus(){
  var storageData = getItemsFromStorage();
  var item = this.nextSibling.textContent;
  this.classList.toggle('checked')
  var currentItem = storageData.find(function(array){
    return array.name === item;
  });
  setStatusValue(this.classList.value,storageData.indexOf(currentItem));
}

function setStatusValue(classValue,itemIndex){
  var storageData = getItemsFromStorage();
  (classValue === '') ? storageData[itemIndex].status = false : storageData[itemIndex].status = true;
  addItemsToStorage(storageData);
}

function setClassValue(span,status){
  if(status === true){
    span.classList = 'checked';
  }
}

function createTextContent(li,item){
  var span = document.createElement("SPAN");
  span.appendChild(document.createTextNode(item));
  li.appendChild(span);
}

function createDeleteButton(li){
  var span = document.createElement("SPAN");
  span.className = "close";
  span.appendChild(document.createTextNode("\u00D7"));
  li.appendChild(span);
  attachEventToDeleteItem(span);
}

function attachEventToDeleteItem(span){
  span.addEventListener('click',deleteItemFromList);
}

function deleteItemFromList(){
  var item = this.previousSibling.textContent;
  this.parentElement.remove();
  deleteItemFromAnArray(item);
  displayItemsCount(getItemsFromStorage().length);
}

function deleteItemFromAnArray(item){
  var storageData = getItemsFromStorage();
  var currentItem = storageData.find(function(array){
    return array.name === item;
  });
  storageData.splice(storageData.indexOf(currentItem),1);
  addItemsToStorage(storageData);
}

function inputFieldReset(inputText){
  inputText.value = '';
  inputText.focus();
}

function getAllItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    createRenderStorageItemsInstance(storageData).renderItems();
  }
}

function getCompletedItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    createGetItemStatusInstance(storageData,true).renderItems();
  }
}

function getPendingItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    createGetItemStatusInstance(storageData,false).renderItems();
  }
}

function createGetItemStatusInstance(storageData,itemStatus){
  return new GetItemStatus(storageData,itemStatus);
}

function GetItemStatus(storageData,itemStatus){
  this.storageData = storageData;
  this.itemStatus = itemStatus;
  this.renderItems = function(){renderItems(this.storageData,this.itemStatus);}
}

function renderItems(storageData,itemStatus){
  clearDisplayArea(document.getElementById('displayArea'));
  var count = 0;
  for(var i = 0; i < storageData.length; i++){
    if(storageData[i].status === itemStatus){
      createDisplayItemInstance(storageData[i].name,storageData[i].status);
      count++;
    }
  }
  displayItemsCount(count);
}

function displayItemsCount(count){
  document.getElementById('myCount').innerHTML = count;
}
