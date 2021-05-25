// Datapicker.js
/**
 * Function that clears the selected date on the datepicker
 */
const clearBtn = document.getElementById('clear-btn')
clearBtn.onclick = function clear() {
    document.getElementById('calendar').valueAsDate = null
}

/**
 * Function that searches the picked date on the datepicker
 * @todo Get month and year from outputted string
 */
const searchBtn = document.getElementById('search-btn')
searchBtn.onclick = function search() {
    const selDate = document.getElementById('calendar').value
    return selDate;
}
