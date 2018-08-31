# Word-Guess-Game-CLI

## About
This application is a node version of hangman game wherein user guesses letters underneath a hidden word. In this application, the words used are names of cities and countries. Both category and the word are chosen randomly. Goal is to guess the hidden word correctly. It also keeps a track of score, already guessed letters and number of incorrect guesses left.

## Application Preview
![Word-Guess-Game-CLI-correct](hangman-correct.gif)

![Word-Guess-Game-CLI-incorrect](hangman-incorrect.gif)

## Technologies used
1. Node.js
    * Constructors
    * Inquirer

## Commands it takes
On terminal, user is prompted to type in a letter that he wants to guess. That's all is required from the user.

## Node Packages used
1. inquirer
    * usage
    ```require("inquirer")```
    * inquirer package makes the application interactive. It lets the user input the parameter, choose from a list, or confirm with a 'y' or 'n' by showing an appropriate message on the screen.
    * For more information: [Inquirer](https://github.com/SBoudrias/Inquirer.js/)

2. cfonts
    * usage
    ```require("cfonts")```
    * This package lets us style the fonts on terminal. The title "HANGMAN" on terminal uses cfonts for a wondeful looking heading.
    * For more information : [cfonts](https://www.npmjs.com/package/cfonts)

3. chalk
    * usage
    ```require("chalk")```
    * This package lets us style the fonts on terminal. It gives options for changing color of the text, backgroundcolor of the text, make the text bold and many more functionalities.
    * For more information : [chalk](https://www.npmjs.com/package/chalk)


## Inquirer interaction
The application will keep running as long as 'y' is pressed as the response to the question "Play more?". Pressing any other key will stop the application execution. Inquirer also validates the input user types for "Guess a letter". It will only take an alphabet which has not been guessed already.

## Execution steps
1. Make sure node is installed on your machine. You can visit the website [Node Installation](http://blog.teamtreehouse.com/install-node-js-npm-mac) for instructions.
2. Download/Clone the respository.
3. Inside the folder Word-Guess-Game-CLI on terminal, type "npm install". This will take all dependencies from package.json and install all the required packages to run the application.
5. Once the packages are installed, in the same folder, type "node index.js" on terminal. This will start application execution.

## Code snippets
```
//constructor for each letter underneath the word
var Letter = function(char){

    //"char" key will store the actual character
    this.char = char;

    //"guessed" key will store whether the letter has been guessed or not
    this.guessed = false;

    //getLetter is a function that returns the actual character if the letter has been
    //guessed else it returns "_" blank
    this.getLetter = function(){
        if(this.guessed)
            return this.char;
        else
            return "_";
    };

    //guessLetter function changes the guessed key for if the argument matches the key char 
    this.guessLetter =  function(char){
        if(this.char === char)
            this.guessed = true;
    };

    //displayLetter function displays the char key
    this.displayLetter = function(char){
        return this.char;
    }
};
```
This is a constructor that takes a character as input and stores it in key "char". It also keeps track of whether a letter in the word has been guessed or not. If not, it returns a blank "_" else it returns the actual character.


```
var Word = function(strWord){

    //get all the characters from the word and create an array of a 
    //new Letter object for each character; return the array//
    this.getLetters = function(){
                            var letterArray=[];
                            for(var i =0;i<strWord.length;i++){
                                letterArray.push(new Letter(strWord[i]));
                            }
                            return letterArray;
                        };

    //"letters" key stores the array of Letter objects returned by getLetters()
    this.letters = this.getLetters();
    
    //getWord function calls getLetter function of Letter object for
    //each Letter object in the array stored in the key "letters"
    //keeps concatenating the returned value and returns the result
    this.getWord = function(){
                        var strWord = "";
                        for(var i =0;i<this.letters.length;i++){
                            strWord+=this.letters[i].getLetter();
                        }
                        return strWord;
                    };

    //guessWord function calls guessLetter function of Letter object for
    //each Letter object in the array stored in the key "letters"                
    this.guessWord = function(char){
                        for(var i =0;i<this.letters.length;i++)
                            this.letters[i].guessLetter(char);

                        };

    //displayWord function calls displayLetter function of Letter object for
    //each Letter object in the array stored in the key "letters"
    //keeps concatenating the returned value and returns the result
    this.displayWord = function(){
                            var strWord = "";
                            for(var i =0;i<this.letters.length;i++){
                                strWord+=this.letters[i].displayLetter();
                            }
                            return strWord;
                        };
};
```
Above is a constructor for word. Word object is inheriting the Letter object. It keeps an array of all the letters in the word in key "letters". It calls getLetter(), guessLetter() and displayLetter() for each letter object that builds the word.


```
 //prompt the player to guess a letter by pressing the key
        inquirer.prompt([{
            message:"Guess a letter",
            name:"guessedLetter",
            type:"input",
            validate: function(value) {
                //it has to be an alphabet which is not already guessed
                if(value.toLowerCase()!== value.toUpperCase() && value.length === 1 && alreadyGuessedLetters.indexOf(value) === -1) {
                    return true;
                }
                return false;
            }
        }]).then(function(response){
```
In the above code snippet, the user is prompted to type in a letter he wants to guess. We are validating the user input 1. It should be a single character, 2. It should be an alphabet; 3. It should not have been already guessed.


```
//grab the word displayed before calling the guessWord function
var beforeGuessWord = wordToGuess.getWord();

//call guessWord function, it sets the "guessed" key of letter object
wordToGuess.guessWord(response.guessedLetter.toLowerCase());

//grab the word displayed after calling the guessWord function
var afterGuessWord = wordToGuess.getWord();

//if no change in the displayed word before and after guessing the typed in character;
//means the guess was incorrect
if(beforeGuessWord === afterGuessWord){

//shows the message on terminal
console.log(Chalk.red("Incorrect guess"));

//decrements the number of incorrect guesses left
totalGuesses--;
```
Above code snippet shows how we check if the guessed character was incorrect guess. If it was incorrect, then decrement the incorrect guesses left and show a message.


```
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
```
Above, we checked if the displayed word still has any blanks or not. If not, that means the word was guessed correctly else just keep asking player to guess

## Learning points
1. Installing node packages
2. Using internal and external packages in applications
3. Usage of inquirer package
4. Using Constructors
5. Exporting and importing modules
6. Implementation of Module pattern and Inheritance

## Author 
* [Ajita Srivastava Github](https://github.com/ajitas)
* [Ajita Srivastava Portfolio](https://ajitas.github.io/Portfolio/)

## License
Standard MIT License


