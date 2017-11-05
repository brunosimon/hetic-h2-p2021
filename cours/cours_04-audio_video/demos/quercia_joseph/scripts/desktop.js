// json databse for add/remove/change content dynamically
var playlistBase = [{
    'name': 'Interstellar',
    'info': 'Docking scene',
    'srcV': 'videos/interstellar.mp4',
    'srcP': "videos/posters/interstellar.jpeg",
    'time': "0"
}, {
    'name': 'Jurassic Park',
    'info': 'Welcome to Jurassic Park',
    'srcV': 'videos/jurassicPark.mp4',
    'srcP': "videos/posters/jurassicPark.jpeg",
    'time': "0"
}, {
    'name': 'Sense8',
    'info': 'Wolfgang vs. the Gang',
    'srcV': 'videos/sense8.mp4',
    'srcP': "videos/posters/sense8.jpeg",
    'time': "0"
}, {
    'name': 'Doctor Who',
    'info': 'Run, run clever boy !',
    'srcV': 'videos/doctorWho.mp4',
    'srcP': "videos/posters/doctorWho.jpeg",
    'time': "0"
}]





function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 5;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}





// create player object
var player = {}

//create object to collect of the DOM nodes we needed
player.el = {}
player.el.container = document.querySelector(".player");
player.el.video = player.el.container.querySelector("video");
player.el.data = player.el.container.querySelector(".player-data")
player.el.player_bar = player.el.container.querySelector(".player-bar");
player.el.controls = player.el.container.querySelector(".controls");
player.el.controls_plus = player.el.container.querySelector(".controls-plus");
player.el.controls_top = player.el.container.querySelector(".controls-top");
player.el.playlist_btn = player.el.controls_top.querySelector(".playlist");
player.el.autoMode_btn = player.el.controls_top.querySelector(".autoMode");
player.el.remote_btn = player.el.controls_top.querySelector(".remote");
player.el.playlist_elements = player.el.container.querySelector(".menu-playlist");
player.el.remote_menu = player.el.container.querySelector(".menu-remote");
player.el.playlist_el = player.el.playlist_elements.querySelectorAll(".playlist-el");
player.el.toggle_play = player.el.controls.querySelector(".toggle-play");
player.el.back_btn = player.el.controls.querySelector(".go-prev");
player.el.next_btn = player.el.controls.querySelector(".go-next");
player.el.seek_bar = player.el.container.querySelector(".seek-bar");
player.el.seek_bar_full = player.el.seek_bar.querySelector(".seek-bar-full");
player.el.seek_bar_progress = player.el.seek_bar.querySelector(".seek-bar-progress");
player.el.seek_bar_tumbmail = player.el.seek_bar.querySelector(".thumbmail");
player.el.thumbmail_screen = player.el.seek_bar_tumbmail.querySelector(".thumbmail-video");
player.el.thumbmail_time = player.el.seek_bar_tumbmail.querySelector(".thumbmail-video-time-content span");
player.el.sound_bar = player.el.container.querySelector(".sound-bar");
player.el.sound_btn = player.el.controls_plus.querySelector(".sound .contain-icons");
player.el.sound_bar_full = player.el.controls_plus.querySelector(".sound-bar-full");
player.el.sound_bar_progress = player.el.sound_bar_full.querySelector(".sound-bar-progress");
player.el.fullscreen_btn = player.el.controls_plus.querySelector(".fullscreen");

// create a object who keep some data on the player status
player.status = {}
player.status.nb_vol = 1;
player.status.indexPlaylist = 0;
player.status.isAuto = true;

// init socketio for remote function
var socket = io();
var local_ip;
var room;
socket.emit("roomRequest", room);
socket.on("roomAnswer", function(answer) {
    if (answer) {
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
        var pc = new RTCPeerConnection({
                iceServers: []
            }),
            noop = function() {}
        pc.createDataChannel(""); //create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
        pc.onicecandidate = function(ice) { //listen for candidate events
            if (!ice || !ice.candidate || !ice.candidate.candidate) return;
            local_ip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            new QRCode("qrcode", {
                text: "http://" + local_ip + ":8080/remote.html?id=" + room,
                colorDark: "white",
                colorLight: "#2ecc71"
            });


            pc.onicecandidate = noop;
        };
    } else {
        room = randomString();
        socket.emit("roomRequest", room);
    }
})

