//main module

const gameBoard = (() => {
    const gameBoardContainer = document.querySelector("#game-board");
    let boardArray = [null, null, null, null, null, null,null, null, null];
    let currentPlayer = 'playerX';
    let bot;
    let player;
    let gameType;
    const markXBtn = document.querySelector('#mark-X');
    const markOBtn = document.querySelector('#mark-O');
    const marksContainer = document.querySelector('#marks-container');
    marksContainer.style.visibility = 'hidden';

    const playerChooseBtn = document.querySelector('#choose-player');
    const botChooseBtn = document.querySelector('#choose-bot');
    const chooseContainer = document.querySelector('#choose-container');

    const winnerContainer = document.querySelector('#winner-container');
    const winnerRevealText = document.querySelector('#winner-reveal');
    const resetBtn = document.querySelector('#reset-btn');
    winnerContainer.style.visibility = 'hidden';

    // A function that sets the game type to be between two players
    //Created to be put inside a button
    const handlePlayerChoice = (event) => {
        chooseContainer.style.visibility = 'hidden';
        createSquares();
        gameType = 'players';
    };

    // A function that sets the game type to be between player and bot
    //Created to be put inside a button
    const handleBotChoice = (event) => {
        chooseContainer.style.visibility = 'hidden';
        marksContainer.style.visibility = 'visible';
        gameType = 'bot';
    };

    //Setting event listeners for buttons to choose game type
    playerChooseBtn.addEventListener('click', handlePlayerChoice);
    botChooseBtn.addEventListener('click', handleBotChoice);
    
    //A factory function to create player objects with a bot game type
    const Player = (marker) => {
        return {marker};
    };

    //A function that creates player and bot objects and sets bot to have O marker and player to have X marker with a bot game type
    //Created to be put inside a button
    const handleXBtn = (event) => {
        player = Player('X');
        bot = Player('O');
        createSquares();
        marksContainer.style.visibility = 'hidden';
    };

    //A function that creates player and bot objects and sets bot to have X marker and player to have O marker with a bot game type
    //Created to be put inside a button
    const handleOBtn = (event) => {
        player = Player('O');
        bot = Player('X');
        createSquares();
        marksContainer.style.visibility = 'hidden';
        computerTurn();
    };

    //Setting event listeners for buttons to choose the marker for a player with a bot game type
    markOBtn.addEventListener('click', handleOBtn);
    markXBtn.addEventListener('click', handleXBtn);
 
    //A function to create a board of buttons to play a game
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

    //a function to fill in the buttons on a game board
    const fillInSquare = (element, square) => {
        if (element === null) {
            square.textContent = ('-');
        } else if (element === 'X') {
            square.textContent = ('X');
        } else if (element === 'O') {
            square.textContent = ('O');
        };
    };
    
    //a function to toggle players marker in a players game type
    const togglePlayer = () => {
        if (currentPlayer === "playerX") {
            currentPlayer = 'playerO';
        } else if (currentPlayer === 'playerO') {
            currentPlayer = 'playerX';
        };
    };

    //A function to set event listener in each button on a game board (both for players and bot game types)
    //Created to be put inside a button
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

    //A function that checks the winner and disables all buttons in the end
    const checkWinner = () => {
        if ((boardArray[0] === 'X' && boardArray[1] === 'X' && boardArray[2] === 'X') ||
        (boardArray[3] === 'X' && boardArray[4] === 'X' && boardArray[5] === 'X')  ||
        (boardArray[6] === 'X' && boardArray[7] === 'X' && boardArray[8] === 'X')  ||
        (boardArray[0] === 'X' && boardArray[3] === 'X' && boardArray[6] === 'X')  ||
        (boardArray[1] === 'X' && boardArray[4] === 'X' && boardArray[7] === 'X')  ||
        (boardArray[2] === 'X' && boardArray[5] === 'X' && boardArray[8] === 'X')  ||
        (boardArray[0] === 'X' && boardArray[4] === 'X' && boardArray[8] === 'X') ||
        (boardArray[6] === 'X' && boardArray[4] === 'X' && boardArray[2] === 'X')) {
            winnerContainer.style.visibility = 'visible';
            winnerRevealText.textContent = ('Player X is a winner!');
            disableButtons();
        } else if ((boardArray[0] === 'O' && boardArray[1] === 'O' && boardArray[2] === 'O') ||
        (boardArray[3] === 'O' && boardArray[4] === 'O' && boardArray[5] === 'O')  ||
        (boardArray[6] === 'O' && boardArray[7] === 'O' && boardArray[8] === 'O')  ||
        (boardArray[0] === 'O' && boardArray[3] === 'O' && boardArray[6] === 'O')  ||
        (boardArray[1] === 'O' && boardArray[4] === 'O' && boardArray[7] === 'O')  ||
        (boardArray[2] === 'O' && boardArray[5] === 'O' && boardArray[8] === 'O')  ||
        (boardArray[0] === 'O' && boardArray[4] === 'O' && boardArray[8] === 'O') ||
        (boardArray[6] === 'O' && boardArray[4] === 'O' && boardArray[2] === 'O')) {
            winnerContainer.style.visibility = 'visible';
            winnerRevealText.textContent = ('Player O is a winner!');
            disableButtons();
        } else if (!(boardArray.includes(null))) {
            winnerContainer.style.visibility = 'visible';
            winnerRevealText.textContent = ('Its a tie game!');
            disableButtons();
        };
    };

    //A function to delete the board and renew a board array
    const clearBoard = () => {
        gameBoardContainer.replaceChildren();
        boardArray = [null, null, null, null, null, null,null, null, null];
    };

    //A function for computer to choose a random number to be put as an index for board array to fill in the board button
    const computerTurn = () => {
    cells = [];
    for (i = 0; i < 10; i++) {
      if (boardArray[i] === null) cells.push(i);
    }
    const randomNumber = Math.floor(Math.random() * cells.length);
    const finalNumber = cells[randomNumber];
    const squareToFill = document.getElementById(`${finalNumber}`)
    if (bot.marker === 'X') {
        squareToFill.textContent = ('X');
        boardArray[finalNumber] = 'X';
    } else if (bot.marker === 'O') {
        squareToFill.textContent = ('O');
        boardArray[finalNumber] = 'O';
    };
    checkWinner();
    console.log(boardArray);
    };

    //A function to clear the board and play a game again
    //Created to be put inside a button
    const resetGame = (event) => {
        clearBoard();
        chooseContainer.style.visibility = 'visible';
        winnerContainer.style.visibility = 'hidden';
    };

    //Setting event listener to a play agian button
    resetBtn.addEventListener('click', resetGame);

    //a function to disable all buttons on a board when the winner is revealed
    const disableButtons = () => {
        let children = gameBoardContainer.children;
            for (var i = 0; i < children.length; i++) {
                const containerChild = children[i];
                containerChild.setAttribute('disabled', false);
            }
        
        
    };

    return {
        createSquares,
    };

})();