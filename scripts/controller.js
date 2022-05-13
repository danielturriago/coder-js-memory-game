export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('cardSelected', idx => this.cardSelected(idx));
  }

  setMenu() {
    this.view.menuLevels.innerHTML = '';
    for (const level of this.model.levelsToPlay) {
      const content = document.createElement('li');
      content.innerHTML = `Nivel ${level}`;
      if (this.model.playerLevel < level) {
        content.classList.add('disabled');
      } else {
        content.onclick = () => {
          this.initNewGame(level);
        }
      }
      this.view.menuLevels.appendChild(content);
    }
  }

  initGame() {
    this.view.resetBoard();
    this.view.addClass(this.view.initPage, "hide");
    this.view.addClass(this.view.mainContent, "show");
    this.model.itemsToPlay.forEach(item => {
      this.view.addCardToBoard(item);
    });
    this.view.movesTaken.innerHTML = this.model.movesMade;
    this.view.initTimer();
    this.view.setMovesAllowed(this.model.moves);
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
      // this.model.itemsToPlay.splice(indexOfFirst, 1);
      this.model.itemsToPlay[indexOfFirst].cardMatched();

      const indexOfSecond = this.model.itemsToPlay.findIndex(item => item.id === secondSelection.id);
      // this.model.itemsToPlay.splice(indexOfSecond, 1);
      this.model.itemsToPlay[indexOfSecond].cardMatched();

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
    this.model.setNewMove();
    this.view.movesTaken.innerHTML = this.model.movesMade;
    this.model.setItemsToPlayOnStorage();
    this.checkGameResolution();
  }

  checkGameResolution() {
    if (this.model.itemsToPlay.filter(item => item.active).length === 0) {
      this.model.endGame();
      this.view.resetBoard();
      this.view.addClass(this.view.content, "hide");
      this.view.addClass(this.view.endGameScreen, "show");
      this.view.resultTime.innerHTML = `${this.view.minutesLabel.innerHTML}:${this.view.secondsLabel.innerHTML}`;
      this.view.resultMoves.innerHTML = `${this.view.movesTaken.innerHTML}/${this.view.movesAllowed.innerHTML}`;
      if (+this.model.playerLevel === +this.model.levelSelected) {
        console.log('Paso por aca');
        localStorage.setItem('currentLevel', +this.model.playerLevel + 1);
        this.setMenu();
      }
    }
  }

}