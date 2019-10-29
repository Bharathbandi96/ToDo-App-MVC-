
createAddTaskButton();
createAllTaskButton();
createCompletedTaskButton();
createPendingTaskButton();

function Controller(){

    this.attachEventListner = function(){
        document.getElementById('myInput').addEventListener('keypress',this.getItemOnEnter);
        document.getElementById('selectStorage').addEventListener('change',this.getStorageItems);
    }

    this.attachEventListner();

    this.showInvalidStorageMessage = function(){
        var storageMessage = 'Please select your required storage to store data...';
        document.getElementById('displayArea').innerHTML = storageMessage;
    }

    this.showInvalidStorageMessage();

    this.getStorageType = function(){
        return document.getElementById("selectStorage").value;
    }

    this.getStorageItems = function(){
        var selectedStorage = this.getStorageType();
        if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
            var storageData = this.getItemsFromStorage();
            this.renderStorageData(storageData);
        } else {
            this.showInvalidStorageMessage();
            this.displayItemsCount(0);
        }
    }

    this.renderStorageData = function(storageData){
        this.clearDisplayArea(document.getElementById('displayArea'));
        for(var i = 0; i < storageData.length; i++){
            this.createDisplayItemInstance(storageData[i].id,storageData[i].name,storageData[i].status);
        }
        this.displayItemsCount(storageData.length);
    }

    this.createDisplayItemInstance = function(id,item,status){
        return new DisplayItem(id,item,status).createItem();
    }

    this.createStorageManagerInstance = function(){
        var selectedStorage = getStorageType();
        if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
            return new StorageManager(selectedStorage,'myTodoItems');
        }
        else{
            return '';
        }
    }

    this.getItemsFromStorage = function(){
        return createStorageManagerInstance().getData();
    }

    this.clearDisplayArea = function(displayAreaId){
        displayAreaId.innerHTML = '';
    }

    this.getItemOnEnter = function(){
        var enterKeyCode = 13;
        var inputText = document.getElementById('myInput');
        if (event.keyCode === enterKeyCode){
        displayTask(inputText);
        }
    }

    this.getItemOnAddButtonClick = function(){
        var inputText = document.getElementById('myInput');
        displayTask(inputText);
    }
    
    this.displayTask = function(inputText){
        var selectedStorage = getStorageType();  
        if(inputText.value !== '' && (selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage')){
            getAllItems();
            addItemToAnArray(inputText.value);
            createDisplayItemInstance(Date.now(),inputText.value);
            inputFieldReset(inputText);
            displayItemsCount(getItemsFromStorage().length);
        }
    }

    this.addItemToAnArray = function(item){
        var storageData = getItemsFromStorage();
        storageData.push({id:Date.now(),name:item,status:false});
        addItemsToStorage(storageData);
    }

    this.addItemsToStorage = function(storageData){
        var selectedStorage = getStorageType();
        if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
            createStorageManagerInstance().setData(storageData);
        }
    }

    this.createAnItem  = function(id,item,status){
        var li = document.createElement("li");
        li.id = id;
        createCheckButton(li,status);
        createTextContent(li,item);
        createDeleteButton(li);
        appendItemToList(li);
    }

    this.createCheckButton = function(li,status){
        var span = document.createElement("SPAN");
        span.id = "check";
        // attachEventToCheckButton(span);
        span.addEventListener('click',getItemToChangeStatus);
        setClassValue(span,status);
        li.appendChild(span);
    }

    this.getItemToChangeStatus = function(){
        var storageData = getItemsFromStorage();
        var item = this.parentElement.id;
        this.classList.toggle('checked');
        var currentItem = storageData.find(function(array){
            return array.id === Number(item);
        });
        setStatusValue(this.classList.value,storageData.indexOf(currentItem));
    }

    this.setStatusValue = function(classValue,itemIndex){
        var storageData = getItemsFromStorage();
        (classValue === '') ? storageData[itemIndex].status = false : storageData[itemIndex].status = true;
        addItemsToStorage(storageData);
    }

    this.setClassValue = function(span,status){
        if(status === true){
            span.classList = 'checked';
        }
    }

    this.createTextContent = function(li,item){
        var span = document.createElement("SPAN");
        span.appendChild(document.createTextNode(item));
        li.appendChild(span);
    }

    this.createDeleteButton = function(li){
        var span = document.createElement("SPAN");
        span.className = "close";
        span.appendChild(document.createTextNode("\u00D7"));
        li.appendChild(span);
        // attachEventToDeleteItem(span);
        span.addEventListener('click',deleteItemFromList);
    }

    this.deleteItemFromList = function(){
        var item = this.parentElement.id;
        this.parentElement.remove();
        deleteItemFromAnArray(item);
        displayItemsCount(getItemsFromStorage().length);
    }

    this.deleteItemFromAnArray = function(item){
        var storageData = getItemsFromStorage();
        var currentItem = storageData.find(function(array){
            return array.id === Number(item);
        });
        storageData.splice(storageData.indexOf(currentItem),1);
        addItemsToStorage(storageData);
    }

    this.inputFieldReset = function(inputText){
        inputText.value = '';
        inputText.focus();
    }

    this.getAllItems = function(){
        var selectedStorage = getStorageType();
        if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
            var storageData = getItemsFromStorage();
            renderStorageData(storageData);
        }
    }

    this.getCompletedItems = function(){
        var selectedStorage = getStorageType();
        if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
            var storageData = getItemsFromStorage();
            renderItems(storageData,true);
        }
    }

    this.getPendingItems = function(){
        var selectedStorage = getStorageType();
        if(selectedStorage === 'localStorage' || selectedStorage === 'sessionStorage'){
            var storageData = getItemsFromStorage();
            renderItems(storageData,false);
        }
    }

    this.renderItems = function(storageData,itemStatus){
        clearDisplayArea(document.getElementById('displayArea'));
        var count = 0;
        for(var i = 0; i < storageData.length; i++){
            if(storageData[i].status === itemStatus){
            createDisplayItemInstance(storageData[i].id,storageData[i].name,storageData[i].status);
            count++;
            }
        }
        displayItemsCount(count);
    }

    this.displayItemsCount = function(count){
        document.getElementById('myCount').innerHTML = count;
    }
}