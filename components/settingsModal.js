class settingsModal extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
          <style>
            .settingsButton {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                border: none;
                width: 30px;
                height: 30px;
            }

            .settingsModal {
                display:none;
                position: fixed;
                z-index: 1;
                left: 0; 
                top: 0;
                height: 100%;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.4);
            }

            .settingsModal-content {
                background-color: #B0C1BF;
                margin: 20% auto;
                padding: 20px;
                width: 40%;
                height: 35%;
                border-radius: 25px;
                border-style:solid;
                border-width:5px;
                border-color: #6E838A;
                box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 
                0 7px 20px 0 rgba(0, 0, 0, 0.15);
                position: fixed;
                top: 50%;
                left: 50%;
                margin-top: -14%;
                margin-left: -20%;
            }

            .settingsModal-content button {
                background-color: transparent;
                outline: none;
                border: transparent;
            }


            .settingsModalClose {
                color: rgb(121, 120, 120);
                float: right;
                font-size: 30px;
                display: 'inline-block';
            }
            
            .settingsModalClose:hover, .settingsModalClose:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
            
            .modalHeader {
                position: relative;
                font-family: Lato;
                font-style: normal;
                font-weight: 1200;
                font-size: 30px;
                line-height: 60px;
                margin-top: 0;
                margin-left: 25%;
                margin-right: 25%;
                letter-spacing: 0.15em;
                color: #000000;
                display: 'inline-block';
            }

            .leftTheme {
                position: absolute;
                margin-left: 20%;
            }
            .midTheme {
                position: absolute;
                margin-left: 45%;                
            }

            .rightTheme {
                position: absolute;
                margin-left: 70%;
            }

          </style>
          <section>
            <button id="openSettings" class="settingsButton" className='log'><img class="settingsImage" src="../Files/Icons/next_page_arrow.svg"></button>
            <div class="settingsModal">
                <div class="settingsModal-content">
                    <span class="settingsModalClose">&times;</span>
                    <h3 class="modalHeader">CHOOSE THEME</h3>
                    <br>
                    <button class='leftTheme'><img src="../Files/Icons/settings/dark_mode_circle.svg"></button>
                    <button class='midTheme'><img src="../Files/Icons/settings/default_mode_circle.svg"></button>
                    <button class='rightTheme'><img src="../Files/Icons/settings/pink_mode_circle.svg"></button>
                </div>
            </div>
          </section>
          `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const openModalBtn = this.shadowRoot.querySelector('.settingsButton'); // get open modal button
        const modal = this.shadowRoot.querySelector('.settingsModal'); // get modal window
        const closeBtn = this.shadowRoot.querySelector('.settingsModalClose'); // get close modal button

        openModalBtn.onclick = function () {
            modal.style.display = 'block';
        };

        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };
    }
}

customElements.define('settings-modal', settingsModal);
