var Word = require("./Word");
var inquirer = require("inquirer");

var cities = ["berlin","seattle","delhi"];
var wordToGuess = new Word(cities[Math.floor(Math.random()*cities.length)]);

console.log(wordToGuess.getWord());

inquirer.prompt([{
    message:"Guess a letter",
    name:"guessedLetter",
    type:"input",
    validate: function(value) {
        if(value.toLowerCase()!== value.toUpperCase()) {
          return true;
        }
        return false;
      }
    }]).then(function(response){
        wordToGuess.guessWord(response.guessedLetter);
        console.log(wordToGuess.getWord());
    })