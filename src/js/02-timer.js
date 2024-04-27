import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');

const daysTxt = document.querySelector('.value[data-days]');
const hoursTxt = document.querySelector('.value[data-hours]');
const minutesTxt = document.querySelector('.value[data-minutes]');
const secondsTxt = document.querySelector('.value[data-seconds]');

startBtn.setAttribute('disabled', '');

let selectedDate;
let timer;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
});

function startCountdown() {
  timer = setInterval(() => {
    const timeRemaining = selectedDate.getTime() - new Date().getTime();
    const obj = convertMs(timeRemaining);
    console.log(timeRemaining);
    daysTxt.textContent = String(obj.days).padStart(2, '0');
    hoursTxt.textContent = String(obj.hours).padStart(2, '0');
    minutesTxt.textContent = String(obj.minutes).padStart(2, '0');
    secondsTxt.textContent = String(obj.seconds).padStart(2, '0');
    if (timeRemaining < 0) {
      clearInterval(timer);
      daysTxt.textContent = '00';
      hoursTxt.textContent = '00';
      minutesTxt.textContent = '00';
      secondsTxt.textContent = '00';
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  startCountdown();
  startBtn.setAttribute('disabled', '');
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
