// just to visualize the board better 
// 0 1 2
// 3 4 5
// 6 7 8

const gameBoard = (() => {
    const gameBoardContainer = document.querySelector("#game-board");
    let boardArray = [null, null, null, null, null, null,null, null, null];
    let currentPlayer = 'playerX';

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

    return {
        createSquares,
    };

})();

gameBoard.createSquares();

const Player = (marker) => {
    this.marker = marker;
    const playerXBtn = document.querySelector('#player-X');
    const playerOBtn = document.querySelector('#player-O');
}

