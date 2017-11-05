// init socketio
var socket = io();

//create a object for the remote
var remote = {};

//create a object to stock every remote DOM elements
remote.el = {}
remote.el.container = document.querySelector(".container");
remote.el.remote = remote.el.container.querySelector(".remote");
remote.el.play_options = remote.el.remote.querySelector(".playbar");
remote.el.toggle_play = remote.el.play_options.querySelector(".toggle-play");
remote.el.auto_mode = remote.el.play_options.querySelector(".autoMode");
remote.el.navigationTime = remote.el.remote.querySelector(".next-prev-bar");
remote.el.go_prev = remote.el.navigationTime.querySelector(".go-prev");
remote.el.go_next = remote.el.navigationTime.querySelector(".go-next");
remote.el.navigationPlaylist = remote.el.remote.querySelector(".change-video-bar");
remote.el.playlist_prev = remote.el.navigationPlaylist.querySelector(".step-backward");
remote.el.playlist_next = remote.el.navigationPlaylist.querySelector(".step-forward");
remote.el.sound_bar = remote.el.remote.querySelector(".sound-bar");
remote.el.sound_up = remote.el.sound_bar.querySelector(".sound-up");
remote.el.sound_down = remote.el.sound_bar.querySelector(".sound-down");
remote.el.mute_and_playlist = remote.el.remote.querySelector(".mute-playlist-bar");
remote.el.mute = remote.el.mute_and_playlist.querySelector(".mute");
remote.el.playlist = remote.el.mute_and_playlist.querySelector(".playlist");
remote.el.playlist_elements = remote.el.container.querySelector(".menu-playlist");
remote.el.playlist_el = remote.el.playlist_elements.querySelectorAll(".playlist-el");

// get the room who link desktop and the remote
function getUrlVars() {
   var vars = {};
   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
   vars[key] = value;
         });
   return vars;
 };
 var room=getUrlVars();
 // ask for a link with room as unique code
socket.emit("remoteRequest", room.id);
// the answer
socket.on("remoteAnswer", function(answer) {
    if(answer) {
        // say that the remote is ready
        socket.emit("remoteReady");
    }
    else {
        // say that is an error
        window.alert("Erreur, veuillez rafraichir le player et recommencer l'opération")
    }
})

// received all the player data
socket.on("database", function(playlistBase, indexPlaylist) {
    for (var u = 0; u < remote.el.playlist_el.length; u++) {
        // fill all the menu
        remote.el.playlist_el[u].querySelector(".playlist-el-pic").style.backgroundImage = "url(" + playlistBase[u].srcP + ")";
        remote.el.playlist_el[u].querySelector(".playlist-el-info p:first-of-type").innerText = playlistBase[u].name;
        remote.el.playlist_el[u].querySelector(".playlist-el-info p:last-of-type").innerText = playlistBase[u].info;
        remote.el.playlist_el[indexPlaylist].classList.add("active");
    }

    for (var u = 0; u < remote.el.playlist_el.length; u++) {
        // add a click event for each playlist element
        remote.el.playlist_el[u].addEventListener("click", function(e) {

            for (var o = 0; o < remote.el.playlist_el.length; o++) {
                // remove "active" css class to all element (.playlist-el) of .playlist
                remote.el.playlist_el[o].classList.remove("active")
            }

            // add "active" css class to the element who have fire the click event
            this.classList.add("active");

            // say to change the video with the video of the element who fired the click event
            socket.emit("changeVideo",this.getAttribute("index-tab"));

        })
    }
})
// player events
socket.on("videoPlay", function() {
    remote.el.remote.classList.add("isPlaying");
})
socket.on("videoPause", function() {
    remote.el.remote.classList.remove("isPlaying");
})
socket.on("autoModeStatus", function(status) {
    if(status) {
        remote.el.auto_mode.classList.add("active");
    }
    else {
        remote.el.auto_mode.classList.remove("active");
    }
})
socket.on("indexChange", function(indexPlaylist) {
    for (var o = 0; o < remote.el.playlist_el.length; o++) {
        // remove "active" css class to all element (.playlist-el) of .playlist
        remote.el.playlist_el[o].classList.remove("active")
    }
    // add "active" class to the current index element of .playlist
    remote.el.playlist_el[indexPlaylist].classList.add("active")
})

// if the player is disconnected
socket.on('disconnectP', function() {
    window.alert("Connexion perdue, veuillez rafraichir le player et reconnecter le remote");
})

// remote buttons click events

//toggle play pause
remote.el.toggle_play.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("togglePlay");
    remote.el.toggle_play.classList.add("clicked");
    setTimeout(function() {
        remote.el.toggle_play.classList.remove("clicked");
    },100)
})

// enable / disable automode
remote.el.auto_mode.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("autoMode");
})

// return 15s before
remote.el.go_prev.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("goTime","prev");
    remote.el.go_prev.classList.add("clicked");
    setTimeout(function() {
        remote.el.go_prev.classList.remove("clicked");
    },100)
})

// go 15s forward
remote.el.go_next.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("goTime", "next");
    remote.el.go_next.classList.add("clicked");
    setTimeout(function() {
        remote.el.go_next.classList.remove("clicked");
    },100)
})

// go previous video in the playlist
remote.el.playlist_prev.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("playlistUpdate","prev");
    remote.el.playlist_prev.classList.add("clicked");
    setTimeout(function() {
        remote.el.playlist_prev.classList.remove("clicked");
    },100)
})

// go next video in the playlist
remote.el.playlist_next.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("playlistUpdate","next");
    remote.el.playlist_next.classList.add("clicked");
    setTimeout(function() {
        remote.el.playlist_next.classList.remove("clicked");
    },100)
})

// increase sound level
remote.el.sound_up.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("soundUpdate","up");
    remote.el.sound_up.classList.add("clicked");
    setTimeout(function() {
        remote.el.sound_up.classList.remove("clicked");
    },100)
})

// decrease sound level
remote.el.sound_down.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("soundUpdate","down");
    remote.el.sound_down.classList.add("clicked");
    setTimeout(function() {
        remote.el.sound_down.classList.remove("clicked");
    },100)
})

// mute player
remote.el.mute.addEventListener("click", function(e) {
    e.preventDefault();
    socket.emit("mute");
})
