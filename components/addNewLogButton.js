class addNewLogButton extends HTMLElement {
    constructor() {
        console.log(0);
        super();
  
        const template = document.createElement('template');
  
        template.innerHTML = `
          <style>
            .post {
                width:500px;
                height:500px;
                display: block;
                border-style: solid;
            }
            .button {
                background: gray;
                padding: 1em 2em;
                color: white;
                border: 0;
            }
            
            .button:hover {
                background:green;
            }
            
            .modal {
                display:none;
                position: fixed;
                z-index: 1;
                left: 0; 
                top: 0;
                height: 100%;
                width: 100%;
                overflow: auto; /* enable scroll */
                background-color: rgba(0, 0, 0, 0.4);
            }
            
            .addNewLogModal-content {
                background-color:#f4f4f4;
                margin: 20% auto;
                padding: 20px;
                width: 70%;
                box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 
                0 7px 20px 0 rgba(0, 0, 0, 0.15);
            }
            
            .addNewLogModal-close {
                color: rgb(121, 120, 120);
                float: right;
                font-size: 30px;
            }
            
            .addNewLogModal-close:hover, .addNewLogModal-close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }

          </style>
          <section class='post'>
            <button id="addNewLog" class="button">Test</button>
            <div id="addNewLogModal" class="modal">
                <div class="addNewLogModal-content">
                    <span class="addNewLogModal-close"></span>
                    <p>Settings go here</p>
                </div>
            </div>
          </section>
          `;
  
      this.attachShadow({ mode: 'open' });
      console.log(1);
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      console.log(2);
    }
  
    get content() {
      let contentobj = {
        'button_label': this.shadowRoot.querySelector('.button').innerText,
        'close_button': this.shadowRoot.querySelector('.addNewLogModal-close').innerText,
      };
  
      return contentObj;
    }
  
    set content(content) {
      this.shadowRoot.querySelector('.button').innerText = content.button_label;
      this.shadowRoot.querySelector('.addNewLogModal-close').innerText = content_button;
    }
  }
  
  customElements.define('add-new-log', addNewLogButton);