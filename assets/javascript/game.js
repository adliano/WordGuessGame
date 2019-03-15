/////////////// GLOBAL VARIABLES /////////////
// element to display bands name
var elementBandName = document.getElementById("idBandName");
// element to display reload msg
//var reloadMessage = document.getElementById("reloadGameMsg");
// variable used to hold keys from JSON with all musics
var musicKeys = [];
// variabe to hold the current song JSON
var musicObject;
// array used to compare selected letters
var arrayToCompare = [];
// array to hold the letters from the current song
var currentMusicLetters = [];
// set to hold typed letters (miss guessed letters)
var lettersSet = new Set();
// flag max control when game start and end
// initially is false and after user press any key will be set max true
var isGameOver = true;
// init counter winnings
var winsCounter = 0;
// counter to know how many guess left
var guessesCounter = 13;
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
// addMusicSrc() function will add the url to the src attribute
// this will allow work only with the id of the music
function addMusicScr(musicID) {
    // boolean created to easy change autoplay
    let autoPlay = true;
    let attr = document.createAttribute("src");
    attr.value = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${musicID}&color=%23ff5500&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`;
    let h = document.getElementsByTagName("iframe")[0];
    h.setAttributeNode(attr);
    // // it should play music only and game is over
    // isGameOver = true;
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
// this function will add element <span> to the DOM
// the idea is read from the srting and add the dashs/words using <span>
function addSpanElement(parentId, shouldAddClass, spanText) {
    // create new element
    let node = document.createElement("span");
    // set attribute id with a value
    if (shouldAddClass) {
        node.setAttribute("class", "justAClass");
    }
    // add text to node
    node.textContent = spanText;
    // apend the element to it's parrent
    document.getElementById(parentId).appendChild(node);
}
/***************************************************************************/
/* * * * * * * * * * * * * clearTextById() * * * * * * * * * * * * * * * * */
/***************************************************************************/
// function to remove the text when reload the game
function clearTextById(parrentID) {
    let parrent = document.getElementById(parrentID);
    parrent.innerHTML = "";
}
/***************************************************************************/
/* * * * * * * * * * * * * resetGamePlay() * * * * * * * * * * * * * * * * */
/***************************************************************************/
function resetGamePlay() {
    // clear the used <span> to reload a new ones
    clearTextById("idCurrentWordLine");
    clearTextById("idGuessedChars");
    clearTextById("idBandName");
    // remove the word "press any key to start"
    clearTextById("reloadGameMsg");

    guessesCounter = 13;
    
    document.getElementById("idGuessesCounter").textContent = guessesCounter;
    // Approach:
    // random pick a music on the array using its key 
    // splice will remove the key from array and return an array
    // in this case an array with a single lement that contains 
    // a single music information.
    // variable used to hold JSON with info about selected music
    let currentMusicKey = musicKeys.splice(rand(0, musicKeys.length - 1), 1);
    // get object with info for the current music
    musicObject = musics[currentMusicKey[0]];
    // add all letters to the array withot any space
    currentMusicLetters = musicObject.bandName.replace(/\s/g, '').split("");
    // display music mask in dash "-" format
    musicObject.bandName.split("").map(c => {
        if (c == " ") {
            // if music name have whitespace, than add a <span>
            // without a class and textContent space
            // latter we will get the array with the spans with the class
            // and we want void work with whitepaces
            addSpanElement("idCurrentWordLine", false, " ");
        } else {
            // else add a class and dash
            addSpanElement("idCurrentWordLine", true, "-");
        }
    });
    //////////////////////////////////////
    console.log(musicObject.bandName);
    //////////////////////////////////////
    // init the array with the same size of the one witch has the letters 
    // for the current band name.
    // This is important because we will use index to load this array latter
    arrayToCompare = new Array(currentMusicLetters.length);
    // clear the set holding the typed letters
    lettersSet.clear();
    // change game status
    isGameOver = !isGameOver;
    // get out of here
    return;
}
/*****************************************************************************/
/* * * * * * * * * * * * * * * onkeyup event * * * * * * * * * * * * * * * * */
/*****************************************************************************/
// Assumption:
//  if game is over or no more music to play
//  display, press any key to start the game
document.onkeyup = (event) => {
    // get the key pressed
    let letter = event.key;
    // if array with keys is empty, reload it
    // in case one day we load musics URL from server
    if (!musicKeys.length) {
        musicKeys = Object.keys(musics);
    }
    // if game is over means user got the band name or miss all guesses
    // so reset game will happen inside here
    if (isGameOver) {
        resetGamePlay();
    }
    // check if typed letter exist on band name 
    if (musicObject.bandName.toUpperCase().indexOf(letter.toUpperCase()) < 0) {
        // check if user typed new miss guessed letter
        if (!lettersSet.has(letter)) {
            // add the new miss guessed letter to display
            addSpanElement("idGuessedChars", "", letter);
            // add it to the guessed set
            lettersSet.add(letter);
            // update couter on display
            document.getElementById("idGuessesCounter").textContent = --guessesCounter;
        }
    } 
    else {
        // get elements by class return a HTMLCollection so we need to loop
        // through elements
        let elements = document.getElementsByClassName("justAClass");
        // loop thrugh the array with the original music name
        currentMusicLetters.map((str, i) => {
            if (str.toUpperCase() === letter.toUpperCase()) {
                // dispaly guessed letter
                elements[i].textContent = str;
                // add guessed letter to array
                arrayToCompare[i] = str;
            }
        });
    }
    // check if game is over
    if (currentMusicLetters.toString() === arrayToCompare.toString() || guessesCounter === 0) {
        elementBandName.textContent = `${musicObject.musicName} by ${musicObject.bandName}`;
        addMusicScr(musicObject.musicID);
        // check if user wins
        if (guessesCounter > 0) {
            document.getElementById("idWinsCounter").textContent = ++winsCounter;
        }
        document.getElementById("reloadGameMsg").textContent = " Press Any Key to Continue";
        isGameOver = true;
    }
} // ::: End of onkeyup

/*
https://www.buzzfeed.com/mjs538/jump-max-the-rhythm-jump-jump-max-the-rhythm-jump
*/