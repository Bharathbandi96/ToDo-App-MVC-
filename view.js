  function DisplayItem(item,status){
    this.item = item;
    this.status = status;
    this.createItem = function(){ createAnItem(this.item,this.status); }
  }

  function appendItemToList(item){
    var displayAreaId = document.getElementById('displayArea');
    displayAreaId.appendChild(item);
  }

  function appendAddButton(button){
    var headerId = document.getElementById('header');
    headerId.appendChild(button);
  }

  function appendTaskButtons(button){
    var footerId = document.getElementById('footer');
    footerId.appendChild(button);
  }