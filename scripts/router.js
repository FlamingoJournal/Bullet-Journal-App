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

            break;
        }
        case 'daily': {
            // swap the ID to daily, show the daily divs
            // delete any leftover custom textareas from last time we were here
            // create new textareas with date passed in
            // textarea needs to pull data and save data to that date in the storage
            pushState()
        }
        default: {
            break;
        }
    }
    // page switches to daily, date is given somehow? create bulletEntry dynamically, set date
};
