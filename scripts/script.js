// script.js

/** *************NAVIGATION******************* */
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let leftArrow = document.getElementById('left-arrow');
leftArrow.onclick = function (){
  // get title
  // determine state based on title
  setState({page: "Settings", day: "title"});
}

let rightArrow = document.getElementById('right-arrow');
rightArrow.onclick = function (){
  // setState();
}

const dailyTab = document.getElementById('daily-btn');
dailyTab.onclick = function (){
    // for element in localstorage.daily{
    //     daily_tab.appendChild(html.a)
    // }
}

let weeklyTab = document.getElementById('weekly-btn');
weeklyTab.onclick = function (){
  // setState();
}

let monthlyTab = document.getElementById('monthly-btn');
monthlyTab = function (){
  // setState();
}

let futureTab = document.getElementById('future-btn');
futureTab.onclick = function (){
  // setState();
}


let homeButton = document.getElementById('flamingo-logo');
// go to the index/home page
homeButton.onclick = function (){
  // setState({page: 'index'});
}


/****************FUNCTIONS********************/

// Collapsing SideBar methods NOT NEEDED
let sidebarButton = document.getElementById('sidebar-button');
let sidebar = document.getElementById('sidebar');
sidebarButton.onclick = function () {
    console.log("works");
    if (sidebar.className == "sidebaron") {
        sidebar.className = "sidebaroff";  
        sidebarButton.className = 'open';
        sidebarButton.value = '>';
    }else {
        sidebar.className = "sidebaron";
        sidebarButton.className = 'collapse';
        sidebarButton.value = '<';
    }
    
}




