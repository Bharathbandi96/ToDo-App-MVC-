
function storageManager(selectedStorage) {
    function getStorageType(){
        switch (selectedStorage) {
            case 'LocalStorage':
                return new LocalStorage();
    
            case 'SessionStorage':
                return new SessionStorage();
            
            default : alert(storageMessage);
        }
    }

    function setItems() {
        return this.getStorageType.setItem();
    }
    
    function getItems() {
        return this.getStorageType.getItem();
    }
}