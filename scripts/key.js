const btns = document.getElementById('button-group').querySelectorAll('button'); // keys
const textAreas = document.querySelectorAll('textarea');
let area;

// Get text area when clicked
textAreas.forEach((textArea) => {
<<<<<<< HEAD
    textArea.addEventListener('click', () => {
        area = textArea;
        // console.log(area);
    })
=======
  textArea.addEventListener('click', () => {
    area = textArea
    // console.log(area);
  })
>>>>>>> b1a612d91892de66d5b3fc8eb5388d1d048561b5
})

// on button click add key to last clicked textarea
btns.forEach((btn) => {
<<<<<<< HEAD
    btn.addEventListener('click', () => {
        area.value += btn.value;
=======
  btn.addEventListener('click', () => {
    area.value += btn.value
>>>>>>> b1a612d91892de66d5b3fc8eb5388d1d048561b5
    })
})
