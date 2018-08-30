//import Word module
var Word = require("./Word");

//get references for all the npm packages installed
var inquirer = require("inquirer");
var Chalk = require("chalk");
var CFonts = require("cfonts");

//usinf cfonts, the game heading is styled and displayed on terminal
CFonts.say('HANGMAN', {
    font: 'block',                  // define the font face
    align: 'center',                // define text alignment
    colors: ['cyan','blueBright'],  // define all colors
    background: 'transparent',      // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,               // define letter spacing
    lineHeight: 1,                  // define the line height
    space: true,                    // define if the output text should have empty lines on top and on the bottom
    maxLength: 20,                  // define how many character can be on one line
});

//global variables

//totalGuesses keeps a count of number of incorrect guesses; 10 to begin with for each round
var totalGuesses;
//stores the object Word that has to be guessed
var wordToGuess;
//array to hold already guessed characters
var alreadyGuessedLetters;
//score
var score = 0;
//keep a track of question number/round number
var questionCount = 0;
//keeps track of which array is chosen to pick the random word from;cties or countries
var selectedArray;

console.log("==========================")
console.log("GUESS THE CITIES/COUNTRIES")
console.log("==========================\n")

//initializes the game by initializing all the required  values and starting the game
function initializeGame(){
    //cities array
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

    //countries array
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
            
    //10 incorrect guesses for each round
    totalGuesses = 10;
    //randomly select an array from cities and countries 
    //if cities is chosen
    if(Math.floor(Math.random()*2) === 0){
        //pick a random city from the array and create a Word object using constructor
        wordToGuess = new Word(cities[Math.floor(Math.random()*cities.length)]);
        selectedArray = 0;
    }
    //if countries is chosen
    else{
        //pick a random city from the array and create a Word object using constructor
        wordToGuess = new Word(countries[Math.floor(Math.random()*countries.length)]);
        selectedArray = 1;
    }

    //initialize alreadyGuessedLetters to empty array
    alreadyGuessedLetters =[];

    //if cities array was chosen
    if(selectedArray === 0)
        //print initial blanks "____"
        console.log(Chalk.bold("\nCity: "+wordToGuess.getWord()));
    //if countries array was chosen
    else
        //print initial blanks "____"
        console.log(Chalk.bold("\nCountry: "+wordToGuess.getWord()));

    //increment question number count
    questionCount++;

    //start the guessing game
    startGuessing();
}

//start the guessing game
function startGuessing(){

    //if the player still has guesses left
    if(totalGuesses>0){

        //prompt the player to guess a letter by pressing the key
        inquirer.prompt([{
            message:"Guess a letter",
            name:"guessedLetter",
            type:"input",
            validate: function(value) {
                //it has to be an alphabet which is not already guessed
                if(value.toLowerCase()!== value.toUpperCase() && value.length === 1 && alreadyGuessedLetters.indexOf(value.toLowerCase()) === -1) {
                    return true;
                }
                return false;
            }
        }]).then(function(response){

            //if the typed letter has not been guessed earlier
            if(alreadyGuessedLetters.indexOf(response.guessedLetter.toLowerCase()) === -1){

                //put the typed letter in the alreadyGuessedLetters array
                alreadyGuessedLetters.push(response.guessedLetter.toLowerCase());

                //grab the word displayed before calling the guessWord function
                var beforeGuessWord = wordToGuess.getWord();

                //call guessWord function, it sets the "guessed" key of letter object
                wordToGuess.guessWord(response.guessedLetter.toLowerCase());

                //if cities array was chosen
                if(selectedArray === 0)
                    //displays the guessed letter in the word if present
                    console.log(Chalk.bold("\nCity: "+wordToGuess.getWord()));
                //if countries array was chosen
                else
                    //displays the guessed letter in the word if present
                    console.log(Chalk.bold("\nCountry: "+wordToGuess.getWord()));

                //grab the word displayed after calling the guessWord function
                var afterGuessWord = wordToGuess.getWord();

                //shows the already guessed letters
                console.log("Already guessed letters: "+alreadyGuessedLetters.join(','));

                //if no change in the displayed word before and after guessing the typed in character;
                //means the guess was incorrect
                if(beforeGuessWord === afterGuessWord){

                    //shows the message on terminal
                    console.log(Chalk.red("Incorrect guess"));

                    //decrements the number of incorrect guesses left
                    totalGuesses--;

                    //if guesses left reaches 0; show message, correct answer and score
                    if(totalGuesses === 0){
                        console.log("===============================")
                        console.log(Chalk.black.bgRedBright.bold("No more chances left to guess!!"));
                        console.log("===============================")
                        console.log(Chalk.black.bgYellowBright.bold("Correct answer was: "+ wordToGuess.displayWord()));
                        console.log("===============================")
                        console.log(Chalk.black.bgCyanBright.bold("Your Score: "+ score+ "/"+ questionCount));
                        console.log("===============================")
                    }
                    //else just show the number of incorrect guesses left
                    else
                        console.log(Chalk.blue("Guesses left: ")+ Chalk.blue.bold(totalGuesses));
                }

                //if the displayed word still has any blank(s) "_" remaining;keep guessing the next letter
                if(wordToGuess.getWord().indexOf("_") !== -1)
                    startGuessing();
                //if no blank is remaining; means guessed correctly
                else{
                    //show message and score
                    console.log("============================")
                    console.log(Chalk.black.bgGreenBright.bold("You guessed the word right!!"));
                    console.log("============================")
                    score++;
                    console.log(Chalk.black.bgCyanBright.bold("Your Score: "+ score + "/"+ questionCount));
                    console.log("============================")

                    //ask user if they want to play again
                    askPlayAgain();
                }
            }
        });
    }
    //if the player has no more guesses left
    else{
        //ask user if they want to play again
        askPlayAgain();
    }
}

//call to initialize the game
initializeGame();

//function that prompts player to ask if they want to play again
function askPlayAgain(){
    inquirer.prompt([{
        message:"Play more?",
        name:"playAgain",
        type:"confirm",
        default:false
    }]).then(function(response){
        //if response is true, initialize a new round of game
        if(response.playAgain)
            initializeGame();
    });
}
