
function LocalStorage(key) {
  return {
  key: key,
  getData: function () { return JSON.parse(localStorage.getItem(this.key)); },
  setData: function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
  }
 }
  
  function SessionStorage(key) {
  return {
  key: key,
  getData: function () { return JSON.parse(sessionStorage.getItem(this.key)); },
  setData: function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
  }
  }
