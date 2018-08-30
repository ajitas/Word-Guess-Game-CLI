var Word = require("./Word");
var inquirer = require("inquirer");
var Chalk = require("chalk");
var CFonts = require("cfonts");

CFonts.say('HANGMAN', {
    font: 'block',              // define the font face
    align: 'center',              // define text alignment
    colors: ['cyan','blueBright'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: 20,             // define how many character can be on one line
});

var totalGuesses;
var wordToGuess;
var alreadyGuessedLetters;
var score = 0;
var questionCount = 0;
var selectedArray;
console.log("==========================")
console.log("GUESS THE CITIES/COUNTRIES")
console.log("==========================\n")

function initializeGame(){
    var cities= ["paris",
            "mumbai",
            "delhi",
            "hongkong",
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
            "orlando",
            "karachi",
            "istanbul",
            "shanghai",
            "tehran",
            "santiago",
            "lahore",
            "singapore",
            "toronto",
            "houston",
            "phoenix",
            "dallas",
            "austin",
            "columbus",
            "charlotte",
            "denver",
            "detroit",
            "miami",
            "atlanta",
            "raleigh",
            "tampa",
            "cleveland",
            "honolulu",
            "pittsburgh",
            "madison",
            "philadelphia",
            "indianapolis",
            "boston",
            "sacramento"];
    var countries =["india",
                "australia",
                "austria",
                "argentina",
                "belgium",
                "brazil",
                "bulgaria",
                "cambodia",
                "canada",
                "chile",
                "china",
                "colombia",
                "croatia",
                "cuba",
                "cyprus",
                "denmark",
                "egypt",
                "estonia",
                "ethiopia",
                "fiji",
                "finland",
                "france",
                "germany",
                "greece",
                "hungary",
                "iceland",
                "indonesia",
                "iran",
                "iraq",
                "italy",
                "jamaica",
                "japan",
                "jordan",
                "kenya",
                "kuwait",
                "lebanon",
                "libya",
                "lithuania",
                "madagascar",
                "malaysia",
                "maldives",
                "maurituis",
                "mexico",
                "monaco",
                "morocco",
                "mongolia",
                "nepal",
                "nigeria",
                "norway",
                "pakistan",
                "peru",
                "paraguay",
                "philippines",
                "poland",
                "portugal",
                "seychelles",
                "singapore",
                "spain",
                "sudan",
                "sweden",
                "switzerland",
                "syria",
                "thailand",
                "netherlands",
                "turkey",
                "ukraine",
                "venezuela",
                "vietnam",
                "zimbabwe"];
                
    totalGuesses = 10;
    if(Math.floor(Math.random()*2) === 0){
        wordToGuess = new Word(cities[Math.floor(Math.random()*cities.length)]);
        selectedArray = 0;
    }
    else{
        wordToGuess = new Word(countries[Math.floor(Math.random()*countries.length)]);
        selectedArray = 1;
    }
    alreadyGuessedLetters =[];
    if(selectedArray === 0)
        console.log(Chalk.bold("\nCity: "+wordToGuess.getWord()));
    else
        console.log(Chalk.bold("\nCountry: "+wordToGuess.getWord()));
    questionCount++;
    startGuessing();
}

function startGuessing(){
    if(totalGuesses>0){
        inquirer.prompt([{
            message:"Guess a letter",
            name:"guessedLetter",
            type:"input",
            validate: function(value) {
                if(value.toLowerCase()!== value.toUpperCase() && value.length === 1 && alreadyGuessedLetters.indexOf(value) === -1) {
                return true;
                }
                return false;
            }
        }]).then(function(response){
            if(alreadyGuessedLetters.indexOf(response.guessedLetter.toLowerCase()) === -1){
                alreadyGuessedLetters.push(response.guessedLetter.toLowerCase());
                var beforeGuessWord = wordToGuess.getWord();
                wordToGuess.guessWord(response.guessedLetter.toLowerCase());
                if(selectedArray === 0)
                    console.log(Chalk.bold("\nCity: "+wordToGuess.getWord()));
                else
                    console.log(Chalk.bold("\nCountry: "+wordToGuess.getWord()));
                var afterGuessWord = wordToGuess.getWord();
                console.log("Already guessed letters: "+alreadyGuessedLetters.join(','));
                if(beforeGuessWord === afterGuessWord){
                    console.log(Chalk.red("Incorrect guess"));
                    totalGuesses--;
                    if(totalGuesses === 0){
                        console.log("===============================")
                        console.log(Chalk.black.bgRedBright.bold("No more chances left to guess!!"));
                        console.log("===============================")
                        console.log(Chalk.black.bgYellowBright.bold("Correct answer was: "+ wordToGuess.displayWord()));
                        console.log("===============================")
                        console.log(Chalk.black.bgCyanBright.bold("Your Score: "+ score+ "/"+ questionCount));
                        console.log("===============================")
                    }
                    else
                        console.log(Chalk.blue("Guesses left: ")+ Chalk.blue.bold(totalGuesses));
                }
                if(wordToGuess.getWord().indexOf("_") !== -1)
                    startGuessing();
                else{
                    console.log("============================")
                    console.log(Chalk.black.bgGreenBright.bold("You guessed the word right!!"));
                    console.log("============================")
                    score++;
                    console.log(Chalk.black.bgCyanBright.bold("Your Score: "+ score + "/"+ questionCount));
                    console.log("============================")
                    askPlayAgain();
                }
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
