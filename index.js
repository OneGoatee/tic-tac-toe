const gameController = (() => {
  const gridCells = document.querySelectorAll('.grid-cell');
  const playerOneCells = [];
  const playerTwoCells = [];

  let isPlayerOne = true;

  const getNextPlayer = () => {
    isPlayerOne = !isPlayerOne;
  };

  const getPlayerCell = e => {
    isPlayerOne ? playerOneCells.push(Number(e.target.dataset.cell)) : playerTwoCells.push(Number(e.target.dataset.cell));
  };

  const addPlayerMark = e => {
    isPlayerOne ? (e.target.innerHTML = 'X') : (e.target.innerHTML = 'O');
  };

  const handlePlayerClick = e => {
    e.target.removeEventListener('click', handlePlayerClick);

    switch (e.target.innerHTML === '') {
      case isPlayerOne:
        addPlayerMark(e);
        getPlayerCell(e);
        break;

      case !isPlayerOne:
        addPlayerMark(e);
        getPlayerCell(e);
        break;

      default:
        break;
    }

    getNextPlayer();
  };

  gridCells.forEach(cell => {
    cell.addEventListener('click', handlePlayerClick);
  });
})();
