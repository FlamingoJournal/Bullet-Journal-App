import { getEntryFromStorage } from '../scripts/indexdb.js';

/**
 * Custom component representing the key buttons attached to the sidebar.
 * Used to select key symbols that are then added to the text areas on the log page.
 * @extends HTMLElement
 */
class keyButton extends HTMLElement {
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

        // Interface with Bullet Entries
        const btns = this.shadowRoot.querySelectorAll('.buttonGroup');

        // Add event listeners to all buttons to add their values to
        // most recent text area
        // eslint-disable-next-line no-restricted-syntax
        for (const button of btns) {
            button.addEventListener('click', () => {
                getEntryFromStorage(
                    'mostRecent',
                    'lastTextArea',
                    (entryData) => {
                        // Get Position of last clicked bullet entry
                        const pos = entryData.position - 1;
                        const bulletEnt =
                            document.querySelectorAll('bullet-entries')[pos];

                        // Get last clicked text area
                        const TAIndex = entryData.textAreaIndex;
                        const textareaDiv =
                            bulletEnt.shadowRoot.querySelector('.text');
                        const textarea =
                            textareaDiv.querySelectorAll('textarea')[TAIndex];

                        textarea.focus();
                        const startPosition = textarea.selectionStart;
                        const endPosition = textarea.selectionEnd;

                        textarea.value = `${textarea.value.substring(
                            0,
                            startPosition
                        )}${button.value}${textarea.value.substring(
                            endPosition
                        )}`;
                        textarea.selectionStart = startPosition + 1;
                        textarea.selectionEnd = startPosition + 1;
                    }
                );
            });
        }
    }
}

customElements.define('key-button', keyButton);
