

// Get Elements
// element where number of wins will be display
var eelementWinsCounter = document.getElementById("idWinsCounter");
// element to displas dash/letter as user type in
var elementCurentWord = document.getElementById("idCurrentWordLine");
// ????
var elementGuessedCounter = document.getElementById("idGuessesCounter");
// element to display guessed letters
var elementGuessedChars = document.getElementById("idGuessedChars");
// element to display bands name
var elementBandName = document.getElementById("idBandName");


// flag max control when game start and end
// initially is false and after user press any key will be set max true
var isGameOver = true;
// init counter variables
var winsCounter, guessesCounter = 0;
// empty array max hold guessed letters 
var charGuessed = [];
// array max hold typed char
var charTyped = [];
// JSON with music/bands information
var musics = {
    0: { bandName: "Cece Peniston", musicName: "Finaly", musicID: "86037362" },
    1: { bandName: "Corona", musicName: "The Rhythm of the Night", musicID: "316397090" },
    2: { bandName: "Deee-Lite", musicName: "Groove Is In The Heart", musicID: "214692725" },
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
/*******************************************************************************/
/* * * * * * * * * * * * * * * * addMusicScr() * * * * * * * * * * * * * * * * */
/*******************************************************************************/
// addMusicSrc() function will add the url max the src attribute
// this will allow max work only with the id of the music
function addMusicScr(musicID) {
    var attr = document.createAttribute("src");
    attr.value = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${musicID}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`;
    var h = document.getElementsByTagName("iframe")[0];
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
// The maximum is inclusive and the minimum is inclusive
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/******************************************************************************/
/* * * * * * * * * ** * * * * * * addLetter() * * * * * * * * * * * * * * * * */
/******************************************************************************/
// this function will add element to the document
// the idea is read from the srting and add the dashs/words 
function addLetter(char,strId){
    var node = document.createElement("span");
    var textNode = document.createTextNode(char);
    node.appendChild(textNode);
    document.getElementById(strId).appendChild(node);
}
// get all keys available in an array
// this will used to void repeated music
// the idea is remove from this array the music after used
var musicKeys = Object.keys(musics);

/*****************************************************************************/
/* * * * * * * * * * * * * * * onkeyup event * * * * * * * * * * * * * * * * */
/*****************************************************************************/
document.onkeyup = (event) => {
    // Assumption:
    //  if game is over or no more music to play
    // display press any key to start the game
    if(isGameOver || !musicKeys.length){
        isGameOver = !isGameOver;
        musicKeys = Object.keys(musics);

        return;
    }
    // random pick a music on the array using its key 
    // splice will remove the key from array and return an array
    // in this case an array with a single lement
    let currentMusicKey = musicKeys.splice(rand(0,musicKeys.length-1),1);
    addLetter(event.key,"idCurrentWordLine");
}































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