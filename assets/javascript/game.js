
// init counter variables
var winsCounter , guessesCounter = 0;
// empty array to hold guessed letters 
var charGuessed = [];
// array to hold typed char
var charTyped = [];
// JSON with music/bands information
var musics = {
    1:{bandName: "Cece Peniston",musicName:"Finaly",musicID:"86037362"},
    2:{bandName:"Corona",musicName:"The Rhythm of the Night",musicID:"316397090"},
    3:{bandName:"Deee-Lite",musicName:"Groove Is In The Heart",musicID:"214692725"},
    4:{bandName:"Real McCoy",musicName:"Another Night",musicID:"317193970"},
    5:{bandName:"Whitney Houston",musicName:"It's not right, but it's okay",musicID:"288857770"},
    6:{bandName:"La Bouche",musicName:"Be My Lover",musicID:"253516188"},
    7:{bandName:"Amber",musicName:"This is Your Night",musicID:"254564353"},
    8:{bandName:"No Mercy",musicName:"Where Do You Go",musicID:"252889798"},
    9:{bandName:"Everything but the Girl",musicName:"Missing",musicID:"74143904"},
    10:{bandName:"Haddaway",musicName:"What Is Love",musicID:"253391097"},
    11:{bandName:"",musicName:"",musicID:""},
    12:{bandName:"",musicName:"",musicID:""},
    13:{bandName:"",musicName:"",musicID:""},
    14:{bandName:"",musicName:"",musicID:""},
    15:{bandName:"",musicName:"",musicID:""},
    16:{bandName:"",musicName:"",musicID:""},
    17:{bandName:"",musicName:"",musicID:""},
    18:{bandName:"",musicName:"",musicID:""},
    19:{bandName:"",musicName:"",musicID:""},
    20:{bandName:"",musicName:"",musicID:""}
};

// addMusicSrc() function will add the url to the src attribute
// this will allow to work only with the id of the music
function addMusicScr(musicID) {
    var attr = document.createAttribute("src");
    attr.value = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${musicID}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`;
    var h = document.getElementsByTagName("iframe")[0];
    h.setAttributeNode(attr);
}


// DELETE LATER
/*
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/86037362&color=%23845056&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/214692725&color=%23845056&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/317193970&color=%23845056&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/288857770&color=%23845056&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253516188&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/254564353&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/252889798&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Everything but the Girl - Missing
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/74143904&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Haddaway - What Is Love
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253391097&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>




*/