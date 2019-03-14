

// Get Elements
// element where number of wins will be display
var eelementWinsCounter = document.getElementById("idWinsCounter");
// element to displas dash/letter as user type in
var elementCurentWord = document.getElementById("idCurrentWordLine");
// ????
var elementGuessedCounter = document.getElementById("idGuessesCounter");
// element to display guessed letters
var elementGuessedspanTexts = document.getElementById("idGuessedspanTexts");
// element to display bands name
var elementBandName = document.getElementById("idBandName");

// var musicKeys = Object.keys(musics);
// variable used to hold keys from JSON with all musics
var musicKeys = [];
// variable used to hold JSON with info about selected music
var currentMusicKey = [];
// variabe to hold the current song JSON
var currentMusicObject;
// array to hold the latters from the current song
var currentMusicChars = [];

// flag max control when game start and end
// initially is false and after user press any key will be set max true
var isGameOver = true;
// init counter variables
var winsCounter, guessesCounter = 0;
// empty array max hold guessed letters 
var spanTextGuessed = [];
// array max hold typed spanText
var spanTextTyped = [];
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
    10: { bandName: "C+C Music Facmaxry", musicName: "Gonna Make You Sweat", musicID: "253508531" },
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
////////////////////////////// DEBUG /////////////////////////////
//////////////////////////////////////////////////////////////////
// function used for debug if no need to debug just commnet out
// the log line
function debug(obj = "---------------------------------"){
    console.log(obj);
}
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
    // isGameOver = true;
}
/******************************************************************************/
/* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function that generate random number
// this will return a number beteween the provided range
// Math.random() return number between 0 (inclusive) and 1 (exclusive)
// The maximum is inclusive and the minimum is inclusive
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
function addSpanElement(parentId,spanId,spanText){
    // create new element
    let node = document.createElement("span");
    // set attribute id with a value
    node.setAttribute("class",spanId);
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
    
    // TODO: need to fix thie logic
    //  do i really need this?
    if(!musicKeys.length){
        // need to display something saying no more music????
        musicKeys = Object.keys(musics);
    }
    // if game is over means user got the banb name or miss all guesses
    if(isGameOver){
        // remove the word "press any key to start"
        elementBandName.textContent = "?";
        // random pick a music on the array using its key 
        // splice will remove the key from array and return an array
        // in this case an array with a single lement that contains 
        // a single music information
        currentMusicKey = musicKeys.splice(rand(0,musicKeys.length-1),1);
        // get object with info for the current music
        currentMusicObject = musics[currentMusicKey[0]];
        // create a array with the current misic letters
        currentMusicChars = currentMusicObject.bandName.split("");
        // debuging
        debug(currentMusicChars);
        // display music mask in dash "-" format
        currentMusicObject.bandName.split("").map(c => {
            // function addSpanElement(parentId,spanId,spanText)
            // set the class for each span using xor to void user see
            // the current letters on chome developer tool
            addSpanElement("idCurrentWordLine",c.charCodeAt(0) ^ 13,(c == " ")? " " : "-");
        });
        // change game status
        isGameOver = !isGameOver;
        return;
    }
    
    let spanTextIndex = currentMusicChars.indexOf(letter);
    debug(spanTextIndex);
    

    var test = document.getElementById("idCurrentWordLine").children;




    //////////////////////////////////////////////////////////////////////////
    if(spanTextIndex < 0){
         addSpanElement("idGuessedChars",letter,letter);
    }
    else{
        debug(letter.charCodeAt(0)^13);
        let elements = document.getElementsByClassName(letter.charCodeAt(0)^13);

        for(let i = 0; i < elements.length; i++){
            elements.item(i).textContent = letter;
        }
        
        //  span.textContent = letter;
       debug(elements);
         //test[spanTextIndex].textContent = letter;
    //     document.getElementById(currentMusicChars[spanTextIndex].charCodeAt(0)).textContent = letter;
    }
        

    // random pick a music on the array using its key 
    // splice will remove the key from array and return an array
    // in this case an array with a single lement
    // currentMusicKey = musicKeys.splice(rand(0,musicKeys.length-1),1);
    // currentMusic = musics[currentMusicKey[0]];

    //addSpanElement(event.key,"idCurrentWordLine");
   // addMusicScr(currentMusic.musicID);
}// ::: End of onkeyup































// Music links DELETE LATER
/*
https://www.buzzfeed.com/mjs538/jump-max-the-rhythm-jump-jump-max-the-rhythm-jump

<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/86037362&color=%23845056&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/214692725&color=%23845056&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/317193970&color=%23845056&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/288857770&color=%23845056&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253516188&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/254564353&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/252889798&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Everything but the Girl - Missing
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/74143904&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Haddaway - What Is Love
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253391097&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
C+C Music Facmaxry - Gonna Make You Sweat
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253508531&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Cher - Believe
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/187003126&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Show Me Love - Robin S
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/232282747&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Culture Beat - Mr Vain
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/294660190&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Ace of Base - All That She Wants
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/225044776&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Technotronic - Pump Up The Jam
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/252477974&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Madonna - Vogue
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/214807095&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Nicki French - maxtal Eclipse Of The Heart
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/263568855&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Ace of Base - The Sign
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/230451035&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Daft Punk - Around The World
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/171951429&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Rhythm is a dancer - Snap
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/36572934&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Montell Jordan - This Is How We Do It
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="aumaxplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253186536&color=%2384acf0&aumax_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253506396&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
********* YOUTUBE does not work **********
<iframe width="1254" height="705" src="https://www.youtube.com/embed/7X3YpXiI5dM" frameborder="0" allow="accelerometer; aumaxplay; encrypted-media; gyroscope;" allowfullscreen></iframe>



*/