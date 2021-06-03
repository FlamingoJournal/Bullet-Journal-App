// const router = {};
// export default router;

export const router = {};

/**
 *
 * @param {*} state An object that has data about the caller and will switch pages based on that information
 */
router.setState = function switchState(state) {
    const body = document.querySelector('body');
    const title = document.querySelector('.title');
    switch (state.page) {
        case 'home': {
            body.id = 'home';
            const logLists = document.querySelectorAll('log-list');
            logLists[0].type = 'daily';
            logLists[1].type = 'weekly';
            logLists[2].type = 'monthly';
            logLists[3].type = 'future'; // !!! log lists aren't properly set unless we switch to home from a different page, calling setState
            break;
        }
        case 'daily': {
            // swap the ID to daily, show the daily divs
            // delete any leftover custom textareas from last time we were here
            // create new textareas with date passed in
            // textarea needs to pull data and save data to that date in the storage
            // pushState();
            body.id = 'daily-log';
            title.textContent = state.date;
            const bulletEntries = document.querySelector('bullet-entries');
            const newPage = document.createElement('bullet-entries');
            newPage.logtype = 'daily';
            newPage.date = state.date;
            newPage.position = 1;
            if (bulletEntries) {
                bulletEntries.parentNode.replaceChild(newPage, bulletEntries);
            } else {
                const singlePage = document.querySelector('.single-page');
                singlePage.appendChild(newPage);
            }

            break;
        }
        case 'weekly': {
            body.id = 'weekly-log';
            title.textContent = state.date;
            const leftPage = document.querySelector(
                '.weekly-log-left-grid-container'
            );
            let counter = 1;
            // eslint-disable-next-line no-restricted-syntax
            for (const day of leftPage.children) {
                const newPage = document.createElement('bullet-entries');
                newPage.logtype = 'weekly';
                newPage.date = state.date;
                newPage.position = counter;
                day.appendChild(newPage);
                counter += 1;
            }
            break;
        }
        case 'monthly': {
            body.id = 'monthly-log';
            break;
        }
        case 'future': {
            body.id = 'future-log';
            break;
        }
        default: {
            break;
        }
    }
    // page switches to daily, date is given somehow? create bulletEntry dynamically, set date
};
