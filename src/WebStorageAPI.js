export default class MyWebStorageAPI {
  constructor() {
    this.isAvailable = this.storageAvailable("localStorage");
  }

  getList() {
    if (!this.isAvailable) return;

    const res = localStorage.getItem("list");

    if (!res) return [];

    return JSON.parse(res);
  }

  saveList(list) {
    if (!this.isAvailable) return;

    localStorage.setItem("list", JSON.stringify(list));
  }

  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
}