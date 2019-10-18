
var selectedStorage;
var storageManagerInstance;
var storageData;
var item;

(function init(){
  attachEventListners();
  displayDefaultMessage();
})();

function attachEventListners(){
  getAnElementByItsId('addButton').addEventListener('click', getItemToBeDisplayedOnAddButton);
  getAnElementByItsId('myInput').addEventListener('keypress',getItemToBeDisplayedOnEnter);
  getAnElementByItsId('displayArea').addEventListener('click',changeItemCheckState);
  getAnElementByItsId('completedTaskButton').addEventListener('click', displayCompletedItemsFromStorage);
  getAnElementByItsId('allTaskButton').addEventListener('click', displayTotalItemsFromStorage);
  getAnElementByItsId('pendingTaskButton').addEventListener('click', displayPendingItemsFromStorage);
}

function getAnElementByItsId(id){
  return document.getElementById(id);
}

function displayDefaultMessage(){
  var storageMessage = 'Please select your required storage to store data...';
  if(selectedStorage ==='SelectStorage' || selectedStorage === undefined){
    getAnElementByItsId('displayArea').innerHTML = storageMessage;
  }
}

function changeStorageToDisplayData(){
  selectedStorage = getAnElementByItsId("selectStorage").value;
  console.log(selectedStorage);
  getItemsFromStorageToDisplay();
}

function getItemsFromStorageToDisplay(){
  createStorageManagerInstance();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    renderItemsFromStorage();
    clearDisplayArea();
    for(var i = 0; i < storageData.length; i++){
      displayItem(storageData[i].name,storageData[i].status);
    }
  } else {
    displayDefaultMessage();
  }
  displayItemsCount(storageData.length);
}

function createStorageManagerInstance(){
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    storageManagerInstance = new StorageManager(selectedStorage,'myTodoItems');
  }
  else{
    storageManagerInstance = '';
  }
}

function renderItemsFromStorage(){
  storageData = storageManagerInstance.getData();
}

function getItemToBeDisplayedOnEnter() {
  var enterKeyCode = 13;
  var inputText = getAnElementByItsId('myInput').value;
  if (event.keyCode === enterKeyCode && inputText !== '' && (selectedStorage === 'localStorage'|| selectedStorage === 'sessionStorage')) {
    displayTotalItemsFromStorage();
    addItemToAnArray(inputText);
    addItemsToStorage();
    displayItem(inputText);
    inputFieldReset();
    displayItemsCount(storageData.length);;
  }
}

function getItemToBeDisplayedOnAddButton() {
  var inputText = getAnElementByItsId('myInput').value;
  if(inputText !== '' && (selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage')){
    displayTotalItemsFromStorage();
    addItemToAnArray(inputText);
    addItemsToStorage();
    displayItem(inputText);
    inputFieldReset();
    displayItemsCount(storageData.length);
  }
}

function addItemToAnArray(item){
  storageData.push({id:Date.now(),name:item,status:false});
}

function addItemsToStorage(){
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    storageManagerInstance.setData(storageData);
  }
}

function createCheckButton(li,status){
  var span = document.createElement("SPAN");
  span.id = "check";
  attachEventToChangeStatus(span);
  setClassValueOfAnItem(span,status);
  li.appendChild(span);
}

function attachEventToChangeStatus(span){
  span.addEventListener('click',getItemToChangeStatus);
}

function getItemToChangeStatus(){
  item = this.nextSibling.textContent;
  var currentItem = storageData.find(findTheCurrentElement);
  setStatusValueInStorage(this.classList.value,storageData.indexOf(currentItem));
  addItemsToStorage();
}

function setStatusValueInStorage(classValue,itemIndex){
  if(classValue === ''){
    storageData[itemIndex].status = true;
  }else{
    storageData[itemIndex].status = false;
  }
}

function setClassValueOfAnItem(span,status){
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
  item = this.previousSibling.textContent;
  deleteItemFromAnArray();
  this.parentElement.remove();
  addItemsToStorage();
  displayItemsCount(storageData.length);
}

function deleteItemFromAnArray(){
  var currentItem = storageData.find(findTheCurrentElement);
  storageData.splice(storageData.indexOf(currentItem),1);
}

function findTheCurrentElement(array){
  return array.name === item;
}

function inputFieldReset(){
  getAnElementByItsId('myInput').value = "";
  getAnElementByItsId('myInput').focus();
}

function changeItemCheckState(ev){
  if (ev.target.id === 'check'){
    ev.target.classList.toggle('checked');
  }
}

function clearDisplayArea(){
  getAnElementByItsId('displayArea').innerHTML = '';
}

function displayCompletedItemsFromStorage(){
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var count = 0;
    clearDisplayArea();
    for(var i = 0; i < storageData.length; i++){
      if(storageData[i].status === true){
        displayItem(storageData[i].name,storageData[i].status);
        count++;
      }
    }
    displayItemsCount(count);
  }
}

function displayTotalItemsFromStorage(){
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    clearDisplayArea();
    var count = 0;
    for(var i = 0; i < storageData.length; i++){
      displayItem(storageData[i].name,storageData[i].status);
      count++;
    }
    displayItemsCount(count);
  }
}

function displayPendingItemsFromStorage(){
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    clearDisplayArea();
    var count = 0;
    for(var i = 0; i < storageData.length; i++){
      if(storageData[i].status === false){
        displayItem(storageData[i].name,storageData[i].status);
        count++;
      }
    }
    displayItemsCount(count);
  }
}

function displayItemsCount(count){
 getAnElementByItsId('myCount').innerHTML = count;
}