//help to check double click instead of simple click
var isDbclick = 0;
var timeout;

// init the player
for (var u = 0; u < player.el.playlist_el.length; u++) {
    player.el.playlist_el[u].querySelector(".playlist-el-pic").style.backgroundImage = "url(" + playlistBase[u].srcP + ")";
    player.el.playlist_el[u].querySelector(".playlist-el-info p:first-of-type").innerText = playlistBase[u].name;
    player.el.playlist_el[u].querySelector(".playlist-el-info p:last-of-type").innerText = playlistBase[u].info;
}
player.el.data.querySelector("h1").innerText = playlistBase[player.status.indexPlaylist].name;
player.el.data.querySelector("p").innerText = playlistBase[player.status.indexPlaylist].info;
player.el.toggle_play.addEventListener("click", function(e) {
    e.preventDefault();
    play_pause();
})

// hide controls and data if mouse dont mouse
var focusPlayer = setTimeout(function() {
    focus();
}, 4000);

//show controls and data if mouse move
document.addEventListener("mousemove", function() {
    noFocus();
});


// all keycodes and calling their respective functions
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
        play_pause();
    } else if (e.keyCode == 39) {
        //check if this is a double tap
        isDbclick++
        //if is a single tap
        if (isDbclick == 1) {
            timeout = setTimeout(function() {
                    goTime("next");
                    isDbclick = 0;
                }, 400) // time before consider that is a single tap
        }
        // double tap catch event
        else {
            clearTimeout(timeout);
            changeVideo(parseInt(player.status.indexPlaylist) + 1, "arrows");
            isDbclick = 0;
        }
    } else if (e.keyCode == 37) {
        //check if this is a double tap
        isDbclick++
        //if is a single tap
        if (isDbclick == 1) {
            timeout = setTimeout(function() {
                    goTime("prev");
                    isDbclick = 0;
                }, 400) // time before consider that is a single tap
        }
        // double tap catch event
        else {
            clearTimeout(timeout);
            changeVideo(parseInt(player.status.indexPlaylist) - 1, "arrows");
            isDbclick = 0;
        }
    } else if (e.keyCode == 70) {
        fullscreen();
    } else if (e.keyCode == 77) {
        mute();
    } else if (e.keyCode == 27) {
        // dont work, it seems that the browser function go ahead
        exit_fullscreen();
    } else if (e.keyCode == 38) {
        soundUpdate("up")
    } else if (e.keyCode == 40) {
        soundUpdate("down")
    }


})


// all click events and calling their respectives functions
player.el.video.addEventListener("click", function(e) {
    //check if this is a double click
    isDbclick++
    //if is a single click
    if (isDbclick == 1) {
        timeout = setTimeout(function() {
                play_pause();
                isDbclick = 0;
            }, 400) // time before consider that is a single click
    }
    // double click catch event
    else {
        clearTimeout(timeout);
        fullscreen();
        isDbclick = 0;
    }
})
player.el.sound_btn.addEventListener("click", function(e) {
    mute();
})

player.el.back_btn.addEventListener("click", function(e) {
    //check if this is a double click
    isDbclick++
    //if is a single click
    if (isDbclick == 1) {
        timeout = setTimeout(function() {
                goTime("prev");
                isDbclick = 0;
            }, 400) // time before consider that is a single click
    }
    // double click catch event
    else {
        clearTimeout(timeout);
        changeVideo(parseInt(player.status.indexPlaylist) - 1, "arrows");
        isDbclick = 0;
    }

})

player.el.next_btn.addEventListener("click", function(e) {
    //check if this is a double click
    isDbclick++
    //if is a single click
    if (isDbclick == 1) {
        timeout = setTimeout(function() {
                goTime("next");
                isDbclick = 0;
            }, 400) // time before consider that is a single click
    }
    // double click catch event
    else {
        clearTimeout(timeout);
        changeVideo(parseInt(player.status.indexPlaylist) + 1, "arrows");
        isDbclick = 0;
    }
})

player.el.fullscreen_btn.addEventListener("click", function(e) {
    fullscreen();
})
player.el.autoMode_btn.addEventListener("click", function(e) {
    // activate or desactive autoplay of the playlist
    autoModeToggle()
})

