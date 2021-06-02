// eslint-disable-next-line import/newline-after-import
import { router } from '../scripts/router.js';
import {
    saveEntryToStorage,
    getEntryFromStorage,
    getAllKeys,
} from '../scripts/indexdb.js';

const { setState } = router;

// <journal-entry> custom web component
class LogList extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
        <style>
            .log-list-comp {
                width: 24vw;
                height: 33vh;
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

        const logList = this.shadowRoot.querySelector('.log-list-comp');

        const color = JSON.parse(localStorage.getItem('color'));

        switch (color) {
            case 'dark': {
                logList.style.backgroundColor = '#7C7C7C';
                break;
            }

            case 'normal': {
                logList.style.backgroundColor = '#9DBEB9';
                break;
            }

            case 'light': {
                logList.style.backgroundColor = '#FFC2B4';
                break;
            }
            default: {
                break;
            }
        }
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

        logTitle.textContent = `${logType.toUpperCase()} LOG`;

        // get rid of old entries if there are any
        while (logsList.firstElementChild) {
            logsList.removeChild(logsList.firstElementChild);
        }

        // fill entry list
        getAllKeys(logType, (keysArray) => {
            for (let i = 0; i < keysArray.length; i += 1) {
                const listEntry = document.createElement('li');
                listEntry.textContent = keysArray[i];
                const state = { page: logType, date: keysArray[i] };
                listEntry.addEventListener('click', () => {
                    setState(state);
                });
                logsList.appendChild(listEntry);
            }
        });
        createNewButton.addEventListener('click', () => {
            const today = new Date().toLocaleDateString();
            getEntryFromStorage(logType, today, (entryData) => {
                if (!entryData) {
                    const blankEntry = [''];
                    saveEntryToStorage(logType, today, blankEntry);
                    const state = { page: logType, date: today };
                    setState(state);
                } else {
                    // do something
                    // right now, just go to that page when there already is one
                    const state = { page: logType, date: today };
                    setState(state);
                }
            });
        });
        mostRecentButton.addEventListener('click', () => {});
    }
}

customElements.define('log-list', LogList);
