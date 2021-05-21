class addNewLogButton extends HTMLElement {
    constructor() {
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
  
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
    get content() {
      let contentobj = {
        'button-label': this.shadowRoot.querySelector('#addNewLog').innerText,
        'close-button': this.shadowRoot.querySelector('#addNewLogModal-close').innerText,
      };
  
      return contentObj;
    }
  
    set content(content) {
      this.shadowRoot.querySelector('#addNewLog').innerText = content.button;
      this.shadowRoot.querySelector('#addNewLogModal-close').innerText = content.close;
    }
  }
  
  customElements.define('add-new-log', AddLog);