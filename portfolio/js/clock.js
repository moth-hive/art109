// Code sourced from: https://www.geeksforgeeks.org/how-to-design-digital-clock-using-javascript/
// Calling showTime function at every second
setInterval(showTime, 1000);

blink = true;
colon = ":"

// Defining showTime funcion
function showTime() {
    // Getting current time and date
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    am_pm = "AM";

    // Setting time for 12 Hrs format
    if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    if(blink){
        colon = "&emsp13;";
        blink = false;
    } else {
        colon = ":"
        blink = true;
    }
    
    let currentTime =
        hour +
        colon +
        min +
        " " +
        am_pm;

    // Displaying the time
    document.getElementById(
        "clock"
    ).innerHTML = currentTime;
    
    //console.log(currentTime);
}

showTime();