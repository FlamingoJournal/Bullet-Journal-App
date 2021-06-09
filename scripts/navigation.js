import { router } from './router.js';
import { getAllKeys, getEntryFromStorage } from './indexdb.js';

const { setState } = router;

/**
 *
 * @param {*} logType the store that is going to be switched to
 */
function goToMostRecent(logType) {
    getEntryFromStorage('mostRecent', logType, (entryData) => {
        if (entryData !== undefined) {
            let state;
            if (logType === 'future' && entryData.substring(0, 2) === 'Ja') {
                state = {
                    page: logType,
                    date: entryData,
                    whichHalf: 1,
                };
            } else {
                state = {
                    page: logType,
                    date: entryData,
                    whichHalf: 2,
                };
            }
            setState(state);
        }
    });
}

const leftArrow = document.getElementById('nav-left');
/**
 * When the leftArrow is clicked, navigate to the log before current if it
 * exists
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
            let state;
            // If you are switching in the future log, you also need to change
            // the titles of the divs. This means we have to set whichHalf accordingly
            if (logType === 'future' && nextDate.substring(0, 2) === 'Ja') {
                state = { page: logType, date: nextDate, whichHalf: 1 };
            } else {
                state = { page: logType, date: nextDate, whichHalf: 2 };
            }
            setState(state);
        }
    });
};

const rightArrow = document.getElementById('nav-right');
/**
 * When the rightArrow is clicked, navigate to the log after current if it
 * exists
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
            let state;
            // If you are switching in the future log, you also need to change
            // the titles of the divs. This means we have to set whichHalf accordingly
            if (logType === 'future' && nextDate.substring(0, 2) === 'Ja') {
                state = { page: logType, date: nextDate, whichHalf: 1 };
            } else {
                state = { page: logType, date: nextDate, whichHalf: 2 };
            }
            setState(state);
        }
    });
};

const dailyTab = document.getElementById('daily-btn');
/**
 * When the daily tab is clicked on, call goToMostRecent to switch to the
 * most recent daily log
 */
dailyTab.onclick = function () {
    goToMostRecent('daily');
};

const weeklyTab = document.getElementById('weekly-btn');
/**
 * When the weekly tab is clicked on, call goToMostRecent to switch to the
 * most recent weekly log
 */
weeklyTab.onclick = function () {
    goToMostRecent('weekly');
};

const monthlyTab = document.getElementById('monthly-btn');
/**
 * When the monthly tab is clicked on, call goToMostRecent to switch to the
 * most recent monthly log
 */
monthlyTab.onclick = function () {
    goToMostRecent('monthly');
};

const futureTab = document.getElementById('future-btn');
/**
 * When the future tab is clicked on, call goToMostRecent to switch to the
 * most recent future log
 */
futureTab.onclick = function () {
    goToMostRecent('future');
};

const homeButton = document.getElementById('flamingo-logo');
/**
 * When the home tab is clicked on, switch to the home page
 */
homeButton.onclick = function () {
    setState({ page: 'home' });
};
