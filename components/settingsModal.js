// function to reload page when user is in home page
function homeReload() {
    const bodyId = document.querySelector('body').id; // get body id

    // if bodyId is home then reload page
    switch (bodyId) {
        case 'home': {
            window.location.reload();
            break;
        }
        default: {
            break;
        }
    }
}
/**
 * Custom component representing the settings popup when the cog on the top right is clicked. Lets the user change the color theme of the website.
 */
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
                    cursor: pointer;
                }

                .settingsButton:hover {
                    filter: drop-shadow( 0px 0px 10px rgba(150, 150, 150, 0.65));
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

                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: 10% 1fr;
                    gap: 0px 0px;
                    grid-template-areas:
                    "Header Header Header"
                    "leftTheme midTheme rightTheme";
                }

                .settingsModal-content button {
                    // display: flex;
                    background-color: transparent;
                    outline: none;
                    border: transparent;
                }


                .settingsModalClose {
                    width: 30px;
                    grid-area: Header;
                    color: black;
                    float: right;
                    font-size: 30px;
                    display: 'inline-block';
                }
                
                .settingsModalClose:hover, .settingsModalClose:focus {
                    color: white;
                    text-decoration: none;
                    cursor: pointer;
                }
                
                .modalHeader {
                    grid-area: Header;
                    text-align: center;
                    position: relative;
                    font-family: Lato;
                    font-style: normal;
                    font-weight: 1200;
                    font-size: 3vw;
                    font-size: 3vh;
                    line-height: 60px;
                    margin-top: 0;
                    margin-left: 25%;
                    margin-right: 25%;
                    letter-spacing: 0.15em;
                    color: #000000;
                    display: 'inline-block';
                }

                #home .leftTheme > img{
                    grid-area: leftTheme;
                    position: absolute;
                }
                #home .midTheme > img {
                    grid-area: midTheme;
                    position: absolute;
                }

                #home .rightTheme > img{
                    grid-area: rightTheme;
                    position: absolute;
                }

            </style>
            <section>
                <button id="openSettings" class="settingsButton" className='log'><img class="settingsImage" src="../Files/Icons/settings/settings.svg"></button>
                <div class="settingsModal">
                    <div class="settingsModal-content">
                        <span class="settingsModalClose">&times;</span>
                        <h3 class="modalHeader">CHOOSE THEME</h3>
                                                
                        <button class='leftTheme'><img style="width:80%; height:80%;" src="../Files/Icons/settings/dark_mode_circle.svg"></button>
                        <button class='midTheme'><img style="width:80%; height:80%;" src="../Files/Icons/settings/default_mode_circle.svg"></button>
                        <button class='rightTheme'><img style="width:80%; height:80%;" src="../Files/Icons/settings/pink_mode_circle.svg"></button>
                    </div>
                </div>
            </section>
            `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // saveEntryToStorage('color', '0', 'normal');
        let color = 'normal';
        if (localStorage.getItem('color') == null) {
            localStorage.setItem('color', JSON.stringify(color));
        } else {
            color = JSON.parse(localStorage.getItem('color'));
        }

        const openModalBtn = this.shadowRoot.querySelector('.settingsButton'); // get open modal button
        const modal = this.shadowRoot.querySelector('.settingsModal'); // get modal window
        const closeBtn = this.shadowRoot.querySelector('.settingsModalClose'); // get close modal button

        const header = document.querySelector('.navbar'); // get the header
        const sidebar = document.querySelector('.sidebar'); // get the sidebar
        const datepicker = document.querySelector('.datepicker > input'); // get date picker in sidebar
        const settingModal = this.shadowRoot.querySelector(
            '.settingsModal-content'
        );

        const leftButton = this.shadowRoot.querySelector('.leftTheme'); // get left button in settings modal
        const midButton = this.shadowRoot.querySelector('.midTheme'); // get middle button in settings modal
        const rightButton = this.shadowRoot.querySelector('.rightTheme'); // get right button in settings modal

        // when reloading check color scheme from local storage
        switch (color) {
            // use dark mode
            case 'dark': {
                header.style.backgroundColor = '#393E46';
                sidebar.style.backgroundColor = '#7C7C7C';
                datepicker.style.backgroundColor = '#393E46';
                settingModal.style.backgroundColor = '#7C7C7C';
                break;
            }
            // use default
            case 'normal': {
                header.style.backgroundColor = '#194350';
                sidebar.style.backgroundColor = '#9DBEB9';
                datepicker.style.backgroundColor = '#194350';
                settingModal.style.backgroundColor = '#9DBEB9';
                break;
            }
            // use light mode
            case 'light': {
                header.style.backgroundColor = '#FF8882';
                sidebar.style.backgroundColor = '#FFC2B4';
                datepicker.style.backgroundColor = '#FF8882';
                settingModal.style.backgroundColor = '#FFC2B4';
                break;
            }

            default: {
                break;
            }
        }

        openModalBtn.onclick = function () {
            modal.style.display = 'block';
        };

        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };

        // when left theme is clicked change the color scheme
        leftButton.addEventListener('click', () => {
            // change color for navbar, sidebar, datepicker, settings modal, and loglist
            header.style.backgroundColor = '#393E46';
            sidebar.style.backgroundColor = '#7C7C7C';
            datepicker.style.backgroundColor = '#393E46';
            settingModal.style.backgroundColor = '#7C7C7C';
            color = 'dark';
            localStorage.setItem('color', JSON.stringify(color));

            homeReload(); // changes color for loglist
        });
        // when middle theme is clicked change the color scheme
        midButton.addEventListener('click', () => {
            // change color for navbar, sidebar, datepicker, settings modal, and loglist
            header.style.backgroundColor = '#194350';
            sidebar.style.backgroundColor = '#9DBEB9';
            datepicker.style.backgroundColor = '#194350';
            settingModal.style.backgroundColor = '#9DBEB9';
            color = 'normal';
            localStorage.setItem('color', JSON.stringify(color));

            homeReload(); // changes color for loglist
        });
        // when right theme is clicked change the color scheme
        rightButton.addEventListener('click', () => {
            // change color for navbar, sidebar, datepicker, settings modal, and loglist
            header.style.backgroundColor = '#FF8882';
            sidebar.style.backgroundColor = '#FFC2B4';
            datepicker.style.backgroundColor = '#FF8882';
            settingModal.style.backgroundColor = '#FFC2B4';
            color = 'light';
            localStorage.setItem('color', JSON.stringify(color));

            homeReload(); // changes color for loglist
        });
    }
}

customElements.define('settings-modal', settingsModal);
