class Card {
  constructor(item, id, active = true) {
    this.item = item;
    this.id = id;
    this.active = active;
  }

  cardMatched() {
    this.active = false;
  }
}

export class Model {
  constructor() {
    const initiadedGame = JSON.parse(sessionStorage.getItem('itemsToPlay'));
    this.items = ['🦁', '🤖', '😵‍💫', '🤡', '😈', '🐔', '🐷', '💩', '👻', '🙊', '🦄', '🤬'];
    this.levelsToPlay = [1, 2, 3, 4];
    this.itemsToPlay = !!initiadedGame ? initiadedGame.map(({item, id, active}) => new Card(item, id, active)) : [];
    this.levelSelected;
    this.movesMade = sessionStorage.getItem('movesMade') || 0;
    this.moves = sessionStorage.getItem('movesAllowed') || null;
    this.playerLevel = localStorage.getItem('currentLevel') || 1;
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

  setNewMove() {
    this.movesMade++
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
    gameCards = this.suffleArray(this.duplicateItems(gameCards));
    for (let i = 1; i <= gameCards.length; i++) {
      this.itemsToPlay.push(new Card(gameCards[i - 1], i));
    }
  }

  setNewCards(difficulty) {
    this._resetSessionStorage();
    this._resetMoves();
    this._resetItemsToPlay();
    this.selectLevel(difficulty);
  }

  endGame() {
    this._resetSessionStorage();
    this._resetMoves();
    this._resetItemsToPlay();
  }

  setItemsToPlayOnStorage() {
    sessionStorage.setItem('itemsToPlay', JSON.stringify(this.itemsToPlay));
    sessionStorage.setItem('movesMade', this.movesMade);
    sessionStorage.setItem('movesAllowed', this.moves);
  }

  _resetSessionStorage() {
    sessionStorage.clear();
  }

  _resetMoves() {
    this.movesMade = 0;
  }


  _resetItemsToPlay() {
    this.itemsToPlay = [];
  }

}