const button = document.getElementById('b3');
const specialButton = document.getElementById('b4');
const testButton = document.getElementById('testButton');
const resetButton = document.getElementById('resetButton');
const counter = document.getElementById('count');
const message = document.getElementById('message');
const audio = new Audio('sound.mp3');

let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;

counter.textContent = clickCount;

button.addEventListener('click', () => {
  clickCount += 1;
  counter.textContent = clickCount;
  audio.play();
  button.classList.add('animate');

  // Remove animation class after 1 second
  setTimeout(() => {
    button.classList.remove('animate');
  }, 1000);

  if (clickCount === 250) {
    showMessage("You reached 250. This is beta.");
  } else if (clickCount === 253) {
    hideMessage();
  }

  localStorage.setItem('clickCount', clickCount);
});

let specialButtonClickCount = 0;
specialButton.addEventListener('click', () => {
  if (clickCount >= 150 && specialButtonClickCount === 0) {
    clickCount += 1;
    specialButtonClickCount++;
    counter.textContent = clickCount;
    specialButton.disabled = true;
    localStorage.setItem('clickCount', clickCount);
  }
});

testButton.addEventListener('click', () => {
  clickCount += 50;
  counter.textContent = clickCount;
  localStorage.setItem('clickCount', clickCount);
});

resetButton.addEventListener('click', () => {
  clickCount = 0;
  counter.textContent = clickCount;
  localStorage.setItem('clickCount', clickCount);
  hideMessage();
});

function showMessage(msg) {
  message.textContent = msg;
}

function hideMessage() {
  message.textContent = "";
}
