let is24Hour = true; // This variable is used to check if the clock is in 24-hour format
let clockInterval; // This variable is used to store the interval ID for the clock update
let isRunning = true; // This variable is used to check if the clock is running

const clockEl = document.getElementById('clock'); // This is the clock element
const statusEl = document.getElementById('status'); // This is the status element

function updateClock() { // This function gets the current time, format it and display the clock in the creen
    const now = new Date(); // this create a date object,,, Get the current date and time
    let hours = now.getHours(); // Get the current hours
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Get the current minutes if it is less than 10, add a leading zero
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Get the current seconds if it is less than 10, add a leading zero
    let period = ''; // a valiable to holds AM/PM for 12-hour format


    if (!is24Hour) {
        period = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        hours = hours % 12 || 12; // Convert to 12-hour format by using modulo operator to cheak the remeider, if it is zero/midnight it return 12
    }
    // Update the status element with the current time
    hours = String(hours).padStart(2, '0'); // Format hours to always have two digits
    clockEl.textContent = `${hours}:${minutes}:${seconds} ${!is24Hour ? '' + period: ''}`; // Display the time in the clock element

    // clockEl.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
}
function startClock() { // This function starts the clock
    if (!clockInterval){
        clockInterval = setInterval(updateClock, 1000); // Update the clock every second 1000 milliseconds
        isRunning = true; // Set the clock running status to true
        updateStatus(); // Update the status element
    }
    }
function stopClock() { // This function stops the clock
    clearInterval(clockInterval); // Clear the interval to stop the clock
    clockInterval = null; // Set the interval ID to null
    isRunning = false; // Set the clock running status to false
    updateStatus(); // Update the status element
}
function toggleClockRunning() { // This function toggles the clock between running and stopped
    if (isRunning) {
        stopClock(); // If the clock is running, stop it
    } else {
        startClock(); // If the clock is stopped, start it
    }
}
function toggleClockFormat() { // This function toggles the clock format between 24-hour and 12-hour
    is24Hour = !is24Hour; // Toggle the format
    updateClock(); // Update the clock display
} 
function updateStatus() { // This function updates the status element with the current clock status
    statusEl.textContent = `format: ${is24Hour ? '24-hours' : '12-hour'} | ${isRunning ? 'Clock is running' : 'Clock is stopped'};`; // Update the status element with the current format and running status
}
// Event listeners for the buttons
clockEl.addEventListener('click', toggleClockFormat); // Add a click event listener to the clock element to toggle the clock running status
clockEl.addEventListener('dblclick', toggleClockRunning); // Add a double-click event listener to the clock element to toggle the clock format

const toggleFmtButton = document.getElementById('toggleFormatButton'); // Get the toggle format button element
const resetClockBtn = document.getElementById('resetClockBnt'); // Get the reset clock button element 

toggleFmtBtn.addEventListener('click', toggleClockFormat); // Add a click event listener to the toggle format button to toggle the clock format
resetClockBtn.addEventListener('click', () => { // Add a click event listener to the reset clock button
    stopClock(); // Stop the clock
    updateClock(); // Update the clock display
}); // Reset the clock display
// Start the clock when the page loads
startClock(); // Start the clock
updateClock(); // Update the clock display immediately