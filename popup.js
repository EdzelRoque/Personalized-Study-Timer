const timerDisplay1 = document.getElementById("studytimer-display");
const timerDisplay2 = document.getElementById("resttimer-display");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const increaseButton1 = document.getElementById("increase-button1");
const decreaseButton1 = document.getElementById("decrease-button1");
const increaseButton2 = document.getElementById("increase-button2");
const decreaseButton2 = document.getElementById("decrease-button2");


let studyTime = 30 * 60; // default study timer is 30 minutes in seconds
let restTime = 10 * 60; // default rest timer is 10 minutes in seconds
let timerStarted = false;




// FUNCTIONS FOR TIMER AFTER IT STARTS

function showControlCenter() {
  const popupContainer = document.getElementById("popup-container");
  popupContainer.innerHTML = `
    <h2>Timer is running!</h2>
    <button id="pause-button">Pause</button>
    <button id="reset-button2">Reset</button>
  `;
  
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", pausedDisplay);

  const resetButton2 = document.getElementById("reset-button2");
  resetButton2.addEventListener("click", resetTimers2);
}

function pausedDisplay() {
  const popupContainer = document.getElementById("popup-container");
  popupContainer.innerHTML = `
    <h2>Timer is paused!</h2>
    <button id="unpause-button">Unpause</button>
    <button id="reset-button3">Reset</button>
  `;
  chrome.runtime.sendMessage({ action: "pause_timer" });

  const unpauseButton = document.getElementById("unpause-button");
  unpauseButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ 
      action: "start_timer",
      studyTime: studyTime,
      restTime: restTime
    });
    showControlCenter();
  });

  const resetButton3 = document.getElementById("reset-button3");
  resetButton3.addEventListener("click", resetTimers2);
}

function resetTimers2() { // this reset function is for the timer when it is running
  if (timerStarted) { // for the case that the timer is running
    chrome.runtime.sendMessage({ action: "reset_timer" });
  }
  // here i want the original popup format to popup again
  location.reload(); // this reloads the original popup html
}






// FUNCTIONS FOR TIMER BEFORE IT STARTS

function updateStudyDisplay() {
  const minutes = Math.floor(studyTime / 60);
  const seconds = studyTime % 60;
  timerDisplay1.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateRestDisplay() {
  const minutes = Math.floor(restTime / 60);
  const seconds = restTime % 60;
  timerDisplay2.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function resetTimers1() { // this function is for the timer when the timer has not started yet
  studyTime = 30 * 60; // reset to default 30 mins
  restTime = 10 * 60; // reset to default 10 mins
  updateStudyDisplay();
  updateRestDisplay();

  timerStarted = false; // reset back to false
}

function increaseTimer1() {
  studyTime += 60; // add 1 minute to the time remaining
  updateStudyDisplay();
}

function decreaseTimer1() {
  if (studyTime <= 0) return; // If the timer has already started, decrease will not do anything -- cannot decrease while timer is started
  studyTime -= 60; // add 1 minute to the time remaining
  updateStudyDisplay();
}

function increaseTimer2() {
  restTime += 60; // add 1 minute to the time remaining
  updateRestDisplay();
}

function decreaseTimer2() {
  if (restTime <= 0) return; // If the timer has already started, decrease will not do anything-- cannot decrease while timer is started
  restTime -= 60; // add 1 minute to the time remaining
  updateRestDisplay();
}






// event listeners

startButton.addEventListener("click", () => {
  chrome.runtime.sendMessage ({
    action: "start_timer",
    studyTime: studyTime,
    restTime: restTime
  });

  timerStarted = true; // mark that timer has started
  showControlCenter();
});

resetButton.addEventListener("click", resetTimers1);

increaseButton1.addEventListener("click", increaseTimer1);
decreaseButton1.addEventListener("click", decreaseTimer1);
increaseButton2.addEventListener("click", increaseTimer2);
decreaseButton2.addEventListener("click", decreaseTimer2);

chrome.runtime.sendMessage({ action: "get_timer_status" }, (response) => { // response is a callback function
  if (response) {
    if (response.isRunning) {
      timerStarted = true;
      showControlCenter();
    } else {
      timerStarted = false;
    }
  }
});