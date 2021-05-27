class keyButton extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
          <style>
          #button-group {
            text-align: left;
            padding-left: 20px;
        }
        
        /* Sets color for ket buttons*/
        .buttonGroup {
            grid-area: log-key;
            border: none;
            font-size: 20px;
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
                    <!-- <button value="&#9744;" class="buttonGroup">&#9744;  INCOMPLETE</button> square <br /> -->
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
                        &ndash; IMPORTANT
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

        const btns = this.shadowRoot
            .getElementById('button-group')
            .querySelectorAll('button'); // keys
        const textAreas = document.querySelectorAll('textarea');
        let area;

        // Get text area when clicked
        textAreas.forEach((textArea) => {
            textArea.addEventListener('click', () => {
                area = textArea;
                // console.log(area)
            });
        });

        // on button click add key to last clicked textarea
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                area.value += btn.value;
            });
        });
    }
}

customElements.define('key-button', keyButton);
