
var selectedStorage;
var storageManagerInstance;
var storageData;
var item;

(function init(){
  attachEventListners();
  displayDefaultMessage();
})();

function attachEventListners(){
  toGetElementById('addButton').addEventListener('click', displayItemOnAddButton);
  toGetElementById('myInput').addEventListener('keypress',displayItemOnEnter);
  toGetElementById('displayArea').addEventListener('click',changeItemCheckState);
  toGetElementById('completedTaskButton').addEventListener('click', toDisplayCompletedItemsFromSelectedStorage);
  toGetElementById('allTaskButton').addEventListener('click', toDisplayTotalItemsFromSelectedStorage);
  toGetElementById('pendingTaskButton').addEventListener('click', toDisplayPendingItemsFromselectedStorage);
}

function toGetElementById(id){
  return document.getElementById(id);
}

function displayDefaultMessage(){
  var storageMessage = 'Please select your required storage to store data...';
  if(selectedStorage ==='SelectStorage' || selectedStorage === undefined){
    toGetElementById('displayArea').innerHTML = storageMessage;
  }
}

function changeStorageToDisplayData(){
  selectedStorage = toGetElementById("selectStorage").value;
  toDisplaySelectedStorageItems();
}

function toDisplaySelectedStorageItems(){
  createStorageManagerInstance();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    renderItemsFromSelectedStorage();
    displayItem();
  } else {
    displayDefaultMessage();
  }
}

function createStorageManagerInstance(){
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    storageManagerInstance = new StorageManager(selectedStorage,'myTodoItems');
  }
}

function renderItemsFromSelectedStorage(){
  storageData = storageManagerInstance.getData();
}

function displayItem(){
  toGetElementById('displayArea').innerHTML = '';
  for(var i = 0; i < storageData.length; i++){
    display(storageData[i].name,storageData[i].status);
  }
}

function displayItemOnEnter() {
  var enterKeyCode = 13;
  if (event.keyCode === enterKeyCode) {
    toDisplayTotalItemsFromSelectedStorage()
    displayItemOnEventPerformed(toGetElementById('myInput').value);
  }
}

function displayItemOnAddButton() {
  toDisplayTotalItemsFromSelectedStorage()
  displayItemOnEventPerformed(toGetElementById('myInput').value);
}

function displayItemOnEventPerformed(inputText){
  if (inputText === '') {
    alertOnEmptyInputField();
  } else {
    addItemToAnArray(inputText);
    addItemsToSelectedStorage();
    display(inputText);
    inputFieldReset();
  }
}

function alertOnEmptyInputField(){
  alert('You must write something!');
}

function addItemToAnArray(item){
  storageData.push({id:Date.now(),name:item,status:false});
}

function addItemsToSelectedStorage(){
  storageManagerInstance.setData(storageData);
}

function createCheckButton(li,status){
  var span = document.createElement("SPAN");
  span.id = "check";
  attachEventListnerToChangeCheckStatus(span);
  setClassListValue(span,status);
  li.appendChild(span);
}

function attachEventListnerToChangeCheckStatus(span){
  span.addEventListener('click',toChangeCheckStatusInStorage);
}

function toChangeCheckStatusInStorage(){
  item = this.nextSibling.textContent;
  var currentItem = storageData.find(findTheCurrentElement);
  setStatusValueInStorage(this.classList.value,storageData.indexOf(currentItem));
  addItemsToSelectedStorage();
}

function setStatusValueInStorage(classValue,itemIndex){
  if(classValue === ''){
    storageData[itemIndex].status = true;
  }else{
    storageData[itemIndex].status = false;
  }
}

function setClassListValue(span,status){
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
  attachEventListnerToDeleteItem(span);
}

function attachEventListnerToDeleteItem(span){
  span.addEventListener('click',deleteItemFromList);
}

function deleteItemFromList(){
  item = this.previousSibling.textContent;
  deleteItemFromSelectedArray();
  this.parentElement.remove();
  addItemsToSelectedStorage();
}

function deleteItemFromSelectedArray(){
  var currentItem = storageData.find(findTheCurrentElement);
  storageData.splice(storageData.indexOf(currentItem),1);
}

function findTheCurrentElement(array){
  return array.name === item;
}

function inputFieldReset(){
  toGetElementById('myInput').value = "";
  toGetElementById('myInput').focus();
}

function changeItemCheckState(ev){
  if (ev.target.id === 'check'){
    ev.target.classList.toggle('checked');
  }
}

function toDisplayCompletedItemsFromSelectedStorage(){
  toGetElementById('displayArea').innerHTML = '';
  for(var i = 0; i < storageData.length; i++){
    if(storageData[i].status === true){
      display(storageData[i].name,storageData[i].status);
    }
  }
}

function toDisplayTotalItemsFromSelectedStorage(){
  toGetElementById('displayArea').innerHTML = '';
  for(var i = 0; i < storageData.length; i++){
    display(storageData[i].name,storageData[i].status);
  }
}

function toDisplayPendingItemsFromselectedStorage(){
  toGetElementById('displayArea').innerHTML = '';
  for(var i = 0; i < storageData.length; i++){
    if(storageData[i].status === false){
      display(storageData[i].name,storageData[i].status);
    }
  }
}