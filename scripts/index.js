import { View } from './view.js';
import { Controller } from './controller.js';
import { Model } from './model.js';

//DOM VARIABLES
const form = document.querySelector('#user-form');
const playerMenu = document.querySelector('.main-menu');
const formName = document.querySelector('#name');
const formyear = document.querySelector('#year');
const greet = document.querySelector('.greet');
const newGame = document.querySelector('#new-game');
const continueGame = document.querySelector('#continue-game');
const userGreet = document.querySelector('#user-greet');

// VARIABLES
const storagePlayerName = localStorage.getItem('name');
const storagePlayerYear = localStorage.getItem('year');
const playerLevel = localStorage.getItem('currentLevel');
let playerName;
let playerYear;
const CURRENT_YEAR = new Date().getFullYear();

let app = new Controller(new Model(), new View());

//FUNCTIONS
const printUserInfo = (name, year) => {
  if (name !== '' && year !== '') {
    const currentAge = CURRENT_YEAR - year;
    const initialMessage = `Hola ${name}, tienes ${currentAge} años,`;
    let greetMessage;
    if (currentAge <= 18) {
      greetMessage = `${initialMessage} tienes toda una vida por delante.`;
    }
    else if (currentAge > 18 && currentAge <= 35) {
      greetMessage = `${initialMessage} que grande que estás.`;
    }
    else if (currentAge > 35 && currentAge <= 65) {
      greetMessage = `${initialMessage} estás muy grande para andar con jueguitos.`;
    } else {
      greetMessage = `${initialMessage} que bueno que puedas dedicar tiempo a jugar.`;
    }

    form.style.display = 'none';
    userGreet.innerHTML = `<p>${greetMessage}</p>`;
    userGreet.style.display = 'flex';

    localStorage.setItem('name', name);
    localStorage.setItem('year', year);
    localStorage.setItem('currentLevel', 1);
    app.setMenu();
    setTimeout(() => {
      app.initNewGame();
    }, 5000);
  } else {
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  playerName = formName.value;
  playerYear = formyear.value;
  printUserInfo(playerName, playerYear);
});

//CODE
if (storagePlayerName && storagePlayerYear) {
  form.style.display = 'none';
  playerMenu.style.display = 'block';

  greet.innerHTML = `Hola ${storagePlayerName}`;
  if (playerLevel === null) localStorage.setItem('currentLevel', 1);
  app.setMenu();
  // initiateGame()
}

newGame.addEventListener('click', () => {
  app.initNewGame();
})

continueGame.addEventListener('click', () => {
  app.initGame();
})