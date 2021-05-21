let addButton = document.createElement('add-new-log');
let contentArray = {button_label : 'Create New Button', 
                    close_button: '&times;'};
addButton.content = contentArray;
document.querySelector('main').appendChild(addButton);
console.log(addButton);
let modal = document.getElementById("addNewLogModal"); //get modal window
let modalBtn = document.getElementById("addNewLog"); //get open modal button
let closeBtn = document.getElementsByClassName("addNewLogModal-close")[0]; //get close modal button

// modalBtn.onclick = function () {
//     modal.style.display = 'block';
// }

// closeBtn.onclick = function () {
//     modal.style.display = 'none';
// }


