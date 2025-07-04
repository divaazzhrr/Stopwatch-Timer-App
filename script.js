let timerInterval;
let totalSeconds = 0;
let initialSeconds = 0;
let countdownMode = false;
let isRunning = false;

// Update tampilan Stopwatch
function updateDisplay() {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const timerEl = document.getElementById('timer');
  if (timerEl) timerEl.innerText = `${hours}:${minutes}:${seconds}`;
}

// Update tampilan Timer Circle
function updateCircleTime() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(1, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const circleEl = document.getElementById('circleTime');
  if (circleEl) circleEl.innerText = `${minutes}:${seconds}`;
}

// Update progress ring
function updateProgress() {
  if (!countdownMode) return;
  const circle = document.getElementById("progressCircle");
  if (!circle || initialSeconds === 0) return;
  const dashArray = 2 * Math.PI * 80;
  const elapsed = initialSeconds - totalSeconds;
  const percent = elapsed / initialSeconds;
  const offset = dashArray * (1 - percent);
  circle.setAttribute("stroke-dashoffset", offset);
}

// Stopwatch
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      totalSeconds++;
      updateDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  totalSeconds = 0;
  isRunning = false;
  updateDisplay();
}

// Timer Countdown
function setPreset(minutes) {
  clearInterval(timerInterval);
  countdownMode = true;
  totalSeconds = minutes * 60;
  initialSeconds = totalSeconds;
  isRunning = false;
  updateCircleTime();
  updateProgress();
  switchToCircleView();
}

function startCountdown() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateCircleTime();
        updateProgress();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        alert("⏰ Waktu habis!");
      }
    }, 1000);
  }
}

function pauseCountdown() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetCountdown() {
  clearInterval(timerInterval);
  totalSeconds = initialSeconds;
  isRunning = false;
  updateCircleTime();
  updateProgress();
}

// Pindah ke tampilan Stopwatch
function showStopwatch() {
  countdownMode = false;
  resetTimer();
  document.querySelector(".stopwatch-container").style.display = "block";
  document.querySelector(".circle-view").style.display = "none";
  document.getElementById("btnStopwatch").classList.add("active");
  document.getElementById("btnTimer").classList.remove("active");
}

// Pindah ke tampilan Timer Circle
function showTimer() {
  document.querySelector(".stopwatch-container").style.display = "none";
  document.querySelector(".circle-view").style.display = "flex";
  document.getElementById("btnStopwatch").classList.remove("active");
  document.getElementById("btnTimer").classList.add("active");
}

// Event binding
document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
  updateCircleTime();

  // Stopwatch tombol
  document.querySelector(".stopwatch-container .start")?.addEventListener("click", startTimer);
  document.querySelector(".stopwatch-container .pause")?.addEventListener("click", pauseTimer);
  document.querySelector(".stopwatch-container .reset")?.addEventListener("click", resetTimer);

  // Timer circle tombol
  document.querySelector(".circle-view .start")?.addEventListener("click", startCountdown);
  document.querySelector(".circle-view .pause")?.addEventListener("click", pauseCountdown);
  document.querySelector(".circle-view .reset")?.addEventListener("click", resetCountdown);

  // Dark mode toggle
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark");
    });
  }
});
