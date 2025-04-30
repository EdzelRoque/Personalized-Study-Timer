let defaultStudyTime = 30 * 60; // default study timer is 30 minutes in seconds
let defaultRestTime = 10 * 60; //default rest timer is 10 minutes in seconds

let timeRemaining1 = defaultStudyTime; // 30 minutes in seconds -- timeRemaining1 represents study time remaining
let timeRemaining2 = defaultRestTime; // 10 minutes in seconds -- timeRemaining2 represents rest time remaining
let timerInterval;

let isTimerRunning = false;
let isTimerPaused = false;

let userSetStudyTime; // to store the user's set time for study -- needed to reset the clock back when timer finishes
let userSetRestTime; // to store the user's set time for rest -- needed to reset the clock back when timer finishes



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start_timer") {
        if (!isTimerPaused) { // in the case that the timer is called to start again and it is not paused (starting it for the first time)
            userSetStudyTime = message.studyTime; // saves the user's preferred study time
            userSetRestTime = message.restTime; // saves the user's preferred rest time
            timeRemaining1 = userSetStudyTime;
            timeRemaining2 = userSetRestTime;
        } // if it is paused, then userSetStudyTime and userSetRestTime should be set already
        startStudyTimer();
        broadcastInitialState();
        isTimerRunning = true;
        isTimerPaused = false;
    } else if (message.action === "reset_timer") {
        resetTimers();
    } else if (message.action === "pause_timer") {
        pauseTimers();
    } else if (message.action === "get_timer_status") {
        sendResponse({
            studyTimeRemaining: timeRemaining1,
            restTimeRemaining: timeRemaining2,
            isRunning: isTimerRunning
        });
    }
});


// functions

function startStudyTimer() {
  if (timerInterval) return; // Prevent multiple timers from starting
  timerInterval = setInterval(() => {
    timeRemaining1--;
    broadcastStudyTime();
    if (timeRemaining1 <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeRemaining1 = userSetStudyTime; // reset the study time remaining back to the user's set time
      broadcastStudyRestMessage("Rest!");
      startRestTimer();
    }
  }, 1000);
}

function startRestTimer() {
  if (timerInterval) return; // Prevent multiple timers from starting
  timerInterval = setInterval(() => {
    timeRemaining2--;
    broadcastRestTime();
    if (timeRemaining2 <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeRemaining2 = userSetRestTime; // reset the rest time remaining back to the user's set time
      broadcastStudyRestMessage("Study!");
      startStudyTimer();
    }
  }, 1000);
}

function resetTimers() {
  clearInterval(timerInterval);
  timerInterval = null;
  isTimerRunning = false;
  isTimerPaused = false;
  timeRemaining1 = defaultStudyTime;
  timeRemaining2 = defaultRestTime;
  broadcastResetSignal();
}

function pauseTimers() {
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerPaused = true;
}

function broadcastStudyTime() {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {                     // finds all open browser tabs
            chrome.tabs.sendMessage(tab.id, {       // sends the message for each tab
                action: "update_study_timer",
                time: timeRemaining1
            });
        }
    });
}

function broadcastRestTime() {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {                     // finds all open browser tabs
            chrome.tabs.sendMessage(tab.id, {       // sends the message for each tab
                action: "update_rest_timer",
                time: timeRemaining2
            });
        }
    });
}

function broadcastStudyRestMessage(message) {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {                     // finds all open browser tabs
            chrome.tabs.sendMessage(tab.id, {       // sends the message for each tab
                action: "mode_switch",
                message: message
            });
        }
    });
}

function broadcastResetSignal() {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id, { action: "reset_display" }); // removes the floating timer
        }
    });
}

function broadcastInitialState() { // this functions automatically broadcasts the timer when "start" is pressed
    chrome.tabs.query({}, (tabs) => { // ensures that every open tab gets the current state -- timing reliability in case messages were sent before tabs were ready
        for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {
                action: "update_study_timer",
                time: timeRemaining1
            });
            chrome.tabs.sendMessage(tab.id, {
                action: "update_rest_timer",
                time: timeRemaining2
            });
        }
    });
}
