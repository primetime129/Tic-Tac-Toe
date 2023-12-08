let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function handleCellClick(event) {
    if (!gameActive || event.target.className !== 'grid-item') return;

    const cell = event.target;
    const index = Array.from(cell.parentElement.children).indexOf(cell);

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();
        const draw = checkDraw();

        if (winner) {
            document.getElementById('message').textContent = `Player ${winner} wins!`;
            gameActive = false;
        } else if (draw) {
            document.getElementById('message').textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


// Add a function to restart the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    // Clear the board
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Clear the message
    document.getElementById('message').textContent = '';
}
// Add the dark theme class to the body on page load
document.body.classList.add('dark-theme');