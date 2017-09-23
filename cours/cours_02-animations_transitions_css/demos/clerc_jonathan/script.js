var clock2 = document.querySelector('.clock');
clock2.classList.add('coucou');
clock2.classList
console.log(clock2.classList);


/* 
 * ------------------------------------
 *           DECLARE VARIABLE
 * ------------------------------------
 * 
 */

var clock = document.getElementById("clock"),
    date = new Date();

/* 
 * ------------------------------------
 *            CHANGE TIME
 * ------------------------------------
 * 
 */

console.log("---------------------");
console.log("You can change the time displayed on the clock by using:");
console.log("setTime(hours, minutes, seconds);");

function setTime(hours, minutes, seconds) {
    if (hours instanceof Date) {
        seconds = hours.getSeconds();
        minutes = hours.getMinutes();
        hours = hours.getHours();
    }

    var secondsDelay = "-" + (seconds) + "s",
        minutesDelay = "-" + (minutes * 60 + seconds) + "s",
        hoursDelay   = "-" + (hours * 3600 + minutes * 60 + seconds) + "s";

    document.getElementById('seconds').style.animationDelay = secondsDelay;
    document.getElementById('minutes').style.animationDelay = minutesDelay;
    document.getElementById('hours').style.animationDelay   = hoursDelay;

    document.getElementById('ticker-minutes').style.animationDelay = "-" + seconds + "s";    
}

/* 
 * ------------------------------------
 *         APPLY CURRENT TIME
 * ------------------------------------
 * 
 */

var hours   = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

setTime(hours, minutes, seconds);

/* 
 * ------------------------------------
 *              ADD TIME
 * ------------------------------------
 * 
 */

console.log("or add time with:");
console.log("addTime(hours, minutes, seconds);");

var addedHours = 0,
    addedMinutes = 0,
    addedSeconds = 0;

function addTime(hours, minutes, seconds) {
    var date = new Date();
    addedHours += hours;
    addedMinutes += minutes;
    addedSeconds += seconds;
    setTime(date.getHours() + addedHours, date.getMinutes() + addedMinutes, date.getSeconds() + addedSeconds);
}

/* 
 * ------------------------------------
 *            CHANGE VIEW
 * ------------------------------------
 * 
 */

console.log("---------------------");
console.log("You can change how the clock is exploded by using:");
console.log("setView(view);");
console.log("with one of theses arguments: \"bottom\", \"middle\" or \"top\"");

function setView(view) {
    view = typeof view == "string" ? view.toLowerCase() : view;
    if (view === "bottom" || view === "btm" || view === 1) {
        clock.className = "clock view-bottom";
    } else if (view === "middle" || view === "mid" || view === 2) {
        clock.className = "clock view-middle";
        warnChrome();
    } else if (view === "top" || view === 3) {
        clock.className = "clock view-top";
        warnChrome();
    } else {
        console.warn("Unknown view:", view);
    }
}

/* 
 * ------------------------------------
 *               BUTTONS
 * ------------------------------------
 * 
 */

var actions = {
    pause: function (state) {
        toggleClass(clock, "paused");
    },
    time: function (state) {
        addTime(0, 15, 0);
    },
    build: function (state) {
        toggleClass(clock, "build");
    },
};

function attach (key) {
    var button = document.getElementById('button-' + key);
    button.addEventListener("click", function (event) {
        actions[key](toggleClass(button, "clicked"));
        event.preventDefault();
    });
}

for (var key in actions) {
    attach(key);
}

/* 
 * ------------------------------------
 *                OTHER
 * ------------------------------------
 * 
 */

function toggleClass(elem, className) {
    var paddedClassName = " " + elem.className  + " ";
    if (paddedClassName.indexOf(" " + className + " ") === -1) {
        elem.className = (paddedClassName + className).trim();
        return true;
    } else {
        elem.className = paddedClassName.replace(" " + className, "").trim();
        return false;
    }
}

function warnChrome() {
    if (window.chrome) {
        console.warn("Warning: this feature does not work properly on Chrome.");
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("---------------------");
