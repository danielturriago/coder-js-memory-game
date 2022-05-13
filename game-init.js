// VARIABLES
// const items = ['🦁', '🤖', '😵‍💫', '🤡', '😈', '🐔', '🐷', '💩', '👻', '🙊', '🦄', '🤬'];
// let levelSelected;
// let itemsToPlay = [];
// let firstSelection = null;
// let secondSelection;
// let movesMade = 0;
// let timeInterval;

//DOM VARIABLES
// const mainContent = document.querySelector('.main-content');
// const content = document.querySelector('#content');
// const initPage = document.querySelector('.init-page');
// const movesTaken = document.querySelector('#moves-taken');
// const movesAllowed = document.querySelector('#moves-allowed');
// const minutesLabel = document.getElementById("minutes");
// const secondsLabel = document.getElementById("seconds");

//CLASSES
class Card {
  constructor(item, id) {
    this.item = item;
    this.id = id;
  }
}

//FUNCTIONS
// const duplicateItems = (array) => {
//   return array.concat(array);
// }

// const suffleArray = (array) => {
//   let currentIndex = array.length;
//   let randomIndex;
//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//   }
//   return array;
// }

// const addCardsToBoard = () => {
//   for (const card of itemsToPlay) {
//     const element = document.createElement('div');
//     element.id = `card-${card.id}`;
//     element.className = `card`;
//     element.innerHTML = `
//       <div class="card-front"></div>
//       <div class="card-back"><p>${card.item}</p></div>`;
//     content.appendChild(element);
//     element.onclick = (e) => {
//       element.classList.add("selected");
//       if (!firstSelection) {
//         firstSelection = card;
//       }
//       else if (firstSelection.id === card.id) {
//         console.log("same Card");
//       }
//       else {
//         secondSelection = card;
//         compareItems();
//       }
//     };
//   }
// }

// const initiateGame = (difficulty = 1) => {
//   clearInterval(timeInterval);
//   movesMade = 0;
//   content.innerHTML = '';
//   initPage.classList.add("hide");
//   mainContent.classList.add("show");
//   levelSelected = difficulty;
//   let gameCards;
//   let moves;
//   itemsToPlay = [];
//   switch (difficulty) {
//     case 1:
//       gameCards = items.slice(0, 4);
//       moves = 12;
//       break;
//     case 2:
//       gameCards = items.slice(0, 6);
//       moves = 18;
//       break;
//     case 3:
//       gameCards = items.slice(0, 10);
//       moves = 32;
//       break;
//     case 4:
//       gameCards = items;
//       moves = 48;
//       break;
//   }
//   movesAllowed.innerHTML = moves;
//   gameCards = suffleArray(duplicateItems(gameCards));

//   for (let i = 1; i <= gameCards.length; i++) {
//     itemsToPlay.push(new Card(gameCards[i - 1], i));
//   }
//   addCardsToBoard();
//   initTimer();
// }


class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(evt, listener) {
    (this._events[evt] || (this._events[evt] = [])).push(listener);
    return this;
  }
  emit(evt, arg) {
    (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
  }
}


class Model {
  constructor() {
    this.items = ['🦁', '🤖', '😵‍💫', '🤡', '😈', '🐔', '🐷', '💩', '👻', '🙊', '🦄', '🤬'];
    this.itemsToPlay = [];
    this.levelSelected;
    this.movesMade = 0;
    this.moves = null;
    this.playerLevel = localStorage.getItem('currentLevel');
  }

  suffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  duplicateItems(array) {
    return array.concat(array);
  }

  resetMoves() {
    this.movesMade = 0;
  }

  setMoves() {
    this.movesMade++
  }

  resetItemsToPlay() {
    this.itemsToPlay = [];
  }

  selectLevel(difficulty) {
    this.levelSelected = difficulty;

    let gameCards;
    switch (difficulty) {
      case 1:
        gameCards = this.items.slice(0, 4);
        this.moves = 12;
        break;
      case 2:
        gameCards = this.items.slice(0, 6);
        this.moves = 18;
        break;
      case 3:
        gameCards = this.items.slice(0, 10);
        this.moves = 32;
        break;
      case 4:
        gameCards = this.items;
        this.moves = 48;
        break;
    }
    console.log(gameCards);
    gameCards = this.suffleArray(this.duplicateItems(gameCards));
    for (let i = 1; i <= gameCards.length; i++) {
      this.itemsToPlay.push(new Card(gameCards[i - 1], i));
    }
  }

  setNewCards(difficulty) {
    this.resetMoves();
    this.resetItemsToPlay();
    this.selectLevel(difficulty);
  }


}

