var Word = require("./Word");
var inquirer = require("inquirer");

var cities;
var totalGuesses;
var wordToGuess;
var alreadyGuessedLetters;

function initializeGame(){
cities= ["paris",
        "mumbai",
        "jakarta",
        "taipei",
        "chicago",
        "kabul",
        "brussels",
        "beijing",
        "tokyo",
        "cairo",
        "havana",
        "london",
        "perth",
        "sydney",
        "melbourne",
        "brisbane",
        "seoul",
        "colombo",
        "stockholm",
        "bangkok",
        "madrid",
        "singapore",
        "edinburgh",
        "moscow",
        "doha",
        "lisbon",
        "muscat",
        "islamabad",
        "amsterdam",
        "rome",
        "dublin",
        "budapest",
        "athens",
        "berlin",
        "prague",
        "dhaka",
        "seattle",
        "portland",
        "orlando"];
totalGuesses = 10;
wordToGuess = new Word(cities[Math.floor(Math.random()*cities.length)]);
alreadyGuessedLetters =[];
console.log(wordToGuess.getWord());
startGuessing();
}

function startGuessing(){
    if(totalGuesses>0){
        inquirer.prompt([{
            message:"Guess a letter",
            name:"guessedLetter",
            type:"input",
            validate: function(value) {
                if(value.toLowerCase()!== value.toUpperCase() && value.length === 1) {
                return true;
                }
                return false;
            }
        }]).then(function(response){
            if(alreadyGuessedLetters.indexOf(response.guessedLetter) === -1){
                alreadyGuessedLetters.push(response.guessedLetter);
                var beforeGuessWord = wordToGuess.getWord();
                wordToGuess.guessWord(response.guessedLetter);
                console.log(wordToGuess.getWord());
                var afterGuessWord = wordToGuess.getWord();
                if(beforeGuessWord === afterGuessWord){
                    console.log("Incorrect guess");
                    totalGuesses--;
                    if(totalGuesses === 0){
                        console.log("No more chances left to guess!!")
                    }
                    else
                        console.log("Guesses left: "+ totalGuesses);
                }
                if(wordToGuess.getWord().indexOf("_") !== -1)
                    startGuessing();
                else{
                    console.log("You guessed the word right!!");
                    askPlayAgain();
                }
            }
            else{
                console.log("You have already guessed that letter!!")
                    startGuessing();
            }
        });
    }
    else{
        askPlayAgain();
    }
}
initializeGame();

function askPlayAgain(){
    inquirer.prompt([{
        message:"Play more?",
        name:"playAgain",
        type:"confirm",
        default:false
    }]).then(function(response){
        if(response.playAgain)
            initializeGame();
    });
}
