import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  input: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('[data-start]'),
  displayDays: document.querySelector('[data-days]'),
  displayHours: document.querySelector('[data-hours]'),
  displayMinutes: document.querySelector('[data-minutes]'),
  displaySeconds: document.querySelector('[data-seconds]'),
  timerBox: document.querySelector('.timer'),
  timerFields: document.querySelectorAll('.field'),
  timerValues: document.querySelectorAll('.value'),
  timerLabels: document.querySelectorAll('.label'),
};

addCustomStyle();
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      refs.startBtn.disabled = false;
      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future');
  },
};

const fp = flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', runTimer);

function runTimer() {
  const timer = setInterval(() => {
    const delta = fp.selectedDates[0] - new Date();
    if (delta <= 0) {
      clearInterval(timer);
      Notiflix.Notify.success('Time is now!');
      return;
    }
    const convertDate = convertMs(delta);
    refs.displayDays.innerHTML = addLeadingZero(convertDate.days);
    refs.displayHours.innerHTML = addLeadingZero(convertDate.hours);
    refs.displayMinutes.innerHTML = addLeadingZero(convertDate.minutes);
    refs.displaySeconds.innerHTML = addLeadingZero(convertDate.seconds);
  }, 1000)
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addCustomStyle() {
  refs.timerBox.style.display = 'flex';
  refs.timerBox.style.gap = '20px';
  refs.timerFields.forEach(field => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
  });
  refs.timerValues.forEach(value => {
    value.style.fontSize = '50px';
    value.style.fontWeight = '700';
  });
  refs.timerLabels.forEach(label => {
    label.style.fontSize = '16px';
    label.style.fontWeight = '500';
    label.style.textTransform = 'uppercase';
  });
}