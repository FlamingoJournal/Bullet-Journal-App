const btns = document.getElementById('button-group').querySelectorAll('button'); // keys
const textAreas = document.querySelectorAll('textarea')
let area

// Get text area when clicked
textAreas.forEach((textArea) => {
    textArea.addEventListener('click', () => {
        area = textArea
        // console.log(area);
  })
})

// on button click add key to last clicked textarea
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        area.value += btn.value
    })
})
