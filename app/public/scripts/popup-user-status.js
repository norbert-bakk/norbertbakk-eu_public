export class ExpiringLocalStorage {

  // making this a class so that we can easily add more storage types later
  constructor() {
    this.storage = localStorage;
  }

  // setItemWithExpiration will set a key/value pair in local storage with an expiration time in seconds
  setItemWithExpiration(key, value, expirationInSeconds) {
    var expirationTimestamp = Date.now() + expirationInSeconds * 1000;
    var data = {
      value: value,
      expirationTimestamp: expirationTimestamp
    };
    this.storage.setItem(key, JSON.stringify(data));
  }
  getItem(key) {
    var storedData = this.storage.getItem(key);
    if (!storedData) return null;

    var data = JSON.parse(storedData);
    var currentTimestamp = Date.now();

    if (data.expirationTimestamp && data.expirationTimestamp < currentTimestamp) {
      this.removeItem(key);
      return null;
    }

    return data.value;
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

}
