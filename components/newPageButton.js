class newPageButton extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
          <style>

            .button {
              border-style: solid;
              width: 100px;
              height: 67px;
              background-color: #AAAAAA;
              border-radius: 12px;
              color: black;
              border-color: white;
              position: absolute;
              margin-left: 48%;
              margin-top: 13%;
              font-family: Verdana, sans-serif;
            }

            .template {
              height : 200px;
              width : 200px;
              border-style: solid;
            }
            
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
          <section>
            <button id="addNewPage" class='button'><img src=../Files/icons/add_page_button.svg></button>
          </section>
          `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const addBtn = this.shadowRoot.querySelector('#addNewPage'); // get open modal button

        addBtn.onclick = function () {
            console.log('test');
        };
    }
}

customElements.define('add-new-page', newPageButton);
