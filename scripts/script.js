// script.js

/****************NAVIGATION********************/
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let left_arrow = document.getElementById('left-arrow');
/** 
 * Left arrow functionality, switches to the previous page in the current log.
 * @todo Implement this function
 */
left_arrow.onclick = function (){
  // get title
  // determine state based on title
  setState({page: "Settings", day: "title"});
}

let right_arrow = document.getElementById('right-arrow');
/** 
 * Right arrow functionality, switches to the next page in the current log.
 * @todo Implement this function
 */
right_arrow.onclick = function (){
  //setState();
}

let daily_tab = document.getElementById('daily-btn');
/** 
 * Show daily log entries in sidebar on click.
 * @todo Implement this function
 */
daily_tab.onclick = function (){
    // for element in localstorage.daily{
    //     daily_tab.appendChild(html.a)
    // }
}

let weekly_tab = document.getElementById('weekly-btn');
/** 
 * Show weekly log entries in sidebar on click.
 * @todo Implement this function
 */
weekly_tab.onclick = function (){
  //setState();
}

let monthly_tab = document.getElementById('monthly-btn');
/** 
 * Show monthly log entries in sidebar on click.
 * @todo Implement this function
 */
monthly_tab = function (){
  //setState();
}

let future_tab = document.getElementById('future-btn');
/** 
 * Show future log entries in sidebar on click.
 * @todo Implement this function
 */
future_tab.onclick = function (){
  //setState();
}


let home_button = document.getElementById('flamingo-logo');
/** 
 * Go back to the home/default page on logo click.
 * @todo Implement this function
 */
home_button.onclick = function (){
  //setState({page: 'index'});
}


