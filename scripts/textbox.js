const leftPage = document.querySelector('.left-page');
const rightPage = document.querySelector('.right-page');
let first_entry = document.querySelector(".textbox");
first_entry.addEventListener('input', autoScroll);
first_entry.addEventListener('keypress', checkEnterKey);
first_entry.addEventListener('keydown', checkTab);
first_entry.addEventListener('blur', checkBlur);

// increases textarea height automatically
function autoScroll() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

// prevents enter from creating a new line, creates new entry instead
function checkEnterKey(e) {
    if (e.key == "Enter") {
        e.preventDefault(); //  stop new line
        if (this.value) { //  something is in the textarea
            if (!this.nextElementSibling) { //  we're in the last textarea, so add a new entry
                addNewEntry();
            }
            this.nextElementSibling.focus(); // shift focus to next textarea
        }
    }   
}

//  override user's tab
function checkTab(e) {
    if (e.key == "Tab") {
        e.preventDefault();
        this.value += "\t";
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
    new_entry.className = "textbox";
    new_entry.rows = 1;
    new_entry.addEventListener('input', autoScroll);
    new_entry.addEventListener('keypress', checkEnterKey);
    new_entry.addEventListener('keydown', checkDelete);
    new_entry.addEventListener('keydown', checkTab);
    new_entry.addEventListener('blur', checkBlur);
    leftPage.appendChild(new_entry);
}

// Go through the textareas and save their values into localStorage
function saveInput(){
    let entries = document.getElementsByClassName("entry");
    console.log(entries);
    let data = [];
    for (e of entries) {
        data.push(e.value);
    }
    localStorage.setItem("data", JSON.stringify(data));
}

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

// Clear localStorage and all textareas except the first one if clear button is clicked
// let clear_button = document.getElementById("user-clear");
// clear_button.addEventListener('click', () => {
//     localStorage.clear();
//     while (main.childElementCount > 3) {
//         main.removeChild(main.lastElementChild);
//         first_entry.value="";
//     }
// });