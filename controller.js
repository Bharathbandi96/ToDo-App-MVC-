
displayMessageOnInvalidStorage();
attachEventListners();

function attachEventListners(){
  getAnElementByItsId('addButton').addEventListener('click', getItemToBeDisplayedOnAddButton);
  getAnElementByItsId('myInput').addEventListener('keypress',getItemToBeDisplayedOnEnter);
  getAnElementByItsId('displayArea').addEventListener('click',changeItemCheckState);
  getAnElementByItsId('completedTaskButton').addEventListener('click', displayCompletedItemsFromStorage);
  getAnElementByItsId('allTaskButton').addEventListener('click', displayTotalItemsFromStorage);
  getAnElementByItsId('pendingTaskButton').addEventListener('click', displayPendingItemsFromStorage);
  getAnElementByItsId('selectStorage').addEventListener('change',getItemsFromStorageToDisplay);
}

function getAnElementByItsId(id){
  this.id = id;
  return document.getElementById(this.id);
}

function displayMessageOnInvalidStorage(){
  var storageMessage = 'Please select your required storage to store data...';
  var selectedStorage = getStorageType();
  if(selectedStorage ==='SelectStorage'){
    getAnElementByItsId('displayArea').innerHTML = storageMessage;
  }
}

function getStorageType(){
  return getAnElementByItsId("selectStorage").value;
}

function getItemsFromStorageToDisplay(){
  var selectedStorage = getStorageType();
  createStorageManagerInstance();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
    var storageData = getItemsFromStorage();
    clearDisplayArea();
    for(var i = 0; i < storageData.length; i++){
      displayItem(storageData[i].name,storageData[i].status);
    }
  displayItemsCount(storageData.length);
  } else {
    displayMessageOnInvalidStorage();
    displayCountOnInvalidStorage();
  }
}

function displayCountOnInvalidStorage(){
  var selectedStorage = getStorageType();
  if(selectedStorage ==='SelectStorage'){
    displayItemsCount(0);
  }
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

function clearDisplayArea(){
  return new getAnElementByItsId('displayArea');
}

function getItemToBeDisplayedOnEnter() {
  var enterKeyCode = 13;
  var selectedStorage = getStorageType();
  var inputText = getAnElementByItsId('myInput');
  if (event.keyCode === enterKeyCode && inputText.value !== '' && (selectedStorage === 'localStorage'|| selectedStorage === 'sessionStorage')) {
    displayTotalItemsFromStorage();
    addItemToAnArray(inputText.value);
    displayItem(inputText.value);
    inputFieldReset(inputText);
    displayItemsCount(getItemsFromStorage().length);;
  }
}

function getItemToBeDisplayedOnAddButton() {
  var selectedStorage = getStorageType();  
  var inputText = getAnElementByItsId('myInput');
  if(inputText.value !== '' && (selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage')){
    displayTotalItemsFromStorage();
    addItemToAnArray(inputText.value);
    displayItem(inputText.value);
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
  var storageData = getItemsFromStorage();
  var item = this.nextSibling.textContent;
  var currentItem = storageData.find(function(array){
    return array.name === item;
  });
  setStatusValueInStorage(this.classList.value,storageData.indexOf(currentItem));
}

function setStatusValueInStorage(classValue,itemIndex){
  var storageData = getItemsFromStorage();
  (classValue === '') ? storageData[itemIndex].status = true : storageData[itemIndex].status = false;
  addItemsToStorage(storageData);
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
  var item = this.previousSibling.textContent;
  deleteItemFromAnArray(item);
  this.parentElement.remove();
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

function inputFieldReset(inputText){
  inputText.value = '';
  inputText.focus();
}

function changeItemCheckState(ev){
  if (ev.target.id === 'check'){
    ev.target.classList.toggle('checked');
  }
}

function displayCompletedItemsFromStorage(){
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
  var storageData = getItemsFromStorage();
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
  var selectedStorage = getStorageType();
  if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
  var storageData = getItemsFromStorage();
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
  var selectedStorage = getStorageType();
    if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
      var storageData = getItemsFromStorage();
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