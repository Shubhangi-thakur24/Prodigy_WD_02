let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let interval = null;
let isRunning = false;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = `${h}:${m}:${s}`;
}

function startStopwatch() {
  if (!isRunning) {
    interval = setInterval(() => {
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
    isRunning = true;
  }
}

function pauseStopwatch() {
  clearInterval(interval);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(interval);
  [hours, minutes, seconds] = [0, 0, 0];
  isRunning = false;
  updateDisplay();

  const lapList = document.getElementById("laps");
  lapList.innerHTML = "";
  const li = document.createElement("li");
  li.id = "no-laps";
  li.textContent = " No laps recorded yet";
  li.style.color = "lightcoral";
  lapList.appendChild(li);
}


function lapTime() {
  const lapList = document.getElementById("laps");

  // Remove 'no laps' message
  const noLapMsg = document.getElementById("no-laps");
  if (noLapMsg) noLapMsg.remove();

  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapList.children.length + 1} - ${display.textContent}`;
    lapList.appendChild(li);
    playBeep();
  }
}


function playBeep() {
  const beep = new Audio(
    "https://www.soundjay.com/button/sounds/button-09.mp3"
  );
  beep.play();
  audio.volume = 0.3;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

document.body.classList.add("dark");

document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("laps").addEventListener("click", lapTime);
document.getElementById("themetoggle").addEventListener("click", toggleTheme);
