import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timer: {
    container: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

refs.btnStart.disabled = true;
let intervalId = null;
let userSelectedDates;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDates = selectedDates[0].getTime();
    if (userSelectedDates < Date.now()) {
      Notify.failure('Qui timide rogat docet negare');
      return;
    }
    refs.btnStart.disabled = false;
    clearClockFace();
  },
};

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', () => {
  refs.input.disabled = true;
  refs.btnStart.disabled = true;
  start();
});

function start() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime >= userSelectedDates) {
      stop();
      refs.input.disabled = false;
      refs.btnStart.disabled = true;
      Notify.info('Time is up', {
        position: 'center-top',
      });
      return;
    }
    let deltaTime = userSelectedDates - currentTime;
    updateClockFace(convertMs(deltaTime));
    console.log('timer on');
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
  console.log('timer off');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.timer.days.textContent = days;
  refs.timer.hours.textContent = hours;
  refs.timer.minutes.textContent = minutes;
  refs.timer.seconds.textContent = seconds;
}

function clearClockFace() {
  updateClockFace(convertMs(0));
  stop();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}