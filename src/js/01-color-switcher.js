refs = {
    bodyEl: document.querySelector("body"),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
};

refs.btnStop.setAttribute('disabled', true);
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


refs.btnStart.addEventListener("click", onClickStart);
refs.btnStop.addEventListener("click", onClickStop);


function onClickStart(e) {
    bodyChangeColor()
    timerId = setInterval(() => {
        bodyChangeColor();
      }, 1000);  
      e.target.setAttribute('disabled', true);
      refs.btnStop.disabled = false;
}

function bodyChangeColor(e) {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function onClickStop(e) {
    clearInterval(timerId);
    e.target.setAttribute('disabled', true);
    refs.btnStart.disabled = false; 
}

