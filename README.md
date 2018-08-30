# Word-Guess-Game-CLI

## About
This application is a node version of hangman game wherein user guesses letters underneath a hidden word. In this application, the words used are names of cities and countries. Goal is to guess the hidden word correctly. It also keeps a track of score, already guessed letters and number of incorrect guesses left.

## Application Preview
![Word-Guess-Game-CLI-correct](hangman-correct.gif)
![Word-Guess-Game-CLI-incorrect](hangman-incorrect.gif)

## Technologies used
Node.js
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

## code snippets
```

```
## Learning points
1. Installing node packages
2. Using internal and external packages in applications
3. Usage of inquirer package
4. Using Constructors
5. Implementation of Module pattern and Inheritance

## Author 
* [Ajita Srivastava Github](https://github.com/ajitas)
* [Ajita Srivastava Portfolio](https://ajitas.github.io/Portfolio/)

## License
Standard MIT License


