
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
var i;
var itemDeleted;
var itemIndex;

function init(){
  attachEventListners();
  displayTodoListItems();
  //storageManager(selectedStorage);
}

function attachEventListners(){
  getAddButtonId.addEventListener(clickEvent, displayNewItem);
  inputFieldId.addEventListener(keypressEvent,addItemOnEnter);
  ulList.addEventListener(clickEvent,changeItemCheckState);
  document.getElementById('completedTaskButton').addEventListener(clickEvent, displayCompletedItemsCount);
  document.getElementById('allTaskButton').addEventListener(clickEvent, alertTotalItemsCount);
  document.getElementById('pendingTaskButton').addEventListener(clickEvent, alertpendingItemsCount);
}

function changeDataStorage(){
  selectedStorage = document.getElementById("selectStorage").value;
  storageManager(selectedStorage);
  displayTodoListItems();
}

function displayTodoListItems(){
  //renderItemsFromSelectedStorage();
  if(selectedStorage === localStorageValue){
    //displayLocalStorageItems();
    //setItems();
  }
  else if(selectedStorage === sessionStorageValue){
    //displaySessionStorageItems();
    //setItems();
  }
  else{
    ulList.innerHTML = storageMessage;
  }
    deleteItemFromList();
}

// function renderItemsFromSelectedStorage(){
//   if(selectedStorage === localStorageValue){
//     getItemsFromLocalStorage();
//   }
//   else if(selectedStorage === sessionStorageValue){
//     getItemsFromSessionStorage();
//   }
// }

function displayLocalStorageItems(){
  ulList.innerHTML = '';
  for(i=0; i<localStorageArray.length; i++){
    display(localStorageArray[i]);
  }
}

function displaySessionStorageItems(){
  ulList.innerHTML = '';
  for(i=0; i<sessionStorageArray.length; i++){
    display(sessionStorageArray[i]);
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
  //console.log(a);
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
  if(selectedStorage === localStorageValue){
    setItemToLocalStorage();
    // setItems();
  }
  else if(selectedStorage === sessionStorageValue){
    setItemToSessionStorage();
  }
}

function addItemToSelectedArray(item){
  if(selectedStorage === localStorageValue){
    localStorageArray.push(item);
  }
  else if(selectedStorage === sessionStorageValue){
    sessionStorageArray.push(item);
  }
}

function changeItemCheckState(ev){
  if (ev.target.tagName === 'LI'){
    ev.target.classList.toggle('checked');
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
  if(selectedStorage === localStorageValue){
    deleteItemFromLocalStorageArray(item);
  }
  else if(selectedStorage === sessionStorageValue){
    deleteItemFromSessionStorageArray(item);
  }
}

function deleteItemFromLocalStorageArray(deletedText){
  itemDeleted = deletedText.substr(0,deletedText.length-1);
  itemIndex = localStorageArray.indexOf(itemDeleted);
  localStorageArray.splice(itemIndex,1);
}

function deleteItemFromSessionStorageArray(deletedText){
  itemDeleted = deletedText.substr(0,deletedText.length-1);
  itemIndex = sessionStorageArray.indexOf(itemDeleted);
  sessionStorageArray.splice(itemIndex,1);
}

function alertTotalItemsCount(){
  if(selectedStorage === localStorageValue){
    displayItemsCountFromLocalStorage();
  }
  else if(selectedStorage === sessionStorageValue){
    displayItemsCountFromSessionStorage();
  }
}

function alertpendingItemsCount(){
  if(selectedStorage === localStorageValue){
    displayPendingItemsCountFromLocalStorage();
  }
  else if(selectedStorage === sessionStorageValue){
    displayPendingItemsCountFromSessionStorage();
  }
}

init();