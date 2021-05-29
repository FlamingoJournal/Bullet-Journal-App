// const router = {};
// export default router;

export const router = {};
/**
 * Updates page display and information based on the state passed into the function.
 * @todo Implement this function
 */
router.setState = function switchState(state) {
    const body = document.querySelector('body');
    switch (state.page) {
        case 'home': {
            body.id = 'home';
            let logLists = document.querySelectorAll("log-list");
            logLists[0].type = "daily";
            logLists[1].type = "weekly";
            logLists[2].type = "monthly";
            logLists[3].type = "future"; // !!! log lists aren't properly set unless we switch to home from a different page, calling setState
            break;
        }
        case 'daily': {
            // swap the ID to daily, show the daily divs
            // delete any leftover custom textareas from last time we were here
            // create new textareas with date passed in
            // textarea needs to pull data and save data to that date in the storage
            // pushState();
            body.id = 'log';
            let bulletEntries = document.querySelectorAll("bullet-entries");
            const newLeftPage = document.createElement("bullet-entries");
            newLeftPage.logtype = "daily"; // !!! these things don't want to update inside the component for some reason
            newLeftPage.date = state.date;
            bulletEntries[0].parentNode.replaceChild(newLeftPage, bulletEntries[0]);

            break;
        }
        default: {
            break;
        }
    }
    // page switches to daily, date is given somehow? create bulletEntry dynamically, set date
};
