// just to visualize the board better 
// 0 1 2
// 3 4 5
// 6 7 8

const gameBoard = (() => {
    const gameBoardContainer = document.querySelector("#game-board");
    let boardArray = [null, null, null, null, null, null,null, null, null];
    let currentPlayer = 'playerX';
    let bot;
    let player;
    let gameType;
    const playerXBtn = document.querySelector('#player-X');
    const playerOBtn = document.querySelector('#player-O');
    const btnContainer = document.querySelector('#players-container');
    btnContainer.style.visibility = 'hidden';

    const playerChooseBtn = document.querySelector('#choose-player');
    const botChooseBtn = document.querySelector('#choose-bot');
    const chooseContainer = document.querySelector('#choose-container');

    const handlePlayerChoice = (event) => {
        chooseContainer.style.visibility = 'hidden';
        createSquares();
        gameType = 'players';
    };

    const handleBotChoice = (event) => {
        chooseContainer.style.visibility = 'hidden';
        btnContainer.style.visibility = 'visible';
        gameType = 'bot';
    };

    playerChooseBtn.addEventListener('click', handlePlayerChoice);
    botChooseBtn.addEventListener('click', handleBotChoice);
    
    const Player = (marker) => {
        return {marker};
    };

    const handleXBtn = (event) => {
        player = Player('X');
        bot = Player('O');
        createSquares();
        playerOBtn.style.visibility='hidden';
        playerXBtn.style.visibility='hidden';
    };

    const handleOBtn = (event) => {
        player = Player('O');
        bot = Player('X');
        createSquares();
        playerOBtn.style.visibility='hidden';
        playerXBtn.style.visibility='hidden';
        computerTurn();
    };

    playerOBtn.addEventListener('click', handleOBtn);
    playerXBtn.addEventListener('click', handleXBtn);
 
    const createSquares = () => {
        boardArray.forEach((element, index) => {
            const square = document.createElement('button');
            square.classList.add('board-square');
            square.setAttribute('id', `${index}`);
            gameBoardContainer.appendChild(square);
            square.addEventListener('click', handleEvent);
            fillInSquare(element, square);
        })
    };

    const fillInSquare = (element, square) => {
        if (element === null) {
            square.textContent = ('-');
        } else if (element === 'X') {
            square.textContent = ('X');
        } else if (element === 'O') {
            square.textContent = ('O');
        };
    };
    
    const togglePlayer = () => {
        if (currentPlayer === "playerX") {
            currentPlayer = 'playerO';
        } else if (currentPlayer === 'playerO') {
            currentPlayer = 'playerX';
        };
    };

    const handleEvent = (event) => {
        const button = event.target;
        const indexValue = button.getAttribute('id');
        if (gameType === 'bot') {
            if (player.marker === 'X' && boardArray[indexValue] === null) {
                boardArray[indexValue] = 'X';
                button.textContent = ('X');
                checkWinner();
                computerTurn();
            } else if (player.marker === 'O' && boardArray[indexValue] === null) {
                boardArray[indexValue] = 'O';
                button.textContent = ('O');
                checkWinner();
                computerTurn();
            };
        } else if (gameType === 'players') {
            if (currentPlayer === "playerX" && boardArray[indexValue] === null) {
                boardArray[indexValue] = 'X';
                button.textContent = ('X');
                togglePlayer();
                checkWinner();
            } else if (currentPlayer === "playerO" && boardArray[indexValue] === null) {
                boardArray[indexValue] = 'O';
                button.textContent = ('O');
                togglePlayer();
                checkWinner();
            };
        };
    };

    const checkWinner = () => {
        if ((boardArray[0] === 'X' && boardArray[1] === 'X' && boardArray[2] === 'X') ||
        (boardArray[3] === 'X' && boardArray[4] === 'X' && boardArray[5] === 'X')  ||
        (boardArray[6] === 'X' && boardArray[7] === 'X' && boardArray[8] === 'X')  ||
        (boardArray[0] === 'X' && boardArray[3] === 'X' && boardArray[6] === 'X')  ||
        (boardArray[1] === 'X' && boardArray[4] === 'X' && boardArray[7] === 'X')  ||
        (boardArray[2] === 'X' && boardArray[5] === 'X' && boardArray[8] === 'X')  ||
        (boardArray[0] === 'X' && boardArray[4] === 'X' && boardArray[8] === 'X') ||
        (boardArray[6] === 'X' && boardArray[4] === 'X' && boardArray[2] === 'X')) {
            alert('Player X is a winner');
            clearBoard();
        } else if ((boardArray[0] === 'O' && boardArray[1] === 'O' && boardArray[2] === 'O') ||
        (boardArray[3] === 'O' && boardArray[4] === 'O' && boardArray[5] === 'O')  ||
        (boardArray[6] === 'O' && boardArray[7] === 'O' && boardArray[8] === 'O')  ||
        (boardArray[0] === 'O' && boardArray[3] === 'O' && boardArray[6] === 'O')  ||
        (boardArray[1] === 'O' && boardArray[4] === 'O' && boardArray[7] === 'O')  ||
        (boardArray[2] === 'O' && boardArray[5] === 'O' && boardArray[8] === 'O')  ||
        (boardArray[0] === 'O' && boardArray[4] === 'O' && boardArray[8] === 'O') ||
        (boardArray[6] === 'O' && boardArray[4] === 'O' && boardArray[2] === 'O')) {
            alert('Player O is a winner!');
            clearBoard();
        };
    };

    const clearBoard = () => {
        gameBoardContainer.replaceChildren();
        boardArray = [null, null, null, null, null, null,null, null, null];
        createSquares();
    };

    const computerTurn = () => {
    cells = [];
    for (i = 0; i < 10; i++) {
      if (boardArray[i] === null) cells.push(i);
    }
    const randomNumber = Math.floor(Math.random() * cells.length);
    const squareToFill = document.getElementById(`${cells[randomNumber]}`)
    if (bot.marker === 'X') {
        squareToFill.textContent = ('X');
    } else if (bot.marker === 'O') {
        squareToFill.textContent = ('O');
    };
    };

    return {
        createSquares,
        computerTurn,
    };

})();