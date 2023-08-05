let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const gameController = (() => {
  const gridCells = document.querySelectorAll('.grid-cell');
  const message = document.querySelector('.message');
  const restartBtn = document.querySelector('.restart-button');

  const playerOneCells = [];
  const playerTwoCells = [];

  const winSequence = {
    horizontal: {
      top: [1, 2, 3],
      middle: [4, 5, 6],
      bottom: [7, 8, 9],
    },
    vertical: {
      left: [1, 4, 7],
      middle: [2, 5, 8],
      right: [3, 6, 9],
    },
    diagonal: {
      leftRight: [1, 5, 9],
      rightLeft: [3, 5, 7],
    },
  };

  let moves = 0;
  let player = 'X';
  let messageText = '';
  let isPlayerOne = true;
  let isGameOver = false;
  let isWinner = false;

  const getNextPlayer = () => {
    if (isGameOver) return;
    isPlayerOne = !isPlayerOne;
    isPlayerOne ? (player = 'X') : (player = 'O');
  };

  const getPlayerCell = e => {
    isPlayerOne ? playerOneCells.push(Number(e.target.dataset.cell)) : playerTwoCells.push(Number(e.target.dataset.cell));
  };

  const addPlayerMark = e => (isPlayerOne ? (e.target.innerHTML = 'X') : (e.target.innerHTML = 'O'));

  const removePlayerMark = () => gridCells.forEach(cell => (cell.innerHTML = ''));

  const enablePlayerClick = () => {
    gridCells.forEach(cell => {
      if (isGameOver) return;

      cell.addEventListener('click', handlePlayerClick);
    });
  };

  const disablePlayerClick = e => {
    if (isGameOver) {
      gridCells.forEach(cell => {
        cell.removeEventListener('click', handlePlayerClick);
      });
    } else {
      e.target.removeEventListener('click', handlePlayerClick);
    }
  };

  const gameOver = () => {
    isGameOver = true;
    // restartBtn.style.visibility = 'visible';
  };

  const restartGame = () => {
    restartBtn.style.visibility = 'hidden';
    playerOneCells.length = 0;
    playerTwoCells.length = 0;
    player = 'X';
    isPlayerOne = true;
    isGameOver = false;
    messageText = '';
    updateMoves();
    removePlayerMark();
    displayController();
    enablePlayerClick();
  };

  const enableRestart = () => {
    if (moves > 0) {
      restartBtn.style.visibility = 'visible';
      restartBtn.addEventListener('click', restartGame);
    }
  };

  const isSubset = (arr1, arr2) => arr2.every(element => arr1.includes(element));

  const displayController = () => {
    switch (true) {
      case !isGameOver && moves === 0:
        messageText = `Click a cell to start`;
        message.innerHTML = messageText;
        break;

      case !isGameOver:
        messageText = `${player} turn`;
        message.innerHTML = messageText;
        break;

      case isGameOver && !isWinner && moves === 9:
        messageText = `It's a DRAW`;
        message.innerHTML = messageText;
        break;

      case isGameOver:
        messageText = `${player} Wins`;
        message.innerHTML = messageText;
        break;

      default:
        break;
    }
  };

  const checkWinner = () => {
    switch (true) {
      case isSubset(playerOneCells, winSequence.horizontal.top) ||
        isSubset(playerOneCells, winSequence.horizontal.middle) ||
        isSubset(playerOneCells, winSequence.horizontal.bottom) ||
        isSubset(playerOneCells, winSequence.vertical.left) ||
        isSubset(playerOneCells, winSequence.vertical.middle) ||
        isSubset(playerOneCells, winSequence.vertical.right) ||
        isSubset(playerOneCells, winSequence.diagonal.leftRight) ||
        isSubset(playerOneCells, winSequence.diagonal.rightLeft):
        isWinner = true;
        gameOver();

        break;

      case isSubset(playerTwoCells, winSequence.horizontal.top) ||
        isSubset(playerTwoCells, winSequence.horizontal.middle) ||
        isSubset(playerTwoCells, winSequence.horizontal.bottom) ||
        isSubset(playerTwoCells, winSequence.vertical.left) ||
        isSubset(playerTwoCells, winSequence.vertical.middle) ||
        isSubset(playerTwoCells, winSequence.vertical.right) ||
        isSubset(playerTwoCells, winSequence.diagonal.leftRight) ||
        isSubset(playerTwoCells, winSequence.diagonal.rightLeft):
        isWinner = true;
        gameOver();
        break;

      case moves === 9:
        gameOver();
        break;
    }
  };

  const updateMoves = () => (moves = playerOneCells.length + playerTwoCells.length);

  const handlePlayerClick = e => {
    switch (e.target.innerHTML === '' && !isGameOver) {
      case isPlayerOne:
        addPlayerMark(e);
        getPlayerCell(e);
        updateMoves();
        checkWinner();
        break;

      case !isPlayerOne:
        addPlayerMark(e);
        getPlayerCell(e);
        updateMoves();
        checkWinner();
        break;
    }

    disablePlayerClick(e);
    getNextPlayer();
    displayController();
    moves++;

    enableRestart();
  };

  enablePlayerClick();

  displayController();
})();
