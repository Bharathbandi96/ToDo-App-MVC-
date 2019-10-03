
var close = document.getElementsByClassName("close");
var ulList = document.querySelector('ul');
var localStorageArray = [];
var sessionStorageArray = [];
var enterKeyCode = 13;
var onEmptyListShowMessage = 'OOPS... Your List Is Empty';
var onEmptyInputFiled = 'You must write something!';
var completedText = 'Completed tasks in your list : ';
var allText = 'Total number of tasks in your list : ';
var pendingText = 'Pending tasks in your list : ';
var storageMessage = 'Please select your required storage to store data...';
var selectedStorage;
var localStorageValue = 'LocalStorage';
var sessionStorageValue = 'SessionStorage';
var myTodoItems = 'myTodoItems';
var inputFieldId = 'myInput';
var addButtonId = 'addButton';
var displayAreaId = 'displayArea';
var keypressEvent = 'keypress';
var clickEvent = 'click';
var itemDeleted;
var itemIndex;
var pending;
var check = document.getElementsByClassName('checked');

function init(){
  attachEventListners();
  displayTodoListItems();
}

function attachEventListners(){
  document.getElementById(addButtonId).addEventListener(clickEvent, displayNewItem,false);
  document.getElementById(inputFieldId).addEventListener(keypressEvent,addItemOnEnter,false);
  document.getElementById(addButtonId).addEventListener(clickEvent, deleteItemFromList,false);
  ulList.addEventListener(clickEvent,changeItemCheckState,false);
  document.getElementById('completedTaskButton').addEventListener(clickEvent, displayCompletedItemsCount,false);
  document.getElementById('allTaskButton').addEventListener(clickEvent, alertTotalItemsCont,false);
  document.getElementById('pendingTaskButton').addEventListener(clickEvent, alertpendingItemsCount,false);
}

function changeDataStorage(){
  selectedStorage = document.getElementById("selectStorage").value;
  displayTodoListItems();
}
function displayTodoListItems(){
  renderItemsFromSelectedStorage();
  if(selectedStorage == localStorageValue){
    displayLocalStorageItems();
  }
  else if(selectedStorage == sessionStorageValue){
    displaySessionStorageItems();
  }
  else{
    ulList.innerHTML = storageMessage;
  }
    addItemsToSelectedStorage();
    deleteItemFromList();
}
function renderItemsFromSelectedStorage(){
  if(selectedStorage == localStorageValue){
    renderItemsFromLocalStorage();
  }
  else if(selectedStorage == sessionStorageValue){
    renderItemsFromSessionStorage();
  }
  // else{
  //   alert(storageMessage);
  // }
}

function displayLocalStorageItems(){
  ulList.innerHTML = '';
  for(var i=0; i<localStorageArray.length; i++){
    display(localStorageArray[i]);
  }
}

function displaySessionStorageItems(){
  ulList.innerHTML = '';
  for(var i=0; i<sessionStorageArray.length; i++){
    display(sessionStorageArray[i]);
  }
}
function addItemOnEnter() {
  var input = document.getElementById(inputFieldId).value;
    if (event.keyCode === enterKeyCode) {
      if (input === '') {
        alertOnEmptyInputField();
      } 
      else 
      {
        addItemToSelectedArray(input);
        addItemsToSelectedStorage();
        renderItemsFromSelectedStorage();
        display(input);
        deleteItemFromList();
        inputFieldReset();
      }
  }
}
function displayNewItem() {
  var input = document.getElementById(inputFieldId).value;
  if (input === '') {
    alertOnEmptyInputField();
  } else {
    addItemToSelectedArray(input);
    addItemsToSelectedStorage();
    renderItemsFromSelectedStorage();
    display(input);
  }
  inputFieldReset();
}

function alertOnEmptyInputField(){
  alert(onEmptyInputFiled);
}

function inputFieldReset(){
  document.getElementById(inputFieldId).value = "";
  document.getElementById(inputFieldId).focus();
}
function addItemsToSelectedStorage(){
  if(selectedStorage == localStorageValue){
    addItemToLocalStorage();
  }
  else if(selectedStorage == sessionStorageValue){
    addItemToSessionStorage();
  }
}
function addItemToSelectedArray(item){
  if(selectedStorage == localStorageValue){
    localStorageArray.push(item);
  }
  else if(selectedStorage == sessionStorageValue){
    sessionStorageArray.push(item);
  }
}

// function isEmpty(){
//   var hasItems = document.getElementById(displayAreaId).hasChildNodes();
//   if(!hasItems){
//     document.getElementById(displayAreaId).append(onEmptyListShowMessage);
//   }
// }

function changeItemCheckState(ev){
  if (ev.target.tagName === 'LI'){
    ev.target.classList.toggle('checked');
  }
}
function deleteItemFromList(){
  renderItemsFromSelectedStorage();
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function(i) {
      var div = this.parentElement;
      deleteItemFromSelectedArray(div.textContent);
      div.remove();
      addItemsToSelectedStorage();
    }
  }
}
function deleteItemFromSelectedArray(item){
  if(selectedStorage == localStorageValue){
    deleteItemFromArray(item);
  }
  else if(selectedStorage == sessionStorageValue){
    deleteItemFromArray1(item);
  }
}

function deleteItemFromArray(deletedText){
  itemDeleted = deletedText.substr(0,deletedText.length-1);
  itemIndex = localStorageArray.indexOf(itemDeleted);
  localStorageArray.splice(itemIndex,1);
}

function deleteItemFromArray1(deletedText){
  itemDeleted = deletedText.substr(0,deletedText.length-1);
  itemIndex = sessionStorageArray.indexOf(itemDeleted);
  sessionStorageArray.splice(itemIndex,1);
}
function alertTotalItemsCont(){
  if(selectedStorage == localStorageValue){
    displayItemsCountFromLocalStorage();
  }
  else if(selectedStorage == sessionStorageValue){
    displayItemsCountFromSessionStorage();
  }
}
function alertpendingItemsCount(){
  if(selectedStorage == localStorageValue){
    displayPendingItemsCountFromLocalStorage();
  }
  else if(selectedStorage == sessionStorageValue){
    displayPendingItemsCountFromSessionStorage();
  }
}

init();