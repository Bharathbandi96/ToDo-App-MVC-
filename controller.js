
showInvalidStorageMessage();
attachEventListner();
createAddTaskButton();
createAllTaskButton();
createCompletedTaskButton();
createPendingTaskButton();

//
function attachEventListner(){
  document.getElementById('myInput').addEventListener('keypress',getItemOnEnter);
  document.getElementById('selectStorage').addEventListener('change',getStorageItems);
}

//createAddButtonAndSetEvent
function createAddTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'addButton';
  button.appendChild(document.createTextNode("Add"));
  appendAddButton(button);
  button.addEventListener('click', getItemOnAddButtonClick);
}
//createAllTaskButtonAndSetEvent
function createAllTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'allTaskButton';
  button.appendChild(document.createTextNode("All Tasks"));
  appendTaskButtons(button);
  button.addEventListener('click', getAllItems);
}
//createCompletedButtonAndSetEvent
function createCompletedTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'completedTaskButton';
  button.appendChild(document.createTextNode("Completed"));
  appendTaskButtons(button);
  button.addEventListener('click', getCompletedItems);
}
//createPendingButtonAndSetEvent
function createPendingTaskButton(){
  var button = document.createElement("BUTTON");
  button.id = 'pendingTaskButton';
  button.appendChild(document.createTextNode("Pending"));
  appendTaskButtons(button);
  button.addEventListener('click', getPendingItems);
}
//
function showInvalidStorageMessage(){
  var storageMessage = 'Please select your required storage to store data...';
  document.getElementById('displayArea').innerHTML = storageMessage;
}
//
function getStorageType(){
  return document.getElementById("selectStorage").value;
}

//checkStorageTypeAndPerformTasks
function getStorageItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderStorageData(storageData);
  } else {
    showInvalidStorageMessage();
    displayItemsCount(0);
  }
}

//displayItemsAndItsCount
function renderStorageData(storageData){
  clearDisplayArea(document.getElementById('displayArea'));
  for(var i = 0; i < storageData.length; i++){
    createDisplayItemInstance(storageData[i].id,storageData[i].name,storageData[i].status);
  }
  displayItemsCount(storageData.length);
}

//
function createDisplayItemInstance(id,item,status){
  return new DisplayItem(id,item,status).createItem();
}
//
function createStorageManagerInstance(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    return new StorageManager(selectedStorage,'myTodoItems');
  }
  else{
    return '';
  }
}
//
function getItemsFromStorage(){
   return createStorageManagerInstance().getData();
  }
//clearTaskDisplayArea
function clearDisplayArea(displayAreaId){
  displayAreaId.innerHTML = '';
}
//
function getItemOnEnter() {
  var enterKeyCode = 13;
  var inputText = document.getElementById('myInput');
  if (event.keyCode === enterKeyCode){
  displayTask(inputText);
  }
}
//
function getItemOnAddButtonClick() {
  var inputText = document.getElementById('myInput');
  displayTask(inputText);
}

//tasksToPerformOnAddNewTask
function displayTask(inputText){
  var selectedStorage = getStorageType();  
  if(inputText.value !== '' && (selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage')){
    getAllItems();
    addItemToAnArray(inputText.value);
    createDisplayItemInstance(Date.now(),inputText.value);
    inputFieldReset(inputText);
    displayItemsCount(getItemsFromStorage().length);
  }
}
//
function addItemToAnArray(item){
  var storageData = getItemsFromStorage();
  storageData.push({id:Date.now(),name:item,status:false});
  addItemsToStorage(storageData);
}
//
function addItemsToStorage(storageData){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    createStorageManagerInstance().setData(storageData);
  }
}
//
function createAnItem(id,item,status){
  var li = document.createElement("li");
  li.id = id;
  createCheckButton(li,status);
  createTextContent(li,item);
  createDeleteButton(li);
  appendItemToList(li);
}
//createCheckButtonAndSetEvent
function createCheckButton(li,status){
  var span = document.createElement("SPAN");
  span.id = "check";
  // attachEventToCheckButton(span);
  span.addEventListener('click',getItemToChangeStatus);
  setClassValue(span,status);
  li.appendChild(span);
}

//
function getItemToChangeStatus(){
  var storageData = getItemsFromStorage();
  var item = this.parentElement.id;
  this.classList.toggle('checked');
  var currentItem = storageData.find(function(array){
    return array.id === Number(item);
  });
  setStatusValue(this.classList.value,storageData.indexOf(currentItem));
}
//setStatusValueToStorage
function setStatusValue(classValue,itemIndex){
  var storageData = getItemsFromStorage();
  (classValue === '') ? storageData[itemIndex].status = false : storageData[itemIndex].status = true;
  addItemsToStorage(storageData);
}
//setItemClassValue
function setClassValue(span,status){
  if(status === true){
    span.classList = 'checked';
  }
}
//
function createTextContent(li,item){
  var span = document.createElement("SPAN");
  span.appendChild(document.createTextNode(item));
  li.appendChild(span);
}
//createDeleteButtonAndSetEvent
function createDeleteButton(li){
  var span = document.createElement("SPAN");
  span.className = "close";
  span.appendChild(document.createTextNode("\u00D7"));
  li.appendChild(span);
  // attachEventToDeleteItem(span);
  span.addEventListener('click',deleteItemFromList);
}

//deleteItemAndSetCountValue
function deleteItemFromList(){
  var item = this.parentElement.id;
  this.parentElement.remove();
  deleteItemFromAnArray(item);
  displayItemsCount(getItemsFromStorage().length);
}
//deleteItemFromArrayAndStorage
function deleteItemFromAnArray(item){
  var storageData = getItemsFromStorage();
  var currentItem = storageData.find(function(array){
    return array.id === Number(item);
  });
  storageData.splice(storageData.indexOf(currentItem),1);
  addItemsToStorage(storageData);
}
//
function inputFieldReset(inputText){
  inputText.value = '';
  inputText.focus();
}
//getAllItemsToRender
function getAllItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderStorageData(storageData);
  }
}
//getCompletedItemsToRender
function getCompletedItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderItems(storageData,true);
  }
}
//getPendingItemsToRender
function getPendingItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderItems(storageData,false);
  }
}
//
function renderItems(storageData,itemStatus){
  clearDisplayArea(document.getElementById('displayArea'));
  var count = 0;
  for(var i = 0; i < storageData.length; i++){
    if(storageData[i].status === itemStatus){
      createDisplayItemInstance(storageData[i].id,storageData[i].name,storageData[i].status);
      count++;
    }
  }
  displayItemsCount(count);
}
//
function displayItemsCount(count){
  document.getElementById('myCount').innerHTML = count;
}
