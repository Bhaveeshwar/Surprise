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
    let username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter your name!");
        return;
    }
    document.getElementById("usernameContainer").style.display = "none";
    document.getElementById("dobContainer").style.display = "block";
}

// **Check DOB and Store Validity**
function checkDOB() {
    let dob = document.getElementById("dob").value.trim();
    if (dob === "31072006") {
        isDOBCorrect = true;
        document.getElementById("dobContainer").style.display = "none";

        // Show bulb and instruction text
        document.querySelector(".bulb-wrapper").style.display = "flex";
        document.getElementById("bulbInstruction").style.display = "block";

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
const bulbRope = document.getElementById("bulbRope");

// Detect Pulling (Supports Mouse & Touch)
bulbRopeEnd.addEventListener("mousedown", startPull);
bulbRopeEnd.addEventListener("touchstart", startPull);

document.addEventListener("mousemove", pulling);
document.addEventListener("mouseup", endPull);
document.addEventListener("touchmove", pulling, { passive: false });
document.addEventListener("touchend", endPull);

function startPull(e) {
    isPulling = true;
    startY = e.clientY || e.touches[0].clientY;
}

function pulling(e) {
    if (!isPulling) return;
    endY = e.clientY || e.touches[0].clientY;
    let distance = Math.min(50, Math.max(0, endY - startY)); // Limit stretch

    if (distance > 10) {
        bulbRope.style.height = `${100 + distance}px`;
    }
}

function endPull() {
    if (!isPulling) return;
    isPulling = false;

    if (endY - startY > 40) {
        bulbOn = !bulbOn;
        bulb.classList.toggle("on", bulbOn);
        body.classList.toggle("on", bulbOn);
    }

    bulbRope.style.height = "100px";
    checkContentVisibility();
}

// **Content Visibility Check**
function checkContentVisibility() {
    document.getElementById("content").style.display = (isDOBCorrect && bulbOn) ? "block" : "none";
}
