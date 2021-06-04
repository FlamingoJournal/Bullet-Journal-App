class keyButton extends HTMLElement {
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

    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
          <style>
            #button-group {
                text-align: left;
            }
            
            /* Sets color for key buttons*/
            .buttonGroup {
                border: none;
                font-size: 20px;
                font-family: 'Lato', sans-serif;
                background: transparent;
            }
            
            /* When the cursor hovers on a button */
            .buttonGroup:hover {
                border: solid;
                cursor: pointer;
            }        
          </style>
          <!-- Key Buttons Start -->
                <div id="button-group">
                    <!--src= https://www.w3schools.com/charsets/ref_utf_dingbats.asp -->
                    <button value="&#8658;" class="buttonGroup">
                    &#8658; MIGRATE
                    </button> 
                    <!-- Migration Arrow-->
                    <button value="&#9744;" class="buttonGroup">
                        &#9744; INCOMPLETE
                    </button> 
                    <!-- square without check-->
                    <br />
                    <button value="&#9745;" class="buttonGroup">
                        &#9745; COMPLETE
                    </button>
                    <!-- square w/ check -->
                    <br />
                    <button value="&#9675;" class="buttonGroup">
                        &#9675; EVENT
                    </button>
                    <!-- circle -->
                    <br />
                    <button value="&ndash;" class="buttonGroup">
                        &ndash; NOTE
                    </button>
                    <!-- dash -->
                    <br />
                    <button value="&#10033;" class="buttonGroup">
                        &#10033; PRIORITY
                    </button>
                    <!-- star -->
                    <br />
                    <button value="&#9888;" class="buttonGroup">
                        &#9888; INSPIRATIONAL
                    </button>
                    <!-- exclamation mark -->
                    <br />
                </div>
                <!-- Key Buttons End -->
          `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const self = this;
        const btns = this.shadowRoot
            .getElementById('button-group')
            .querySelectorAll('button'); // keys

        // const textAreas = document.querySelectorAll('textarea');

        // Get text area when clicked
        // textAreas.forEach((textArea) => {
        //     textArea.addEventListener('click', () => {
        //         const area;
        //         area = textArea;
        //         // console.log(area)
        //     });
        // });

        // find appropriate bullet entries from logtype
        // console.log(self.logtype)

        // on button click add key to last clicked textarea
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                // area.value += btn.value;
                let bulletEntries;
                switch (self.logtype) {
                    case 'daily': {
                        bulletEntries = document.querySelector(
                            '.single-page > bullet-entries'
                        );
                        break;
                    }
                    case 'weekly': {
                        bulletEntries = document.querySelectorAll(
                            '.weekly-log-grid-container bullet-entries'
                        );
                        break;
                    }
                    case 'monthly': {
                        bulletEntries = document.querySelectorAll(
                            '.monthly-log-grid-container bullet-entries'
                        );
                        break;
                    }
                    case 'future': {
                        bulletEntries = document.querySelectorAll(
                            '.future-log-grid-container bullet-entries'
                        );
                        break;
                    }
                    default: {
                        break;
                    }
                }
                let area;

                // Get text area when clicked
                bulletEntries.forEach((bulletEntry) => {
                    bulletEntry.addEventListener('click', () => {
                        area = bulletEntry;
                        console.log(area);
                    });
                });
            });
        });
    }
}

customElements.define('key-button', keyButton);
