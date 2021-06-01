// Datapicker.js

class datePicker extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
          <style>
            .buttons {
                position: absolute;
                top: 25%;
                left: 50%;
                margin-top: -50px;
                margin-left: -125px;
                width: 500px;
                height: 500px;
                align-items: center;
            
                /* display: flex;
                justify-content: center;*/
            }
            
            .search-btn {
                font-family: 'Lato', sans-serif;
                background-color: var(--log-background-color);
                border-radius: 25px;
            }
            
            .clear-btn {
                font-family: 'Lato', sans-serif;
                background-color: var(--log-background-color);
                border-radius: 25px;
            }
            
            input[type='date'] {
                background-color: var(--log-background-color);
                color: black;
                border-radius: 1em;
                font-family: 'Lato', sans-serif;
                text-align: center;
                justify-content: center;
                align-items: center;
                outline: none;
            }
            
            input[type='button']::-moz-focus-inner {
                border: 0;
            }
            
            input[type='date']:after {
                content: "\\25BC";
                color: rgb(255, 255, 255);
                padding: 0 5px;
                display: none;
            }
            
            input[type='date']:hover:after {
                color: var(--team-primary);
            }
            
            input[type='date']::-webkit-calendar-picker-indicator {
                position: absolute;
                top: 0;
                left: -20px;
                right: 0;
                bottom: 0;
                /*padding-left: 10px; */
                width: 16%;
                height: 3%;
                color: transparent;
                background: transparent;
            }
        

          </style>
          <section>
            <div id="buttons">
                <input type="date" id="calendar" />
                <button id="search-btn">SEARCH</button>
                <button id="clear-btn">CLEAR</button>
            </div>
          </section>
          `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        /**
         * Function that clears the selected date on the datepicker
         */
        const clearBtn = this.shadowRoot.getElementById('clear-btn');
        clearBtn.onclick = function clear() {
            document.getElementById('calendar').valueAsDate = null;
        };

        /**
         * Function that searches the picked date on the datepicker
         * @todo Get month and year from outputted string
         */
        const searchBtn = this.shadowRoot.getElementById('search-btn');
        searchBtn.onclick = function search() {
            const selDate = document.getElementById('calendar').value;
            return selDate;
        };
    }
}

customElements.define('date-picker', datePicker);
