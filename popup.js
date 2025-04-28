const timerDisplay1 = document.getElementById("studytimer-display");
const timerDisplay2 = document.getElementById("resttimer-display");

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

const increaseButton1 = document.getElementById("increase-button1");
const decreaseButton1 = document.getElementById("decrease-button1");

const increaseButton2 = document.getElementById("increase-button2");
const decreaseButton2 = document.getElementById("decrease-button2");

let defaultStudyTime = 30 * 60; // default study timer is 30 minutes in seconds
let defaultRestTime = 10 * 60; //default rest timer is 10 minutes in seconds
let timeRemaining1 = defaultStudyTime; // 30 minutes in seconds -- timeRemaining1 represents study time remaining
let timeRemaining2 = defaultRestTime; // 10 minutes in seconds -- timeRemaining2 represents rest time remaining
let timerInterval;


// functions
function startStudyTimer() {
  if (timerInterval) return; // Prevent multiple timers from starting
  let tempTime = timeRemaining1; // create a temp variable to capture the personalized user's time
  timerInterval = setInterval(() => {
    timeRemaining1--;
    const minutes = Math.floor(timeRemaining1 / 60);
    const seconds = timeRemaining1 % 60;
    timerDisplay1.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (timeRemaining1 <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeRemaining1 = tempTime; // reset the study time remaining back to the user's set time
      timerDisplay1.textContent = "Rest!";
      startRestTimer();
    }
  }, 1000);
}

function startRestTimer() {
  if (timerInterval) return; // Prevent multiple timers from starting
  let tempTime = timeRemaining2; // create a temp variable to capture the personalized user's time
  timerInterval = setInterval(() => {
    timeRemaining2--;
    const minutes = Math.floor(timeRemaining2 / 60);
    const seconds = timeRemaining2 % 60;
    timerDisplay2.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (timeRemaining2 <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeRemaining2 = tempTime; // reset the rest time remaining back to the user's set time
      timerDisplay2.textContent = "Study!";
      startStudyTimer();
    }
  }, 1000);
}

function resetTimers() {
  // if (timerInterval==null) return; // If there was no timer started to begin with, don't do anything
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining1 = defaultStudyTime;
  timeRemaining2 = defaultRestTime;

  const minutes1 = Math.floor(timeRemaining1 / 60);
  const seconds1 = timeRemaining1 % 60;
  timerDisplay1.textContent = `${minutes1.toString().padStart(2, "0")}:${seconds1.toString().padStart(2, "0")}`;
  
  const minutes2 = Math.floor(timeRemaining2 / 60);
  const seconds2 = timeRemaining2 % 60;
  timerDisplay2.textContent = `${minutes2.toString().padStart(2, "0")}:${seconds2.toString().padStart(2, "0")}`;
}

function increaseTimer1() {
  if (timerInterval!=null) return; // If the timer has already started, increase will not do anything
  timeRemaining1 += 60; // add 1 minute to the time remaining
  const minutes = Math.floor(timeRemaining1 / 60);
  const seconds = timeRemaining1 % 60;
  timerDisplay1.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function decreaseTimer1() {
  if (timerInterval!=null || timeRemaining1 <= 0) return; // If the timer has already started, decrease will not do anything -- cannot decrease while timer is started
  timeRemaining1 -= 60; // add 1 minute to the time remaining
  const minutes = Math.floor(timeRemaining1 / 60);
  const seconds = timeRemaining1 % 60;
  timerDisplay1.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function increaseTimer2() {
  if (timerInterval!=null) return; // If the timer has already started, increase will not do anything -- cannot increase while timer is started
  timeRemaining2 += 60; // add 1 minute to the time remaining
  const minutes = Math.floor(timeRemaining2 / 60);
  const seconds = timeRemaining2 % 60;
  timerDisplay2.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function decreaseTimer2() {
  if (timerInterval!=null || timeRemaining2 <= 0) return; // If the timer has already started, decrease will not do anything-- cannot decrease while timer is started
  timeRemaining2 -= 60; // add 1 minute to the time remaining
  const minutes = Math.floor(timeRemaining2 / 60);
  const seconds = timeRemaining2 % 60;
  timerDisplay2.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}


// event listeners
startButton.addEventListener("click", startStudyTimer);

resetButton.addEventListener("click", resetTimers);

increaseButton1.addEventListener("click", increaseTimer1);

decreaseButton1.addEventListener("click", decreaseTimer1);

increaseButton2.addEventListener("click", increaseTimer2);

decreaseButton2.addEventListener("click", decreaseTimer2);