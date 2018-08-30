//importing the module Letter from Letter.js
var Letter = require("./Letter");

//constructor for the word 
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

//export module
module.exports = Word;