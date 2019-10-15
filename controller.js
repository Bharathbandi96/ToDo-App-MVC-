
// var enterKeyCode = 13;
var selectedStorage;
var storageManagerInstance;
// var i;
var storageData;
// var div;
// var status = false;
// var myTodoItems = 'myTodoItems';
// var onEmptyListShowMessage,onEmptyInputFiled,storageMessage;
// var localStorageValue,sessionStorageValue;
// var keypressEvent,clickEvent;
var ulList,inputFieldId;//,getAddButtonId,displayAreaId;
// var completedTask,allTask,pendingTask;
var inputText;

function init(){
  //onClickTextMessages();
  getRequiredElements();
  attachEventListners();
  displayDefaultMessage();
}

function onClickTextMessages(){
  // onEmptyListShowMessage = 'OOPS... Your List Is Empty';
  // onEmptyInputFiled = 'You must write something!';
  // storageMessage = 'Please select your required storage to store data...';
}

function getRequiredElements(){
  inputFieldId = document.getElementById('myInput');
  // getAddButtonId = document.getElementById('addButton');
  // displayAreaId = document.getElementById('displayArea');
  ulList = document.querySelector('ul');
  // completedTask = document.getElementById('completedTaskButton')
  // allTask = document.getElementById('allTaskButton')
  // pendingTask = document.getElementById('pendingTaskButton')
}

function attachEventListners(){
  document.getElementById('addButton').addEventListener('click', displayItemOnAddButton);
  inputFieldId.addEventListener('keypress',displayItemOnEnter);
  ulList.addEventListener('click',changeItemCheckState);
  document.getElementById('completedTaskButton').addEventListener('click', displayCompletedItemsCountFromSelectedStorage);
  document.getElementById('allTaskButton').addEventListener('click', displayTotalItemsCountFromSelectedStorage);
  document.getElementById('pendingTaskButton').addEventListener('click', displayPendingItemsCountFromselectedStorage);
}

function displayDefaultMessage(){
  var storageMessage = 'Please select your required storage to store data...';
  if(selectedStorage ==='SelectStorage' || selectedStorage === undefined){
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
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    storageManagerInstance = StorageManager(selectedStorage,'myTodoItems');
  }
}

function displaySelectedStorageItems(){
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    renderItemsFromSelectedStorage();
    ulList.innerHTML = '';
    for(var i = 0; i < storageData.length; i++){
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
  var enterKeyCode = 13;
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

function createCheckButton(li){
  var span = document.createElement("SPAN");
  span.className = "check";
  li.appendChild(span)
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

function alertOnEmptyInputField(){
  var onEmptyInputFiled = 'You must write something!';
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

function attachEventListnerToDeleteItem(span){
  span.addEventListener('click',deleteItemFromList);  
}

function deleteItemFromList(){
  var div = this.parentElement;
  deleteItemFromSelectedArray(this.previousSibling.textContent);
  div.remove();
  addItemsToSelectedStorage();
}

function deleteItemFromSelectedArray(item){
  // storageData.splice(storageData.findIndex(x => x.name === item),1);
  storageData.splice(storageData.indexOf(item),1);
}

init();