// Game state variables
let board = ['', '', '', '', '', '', '', '', '']; // Array representing the 9 cells of the board
let currentPlayer = 'X'; // Track whose turn it is (X goes first)
let gameActive = true; // Flag to control if the game is in progress

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board
    
    // Create cells for each position in the board array
    board.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.innerText = value;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    // Only allow moves on empty cells and when the game is active
    if (board[index] === '' && gameActive) {
        // Update the board state and UI
        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        
        // Check if the current move results in a win
        if (checkWinner()) {
            document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        // Check if the game is a draw (board is full)
        if (!board.includes('')) {
            document.getElementById('message').innerText = "It's a draw!";
            gameActive = false;
            return;
        }
        
        // Switch to the next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    // All possible winning patterns (rows, columns, diagonals)
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    // Check each pattern to see if it contains matching symbols
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWinningCells(pattern);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(pattern) {
    if (pattern) {
        pattern.forEach(index => {
            document.querySelector(`[data-index='${index}']`).classList.add('winning-cell');
        });
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('message').innerText = "Player X's turn";
    createBoard();
}

// Initialize the game board when the script loads
createBoard();