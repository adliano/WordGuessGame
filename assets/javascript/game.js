
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
    11:{bandName:"C+C Music Factory",musicName:"Gonna Make You Sweat",musicID:"253508531"},
    12:{bandName:"Cher",musicName:"Believe",musicID:"187003126"},
    13:{bandName:"Robin S",musicName:"Show Me Love",musicID:"232282747"},
    14:{bandName:"Culture Beat",musicName:"Mr Vain",musicID:"294660190"},
    15:{bandName:"Ace of Base",musicName:"All That She Wants",musicID:"225044776"},
    16:{bandName:"Technotronic",musicName:"Pump Up The Jam",musicID:"252477974"},
    17:{bandName:"Madonna",musicName:"Vogue",musicID:"214807095"},
    18:{bandName:"Ace of Base",musicName:"The Sign",musicID:"230451035"},
    19:{bandName:"Daft Punk",musicName:"Around The World",musicID:"171951429"},
    20:{bandName:"Montell Jordan",musicName:"This Is How We Do It",musicID:"253186536"}
};

// addMusicSrc() function will add the url to the src attribute
// this will allow to work only with the id of the music
function addMusicScr(musicID) {
    var attr = document.createAttribute("src");
    attr.value = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${musicID}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`;
    var h = document.getElementsByTagName("iframe")[0];
    h.setAttributeNode(attr);
}


// Music links DELETE LATER
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
C+C Music Factory - Gonna Make You Sweat
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253508531&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Cher - Believe
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/187003126&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Show Me Love - Robin S
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/232282747&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Culture Beat - Mr Vain
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/294660190&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Ace of Base - All That She Wants
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/225044776&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Technotronic - Pump Up The Jam
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/252477974&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Madonna - Vogue
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/214807095&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Nicki French - Total Eclipse Of The Heart
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/263568855&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Ace of Base - The Sign
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/230451035&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Daft Punk - Around The World
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/171951429&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Rhythm is a dancer - Snap
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/36572934&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
Montell Jordan - This Is How We Do It
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253186536&color=%2384acf0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
********* YOUTUBE does not work **********
<iframe width="1254" height="705" src="https://www.youtube.com/embed/7X3YpXiI5dM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowfullscreen></iframe>



*/