// open menu playlist
player.el.playlist_btn.addEventListener("click", function(e) {
    if (player.el.container.classList.contains("menu-open-remote")) {
        player.el.container.classList.remove("menu-open-remote");
        setTimeout(function() {
            if (!player.el.container.classList.contains("menu-open-playlist")) {
                player.el.container.classList.add("menu-open-playlist");
            } else {
                player.el.container.classList.remove("menu-open-playlist");
            }
        }, 700)
    } else if (!player.el.container.classList.contains("menu-open-playlist")) {
        player.el.container.classList.add("menu-open-playlist");
    } else {
        player.el.container.classList.remove("menu-open-playlist");
    }
})
player.el.remote_btn.addEventListener("click", function(e) {
    if (player.el.container.classList.contains("menu-open-playlist")) {
        player.el.container.classList.remove("menu-open-playlist");
        setTimeout(function() {
            if (!player.el.container.classList.contains("menu-open-remote")) {
                player.el.container.classList.add("menu-open-remote");
            } else {
                player.el.container.classList.remove("menu-open-remote");
            }
        }, 700)
    } else if (!player.el.container.classList.contains("menu-open-remote")) {
        player.el.container.classList.add("menu-open-remote");
    } else {
        player.el.container.classList.remove("menu-open-remote");
    }
})

// add click event to all element (.playlist-el) of .playlist
for (var u = 0; u < player.el.playlist_el.length; u++) {
    player.el.playlist_el[u].addEventListener("click", function(e) {

        for (var o = 0; o < player.el.playlist_el.length; o++) {
            // remove "active" css class to all element (.playlist-el) of .playlist
            player.el.playlist_el[o].classList.remove("active")
        }

        // add "active" css class to the element who have fire the click event
        this.classList.add("active");

        // change the video with the video of the element who fired the click event
        changeVideo(parseInt(this.getAttribute("index-tab")), "manual");
    })
}



player.el.seek_bar.addEventListener("click", function(e) {
    // change offset with the open menu
    var with_menu_calc = 0;
    if (!player.el.container.classList.contains("isFullscreen") && player.el.container.classList.contains("menu-open-playlist")) {
        with_menu_calc = 200;
    }

    event.preventDefault();
    // get the different offset of the player seeking bar
    var seek_bar_width = player.el.seek_bar.offsetWidth,
        seek_bar_left = player.el.seek_bar.offsetLeft,
        // get the position of the client mouse
        mouse_x = e.clientX,
        // get the ratio with all the informations
        ratio = (mouse_x - seek_bar_left - player.el.container.offsetLeft + with_menu_calc) / seek_bar_width,
        // get the time with the duration of the video
        time = ratio * player.el.video.duration;
    // set the time to player and to the seek bar
    player.el.video.currentTime = time;
    player.el.seek_bar_progress.style.transform = 'scaleX(' + ratio + ')';

})
player.el.seek_bar.addEventListener("mousemove", function(e) {
    // change offset with the open menu
    var with_menu_calc = 0;
    if (!player.el.container.classList.contains("isFullscreen") && player.el.container.classList.contains("menu-open-playlist")) {
        with_menu_calc = 200;
    }
    event.preventDefault();
    // get the different offset of the player seeking bar
    var seek_bar_width = player.el.seek_bar.offsetWidth,
        seek_bar_left = player.el.seek_bar.offsetLeft,
        // get the position of the client mouse
        mouse_x = e.clientX,
        // get the ratio with all the informations
        ratio = (mouse_x - seek_bar_left - player.el.container.offsetLeft + with_menu_calc) / seek_bar_width,
        time,
        time_show;
    // avoid calculs when the mouse is appart from seekbar
    if (ratio >= 0 && ratio <= 1) {
        // set the time to player, to the seek bar and thumbmail
        player.el.seek_bar_tumbmail.style.left = ratio * 99 + "%";
        time = ratio * player.el.thumbmail_screen.duration;
        player.el.thumbmail_screen.currentTime = time;
        if ((Math.round(time) - Math.floor(Math.round(time) / 60) * 60 + "").length <= 1) {
            // transform 1:1, 2:4 in 1/01, 2:04
            time_show = Math.floor(Math.round(time) / 60) + ":0" + (Math.round(time) - Math.floor(Math.round(time) / 60) * 60);
        } else {
            time_show = Math.floor(Math.round(time) / 60) + ":" + (Math.round(time) - Math.floor(Math.round(time) / 60) * 60);
        }
        // display time
        player.el.thumbmail_time.innerText = time_show;
    }


})
player.el.sound_bar_full.addEventListener("click", function(e) {
    // change offset with the open menu
    var with_menu_calc = 0;
    if (player.el.container.classList.contains("menu-open-playlist")) {
        with_menu_calc = 200;
    }
    e.preventDefault();
    // get the different offset of the  sound bar
    var sound_bar_width = player.el.sound_bar.offsetWidth,
        sound_bar_left = player.el.controls_plus.offsetLeft,
        // position of the client mouse
        mouse_x = e.clientX,
        // get the ratio with all the informations
        ratio = ((mouse_x - sound_bar_left - player.el.container.offsetLeft - 20 + with_menu_calc) / sound_bar_width) * 10;
    // for get a sequence ratio in 0,1 interval
    ratio = Math.round(ratio) / 10;
    // set the ratio to volume
    player.el.video.volume = ratio;
    // save the volume in the player status object
    player.status.nb_vol = ratio;
    // set the ratio to the sound bar
    player.el.sound_bar_progress.style.transform = 'scaleX(' + ratio + ')';

})

