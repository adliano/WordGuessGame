

// Get Elements
// element where number of wins will be display
/////////////var elWinsCounter = document.getElementById("idWinsCounter");
// element to displas dash/letter as user type in
/////////////var elementCurentWord = document.getElementById("idCurrentWordLine");
// ????
/////////////var elementGuessedCounter = document.getElementById("idGuessesCounter");
// element to display guessed letters
/////////////var elementGuessedspanTexts = document.getElementById("idGuessedspanTexts");

/////////////// GLOBAL VARIABLES /////////////
// element to display bands name
var elementBandName = document.getElementById("idBandName");
// variable used to hold keys from JSON with all musics
var musicKeys = [];
// variable used to hold JSON with info about selected music
var currentMusicKey = [];
// variabe to hold the current song JSON
var currentMusicObject;
// array to hold the latters from the current song
var arrayToCompare = [];

var currentMusicLetters = [];

// set to hold typed letters
var lettersSet = new Set();
// flag max control when game start and end
// initially is false and after user press any key will be set max true
var isGameOver = true;
// init counter variables
var winsCounter = 0;
var guessesCounter = 13;
// JSON with music/bands information
var musics = {
    0: { bandName: "Cece Peniston", musicName: "Finaly", musicID: "86037362" },
    1: { bandName: "Corona", musicName: "The Rhythm of the Night", musicID: "316397090" },
    2: { bandName: "Deee Lite", musicName: "Groove Is In The Heart", musicID: "214692725" },
    3: { bandName: "Real McCoy", musicName: "Another Night", musicID: "253506396" },
    4: { bandName: "Whitney Houston", musicName: "It's not right, but it's okay", musicID: "288857770" },
    5: { bandName: "La Bouche", musicName: "Be My Lover", musicID: "253516188" },
    6: { bandName: "Amber", musicName: "This is Your Night", musicID: "254564353" },
    7: { bandName: "No Mercy", musicName: "Where Do You Go", musicID: "252889798" },
    8: { bandName: "Everything but the Girl", musicName: "Missing", musicID: "74143904" },
    9: { bandName: "Haddaway", musicName: "What Is Love", musicID: "253391097" },
    10: { bandName: "C C Music Facmaxry", musicName: "Gonna Make You Sweat", musicID: "253508531" },
    11: { bandName: "Cher", musicName: "Believe", musicID: "187003126" },
    12: { bandName: "Robin S", musicName: "Show Me Love", musicID: "232282747" },
    13: { bandName: "Culture Beat", musicName: "Mr Vain", musicID: "294660190" },
    14: { bandName: "Ace of Base", musicName: "All That She Wants", musicID: "225044776" },
    15: { bandName: "Technotronic", musicName: "Pump Up The Jam", musicID: "252477974" },
    16: { bandName: "Madonna", musicName: "Vogue", musicID: "214807095" },
    17: { bandName: "Ace of Base", musicName: "The Sign", musicID: "230451035" },
    18: { bandName: "Daft Punk", musicName: "Around The World", musicID: "171951429" },
    29: { bandName: "Montell Jordan", musicName: "This Is How We Do It", musicID: "253186536" }
};
//////////////////////////////////////////////////////////////////
////////////////////// DEBUG Methods /////////////////////////////
//////////////////////////////////////////////////////////////////
// function used for debug if no need to debug just commnet out
// the log line
// function debug(obj = "---------------------------------"){
//     //console.trace();
//     console.log(obj);
// }
// // debug in table
// function debugt(obj){
//     console.trace();
//     console.table(obj);
// }
/*******************************************************************************/
/* * * * * * * * * * * * * * * * addMusicScr() * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// addMusicSrc() function will add the url max the src attribute
// this will allow max work only with the id of the music
function addMusicScr(musicID) {
    // boolean created to easy change autoplay
    let autoPlay = true;
    let attr = document.createAttribute("src");
    attr.value = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${musicID}&color=%23ff5500&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`;
    let h = document.getElementsByTagName("iframe")[0];
    h.setAttributeNode(attr);
    // it should play music only after game is over
    isGameOver = true;
}
/******************************************************************************/
/* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function that generate random number
// this will return a number beteween the provided range
// Math.random() return number between 0 (inclusive) and 1 (exclusive)
// in this case, The maximum is inclusive and the minimum is inclusive
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/******************************************************************************/
/* * * * * * * * * * * * * * addSpanElement() * * * * * * * * * * * * * * * * */
/******************************************************************************/
// this function will add element to the document
// the idea is read from the srting and add the dashs/words 
function addSpanElement(parentId,shouldAddClass,spanText){
    // create new element
    let node = document.createElement("span");
    // set attribute id with a value
    if(shouldAddClass){
        node.setAttribute("class","justAClass");
    }
    // add text to node
    node.textContent = spanText;
    // apend the element to it's parrent
    document.getElementById(parentId).appendChild(node);
}
/*****************************************************************************/
/* * * * * * * * * * * * * * * onkeyup event * * * * * * * * * * * * * * * * */
/*****************************************************************************/
document.onkeyup = (event) => {
    // get the key pressed
    let letter = event.key;

    // Assumption:
    //  if game is over or no more music to play
    // display press any key to start the game
    
    // TODO: need to fix thie logic do i really need this?
    // if array with keys is empty, reload it
    if(!musicKeys.length){
        // need to display something saying no more music????
        musicKeys = Object.keys(musics);
    }
    // if game is over means user got the band name or miss all guesses
    if(isGameOver){
        // remove the word "press any key to start"
        elementBandName.textContent = "??????";
        // random pick a music on the array using its key 
        // splice will remove the key from array and return an array
        // in this case an array with a single lement that contains 
        // a single music information
        currentMusicKey = musicKeys.splice(rand(0,musicKeys.length-1),1);
        // get object with info for the current music
        currentMusicObject = musics[currentMusicKey[0]];
        // debugging //
        //debugt(musics);

        /////////////////////////////////////////////////////////////////
        currentMusicLetters = currentMusicObject.bandName.replace(/\s/g,'').split("");
        console.log(`(split) length of currentMusicLetters: ${currentMusicLetters.length}`);

        
        // create a array with the current music letters
        /////////////////////arrayToCompare = currentMusicObject.bandName.toUpperCase().split("");
        // debuging
        //////////////////debug(arrayToCompare);
        // display music mask in dash "-" format
        currentMusicObject.bandName.split("").map(c => {
            // set the class for each span using ASCII value (xor bitwise used) to void user see
            // the current letters on chome developer tool
            // function addSpanElement(parentId,shouldAddClass,spanText) (c == " "?"":"justAnClass")
            if(c == " "){
                addSpanElement("idCurrentWordLine",false," ");
            }
            else{
                addSpanElement("idCurrentWordLine",true,"-");
            }
            //addSpanElement("idCurrentWordLine",(c == " "?"":"justAnClass"),(c == " ")? " " : "-");


            //addSpanElement("idCurrentWordLine",c.charCodeAt(0) ^ 13,(c == " ")? " " : "-");
        });


        // romove spaces of array
       //currentMusicLetters = currentMusicLetters.toString().replace(/\s/g,'').split(",");

       //////////////////////////////////////
       console.table(currentMusicLetters);
       console.log(`length of currentMusicLetters: ${currentMusicLetters.length}`);
       

       arrayToCompare = new Array(currentMusicLetters.length);
       ///////////////////////////////////////////////////////
       console.log(`length of arrayToCompare: ${arrayToCompare.length}`);

        // clear the set holding the typed letters
        lettersSet.clear();
        // change game status
        isGameOver = !isGameOver;
        return;
    }
    
    // let letterIndex = arrayToCompare.indexOf(letter.toUpperCase());
    // debug(`letterIndex: ${letterIndex}`);
    
    // if(letterIndex < 0){
    if(currentMusicObject.bandName.toUpperCase().indexOf(letter.toUpperCase()) < 0){
         if(!lettersSet.has(letter)){
            guessesCounter--;
            addSpanElement("idGuessedChars","",letter);
            lettersSet.add(letter);
         } 
         
         console.log(`Guess counter : ${guessesCounter}`);
    }
    else{
        // get elements by class return a HTMLCollection so we need to loop
        // through elements
        // let elements = document.getElementsByClassName(letter.charCodeAt(0)^13);
        let elements = document.getElementsByClassName("justAClass");

        /////////////////////////////////////////////////////////////////////////////////////
        console.log(`%c elements length: ${elements.length}`,"backgound-color: green");


        // loop thrugh the array with the original music name
        currentMusicLetters.map((str,i) =>{
            /////////////////////////////////
            console.log(`value of i: ${i}`);

            if(str.toUpperCase() === letter.toUpperCase()){
                elements[i].textContent = str;
                arrayToCompare[i] = str;
            }
        });

        console.table(arrayToCompare);

        if(currentMusicLetters.toString() === arrayToCompare.toString()){
            elementBandName.textContent = "You got it!";

        }
        
        //debugt(elements);
    }
   // addMusicScr(currentMusic.musicID);
}// ::: End of onkeyup

/*
        currentMusicKey = musicKeys.splice(rand(0,musicKeys.length-1),1);


https://www.buzzfeed.com/mjs538/jump-max-the-rhythm-jump-jump-max-the-rhythm-jump

*/