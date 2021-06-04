/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
// <journal-entry> custom web component
import { saveEntryToStorage, getEntryFromStorage } from '../scripts/indexdb.js';

class BulletEntries extends HTMLElement {
    set position(pos) {
        if (pos) {
            this.setAttribute('position', pos);
        } else {
            this.removeAttribute('position');
        }
    }

    get position() {
        return this.getAttribute('position');
    }

    set date(date) {
        if (date) {
            this.setAttribute('date', date);
        } else {
            this.removeAttribute('date');
        }
    }

    get date() {
        return this.getAttribute('date');
    }

    set logtype(logType) {
        if (logType) {
            this.setAttribute('logtype', logType);
        } else {
            this.removeAttribute('logtype');
        }
    }

    get logtype() {
        return this.getAttribute('logtype');
    }

    //  runs when element is added to the DOM.
    // connectedCallback() {
    //     this.fetchData();

    // }

    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
        <style>
            textarea {
                width: 97%;
                resize: none;
                font-size: 20px;
                border-radius: 8px;

            }
        </style>
        <div class="text">
            <textarea class="entry" cols="50" rows="1"></textarea>
        </div>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const self = this;
        // increases textarea height automatically

        function autoScroll() {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        }

        // prevents enter from creating a new line, creates new entry instead
        function checkEnterKey(e) {
            if (e.ctrlKey && e.key == 'Enter') {
                e.preventDefault(); //  stop new line
                if (this.value && !this.nextElementSibling) {
                    //  something is in the textarea, and we're in the last textarea
                    addNewEntry();
                    this.nextElementSibling.focus();
                }
            }
        }

        //  override user's tab
        function checkTab(e) {
            if (e.key == 'Tab') {
                e.preventDefault();
                const startPosition = this.selectionStart;
                const endPosition = this.selectionEnd;

                this.value = `${this.value.substring(
                    0,
                    startPosition
                )}\t${this.value.substring(endPosition)}`;
                this.selectionStart = startPosition + 1;
                this.selectionEnd = startPosition + 1;
            }
        }

        // Deletes current textarea if it's empty and backspace/delete is pressed
        function checkDelete(e) {
            if ((e.key == 'Backspace' || e.key == 'Delete') && !this.value) {
                e.preventDefault();
                this.previousElementSibling.focus();
                this.remove();
            }
        }

        // create a new text area, give it the proper class, style, and event listeners, then add it to the document
        function addNewEntry() {
            const newEntry = document.createElement('textarea');
            newEntry.className = 'entry';
            newEntry.cols = 50;
            newEntry.rows = 1;
            newEntry.addEventListener('input', autoScroll);
            newEntry.addEventListener('keydown', checkEnterKey);
            newEntry.addEventListener('keydown', checkDelete);
            newEntry.addEventListener('keydown', checkTab);
            newEntry.addEventListener('blur', checkBlur);
            text.appendChild(newEntry);
        }

        // add a new textarea if the user clicks off of the latest textarea and there's stuff in it
        function checkBlur() {
            if (this.value && !this.nextElementSibling) {
                addNewEntry();
            }
        }

        const text = this.shadowRoot.querySelector('.text');
        const firstEntry = this.shadowRoot.querySelector('.entry');
        firstEntry.addEventListener('input', autoScroll);
        firstEntry.addEventListener('keydown', checkEnterKey);
        firstEntry.addEventListener('keydown', checkTab);
        firstEntry.addEventListener('blur', checkBlur);

        // Go through the textareas and save their values into localStorage
        self.addEventListener('blur', () => {
            const entries = self.shadowRoot.querySelectorAll('textarea');
            const data = [];
            for (let i = 0; i < entries.length; i += 1) {
                data.push(entries[i].value);
            }
            console.log('saving?');
            // 2021may01monday
            // 2021may01tuesday
            //  get info from storage, add new data array to current date key, save it back in
            saveEntryToStorage(self.logtype, self.date, data, self.position);
        });

        // When page loads, retrieve localStorage info and create textareas accordingly

        // eslint-disable-next-line no-unused-vars
        function fetchData() {
            getEntryFromStorage(self.logtype, self.date, (entryData) => {
                if (entryData[self.position][0] === 'undefined') {
                    firstEntry.value = '';
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    firstEntry.value = entryData[self.position][0];
                }

                firstEntry.style.height = `${firstEntry.scrollHeight}px`;
                for (let i = 1; i < entryData[self.position].length; i += 1) {
                    addNewEntry();
                    text.lastElementChild.value = entryData[self.position][i];
                    text.lastElementChild.style.height = `${text.lastElementChild.scrollHeight}px`;
                }
            });
        }

        setTimeout(fetchData, 1);
    }

    // given date, set date info
}

customElements.define('bullet-entries', BulletEntries);
