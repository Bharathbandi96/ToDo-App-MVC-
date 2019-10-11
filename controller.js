
var close = document.getElementsByClassName("close");
var ulList = document.querySelector('ul');
var enterKeyCode = 13;
var onEmptyListShowMessage = 'OOPS... Your List Is Empty';
var onEmptyInputFiled = 'You must write something!';
var storageMessage = 'Please select your required storage to store data...';
var selectedStorage;
var localStorageValue = 'LocalStorage';
var sessionStorageValue = 'SessionStorage';
var inputFieldId = document.getElementById('myInput');
var getAddButtonId = document.getElementById('addButton');
var displayAreaId = document.getElementById('displayArea');
var keypressEvent = 'keypress';
var clickEvent = 'click';
var myTodoItems = 'myTodoItems';
var storageManagerInstance;
var i;
var itemDeleted;
var itemIndex;
var storageData;

function init(){
  attachEventListners();
  displayDefaultMessage();
}

function displayDefaultMessage(){
  if(selectedStorage==='SelectStorage' ||selectedStorage === undefined){
    ulList.innerHTML = storageMessage;
  }
}

function attachEventListners(){
  getAddButtonId.addEventListener(clickEvent, displayNewItem);
  inputFieldId.addEventListener(keypressEvent,addItemOnEnter);
  ulList.addEventListener(clickEvent,changeItemCheckState);
  document.getElementById('completedTaskButton').addEventListener(clickEvent, displayCompletedItemsCountFromSelectedStorage);
  document.getElementById('allTaskButton').addEventListener(clickEvent, displayTotalItemsCountFromSelectedStorage);
  document.getElementById('pendingTaskButton').addEventListener(clickEvent, displayPendingItemsCountFromselectedStorage);
}

function changeDataStorage(){
  selectedStorage = document.getElementById("selectStorage").value;
  displayTodoListItems();
}

function displayTodoListItems(){
  createStorageManagerInstance();
  displaySelectedStorageItems();
  deleteItemFromList();
}

function createStorageManagerInstance(){
  if(selectedStorage === localStorageValue || selectedStorage === sessionStorageValue){
    storageManagerInstance = new StorageManager(selectedStorage,myTodoItems);
  }
}

function renderItemsFromSelectedStorage(){
  storageData = storageManagerInstance.getData();
}

function displaySelectedStorageItems(){
  if(selectedStorage === localStorageValue || selectedStorage === sessionStorageValue){
    renderItemsFromSelectedStorage();
    ulList.innerHTML = '';
    for(i=0; i<storageData.length; i++){
      display(storageData[i]);
    }
  }
  else{
    displayDefaultMessage();
  }
}

function addItemOnEnter() {
  var input = inputFieldId.value;
    if (event.keyCode === enterKeyCode) {
      if (input === '') {
        alertOnEmptyInputField();
      } 
      else 
      {
        addItemToSelectedArray(input);
        addItemsToSelectedStorage();
        display(input);
        deleteItemFromList();
      }
      inputFieldReset();
  }
}

function displayNewItem() {
  var input = inputFieldId.value;
  if (input === '') {
    alertOnEmptyInputField();
  } else {
    addItemToSelectedArray(input);
    addItemsToSelectedStorage();
    display(input);
    deleteItemFromList();
  }
  inputFieldReset();
}

function alertOnEmptyInputField(){
  alert(onEmptyInputFiled);
}

function inputFieldReset(){
  inputFieldId.value = "";
  inputFieldId.focus();
}

function appendItemToList(item){
  displayAreaId.appendChild(item);
}

function addItemsToSelectedStorage(){
    storageManagerInstance.setData(storageData);
}

function addItemToSelectedArray(item){
    storageData.push(item);
}

function changeItemCheckState(ev){
  if (ev.target.tagName === 'SPAN'){
    ev.target.parentElement.classList.toggle('checked');
    // ev.target.parentElement.remove();
  }
}

function deleteItemFromList(){
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
      var div = this.parentElement;
      deleteItemFromSelectedArray(div.textContent);
      div.remove();
      addItemsToSelectedStorage();
    }
  }
}

function deleteItemFromSelectedArray(item){
  itemDeleted = item.substr(0,item.length-1);
  itemIndex = storageData.indexOf(itemDeleted);
  storageData.splice(itemIndex,1);
}

init();