// remote event
socket.on("remoteReady", function() {
    // when remote is ready to control
    player.el.remote_menu.querySelector(".connectionStatut").classList.add("connected");
    player.el.remote_menu.querySelector(".connectionStatut").innerText = "Connecté";
    setTimeout(function() {
        player.el.container.classList.remove("menu-open-remote");
    }, 1500)
    // send all data to remote
    socket.emit("database", playlistBase, player.status.indexPlaylist);

})
// listen remote controls
socket.on("togglePlay", function() {
    play_pause();
})

socket.on("autoMode", function() {
    autoModeToggle()
})

socket.on("goTime", function(direction) {
    goTime(direction);
    noFocus();
})

socket.on("playlistUpdate", function(direction) {
    if (direction == "prev") {
        changeVideo(parseInt(player.status.indexPlaylist) - 1, "arrows");
    } else if (direction == "next") {
        changeVideo(parseInt(player.status.indexPlaylist) + 1, "arrows");
    }
})

socket.on("soundUpdate", function(direction) {
    soundUpdate(direction);
    noFocus();
})

socket.on("mute", function() {
    mute();
})

socket.on("changeVideo", function(index, mode) {
    changeVideo(parseInt(index), "auto");
})

// when the remote is disconnected
socket.on("disconnectR", function() {
    player.el.remote_menu.querySelector(".connectionStatut").classList.remove("connected");
    player.el.remote_menu.querySelector(".connectionStatut").innerText = "Deconnecté, essayez de rafraichir la page remote";
})

// when volume change
player.el.video.addEventListener("volumechange", function() {
    if (player.el.video.volume == 0) {
        // if volume = 0 set muted class
        player.el.container.classList.add("isMuted");

    } else {
        player.el.container.classList.remove("isMuted");
    }
})

//actualisation
window.setInterval(function() {
    var duration = player.el.video.duration,
        time = player.el.video.currentTime,
        ratio = (time / duration);
    // advancing seeking bar
    player.el.seek_bar_progress.style.transform = 'scaleX(' + ratio + ')';
    if (ratio == 1 && player.status.isAuto) {
        // if atomode is enable and the video is finish, go to the next video
        changeVideo(parseInt(player.status.indexPlaylist) + 1, "auto")

    } else if (ratio == 1 && !player.status.isAuto) {
        // if autonomode is disable, remove isPlaying class, reboot the video and save the reboot
        noFocus();
        player.el.container.classList.remove("isPlaying");
        player.el.video.currentTime = 0;
    }
}, 50);



// FUNCTIONS
// when mouse move in player
function focus() {
    player.el.container.classList.add("isFocus");
}

// when mouse dont move in player
function noFocus() {
    player.el.container.classList.remove("isFocus");
    clearTimeout(focusPlayer);
    focusPlayer = setTimeout(function() {
        focus();
    }, 4000)
}

// toggle play/pause
function play_pause() {
    if (player.el.video.paused) {
        player.el.video.play();
        player.el.container.classList.add("isPlaying");
        socket.emit("videoPlay");
    } else {
        player.el.video.pause();
        player.el.container.classList.remove("isPlaying");
        socket.emit("videoPause");
    }
}

var showBar; // init for the timeout

