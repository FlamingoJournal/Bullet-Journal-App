// script.js

/** **************NAVIGATION******************* */
import { router } from './router.js';
import { getAllKeys } from './indexdb.js';
// import router from './router';
// Router imported so you can use it to manipulate your SPA app here
const { setState } = router;

const leftArrow = document.getElementById('nav-left');
/**
 * Left arrow functionality, switches to the previous page in the current log.
 * @todo Implement this function
 */
leftArrow.onclick = function navigateLeft() {
    const logType = document
        .querySelector('bullet-entries')
        .getAttribute('logType');
    const title = document.querySelector('bullet-entries').getAttribute('date');
    getAllKeys(logType, (entryKeys) => {
        const logIndex = entryKeys.indexOf(title);
        if (logIndex - 1 >= 0) {
            const nextDate = entryKeys[logIndex - 1];
            const state = { page: logType, date: nextDate };
            setState(state);
        }
    });
};

const rightArrow = document.getElementById('nav-right');
/**
 * Right arrow functionality, switches to the next page in the current log.
 * @todo Implement this function
 */
rightArrow.onclick = function navigateRight() {
    const logType = document
        .querySelector('bullet-entries')
        .getAttribute('logType');
    const title = document.querySelector('bullet-entries').getAttribute('date');
    getAllKeys(logType, (entryKeys) => {
        const logIndex = entryKeys.indexOf(title);
        if (logIndex + 1 < entryKeys.length) {
            const nextDate = entryKeys[logIndex + 1];
            const state = { page: logType, date: nextDate };
            setState(state);
        }
    });
};

const dailyTab = document.getElementById('daily-btn');
/**
 * Show daily log entries in sidebar on click.
 * @todo Implement this function
 */
dailyTab.onclick = function () {
    // for element in localstorage.daily{
    //     daily_tab.appendChild(html.a)
    // }
};

const weeklyTab = document.getElementById('weekly-btn');
/**
 * Show weekly log entries in sidebar on click.
 * @todo Implement this function
 */
weeklyTab.onclick = function () {
    // setState();
};

const monthlyTab = document.getElementById('monthly-btn');
/**
 * Show monthly log entries in sidebar on click.
 * @todo Implement this function
 */
monthlyTab.onclick = function () {
    // setState();
};

const futureTab = document.getElementById('future-btn');
/**
 * Show future log entries in sidebar on click.
 * @todo Implement this function
 */
futureTab.onclick = function () {
    // setState();
};

const homeButton = document.getElementById('flamingo-logo');
/**
 * Go back to the home/default page on logo click.
 * @todo Implement this function
 */
homeButton.onclick = function () {
    setState({ page: 'home' });
};
