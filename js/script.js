// -- Task 1 - VPN --

function getIP(json) { // Get IP
    document.getElementById("ip").innerHTML = json.ip;
}

// OS, lang, type, ver
document.getElementById("os").innerHTML = navigator.oscpu + " " + navigator.platform;

var browerType;

if (navigator.userAgent.indexOf("Firefox") != -1) {
    browerType = "Firefox";
} else if (navigator.userAgent.indexOf("Chrome") != -1) {
    browerType = "Chrome";
} else if (navigator.userAgent.indexOf("Safari") != -1) {
    browerType = "Safari";
} else if (navigator.userAgent.indexOf("MSIE") != -1 ) {
    browerType = "Internet Exploder";
} else if ((navigator.userAgent.indexOf("Edge") != -1 )) {
    browerType = "Internet Exploder";
} else {
    browerType = "Unknown browser";
}

document.getElementById("browserType").innerHTML = browerType + " " + navigator.appCodeName + " " + navigator.appVersion + " " + navigator.language;

// Geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById("browserGeo").innerHTML = position.coords.latitude + "&deg;" + " "  + position.coords.longitude + "&deg;";
    }, showError);

} else {
    document.getElementById("browserGeo").innerHTML = "Your browser doesn't support Geolocation";
}

function showError(error) { // W3
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("browserGeo").innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("browserGeo").innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      document.getElementById("browserGeo").innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("browserGeo").innerHTML = "An unknown error occurred."
      break;
  }
}

// Resolution & Size
function browserSize() {
    document.getElementById("browserSize").innerHTML = window.screen.width + "x" + window.screen.height + " " + window.outerWidth + "x" + window.outerHeight;
}

window.addEventListener("load", browserSize);
window.addEventListener("resize", browserSize);

// -- Task 2 - Memory --

// Create a array, and increment 1 to the cards
const CARD = document.getElementsByClassName("card");
const CARDS = [...CARD];

for (var i = 0; i < CARDS.length; i++){
    CARDS[i].addEventListener("click", flipCards);
};

var counter = 0;

function flipCards() {

    if (counter < 2) {
        this.classList.toggle('flip');
        counter++;

        if (counter == 2) { // Only run the matchCards if two cards have been opened, and afterwards reset the counter
            matchCards();
            counter = 0;
        }
    } 
}

function matchCards() {
    var allFlips = document.querySelectorAll('.flip');
    
    if (allFlips[0].firstElementChild.attributes.class.ownerElement.classList[1] === allFlips[1].firstElementChild.attributes.class.ownerElement.classList[1]) {
        alert("You matched correctly!");

        allFlips[0].classList.remove("flip");
        allFlips[1].classList.remove("flip");

    } else {
        alert("You matched incorrectly!");

        allFlips[0].classList.remove("flip");
        allFlips[1].classList.remove("flip");
    }
}

// -- Task 3 - Gallery --

const MAINIMG = document.getElementById("mainImage");
let imgSrc;

function swapImg(e) {
    MAINIMG.style.opacity = 1;
    imgSrc = e.target.src;

    if (MAINIMG.currentSrc != e.target.currentSrc) {
        fadeImg();    
    } 
}

function fadeImg() {
    t1 = setInterval(opacity, 100);
}

function opacity(src) {

    if (MAINIMG.style.opacity >= 0.3) {
        MAINIMG.style.opacity = MAINIMG.style.opacity - 0.1;

    } else if (MAINIMG.style.opacity == 0.2) {
        MAINIMG.src = imgSrc;
        MAINIMG.style.opacity = 1;
        clearInterval(t1);
    }
}

document.getElementById("samuelImg").addEventListener("mouseover", swapImg);
document.getElementById("torvaldsImg").addEventListener("mouseover", swapImg);

MAINIMG.addEventListener("click", function() { // Lightbox effect

    if (this.width > 200) {
        this.classList.remove("lightbox");

    } else {
        this.classList.add("lightbox");
    }
});

// -- Task 4 - Stopwatch --

let sec = 0;
let min = 0;
let hr = 0;

let secDisplay = 0;
let minDisplay = 0;
let hrDisplay = 0;

let stopWatchStatus = false;
const TIME = document.getElementById("time");

function stopWatchCounter() {
    sec++;

    if (sec >= 60) {
        sec = 0;
        min ++;

        if (min >= 60) {
            min = 0;
            hr++;
        }
    }

    if (sec < 10) {
        secDisplay = "0" + sec;

    } else {
        secDisplay = sec;
    }

    if (min < 10) {
        minDisplay = "0" + min;

    } else {
        minDisplay = min;
    }

    if (hr < 10) {
        hrDisplay = "0" + hr;

    } else {
        hrDisplay = hr;
    }

    TIME.innerHTML = hrDisplay + ":" + minDisplay + ":" + secDisplay;
}

function stopWatch(e) {
    
    if (e.button == 0 && stopWatchStatus === false) {
        interval = window.setInterval(stopWatchCounter, 1000);
        stopWatchStatus = true;

    } else if (e.button == 2) {
        let time = document.createElement("li");
        let timeTxt = document.createTextNode(TIME.innerHTML = hrDisplay + ":" + minDisplay + ":" + secDisplay);
        time.appendChild(timeTxt);
        document.getElementById("timeList").appendChild(time); 

    } else {
        clearInterval(interval);
        stopWatchStatus = false;
    }
}

TIME.addEventListener("mousedown", stopWatch);

// -- Task 5 - Paint --

var mouseDown = 0;
var canvas = document.getElementById("canvas");

function getCoords(e) {
    x = e.pageX - this.offsetLeft; 
    y = e.pageY - this.offsetTop;
    console.log(x, y);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x, y, 2, 2);
}

function draw() {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x, y, 0, 0);
    mouseDown = 1;
}

canvas.addEventListener("mousemove", getCoords);

// -- Task 6 - Rock, Paper, Scissors --

function inputVal(i) {

    input = i.toLowerCase();

    if (input == "sten" || input == "sax" || input == "påse") {
        return true;

    } else {
        return false;
    }
}

function playGame() {

    var gameDone = false;

    while (gameDone == false) {
        
        var handOne = prompt("What does player 1 choose?");
        var handTwo = prompt("What does player 2 choose?");
    
        if (inputVal(handOne) && inputVal(handTwo)) {
            alert("They do know the rules");

            if (handOne == handTwo) {
                alert("It's a tie!");
                gameDone = true;

            } else if (handOne == "sten") {

                if (handTwo == "sax"){
                    alert("Player 1 wins")
                    gameDone = true;

                } else if (handTwo == "påse"){

                    alert("Player 2 wins")
                    gameDone = true;
                }

            } else if (handOne == "sax") {

                if (handTwo == "sten"){
                    alert("Player 2 wins")
                    gameDone = true;
                    
                } else if (handTwo == "påse"){

                    alert("Player 1 wins")
                    gameDone = true;
                }

            } else if (handOne == "påse") {

                if (handTwo == "sten"){
                    alert("Player 1 wins")
                    gameDone = true;
                    
                } else if (handTwo == "sax"){

                    alert("Player 2 wins")
                    gameDone = true;
                }
            }
        } else {
            alert("THEY DON'T KNOW THE RULES!");
            gameDone = true;
        }
    }
}

document.getElementById("gameButton").addEventListener("click", playGame);

// -- Task 7 - Puzzle --

function allowDrop(e) {
    e.preventDefault();
}
  
function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}
  
function drop(e) {
    e.preventDefault();
    e.stopPropagation();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}