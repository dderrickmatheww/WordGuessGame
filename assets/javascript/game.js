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
var audio = [new Audio('apex.mp3'), new Audio('Apextheme.mp3.mp3')];

//newGame function to reset all stats, pick new word and create placeholders


function newGame() {

    gameRunning = true;
    guessesLeft = 9;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    document.getElementById("reg").style.cssText = "display: block";
    document.getElementById("winlose").style.cssText = "display: none";
    document.getElementById("winlose2").style.cssText = "display: none";
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

function letterGuess (letter) {
    console.log(letter);
    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        //Run game logic
        guessedLetterBank.push(letter);

        //Check if guessed letter is in my picked word
        for (var index = 0; index < pickedWord.length; index++) {
            //Convert both  to lowercase so I can compare them correctly
            if(pickedWord[index].toLowerCase() === letter.toLowerCase()) {
                //if a match, swap out that character in that placeholder with the actual letter
                pickedWordPlaceholderArr[index] = pickedWord[index];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join("");
        //pass letter guessed into the checkIncorrect function
        checkIncorrect(letter);
    }
    else {
        if (gameRunning === false) {
            alert("The game isn't running, click on the new game button to start over.");
        }
        else {
            alert("You've already guessed this letter, try another one!");
        }
    }
}
//checkIncorrect(letter)
function checkIncorrect(letter) {
    //Check to see if the letter DIDN'T make it into our pickedWordPlaceholderArr (incorrect guess)
    if 
    (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        //Subtract guesses
        guessesLeft--;
        //put letter into IncorrectLetterBank
        incorrectLetterBank.push(letter);
        //write new bank of incorrect letters to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(" ");
        //Write new amount of guesses to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLose();
      
    
}

//checkLose
function checkLose() {
    
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        audio[0].play();
        setTimeout(() => alert("YOU LOSE!"), 0)
        document.getElementById("reg").style.cssText = "display: none";
        document.getElementById("winlose2").style.cssText = "display: block";
    }
    checkWin()
    
}
//checkWin
function checkWin() {
    

    if(pickedWord.toLowerCase() === pickedWordPlaceholderArr.join("").toLowerCase()){
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
        audio[1].play();
        setTimeout(() => alert("YOU WON!"), 2)
        document.getElementById("reg").style.cssText = "display: none";
        document.getElementById("winlose").style.cssText = "display: block";
    }
    
}

//Add event listener for new game button
$newGameButton.addEventListener("click", newGame);
// Add onkeyup event to trigger letterGuess
document.onkeyup = function(event) {
    console.dir(event);
    
    if (event.keyCode >= 65 && event.keyCode <= 90);
    letterGuess(event.key);
    
}