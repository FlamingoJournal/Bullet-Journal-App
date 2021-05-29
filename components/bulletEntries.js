/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
// <journal-entry> custom web component
class BulletEntries extends HTMLElement {

    //  return array containing names of attributes to observe. Used by attributeChangedCallback()
    // static get observedAttributes() {
    //     return ['logType', 'date'];
    //   }
    
    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === 'logtype') {
    //         this.logtype = newValue;
    //     }
    //     if (name === 'date') {
    //         this.date = newValue;
    //     }
    // }
    // set date(date) {
    //     this.date = date;
    // }

    // set logtype(logType) {
    //     this.logtype = logType;
    // }
    //  runs when element is added to the DOM.
    // connectedCallback() {
    //     fetchData();
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
            }
            .date {
                display: flex;
                justify-content: center;
                align-items: center;
                width:50%;
                background-color: #E6E6E6;
                position: sticky;
                top: 0;
            }
            .date h1 {
                margin-top: 0;
            }
        </style>
        <div class="date">
            <h1>YAHA</h1>
        </div>
        <textarea class="entry" cols="50" rows="1"></textarea>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

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
            shadow.appendChild(newEntry);
        }

        // add a new textarea if the user clicks off of the latest textarea and there's stuff in it
        function checkBlur() {
            if (this.value && !this.nextElementSibling) {
                addNewEntry();
            }
        }

        const shadow = this.shadowRoot;
        const main = this.shadowRoot.querySelector('section');
        const firstEntry = this.shadowRoot.querySelector('.entry');
        this.date = "";
        this.logtype="";
        firstEntry.addEventListener('input', autoScroll);
        firstEntry.addEventListener('keydown', checkEnterKey);
        firstEntry.addEventListener('keydown', checkTab);
        firstEntry.addEventListener('blur', checkBlur);

        // Go through the textareas and save their values into localStorage
        document.addEventListener('click', () => {
            const entries = document.getElementsByClassName('entry');
            // console.log(entries);
            const data = [];
            for (e of entries) {
                data.push(e.value);
            }

            //  get info from storage, add new data array to current date key, save it back in
            const logStorage = JSON.parse(localStorage.getItem(this.logtype));
            console.log(this.logtype);
            console.log(this.date);
            logStorage[this.date] = data;
            localStorage.setItem(this.logtype, JSON.stringify(logStorage));
        });

        // When page loads, retrieve localStorage info and create textareas accordingly

        function fetchData() {
            const logStorage = JSON.parse(localStorage.getItem(this.logtype))
            if (logStorage[this.date]) {
                const data = logStorage[this.date];
                // eslint-disable-next-line prefer-destructuring
                firstEntry.value = data[0];
                firstEntry.style.height = `${firstEntry.scrollHeight}px`;
                for (let i = 1; i < data.length; i += 1) {
                    addNewEntry();
                    main.lastElementChild.value = data[i];
                    main.lastElementChild.style.height = `${main.lastElementChild.scrollHeight}px`;
                }
            }
        }


        
    }

    // given date, set date info
    
}

customElements.define('bullet-entries', BulletEntries);
