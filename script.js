let isDOBCorrect = false;
let bulbOn = false;
let isPulling = false;
let startY = 0;
let endY = 0;



// Play notification sound when DOB is correct
const notificationSound = new Audio("notification.mp3"); 



// **Rope for Opening Screen**
document.getElementById("screenRopeEnd").addEventListener("click", function () {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
});

// **Username to DOB Flow**
function showDOB() {
    let username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Please enter your name!");
        return;
    }
    document.getElementById("usernameContainer").style.display = "none";
    document.getElementById("dobContainer").style.display = "block";
}

// **Check DOB and Store Validity**
function checkDOB() {
    let dob = document.getElementById("dob").value;
    if (dob === "31072006") {
        isDOBCorrect = true;
        document.getElementById("dobContainer").style.display = "none";

        // Make the bulb and text visible
        document.querySelector(".bulb-wrapper").style.display = "flex";
        document.getElementById("bulbInstruction").style.display = "block"; // Show the instruction text
 // Play Notification Sound
        notificationSound.play();
        checkContentVisibility();
    } else {
        alert("U R Not my 🐼💫💕♾️🌏");
    }
}

// **Bulb Rope Toggle**
const bulbRopeEnd = document.getElementById("bulbRopeEnd");
const bulb = document.querySelector(".bulb");
const body = document.body;

// Detect Pulling

bulbRopeEnd.addEventListener("touchstart", startPull);
document.addEventListener("touchmove", pulling);
document.addEventListener("touchend", endPull);


function startPull(e) {
    isPulling = true;
    startY = e.touches ? e.touches[0].clientY : e.clientY; // Handle both mouse & touch
}

function pulling(e) {
    if (!isPulling) return;
    endY = e.touches ? e.touches[0].clientY :e.clientY;
    let distance = endY - startY;

    if (distance > 10 && distance < 50) {
        document.getElementById("bulbRope").style.height = 100 + distance + "px";
    }
}

function endPull() {
    if (!isPulling) return;
    isPulling = false;

    if (endY - startY > 40) {
        isBulbOn = !BulbOn;
        if (BulbOn) {
            bulb.classList.add("on");
            body.classList.add("on");
        } else {
            bulb.classList.remove("on");
            body.classList.remove("on");
        }
    }

    document.getElementById("bulbRope").style.height = "100px";
    checkContentVisibility();
}

// **Content Visibility Check**
function checkContentVisibility() {
    document.getElementById("content").style.display = (isDOBCorrect && bulbOn) ? "block" : "none";
}
