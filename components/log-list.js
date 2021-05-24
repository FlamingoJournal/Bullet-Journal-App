// <journal-entry> custom web component
class LogList extends HTMLElement {
    constructor() {
        super()

        const template = document.createElement('template')

        template.innerHTML = `
        <style>
            .log-list-comp {
                width: 18vw;
                height: 30vh;
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
            <button class="most-recent" type="button">MOST RECENT</button>
            <ul class="logs-list">
                <li>MAY 12, 2021</li>
            </ul>
        </div>
        `

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * `set` binds an object property to a function to be called when there is an attempt to set that property.
     * Change log details based on log type given.
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set}
     * @todo Retrieve logs from database and populate entries
     * @todo Make the most recent button switch to the appropriate most recent log
     */
    set type(logType) {
        const logTitle = this.shadowRoot.querySelector('.log-title')
        const mostRecentButton = this.shadowRoot.querySelector('.most-recent')
        // const logsList = this.shadowRoot.querySelector('.logs-list')
        switch (logType) {
            case 'daily': {
                logTitle.textContent = 'DAILY LOG'
                mostRecentButton.addEventListener('click', () => {
                    // setState?
                    // populate entries
                })

                break
            }
            case 'weekly': {
                logTitle.textContent = 'WEEKLY LOG'
                mostRecentButton.addEventListener('click', () => {})
                break
            }
            case 'monthly': {
                logTitle.textContent = 'MONTHLY LOG'
                mostRecentButton.addEventListener('click', () => {})
                break
            }
            case 'future': {
                logTitle.textContent = 'FUTURE LOG'
                mostRecentButton.addEventListener('click', () => {})
                break
            }
            default: {
                break
            }
        }
    }
}

customElements.define('log-list', LogList)
