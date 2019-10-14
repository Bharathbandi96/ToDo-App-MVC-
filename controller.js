
var enterKeyCode = 13;
var selectedStorage;
var storageManagerInstance;
var i;
var storageData;
var div;
// var status = false;
var myTodoItems = 'myTodoItems';
var onEmptyListShowMessage,onEmptyInputFiled,storageMessage;
var localStorageValue,sessionStorageValue;
var keypressEvent,clickEvent;
var close,ulList,inputFieldId,getAddButtonId,displayAreaId;
var completedTask,allTask,pendingTask;
var inputText;

function init(){
  onClickTextMessages();
  getRequiredElements();
  attachEventListners();
  displayDefaultMessage();
}

function onClickTextMessages(){
  keypressEvent = 'keypress';
  clickEvent = 'click';
  localStorageValue = 'localStorage';
  sessionStorageValue = 'sessionStorage';
  onEmptyListShowMessage = 'OOPS... Your List Is Empty';
  onEmptyInputFiled = 'You must write something!';
  storageMessage = 'Please select your required storage to store data...';
}

function getRequiredElements(){
  inputFieldId = document.getElementById('myInput');
  getAddButtonId = document.getElementById('addButton');
  displayAreaId = document.getElementById('displayArea');
  close = document.getElementsByClassName("close");
  ulList = document.querySelector('ul');
  completedTask = document.getElementById('completedTaskButton')
  allTask = document.getElementById('allTaskButton')
  pendingTask = document.getElementById('pendingTaskButton')
}

function attachEventListners(){
  getAddButtonId.addEventListener(clickEvent, displayItemOnAddButton);
  inputFieldId.addEventListener(keypressEvent,displayItemOnEnter);
  ulList.addEventListener(clickEvent,changeItemCheckState);
  completedTask.addEventListener(clickEvent, displayCompletedItemsCountFromSelectedStorage);
  allTask.addEventListener(clickEvent, displayTotalItemsCountFromSelectedStorage);
  pendingTask.addEventListener(clickEvent, displayPendingItemsCountFromselectedStorage);
}

function displayDefaultMessage(){
  if(selectedStorage==='SelectStorage' ||selectedStorage === undefined){
    ulList.innerHTML = storageMessage;
  }
}

function changeDataStorage(){
  selectedStorage = document.getElementById("selectStorage").value;
  displayTodoListItems();
}

function displayTodoListItems(){
  createStorageManagerInstance();
  displaySelectedStorageItems();
}

function createStorageManagerInstance(){
  if(selectedStorage === localStorageValue || selectedStorage === sessionStorageValue){
    storageManagerInstance = StorageManager(selectedStorage,myTodoItems);
  }
}

function displaySelectedStorageItems(){
  if(selectedStorage === localStorageValue || selectedStorage === sessionStorageValue){
    renderItemsFromSelectedStorage();
    ulList.innerHTML = '';
    for(i=0; i<storageData.length; i++){
      display(storageData[i].name);
    }
  }
  else{
    displayDefaultMessage();
  }
}


function renderItemsFromSelectedStorage(){
  storageData = storageManagerInstance.getData();
}

function displayItemOnEnter() {
  inputText = inputFieldId.value;
  if (event.keyCode === enterKeyCode) {
    displayItem();
  }
}

function displayItemOnAddButton() {
  inputText = inputFieldId.value;
  displayItem();
}

function displayItem(){
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
  alert(onEmptyInputFiled);
}

function inputFieldReset(){
  inputFieldId.value = "";
  inputFieldId.focus();
}

function addItemToAnArray(item){
  storageData.push({id:Date.now(),name:item,status:status});
}

function addItemsToSelectedStorage(){
  storageManagerInstance.setData(storageData);
}

function changeItemCheckState(ev){
  if (ev.target.className === 'check'){
    ev.target.parentElement.classList.toggle('checked');
    // status = true;
  }
}

// function attachEventListnerToCheckItem(){
//   span.addEventListener(clickEvent,checkItemState);
//   addItemsToSelectedStorage();
// }

// function checkItemState(){
//   div = this.parentElement;
//   if(div.className !=='checked'){
//     status = true;
//   }
//   else{
//     status = false;
//   }
// }

function attachEventListnerToDeleteItem(){
  span.addEventListener(clickEvent,deleteItemFromList);  
}

function deleteItemFromList(){
  div = this.parentElement;
  deleteItemFromSelectedArray(this.previousSibling.textContent);
  div.remove();
  addItemsToSelectedStorage();
}

function deleteItemFromSelectedArray(item){
  // storageData.splice(storageData.findIndex(x => x.name === item),1);
  storageData.splice(storageData.indexOf(item),1);
}

init();