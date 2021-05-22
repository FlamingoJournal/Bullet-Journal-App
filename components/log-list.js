// <journal-entry> custom web component
class LogList extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
  
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
        `;
  
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
  }
  
  customElements.define('log-list', LogList);