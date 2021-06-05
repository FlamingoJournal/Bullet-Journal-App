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
    const keyButton = document.querySelector('key-button');
    // const newKeyButton = document.createElement('key-button');

    const allBulletEntries = document.querySelectorAll('bullet-entries');

    // If there are instances of bullet-entry in the dom, delete them.
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of allBulletEntries) {
        entry.remove();
    }

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
            body.id = 'daily-log';
            title.textContent = state.date;

            const singlePage = document.querySelector('.single-page');
            const newPage = document.createElement('bullet-entries');
            newPage.logtype = 'daily';
            newPage.date = state.date;
            newPage.position = 1;
            singlePage.appendChild(newPage);

            keyButton.logtype = 'daily';

            break;
        }
        case 'weekly': {
            body.id = 'weekly-log';
            title.textContent = state.date;

            const leftPage = document.querySelector('.weekly-log-left-grid');

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

            const rightPage = document.querySelector('.weekly-log-right-grid');

            // eslint-disable-next-line no-restricted-syntax
            for (const day of rightPage.children) {
                const newPage = document.createElement('bullet-entries');
                newPage.logtype = 'weekly';
                newPage.date = state.date;
                newPage.position = counter;
                day.appendChild(newPage);

                counter += 1;
            }
            keyButton.logtype = 'weekly';
            break;
        }
        case 'monthly': {
            body.id = 'monthly-log';
            title.textContent = state.date;

            const leftPage = document.querySelector('.monthly-left');
            let counter = 1;
            // eslint-disable-next-line no-restricted-syntax
            for (const week of leftPage.children) {
                const newPage = document.createElement('bullet-entries');
                newPage.logtype = 'monthly';
                newPage.date = state.date;
                newPage.position = counter;
                week.appendChild(newPage);

                counter += 1;
            }
            const rightPage = document.querySelector('.monthly-right');
            // eslint-disable-next-line no-restricted-syntax
            for (const week of rightPage.children) {
                const newPage = document.createElement('bullet-entries');
                newPage.logtype = 'monthly';
                newPage.date = state.date;
                newPage.position = counter;
                week.appendChild(newPage);

                counter += 1;
            }
            keyButton.logtype = 'monthly';
            break;
        }
        case 'future': {
            body.id = 'future-log';
            title.textContent = state.date;

            const mainPage = document.querySelector(
                '.future-log-grid-container'
            );
            const monthNamesFirstHalf = [
                'JAN',
                'FEB',
                'MAR',
                'APR',
                'MAY',
                'JUN',
            ];
            const monthNamesSecondHalf = [
                'JUL',
                'AUG',
                'SEP',
                'OCT',
                'NOV',
                'DEC',
            ];
            // Renaming Divs appropriately
            for (let i = 0; i < mainPage.children.length; i += 1) {
                console.log(state.whichHalf);
                if (state.whichHalf === 1) {
                    mainPage.children[i].innerHTML = monthNamesFirstHalf[i];
                } else {
                    mainPage.children[i].innerHTML = monthNamesSecondHalf[i];
                }
            }

            let counter = 1;
            // eslint-disable-next-line no-restricted-syntax
            for (const month of mainPage.children) {
                const newPage = document.createElement('bullet-entries');
                newPage.logtype = 'future';
                newPage.date = state.date;
                newPage.position = counter;
                if (month.children.length > 0) {
                    month.removeChild(month.lastElementChild);
                }
                month.appendChild(newPage);

                counter += 1;
            }
            keyButton.logtype = 'future';
            break;
        }
        default: {
            break;
        }
    }
    // page switches to daily, date is given somehow? create bulletEntry dynamically, set date
};
