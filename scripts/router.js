// const router = {};
// export default router;

export const router = {};

/**
 *
 * @param {*} state An object that has data about the caller and will switch pages based on that information
 */
router.setState = function switchState(state) {
    const body = document.querySelector('body');
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
            const bulletEntries = document.querySelector('bullet-entries');
            const newPage = document.createElement('bullet-entries');
            newPage.logtype = 'daily'; // !!! these things don't want to update inside the component for some reason
            newPage.date = state.date;
            if (bulletEntries) {
                bulletEntries.parentNode.replaceChild(newPage, bulletEntries);
            } else {
                const singlePage = document.querySelector('.single-page');
                singlePage.appendChild(newPage);
            }

            break;
        }
        default: {
            break;
        }
    }
    // page switches to daily, date is given somehow? create bulletEntry dynamically, set date
};
