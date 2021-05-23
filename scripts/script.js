// script.js

 /****************NAVIGATION********************/ 
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let left_arrow = document.getElementById('left-arrow');
left_arrow.onclick = function (){
  // get title
  // determine state based on title
  setState({page: "Settings", day: "title"});
}

let right_arrow = document.getElementById('right-arrow');
right_arrow.onclick = function (){
  //setState();
}

let daily_tab = document.getElementById('daily-btn');
daily_tab.onclick = function (){
    // for element in localstorage.daily{
    //     daily_tab.appendChild(html.a)
    // }
}

let weekly_tab = document.getElementById('weekly-btn');
weekly_tab.onclick = function (){
  //setState();
}

let monthly_tab = document.getElementById('monthly-btn');
monthly_tab = function (){
  //setState();
}

let future_tab = document.getElementById('future-btn');
future_tab.onclick = function (){
  //setState();
}


let home_button = document.getElementById('flamingo-logo');
//  go to the index/home page
home_button.onclick = function (){
  //setState({page: 'index'});
}


/****************FUNCTIONS********************/

// Collapsing SideBar methods NOT NEEDED
let sidebar_button = document.getElementById('sidebar-button');
let sidebar = document.getElementById('sidebar');
sidebar_button.onclick = function () {
    console.log("works");
    if (sidebar.className == "sidebaron") {
        sidebar.className = "sidebaroff";  
        sidebar_button.className = 'open';
        sidebar_button.value = '>';
    }else {
        sidebar.className = "sidebaron";
        sidebar_button.className = 'collapse';
        sidebar_button.value = '<';
    }
    
}




