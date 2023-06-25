const button = document.getElementById('b3');
const specialButton = document.getElementById('b4');
const testButton = document.getElementById('testButton');
const resetButton = document.getElementById('resetButton');
const counter = document.getElementById('count');
const message = document.getElementById('message');
const audio = new Audio('sound.mp3');

let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
const randomWords = [
  'ABCDE',
  'FGHIJ',
  'KLMNO',
  'PQRST',
  'UVWXY',
  'Z1234',
  '56789',
  'UHGTV',
  // ... add the remaining random words here
];
const usedWords = new Set(); // Track used words

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

  if (clickCount === 250 || clickCount % 250 === 0) {
    showMessage(getRandomWord());
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
  clickCount += 40;
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

function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * randomWords.length);
  let word = randomWords[randomIndex];
  while (usedWords.has(word)) {
    randomIndex = Math.floor(Math.random() * randomWords.length);
    word = randomWords[randomIndex];
  }
  usedWords.add(word);
  if (usedWords.size === randomWords.length) {
    usedWords.clear(); // Reset usedWords set if all words have been used
  }
  return word;
  }
