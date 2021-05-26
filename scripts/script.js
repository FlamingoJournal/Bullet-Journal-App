// script.js

/** **************NAVIGATION******************* */
import router from './router.js'
// Router imported so you can use it to manipulate your SPA app here
const { setState } = router

const leftArrow = document.getElementById('left-arrow')
/**
 * Left arrow functionality, switches to the previous page in the current log.
 * @todo Implement this function
 */
leftArrow.onclick = function () {
    // get title
    // determine state based on title
    setState({ page: 'Settings', day: 'title' })
}

const rightArrow = document.getElementById('right-arrow')
/**
 * Right arrow functionality, switches to the next page in the current log.
 * @todo Implement this function
 */
rightArrow.onclick = function () {
    // setState();
}

const dailyTab = document.getElementById('daily-btn')
/**
 * Show daily log entries in sidebar on click.
 * @todo Implement this function
 */
dailyTab.onclick = function () {
    // for element in localstorage.daily{
    //     daily_tab.appendChild(html.a)
    // }
}

const weeklyTab = document.getElementById('weekly-btn')
/**
 * Show weekly log entries in sidebar on click.
 * @todo Implement this function
 */
weeklyTab.onclick = function () {
    // setState();
}

const monthlyTab = document.getElementById('monthly-btn')
/**
 * Show monthly log entries in sidebar on click.
 * @todo Implement this function
 */
monthlyTab.onclick = function () {
    // setState();
}

const futureTab = document.getElementById('future-btn')
/**
 * Show future log entries in sidebar on click.
 * @todo Implement this function
 */
futureTab.onclick = function () {
    // setState();
}

const homeButton = document.getElementById('flamingo-logo')
/**
 * Go back to the home/default page on logo click.
 * @todo Implement this function
 */
homeButton.onclick = function () {
    // setState({page: 'index'});
}
