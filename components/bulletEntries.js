// <journal-entry> custom web component
class BulletEntries extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
        <style>
            textarea {
                width: 97%;
                resize: none;
                font-size: 20px;
            }
            .date {
                display: flex;
                justify-content: center;
                align-items: center;
                width:50%;
                background-color: #E6E6E6;
                position: sticky;
                top: 0;
            }
            .date h1 {
                margin-top: 0;
            }
        </style>
        <div class="date">
            <h1>YAHA</h1>
        </div>
        <textarea class="entry" cols="50" rows="1"></textarea>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    const shadow = this.shadowRoot;
    const main = this.shadowRoot.querySelector('section');
    const first_entry = this.shadowRoot.querySelector(".entry");
    first_entry.addEventListener('input', autoScroll);
    first_entry.addEventListener('keydown', checkEnterKey);
    first_entry.addEventListener('keydown', checkTab);
    first_entry.addEventListener('blur', checkBlur);

    // increases textarea height automatically
    
    function autoScroll() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }

    // prevents enter from creating a new line, creates new entry instead
    function checkEnterKey(e) {
        if (e.ctrlKey && e.key == "Enter") {
            e.preventDefault(); //  stop new line
            if (this.value && !this.nextElementSibling) { //  something is in the textarea, and we're in the last textarea
                addNewEntry();
                this.nextElementSibling.focus();
            }
            
        }   
    }

    //  override user's tab
    function checkTab(e) {
        if (e.key == "Tab") {
            e.preventDefault();
            const startPosition = this.selectionStart;
            const endPosition = this.selectionEnd;

            this.value = this.value.substring(0, startPosition) + "\t" + this.value.substring(endPosition);
            this.selectionStart = startPosition + 1;
            this.selectionEnd = startPosition + 1;
        }
    }

    // Deletes current textarea if it's empty and backspace/delete is pressed
    function checkDelete(e) {
        if ((e.key == "Backspace" || e.key == "Delete") && !this.value) {
            e.preventDefault();
            this.previousElementSibling.focus();
            this.remove();
        }
    }

    // add a new textarea if the user clicks off of the latest textarea and there's stuff in it 
    function checkBlur() {
        if (this.value && !this.nextElementSibling) {
            addNewEntry();
        }
    }

    // create a new text area, give it the proper class, style, and event listeners, then add it to the document
    function addNewEntry() {
        let new_entry = document.createElement('textarea');
        new_entry.className = "entry";
        new_entry.cols = 50;
        new_entry.rows = 1;
        new_entry.addEventListener('input', autoScroll);
        new_entry.addEventListener('keydown', checkEnterKey);
        new_entry.addEventListener('keydown', checkDelete);
        new_entry.addEventListener('keydown', checkTab);
        new_entry.addEventListener('blur', checkBlur);
        shadow.appendChild(new_entry);
    }

    // Go through the textareas and save their values into localStorage
    window.addEventListener('click', () => {
        let entries = document.getElementsByClassName("entry");
        //console.log(entries);
        let data = [];
        for (e of entries) {
            data.push(e.value);
        }
        localStorage.setItem("data", JSON.stringify(data));
    });

    // When page loads, retrieve localStorage info and create textareas accordingly
    window.addEventListener('load', fetchData);
    function fetchData(){
        if (localStorage.getItem("data")){
            let data = JSON.parse(localStorage.getItem("data"));
            first_entry.value = data[0];
            first_entry.style.height = first_entry.scrollHeight + 'px';
            for (let i = 1; i < data.length; i++){
                addNewEntry();
                main.lastElementChild.value=data[i];
                main.lastElementChild.style.height = main.lastElementChild.scrollHeight + 'px';
            }
        }
    }
    }
    

    // given date, set date info
}

customElements.define('bullet-entries', BulletEntries);
