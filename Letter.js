var Letter = function(char){
    this.char = char;
    this.guessed = false;
    this.getLetter = function(){
        if(this.guessed)
            return this.char;
        else
            return "_";
    };
    this.guessLetter =  function(char){
        if(this.char === char)
            this.guessed = true;
    };
    this.displayLetter = function(char){
        return this.char;
    }
};

module.exports = Letter;