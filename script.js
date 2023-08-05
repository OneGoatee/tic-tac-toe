const gameController = (() => {
  const gridCells = document.querySelectorAll('.grid-cell');

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
  let player = 'One';
  let isPlayerOne = true;
  let isGameOver = false;

  const getNextPlayer = () => {
    isPlayerOne = !isPlayerOne;

    isPlayerOne ? (player = 'One') : (player = 'Two');
  };

  const getPlayerCell = e => {
    isPlayerOne ? playerOneCells.push(Number(e.target.dataset.cell)) : playerTwoCells.push(Number(e.target.dataset.cell));
  };

  const addPlayerMark = e => {
    isPlayerOne ? (e.target.innerHTML = 'X') : (e.target.innerHTML = 'O');
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
  };

  const isSubset = (arr1, arr2) => {
    return arr2.every(element => arr1.includes(element));
  };

  const checkWinner = () => {
    switch (true) {
      case moves === 9:
        gameOver();
        console.log('Draw');
        break;

      case isSubset(playerOneCells, winSequence.horizontal.top) ||
        isSubset(playerOneCells, winSequence.horizontal.middle) ||
        isSubset(playerOneCells, winSequence.horizontal.bottom) ||
        isSubset(playerOneCells, winSequence.vertical.left) ||
        isSubset(playerOneCells, winSequence.vertical.middle) ||
        isSubset(playerOneCells, winSequence.vertical.right) ||
        isSubset(playerOneCells, winSequence.diagonal.leftRight) ||
        isSubset(playerOneCells, winSequence.diagonal.rightLeft):
        console.log('Player One Wins');
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
        console.log('Player Two Wins');
        gameOver();
        break;

      default:
        break;
    }
  };

  const updateMoves = () => {
    moves = playerOneCells.length + playerTwoCells.length;
  };

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

      default:
        break;
    }

    disablePlayerClick(e);
    moves++;
    getNextPlayer();
  };

  gridCells.forEach(cell => {
    if (isGameOver) return;

    cell.addEventListener('click', handlePlayerClick);
  });
})();
