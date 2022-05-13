//DOM VARIABLES
const resultTime = document.querySelector('#resultTime');
const resultMoves = document.querySelector('#resultMoves');
const endGameScreen = document.querySelector('.end-game-screen');


const compareItems = () => {
  const firstCard = document.getElementById(`card-${firstSelection.id}`);
  const secondCard = document.getElementById(`card-${secondSelection.id}`);
  console.log(firstSelection, secondSelection);
  console.log(itemsToPlay);
  if (firstSelection.item === secondSelection.item) {
    const indexOfFirst = itemsToPlay.findIndex(item => item.id === firstSelection.id);
    itemsToPlay.splice(indexOfFirst, 1);

    const indexOfSecond = itemsToPlay.findIndex(item => item.id === secondSelection.id);
    itemsToPlay.splice(indexOfSecond, 1);

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
  firstSelection = null;
  secondSelection = null;
  movesMade++;
  movesTaken.innerHTML = movesMade;
  checkGameResolution();
}

const checkGameResolution = () => {
  if (itemsToPlay.length === 0) {
    clearInterval(timeInterval);
    content.innerHTML = '';
    endGameScreen.classList.add('show');
    resultTime.innerHTML = `${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`;
    resultMoves.innerHTML = `${movesTaken.innerHTML}/${movesAllowed.innerHTML}`;
    if (+playerLevel === +levelSelected) {
      console.log('Paso por aca');
      localStorage.setItem('currentLevel', +playerLevel + 1);
      setMenu();
    }
  }
}