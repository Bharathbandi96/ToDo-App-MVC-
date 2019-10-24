
displayMessageOnInvalidStorage();
attachEventListners();
createAddTaskButton();

function attachEventListners(){
  // getAnElementByItsId('addButton').addEventListener('click', getItemOnAddButtonClick);
  getAnElementByItsId('completedTaskButton').addEventListener('click', getCompletedItems);
  getAnElementByItsId('allTaskButton').addEventListener('click', getAllItems);
  getAnElementByItsId('pendingTaskButton').addEventListener('click', getPendingItems);
  getAnElementByItsId('myInput').addEventListener('keypress',getItemOnEnter);
  getAnElementByItsId('displayArea').addEventListener('click',changeItemCheckState);
  getAnElementByItsId('selectStorage').addEventListener('change',getStorageItems);
}

function createAddTaskButton(){
 var myDiv = document.getElementById('myDiv');
 var button = document.createElement("BUTTON")
 button.id = 'addButton';
 button.appendChild(document.createTextNode("Add"));
 myDiv.appendChild(button);
 attachEventToAddButton(button);
}

function attachEventToAddButton(button){
  button.addEventListener('click', getItemOnAddButtonClick);
}

function createAllTaskButton(){
  
}

function getAnElementByItsId(id){
  return document.getElementById(id);
}

function displayMessageOnInvalidStorage(selectedStorage){
  var storageMessage = 'Please select your required storage to store data...';
  if(selectedStorage ==='SelectStorage'||'undefined'){
    getAnElementByItsId('displayArea').innerHTML = storageMessage;
  }
}

function getStorageType(){
  return getAnElementByItsId("selectStorage").value;
}

function getStorageItems(){
  this.selectedStorage = getStorageType();
  createStorageManagerInstance();
  if(this.selectedStorage === 'localStorage' || this.selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderStorageItems(storageData);
  } else {
    displayMessageOnInvalidStorage(this.selectedStorage);
    displayItemsCount(0);
  }
}

function renderStorageItems(storageData){
  clearDisplayArea(getAnElementByItsId('displayArea'));
  for(var i = 0; i < storageData.length; i++){
    createDisplayItemInstance(storageData[i].name,storageData[i].status);
  }
  displayItemsCount(storageData.length);
}

function createDisplayItemInstance(item,status){
  return new displayItem(item,status).createItem();
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
  var inputText = getAnElementByItsId('myInput');
  // var required = {
  //   enterKeyCode : 13,
  //   inputText : function(){getAnElementByItsId('myInput')},
  //   selectedStorage : function (){getStorageType()}
  // }
  if (event.keyCode === enterKeyCode){
  displayTask(inputText);
  }
}

function getItemOnAddButtonClick() {
  var inputText = getAnElementByItsId('myInput');
  displayTask(inputText);
}

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
  var currentItem = storageData.find(function(array){
    return array.name === item;
  });
  setStatusValue(this.classList.value,storageData.indexOf(currentItem));
}

function setStatusValue(classValue,itemIndex){
  var storageData = getItemsFromStorage();
  (classValue === '') ? storageData[itemIndex].status = true : storageData[itemIndex].status = false;
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

// function inputFieldReset(inputText){
//   this.inputText = inputText;
//   this.inputText.value = '';
//   this.inputText.focus();
// }

function inputFieldReset(inputText){
  var a = {}
  inputText.value = '';
  inputText.focus();
}

function changeItemCheckState(ev){
  if (ev.target.id === 'check'){
    ev.target.classList.toggle('checked');
  }
}

function getAllItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderStorageItems(storageData);
  }
}

function getCompletedItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderItemsOnStatus(storageData,true);
  }
}

function getPendingItems(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    renderItemsOnStatus(storageData,false);
  }
}

function renderItemsOnStatus(storageData,itemStatus){
  clearDisplayArea(getAnElementByItsId('displayArea'));
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
 getAnElementByItsId('myCount').innerHTML = count;
}