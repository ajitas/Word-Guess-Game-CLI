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

//export the module
module.exports = Letter;