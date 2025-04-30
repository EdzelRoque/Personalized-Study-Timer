console.log("content.js loaded");

let activeMode = "Study"; // Default starting mode
let studyTimeText = "30:00"; // Default display
let restTimeText = "10:00"; // Default display

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "update_study_timer") {
        if (!document.getElementById("floating-timer")) {
            createFloatingTimer();
        }
        const minutes = Math.floor(message.time / 60);
        const seconds = message.time % 60;
        studyTimeText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        updateFloatingTimer();
    }
    else if (message.action === "update_rest_timer") {
        if (!document.getElementById("floating-timer")) {
            createFloatingTimer();
        }
        const minutes = Math.floor(message.time / 60);
        const seconds = message.time % 60;
        restTimeText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        updateFloatingTimer();
    }
    else if (message.action === "mode_switch") {
        if (message.message === "Rest!") {
            activeMode = "Rest";
        } else if (message.message === "Study!") {
            activeMode = "Study";
        }
        updateFloatingTimer();
    }
    else if (message.action === "reset_display") {
        const floatingDiv = document.getElementById("floating-timer");
        if (floatingDiv) {
            floatingDiv.remove();
        }
    }
});


// Create the floating timer div
function createFloatingTimer() {
    if (document.getElementById("floating-timer")) return; // Already exists

    const floatingDiv = document.createElement("div");
    floatingDiv.id = "floating-timer";
    floatingDiv.style.position = "fixed";
    floatingDiv.style.bottom = "20px";
    floatingDiv.style.right = "20px";
    floatingDiv.style.zIndex = "10000";
    floatingDiv.style.backgroundColor = "white";
    floatingDiv.style.padding = "10px";
    floatingDiv.style.border = "1px solid black";
    floatingDiv.style.borderRadius = "8px";
    floatingDiv.style.fontFamily = "Arial, sans-serif";
    floatingDiv.style.textAlign = "center";

    floatingDiv.innerHTML = `
        <div id="big-timer">Study: ${studyTimeText}</div>
        <div id="small-timer">Rest: ${restTimeText}</div>
    `;

    document.body.appendChild(floatingDiv);
}

// Update the floating timer display
function updateFloatingTimer() {
    const bigTimer = document.getElementById("big-timer");
    const smallTimer = document.getElementById("small-timer");

    if (activeMode === "Study") {
        bigTimer.textContent = `Study: ${studyTimeText}`;
        smallTimer.textContent = `Rest: ${restTimeText}`;
    } else {
        bigTimer.textContent = `Rest: ${restTimeText}`;
        smallTimer.textContent = `Study: ${studyTimeText}`;
    }
}

