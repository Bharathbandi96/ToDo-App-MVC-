
var selectedStorage;
var storageManagerInstance;
var storageData;
var item;

function init(){
  attachEventListners();
  displayDefaultMessage();
}

function attachEventListners(){
  getElementById('addButton').addEventListener('click', displayItemOnAddButton);
  getElementById('myInput').addEventListener('keypress',displayItemOnEnter);
  querySelector('ul').addEventListener('click',changeItemCheckState);
  getElementById('completedTaskButton').addEventListener('click', displayCompletedItemsCountFromSelectedStorage);
  getElementById('allTaskButton').addEventListener('click', displayTotalItemsCountFromSelectedStorage);
  getElementById('pendingTaskButton').addEventListener('click', displayPendingItemsCountFromselectedStorage);
}

function getElementById(idSelector){
  return document.getElementById(idSelector);
}
 
function getElementsByClassName(classSelector){
  return document.getElementsByClassName(classSelector);
}
 
function querySelector(selector){
  return document.querySelector(selector);
}
 
function displayDefaultMessage(){
  var storageMessage = 'Please select your required storage to store data...';
  if(selectedStorage ==='SelectStorage' || selectedStorage === undefined){
    querySelector('ul').innerHTML = storageMessage;
  }
}

function changeStorageToDisplayData(){
  selectedStorage = getElementById("selectStorage").value;
  displaySelectedStorageItems();
}

function displaySelectedStorageItems(){
  createStorageManagerInstance();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    renderItemsFromSelectedStorage();
    displayItem();
  } else {
    displayDefaultMessage();
  }
}

function displayItem(){
  querySelector('ul').innerHTML = '';
  for(var i = 0; i < storageData.length; i++){
    display(storageData[i].name);
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

function displayItemOnEnter() {
  var enterKeyCode = 13;
  var inputText = getElementById('myInput').value;
  if (event.keyCode === enterKeyCode) {
    displayItemOnEventPerformed(inputText);
  }
}

function displayItemOnAddButton() {
  var inputText = getElementById('myInput').value;
  displayItemOnEventPerformed(inputText);
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
  getElementById('myInput').value = "";
  getElementById('myInput').focus();
}

function addItemToAnArray(item){
  storageData.push({id:Date.now(),name:item,status:false});
}

function addItemsToSelectedStorage(){
  storageManagerInstance.setData(storageData);
}

function changeItemCheckState(ev){
  if (ev.target.className === 'check'){
    ev.target.parentElement.classList.toggle('checked');
    console.log(ev.target.parentElement.classList);
  }
}

function attachEventListnerToDeleteItem(span){
  span.addEventListener('click',deleteItemFromList);  
}

function deleteItemFromList(){
  var div = this.parentElement;
  item = this.previousSibling.textContent;
  deleteItemFromSelectedArray();
  div.remove();
  addItemsToSelectedStorage();
}

function deleteItemFromSelectedArray(){
  var currentItem = storageData.find(arrayFind);
  storageData.splice(storageData.indexOf(currentItem),1);
}

function arrayFind(array){
  return array.name === item;
}

init();