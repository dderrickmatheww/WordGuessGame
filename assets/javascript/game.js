//DOM Elements
//$ is to notate it for DOM elements
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

//Create vars for game (wordbank, wins, loses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank.)
var wordbank = ["Wingmen", "Wraith", "Lifeline", "Peace Keeper", "Spitfire"];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var gameRunning = false;
var pickedWord = "";
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//newGame function to reset all stats, pick new word and create placeholders


function newGame() {
    gameRunning = true;
    guessesLeft = 9;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    //Pick a new word

    pickedWord = wordbank[Math.floor(Math.random() * wordbank.length)];

    //Create placeholder's out of new pickedWord
    for (var index = 0; index < pickedWord.length; index++){
        if (pickedWord[index] === " ") {
            pickedWordPlaceholderArr.push(" ");
        }
        else {
            pickedWordPlaceholderArr.push("_");
        }
    }

    //write all game info into DOM

    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join("");
    $guessedLetters.textContent = incorrectLetterBank;

}



//letterGuess function, takes in the letter you pressed and see if it's in the selected word

//checkIncorrect(letter)

//checkLose

//checkWin

//Add event listener for new game button
$newGameButton.addEventListener("click", newGame);
// Add onkeyup event to trigger letterGuess