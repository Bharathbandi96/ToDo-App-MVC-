
function LocalStorage(key) {
    this.key = key,
    this.getData = function () { return JSON.parse(localStorage.getItem(this.key)) || []; },
    this.setData = function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
 }
  
function SessionStorage(key) {
    this.key = key,
    this.getData = function () { return JSON.parse(sessionStorage.getItem(this.key)) || []; },
    this.setData = function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
}
