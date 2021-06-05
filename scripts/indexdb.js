// eslint-disable-next-line import/no-mutable-exports
export let db;
const dbReq = indexedDB.open('myDatabase', 1);

/**
 *
 * @param {*} event If there is not database, create the database
 *                  with version 1 and stores
 */
dbReq.onupgradeneeded = function (event) {
    // Set the db variable to our database so we can use it!
    db = event.target.result;

    // Create an object store named notes. Object stores
    // in databases are where data are stored.
    db.createObjectStore('daily', { autoIncrement: false });
    db.createObjectStore('weekly', { autoIncrement: false });
    db.createObjectStore('monthly', { autoIncrement: false });
    db.createObjectStore('future', { autoIncrement: false });
    db.createObjectStore('mostRecent', { autoIncrement: false });
    db.createObjectStore('color', { autoIncrement: false });
};
dbReq.onsuccess = function (event) {
    db = event.target.result;
    const logLists = document.querySelectorAll('log-list');
    logLists[0].type = 'daily';
    logLists[1].type = 'weekly';
    logLists[2].type = 'monthly';
    logLists[3].type = 'future';
};
dbReq.onerror = function (event) {
    alert(`error opening database ${event.target.errorCode}`);
};

/**
 *
 * @param {*} logType The store name that is being added to
 * @param {*} date Unique identifier for log
 * @param {*} data Array that holds all of the text area content
 */

export function saveEntryToStorage(logType, date, data, position) {
    // Start a database transaction and get the notes object store
    const tx = db.transaction([String(logType)], 'readwrite');
    const store = tx.objectStore(String(logType));
    if (position === 'undefined') {
        store.put(data, date);
    } else {
        const storeData = store.get(date);

        storeData.onsuccess = function () {
            if (storeData) {
                storeData.result[position] = data;

                store.put(storeData.result, date);
            }
        };
    }
    // Wait for the database transaction to complete
    tx.onerror = function (event) {
        alert(`error storing note ${event.target.errorCode}`);
    };
}

/**
 *
 * @param {*} logType The store name that is being accessed
 * @param {*} date Unique identifier for log
 * @param {*} dataHandlerFunction Caller function that will take data and do something with it
 */
export function getEntryFromStorage(logType, date, dataHandlerFunction) {
    const tx = db.transaction([String(logType)], 'readwrite');
    const store = tx.objectStore(String(logType));
    const req = store.get(date);
    req.onsuccess = function () {
        dataHandlerFunction(req.result);
    };
}

/**
 *
 * @param {*} logType The store name that is being accessed
 * @param {*} dataHandlerFunction Caller function that will take data and do something with it
 */
export function getAllKeys(logType, dataHandlerFunction) {
    const tx = db.transaction([String(logType)], 'readwrite');
    const store = tx.objectStore(String(logType));
    const req = store.getAllKeys();
    req.onsuccess = function () {
        dataHandlerFunction(req.result);
    };
}
