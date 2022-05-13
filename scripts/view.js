export class EventEmitter {
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

export class View extends EventEmitter {
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
    this.menuLevels = this.getElement('.levels');
    this.menuBtn = this.getElement('.menu');
    this.aside = this.getElement('aside');

    this.firstSelection = null;
    this.secondSelection;
    this.timeInterval;

    this.menuBtn.addEventListener('click', () => {
      this.aside.classList.toggle('show');
    })
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
    this._resetTimer();
  }

  addCardToBoard = (card) => {
    const element = document.createElement('div');
    element.id = `card-${card.id}`;
    element.className = `card ${!card.active ? 'hidden' : ''}`;
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
      this.secondsLabel.innerHTML = this.pad(totalSeconds % 60);
      this.minutesLabel.innerHTML = this.pad(parseInt(totalSeconds / 60));
    }, 1000);
  }

  _resetTimer() {
    clearInterval(this.timeInterval);
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