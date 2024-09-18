// JavaScript file (scriptGTW.js)

let soundEnabled = true; 
let keyboardVisible = true;
let darkMode = true;

// Grid and keyboard creation
const wordOfTheDay = "HELLO";
let currentGuess = "";
let guesses = [];
const maxGuesses = 6;
const gridContainer = document.getElementById('grid-container');
const messageBox = document.getElementById('message');
const letterRow1 = document.getElementById('letterRow1');
const letterRow2 = document.getElementById('letterRow2');
const actionRow = document.getElementById('actionRow');

function createGrid() {
    for (let i = 0; i < maxGuesses; i++) {
        const row = document.createElement("div");
        row.classList.add("guess-row");

        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);
        }

        gridContainer.appendChild(row);
    }
}

function createKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const halfway = Math.ceil(alphabet.length / 2);
    
    // First row of letters
    alphabet.slice(0, halfway).forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('key');
        button.onclick = () => handleKeyPress(letter);
        letterRow1.appendChild(button);
    });

    // Second row of letters
    alphabet.slice(halfway).forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('key');
        button.onclick = () => handleKeyPress(letter);
        letterRow2.appendChild(button);
    });

    const enterButton = document.getElementById('enterButton');
    enterButton.onclick = submitGuess;

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.onclick = deleteLetter;
}

// Handle key press
function handleKeyPress(letter) {
    if (currentGuess.length < 5) {
        currentGuess += letter;
        updateGuessDisplay();
    }
}

// Submit guess
function submitGuess() {
    if (currentGuess.length === 5) {
        guesses.push(currentGuess);
        checkGuess(currentGuess);
        currentGuess = "";
        updateGuessDisplay();
    } else {
        messageBox.textContent = "Please enter a 5-letter word.";
    }
}

// Delete letter
function deleteLetter() {
    currentGuess = currentGuess.slice(0, -1);
    updateGuessDisplay();
}

// Update guess display
function updateGuessDisplay() {
    const currentRow = gridContainer.querySelectorAll(".guess-row")[guesses.length];
    if (currentRow) {
        const tiles = currentRow.querySelectorAll(".tile");
        tiles.forEach((tile, index) => {
            tile.textContent = currentGuess[index] || "";
        });
    }
}

// Check guess against the word of the day
function checkGuess(guess) {
    // Add your logic here to check the guess against the word of the day
    // For example, compare each letter and update tile colors
}

// Toggle Sound
document.getElementById('soundToggle').onclick = () => {
    soundEnabled = !soundEnabled;
    const icon = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    document.querySelector('#soundToggle i').className = icon;

    // Example: If sound is enabled/disabled, you can trigger background sound.
    // For example: 
    // if (soundEnabled) sound.play();
    // else sound.stop();
};

// Toggle Keyboard Visibility
document.getElementById('keyboardToggle').onclick = () => {
    keyboardVisible = !keyboardVisible;
    keyboard.style.display = keyboardVisible ? 'flex' : 'none';
};

// Toggle Light/Dark Mode
document.getElementById('themeToggle').onclick = () => {
    darkMode = !darkMode;
    document.body.classList.toggle('light-mode', !darkMode);

    const themeIcon = darkMode ? 'fas fa-moon' : 'fas fa-sun';
    document.getElementById('themeIcon').className = themeIcon;
};

// Initialize grid and keyboard
createGrid();
createKeyboard();
