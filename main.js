const gameNumber = document.querySelector(".game-number");
const gameFeedback = document.querySelector(".feedback");
const gameGuess = document.querySelector(".guess-button");
const gameHealthBar = document.querySelector(".game-health-bar");
const gameHealthPercentage = document.querySelector(".game-health-percentage");
const gamePlayButton = document.querySelector(".play-button");
const gameResetButton = document.querySelector(".reset-button");

let gameHealth;
let gameOver;
let randomGuessNumber;

const updateData = (element, message) => {
    element.textContent = message;
}

const init = () => {
    gameHealth = 100;
    gameOver = false;
    randomGuessNumber = Math.trunc(Math.random() * 10) + 1;
    updateData(gameHealthPercentage, "100%");
    updateData(gameFeedback, "Type your Guess below!");
    gameGuess.value = "";
    gameHealthBar.style.background = "green";
    gameHealthBar.style.width = `${gameHealth}%`;
}

init();

const playGame = () => {
    const guess = Number(gameGuess.value); 
    if (!gameOver) {
        if (guess <= 0) {
            updateData(gameFeedback, "Enter a valid number!!!");
        } else if (guess === randomGuessNumber) {
            updateData(gameFeedback, "You Win!");
            gameOver = true;
        } else {
            updateData(gameFeedback, guess > randomGuessNumber ? "Try a lower number!!!!" : "Try a higher number!!!");
            gameHealth -= 20;
            gameHealthBar.style.width = `${gameHealth}%`;
            updateData(gameHealthPercentage, `${gameHealth}%`);
            if (gameHealth < 50) {
                gameHealthBar.style.background = "red";
            }
            if (gameHealth <= 0) {
                updateData(gameFeedback, "Game over!");
                gameHealth = 0;
                gameHealthBar.style.width = `${gameHealth}%`;
                updateData(gameHealthPercentage, "0%");
                gameOver = true;
            }
        }
    } else {
        updateData(gameFeedback, "Reset to play the game again!");
    }
};

gamePlayButton.addEventListener("click", playGame);
gameResetButton.addEventListener("click", init);
