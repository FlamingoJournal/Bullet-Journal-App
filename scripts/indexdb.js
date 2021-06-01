/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-mutable-exports
export let db;
const dbReq = indexedDB.open('myDatabase', 1);
dbReq.onupgradeneeded = function(event) {
  // Set the db variable to our database so we can use it!  
  db = event.target.result;

  // Create an object store named notes. Object stores
  // in databases are where data are stored.
  const daily = db.createObjectStore('daily', {autoIncrement: false});
  const weekly = db.createObjectStore('weekly', {autoIncrement: false});
  const monthly = db.createObjectStore('mohthly', {autoIncrement: false});
  const future = db.createObjectStore('future', {autoIncrement: false});
  const mostRecent = db.createObjectStore('mostRecent', {autoIncrement: false});
}
dbReq.onsuccess = function(event) {
  db = event.target.result;
}
dbReq.onerror = function(event) {
  alert(`error opening database ${  event.target.errorCode}`);
}

export function addEntryToStorage(message) {
  // Start a database transaction and get the notes object store
  const tx = db.transaction(['daily'], 'readwrite');
  const store = tx.objectStore('daily');
  // Put the sticky note into the object store
  const note = {text: message, timestamp: Date.now()};
  store.add(note, 'test');
  // Wait for the database transaction to complete
  tx.oncomplete = function() { console.log('stored note!') }
  tx.onerror = function(event) {
    alert(`error storing note ${  event.target.errorCode}`);
  }
}