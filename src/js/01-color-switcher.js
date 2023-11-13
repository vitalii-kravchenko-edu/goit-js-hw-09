const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  changeBodyColor();
  timerId = setInterval(changeBodyColor, 1000);
});

refs.btnStop.addEventListener('click', () => {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timerId);
});

function changeBodyColor() {
  refs.body.style.background = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}