class View extends EventEmitter {
  constructor() {
    super();
    this.mainContent = this.getElement('.main-content');
    this.content = this.getElement('#content');
    this.initPage = this.getElement('.init-page');
    this.movesTaken = this.getElement('#moves-taken');
    this.movesAllowed = this.getElement('#moves-allowed');
    this.minutesLabel = this.getElement("#minutes");
    this.secondsLabel = this.getElement("#seconds");
    this.resultTime = this.getElement('#resultTime');
    this.resultMoves = this.getElement('#resultMoves');
    this.endGameScreen = this.getElement('.end-game-screen');

    this.firstSelection = null;
    this.secondSelection;
    this.timeInterval;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  addClass(element, className) {
    element.classList.add(className);
  }

  removeClass(element, className) {
    element.classList.remove(className);
  }

  toggleClass(element, className) {
    element.classList.toggle(className);
  }

  resetBoard = () => {
    this.content.innerHTML = '';
  }

  addCardToBoard = (card) => {
    const element = document.createElement('div');
    element.id = `card-${card.id}`;
    element.className = `card`;
    element.innerHTML = `
      <div class="card-front"></div>
      <div class="card-back"><p>${card.item}</p></div>`;
    element.onclick = (e) => {
      this.emit('cardSelected', {element, card});
    };
    this.content.appendChild(element);
  }

  pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  initTimer() {
    let totalSeconds = 0;
    this.timeInterval = setInterval(() => {
      ++totalSeconds;
      this.secondsLabel.innerHTML = pad(totalSeconds % 60);
      this.minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
  }

  setMovesAllowed(moves) {
    this.movesAllowed.innerHTML = moves;
  }

  setFirstSelection(card) {
    this.firstSelection = card;
  }

  setSecondSelection(card) {
    this.secondSelection = card;
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('cardSelected', idx => this.cardSelected(idx));
  }

  initNewGame(difficulty = 1) {
    this.model.setNewCards(difficulty);
    this.view.resetBoard();
    this.view.addClass(this.view.initPage, "hide");
    this.view.addClass(this.view.mainContent, "show");
    this.model.itemsToPlay.forEach(item => {
      this.view.addCardToBoard(item);
    });
    this.view.initTimer();
    this.view.setMovesAllowed(this.model.moves);
  }

  cardSelected({element, card}) {
    console.log(element);
    this.view.addClass(element, "selected");
    if (!this.view.firstSelection) {
      this.view.setFirstSelection(card);
    }
    else if (this.view.firstSelection.id === card.id) {
      console.log("same Card");
    }
    else {
      this.view.setSecondSelection(card);
      this.compareItems();
    }
  }

  compareItems() {
    const {firstSelection, secondSelection} = this.view;
    const firstCard = document.getElementById(`card-${firstSelection.id}`);
    const secondCard = document.getElementById(`card-${secondSelection.id}`);
    console.log(firstSelection, secondSelection);
    console.log(this.model.itemsToPlay);
    if (firstSelection.item === secondSelection.item) {
      const indexOfFirst = this.model.itemsToPlay.findIndex(item => item.id === firstSelection.id);
      this.model.itemsToPlay.splice(indexOfFirst, 1);

      const indexOfSecond = this.model.itemsToPlay.findIndex(item => item.id === secondSelection.id);
      this.model.itemsToPlay.splice(indexOfSecond, 1);

      setTimeout(() => {
        firstCard.classList.toggle('hidden');
        firstCard.onclick = null;
        secondCard.classList.toggle('hidden');
        secondCard.onclick = null;
      }, 1000)
    } else {
      setTimeout(() => {
        firstCard.classList.add('shake');
        secondCard.classList.add('shake');
      }, 200)
      setTimeout(() => {
        firstCard.classList.remove('selected');
        secondCard.classList.remove('selected');
        firstCard.classList.remove('shake');
        secondCard.classList.remove('shake');
      }, 1000)
    }
    this.view.firstSelection = null;
    this.view.secondSelection = null;
    this.model.setMoves();
    this.view.movesTaken.innerHTML = this.model.movesMade;
    this.checkGameResolution();
  }

  checkGameResolution() {
    if (this.model.itemsToPlay.length === 0) {
      clearInterval(this.view.timeInterval);
      this.view.resetBoard();
      this.view.addClass(this.view.content, "hide");
      this.view.addClass(this.view.endGameScreen, "show");
      this.view.resultTime.innerHTML = `${this.view.minutesLabel.innerHTML}:${this.view.secondsLabel.innerHTML}`;
      this.view.resultMoves.innerHTML = `${this.view.movesTaken.innerHTML}/${this.view.movesAllowed.innerHTML}`;
      if (+this.model.playerLevel === +this.model.levelSelected) {
        console.log('Paso por aca');
        localStorage.setItem('currentLevel', +this.model.playerLevel + 1);
        setMenu();
      }
    }
  }

}

export let app = new Controller(new Model(), new View());