class createNewLogButton extends HTMLElement {
    constructor() {
        super();
  
        const template = document.createElement('template');
  
        template.innerHTML = `
          <style>

            .button {
              border-style: solid;
              width: 100px;
              height: 67px;
              background-color: #FFEEEE;
              border-radius: 12px;
              color: black;
              border-color: white;
              position: relative;
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
            
            .createNewLogModal-content {
                background-color:#f4f4f4;
                margin: 20% auto;
                padding: 20px;
                width: 70%;
                box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 
                0 7px 20px 0 rgba(0, 0, 0, 0.15);
            }
            
            .createNewLogModal-close {
                color: rgb(121, 120, 120);
                float: right;
                font-size: 30px;
            }
            
            .createNewLogModal-close:hover, .createNewLogModal-close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }

          </style>
          <section>
            <button id="createNewLog" class="button" className='log'>Add New Log</button>
            <div id="createNewLogModal" class="modal">
                <div class="createNewLogModal-content">
                    <span class="createNewLogModal-close">&times;</span>
                    <button class='template'></button>
                    <button class='template'></button>
                    <button class='template'></button>
                    <button class='template'></button>
                </div>
            </div>
          </section>
          `;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      let modal = this.shadowRoot.querySelector("#createNewLogModal"); //get modal window
      let modalBtn = this.shadowRoot.querySelector("#createNewLog"); //get open modal button
      let closeBtn = this.shadowRoot.querySelector(".createNewLogModal-close"); //get close modal button

      modalBtn.onclick = function () {
        modal.style.display = 'block';
      }
      
      closeBtn.onclick = function () {
          modal.style.display = 'none';
      }
    
    }
  }



  customElements.define('create-page-button', createNewLogButton);