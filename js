const timer = document.querySelector('.timer');
const minutesInput = document.querySelector('#minutes-input');
const startButton = document.querySelector('form button[type="submit"]');
const stopButton = document.querySelector('#stop-btn');
let countdownInterval;

const formatTime = time => {
  return time < 10 ? `0${time}` : time;
};

const startCountdown = () => {
  const minutes = parseInt(minutesInput.value);
  if (isNaN(minutes) || minutes < 1 || minutes > 60) {
    alert('Please enter a valid number of minutes between 1 and 60.');
    return;
  }
  let seconds = minutes * 60;
  countdownInterval = setInterval(() => {
    seconds--;
    const formattedMinutes = formatTime(Math.floor(seconds / 60));
    const formattedSeconds = formatTime(seconds % 60);
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
    if (seconds === 0) {
      clearInterval(countdownInterval);
      alert('Time is up!');
      timer.textContent = '00:00';
    }
  }, 1000);
};

const stopCountdown = () => {
  clearInterval(countdownInterval);
  timer.textContent = '00:00';
  minutesInput.value = '';
};

startButton.addEventListener('click', event => {
  event.preventDefault();
  startCountdown();
});

stopButton.addEventListener('click', stopCountdown);