function soundUpdate(direction) {
    clearTimeout(showBar)
    if (direction == "up" && player.el.video.volume * 10 < 10) {
        player.el.video.volume = ((player.el.video.volume * 10) + 1) / 10
    } else if (direction == "down" && player.el.video.volume * 10 > 0) {
        player.el.video.volume = ((player.el.video.volume * 10) - 1) / 10
    }
    player.status.nb_vol = player.el.video.volume;
    player.el.sound_bar.classList.add("focus");
    player.el.sound_bar_progress.style.transform = 'scaleX(' + player.el.video.volume + ')';
    showBar = setTimeout(function() {
        player.el.sound_bar.classList.remove("focus");
    }, 4000)
}

// mute player
function mute() {
    if (!player.status.isMuted) {
        player.status.isMuted = true;
        player.el.container.classList.add("isMuted");
        player.el.video.volume = 0;
        player.el.sound_bar_progress.style.transform = 'scaleX(' + 0 + ')';
    } else {
        player.status.isMuted = false;
        player.el.container.classList.remove("isMuted");
        // return to the volume before mute
        player.el.video.volume = player.status.nb_vol;
        player.el.sound_bar_progress.style.transform = 'scaleX(' + player.status.nb_vol + ')';
    }
}

// go foward of backward in time
function goTime(direction) {
    if (direction == "prev") {
        player.el.video.currentTime = player.el.video.currentTime - 15
    } else if (direction == "next") {
        player.el.video.currentTime = player.el.video.currentTime + 15
    }
    noFocus();
}

function autoModeToggle() {
    if (player.status.isAuto == true) {
        player.status.isAuto = false;
        player.el.autoMode_btn.classList.remove("active");
    } else {
        player.status.isAuto = true;
        player.el.autoMode_btn.classList.add("active");
    }
    socket.emit("autoModeStatus", player.status.isAuto);
}

function fullscreen() {
    if (!player.status.isFullscreen) {
        player.status.isFullscreen = true;
        player.el.container.webkitRequestFullScreen();

    } else {
        player.status.isFullscreen = false;
        document.webkitExitFullscreen();
    }
}

// try to make echap functionnal
function exit_fullscreen() {
    player.status.isFullscreen = false;
    document.webkitExitFullscreen();
    player.el.container.classList.remove("isFullscreen");
}


player.el.container.addEventListener("webkitfullscreenchange", function() {
    if (!player.status.isFullscreen) {
        player.el.container.classList.remove("isFullscreen");
    } else {
        player.el.container.classList.add("isFullscreen");
    }
})


// change the video of the player
function changeVideo(index, mode) {
    // BEFORE CHNAGE
    // if the video is finish reboot time in json base
    if (player.el.video.currentTime == player.el.video.duration) {
        playlistBase[player.status.indexPlaylist].time = 0;
    } else {
        // set the time of the video to is element in json base
        playlistBase[parseInt(player.status.indexPlaylist)].time = player.el.video.currentTime;
    }
    // set index 0 on playlist limits
    if (index >= player.el.playlist_el.length || index < 0) {
        index = 0;
    }

    // ANIMATIONS
    if (mode == "auto" || mode == "arrows") {
        player.el.container.classList.add("menu-open-playlist");
        setTimeout(function() {
            for (var o = 0; o < player.el.playlist_el.length; o++) {
                // remove active class to all playlist element
                player.el.playlist_el[o].classList.remove("active")
            }
            // add active class to the index element
            player.el.playlist_el[index].classList.add("active");
        }, 1000)
        setTimeout(function() {
                // close the menu and launch the video
                player.el.container.classList.remove("menu-open-playlist");
                play_pause();
            }, 2000)
            // display controls for UX
        noFocus();
    }

    //CHANGES
    // update the indexPlaylist
    player.status.indexPlaylist = index;
    socket.emit("indexChange", player.status.indexPlaylist);
    // set the the new src
    player.el.video.setAttribute("src", playlistBase[index].srcV);
    // set the time, recover time if the video was already open
    player.el.video.currentTime = playlistBase[index].time;
    // set the video to the thumbmail
    player.el.thumbmail_screen.setAttribute("src", playlistBase[index].srcV);

    if (mode == "manual") {
        // launch video
        play_pause();
    }

    // update data
    player.el.data.querySelector("h1").innerText = playlistBase[index].name;
    player.el.data.querySelector("p").innerText = playlistBase[index].info;
}
