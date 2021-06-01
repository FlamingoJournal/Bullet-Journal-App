// eslint-disable-next-line import/newline-after-import
import { router } from '../scripts/router.js';
import { addEntryToStorage } from '../scripts/indexdb.js';

const { setState } = router;

// <journal-entry> custom web component
class LogList extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
        <style>
            .log-list-comp {
                width: 20vw;
                height: 33vh;
                min-width: 170px;
                min-height: 275px;
                background-color: #9DBEB9;
                border-radius: 25px;
                border-width: 3px;
                border-color: black;
                text-align: center;
                margin-left: 5px;
                margin-right: 5px;
                float: left;
            }

            .log-title {
                padding-top: 10px;
                margin-bottom: 5px;
                font-size: 26px;
                font-family: 'Lato', sans-serif;
                font-weight: bold;
                text-align: center;
            }

            .most-recent {
                font-size: 13px;
                font-family: 'Lato', sans-serif;
                font-weight: bold;
                background-color: white;
                border-color: transparent;
                border-radius: 30px;
                box-shadow: 0px 0px 10px 0px white;
                text-align: center;
                margin-bottom: 10px;
            }
            
            .most-recent:hover {
            background-color: lightgray;
            }

            .logs-list {
                min-height: 50%;
                max-height: 60%;
                list-style: none;
                padding-top: 10px;
                padding-bottom: 10px;
                margin-left: 0;
                padding-left: 0;
                font-family: 'Lato', sans-serif;
                font-weight: bold;
                width: 80%;
                margin: 0 auto;
                background-color: white;
                border-radius: 11px;
                text-align: center;
                overflow-y: scroll;
            }

            .logs-list li:hover {
            color: gray;
            text-decoration: underline;
            }
        </style>

        <div class="log-list-comp">
            <h1 class="log-title">DAILY LOG</h2>
            <button class="most-recent" id="most-recent" type="button">MOST RECENT</button>
            <button class="most-recent" id="create-new" type="button">CREATE NEW</button>
            <ul class="logs-list">
            </ul>
            
        </div>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * `set` binds an object property to a function to be called when there is an attempt to set that property.
     * Change log details based on log type given.
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set}
     * @todo Retrieve logs from database and populate entries
     * @todo Make the most recent button switch to the appropriate most recent log
     */
    set type(logType) {
        const logTitle = this.shadowRoot.querySelector('.log-title');
        const mostRecentButton = this.shadowRoot.querySelector('.most-recent');
        const createNewButton = this.shadowRoot.querySelector('#create-new');
        const logsList = this.shadowRoot.querySelector('.logs-list');
        switch (logType) {
            case 'daily': {
                logTitle.textContent = 'DAILY LOG';

                // refresh list
                // get rid of all old stuff
                while (logsList.firstElementChild) {
                    logsList.removeChild(logsList.firstElementChild);
                }
                // entries exist
                if (localStorage.getItem('daily')) {
                    const dailies = JSON.parse(localStorage.getItem('daily'));
                    const keys = Object.keys(dailies);
                    for (let i = 0; i < keys.length; i += 1) {
                        const listEntry = document.createElement('li');
                        listEntry.textContent = keys[i];
                        const state = { page: 'daily', date: keys[i] };
                        listEntry.addEventListener('click', () => {
                            setState(state);
                        });
                        logsList.appendChild(listEntry);
                    }
                }
                mostRecentButton.addEventListener('click', () => {
                    addEntryToStorage('different messages');
                });
                createNewButton.addEventListener('click', () => {
                    // check if today's log already exists
                    // dailies = {"5/02/2021": ["baked a cake", "ate breakfast"], '05032021': ["pooped"]}
                    if (localStorage.getItem('daily')) {
                        const dailies = JSON.parse(
                            localStorage.getItem('daily')
                        );
                        const today = new Date().toLocaleDateString();
                        if (dailies[today]) {
                            // console.log('log already exists for today');
                        } else {
                            // today's log doesn't exist yet
                            dailies[today] = [];
                            localStorage.setItem(
                                'daily',
                                JSON.stringify(dailies)
                            );
                            const state = { page: 'daily', date: today };
                            setState(state);
                        }
                    }
                    //  no daily log yet. First time user?
                    else {
                        const dailies = {}; // create new object to hold entries
                        const today = new Date().toLocaleDateString();
                        dailies[today] = [];
                        localStorage.setItem('daily', JSON.stringify(dailies));
                        const state = { page: 'daily', date: today };
                        setState(state);
                    }
                });
                break;
            }
            case 'weekly': {
                logTitle.textContent = 'WEEKLY LOG';
                mostRecentButton.addEventListener('click', () => {});
                break;
            }
            case 'monthly': {
                logTitle.textContent = 'MONTHLY LOG';
                mostRecentButton.addEventListener('click', () => {});
                break;
            }
            case 'future': {
                logTitle.textContent = 'FUTURE LOG';
                mostRecentButton.addEventListener('click', () => {});
                break;
            }
            default: {
                break;
            }
        }
    }
}

customElements.define('log-list', LogList);
