var player = {};

// Object
player.el                    = {};
player.el.container          = document.querySelector('.player');
player.el.video              = player.el.container.querySelector('video');
player.el.controls           = player.el.container.querySelector('.controls');

// timer
player.el.timer              = player.el.controls.querySelector('.timer');
player.el.time_total         = player.el.timer.querySelector('.time-total');
player.el.time_progress      = player.el.timer.querySelector('.time-progress');

// Toggle play buttons
player.el.toggle_play        = player.el.controls.querySelector('.toggle-play');
player.el.play_button        = player.el.toggle_play.querySelector('.play');
player.el.pause_button       = player.el.toggle_play.querySelector('.pause');

// Timeline progress bar
player.el.timeline           = player.el.controls.querySelector('.timeline');
player.el.timeline_progress  = player.el.controls.querySelector('.timeline-progress');

// Thumbnails preview
player.el.thumbnail          = player.el.controls.querySelector('.thumbnails');
player.el.thumbnail.video    = player.el.thumbnail.querySelector('video');
player.el.thumbnail.timer   = player.el.controls.querySelector('.thumbnails-timer');

// Volume button
player.el.volume             = player.el.controls.querySelector('.volume');
player.el.volume.button      = player.el.controls.querySelector('.volume-button');

// Volume bar
player.el.volume.bar         = player.el.controls.querySelector('.volume-bar');
player.el.volume.progress    = player.el.controls.querySelector('.volume-progress');

// Volume bar init()
player.el.video.volume           = 0.5;
player.el.thumbnail.video.volume = 0;
player.el.volume.progress.style.transform = 'scaleX(0.5)';


// Toggle fullscreen
player.el.toggle_fullscreen  = player.el.controls.querySelector('.toggle-fullscreen');


// Ambilight mode
player.el.canvas             = player.el.container.querySelector('canvas');
player.el.ambilight          = player.el.container.querySelector('.toggle-ambilight');


// Global Variables
var timeline_width  = player.el.timeline.offsetWidth,
    player_offset   = player.el.container.offsetLeft,
    timeline_offset = player.el.timeline.offsetLeft;

var timeout = null;






/*
*************** $mousemove listener to show or hide controls
*/
    function mouse_move()
    {
        if (timeout !== null)
        {
           player.el.container.classList.remove('mouse-moving');
            clearTimeout(timeout);
        }

        timeout = setTimeout(function()
        {
             player.el.container.classList.add('mouse-moving');
        }, 2500);
    }


    window.addEventListener('mousemove', function() {
        mouse_move();
    });




/*
*************** $toggle play/pause
*/
    // button click
    player.el.toggle_play.addEventListener('click', function(){
        if (player.el.video.paused)
        {
            player.el.video.play();
            player.el.thumbnail.video.play();
        }
        else {
            player.el.video.pause();
            player.el.thumbnail.video.pause();
        }
    });


    // video click
    player.el.video.addEventListener('click', function(){
        if (player.el.video.paused)
        {
            player.el.video.play();
            player.el.thumbnail.video.play();
        }
        else {
            player.el.video.pause();
            player.el.thumbnail.video.pause();
        }
    });


    // play listener
    player.el.video.addEventListener('play', function()
    {
        player.el.container.classList.add('is-playing');

    });

    // pause listener
    player.el.video.addEventListener('pause', function()
    {
        player.el.container.classList.remove('is-playing');
    });




/*
*************** $Text the video duration after loading
*/
    player.el.video.addEventListener('loadedmetadata', function() {
        var time_tot   = Math.floor(player.el.video.duration),
            time_tot_m = Math.floor( time_tot / 60),
            time_tot_s = time_tot - time_tot_m * 60 ;

            player.el.time_total.innerText = time_tot_m + ':' + time_tot_s;
    });




/*
*************** $Update time pross after each second
*/
    player.el.video.addEventListener('timeupdate', function()
    {
        var time_current   = Math.floor(player.el.video.currentTime),
            time_current_m = Math.floor( time_current / 60),
            time_current_s = time_current - time_current_m * 60;

        if (time_current_s < 10) {
            time_current_s = '0'+time_current_s;
        }
        player.el.time_progress.innerText = time_current_m + ':' + time_current_s;

    }, 1000);




/*
*************** $Timeline click listener
*/
    player.el.timeline.addEventListener('click', function(event) {

    	ratio           = (event.clientX - (player_offset + timeline_offset ))/ timeline_width,
        time            = ratio * player.el.video.duration;

        player.el.video.currentTime = time;
    });




/*
*************** $Timeline mousemove listener
*/

    player.el.timeline.addEventListener('mousemove', function(event) {
            ratio           = (event.clientX - (player_offset + timeline_offset ))/ timeline_width,
            time            = ratio * player.el.video.duration;

            player.el.thumbnail.video.currentTime = time;
            player.el.thumbnail.style.transform = 'translateX('+ (ratio * timeline_width) +'px)';

            var time_current   = Math.floor(time),
                time_current_m = Math.floor(time_current / 60),
                time_current_s = time_current - time_current_m * 60;

            if (time_current_s < 10) {
                time_current_s = '0'+time_current_s;
            }

            player.el.thumbnail.timer.innerText = time_current_m + ':' + time_current_s;
    });




/*
*************** $Timeline progress bar
*/
    window.setInterval(function()
    {
        var duration = player.el.video.duration,
            time     = player.el.video.currentTime,
            ratio    = time / duration;

        player.el.timeline_progress.style.transform = 'scaleX('+ ratio +')';

    }, 50);




/*
*************** $Volume toggle
*/
    player.el.volume.addEventListener('click', function(){

        if (volume < 0.05)
        {
            player.el.container.classList.add('mute');
            player.el.video.volume = 0.5;
        }
        else
        {
            player.el.video.volume = 0;
        }
    });




/*
*************** $Volume progress bar
*/
    // click on volume bar to change the volume
    player.el.volume.bar.addEventListener('click', function(event){

            volume_bar_offset = player.el.volume.bar.offsetLeft,
            volume_bar_width  = player.el.volume.bar.offsetWidth,
            ratio = ((event.clientX - (player_offset + volume_bar_offset))/volume_bar_width)*10;
            ratio = Math.round(ratio)/10;

            player.el.video.volume = ratio;

            player.el.volume.progress.style.transform = 'scaleX('+ ratio +')';
    });

    // Volume change listener
    player.el.video.addEventListener('volumechange', function(event){

        volume = player.el.video.volume;
        player.el.volume.progress.style.transform = 'scaleX('+ volume +')';


        if (volume < 0.05)
        {
            player.el.container.classList.add('mute');
        }
        else
        {
            player.el.container.classList.remove('mute');
        }
    });




/*
*************** $fullscreen toggle
*/
    // Go to Fullscreen
    function full_screen() {

        if (player.el.video.requestFullscreen)
        {
            player.el.video.requestFullscreen();
        }
        else if (player.el.video.mozRequestFullScreen)
        {
            player.el.video.mozRequestFullScreen();
        }
        else if (player.el.video.webkitRequestFullscreen)
        {
            player.el.video.webkitRequestFullscreen();
        }
    }


    // Get out Fullscreen
    function full_screen_exit()
    {
        if (document.exitFullscreen)
        {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullscreen)
        {
            document.mozCancelFullscreen();
        }
        else if (document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen();
        }
    }


    // toggle Fullscreen with button
    player.el.toggle_fullscreen.addEventListener('click', function(){

        if (player.el.container.classList.contains('full-screen')) {
            player.el.container.classList.remove('full-screen');
            full_screen_exit();
        }
        else {
            player.el.container.classList.contains('full-screen');
            player.el.container.classList.add('full-screen');
            full_screen();
        }
    });

    // toggle Fullscreen with double click
    player.el.container.addEventListener('dblclick', function(){

        if (player.el.container.classList.contains('full-screen')) {
            player.el.container.classList.remove('full-screen');
            full_screen_exit();
        }
        else {
            player.el.container.classList.contains('full-screen');
            player.el.container.classList.add('full-screen');
            full_screen();
        }
    });

    // Fullscreen listener
    document.addEventListener("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange", function()
    {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
        {
            player.el.container.classList.add('full-screen');
        }
        else
        {
            player.el.container.classList.remove('full-screen');
        }
    });




/*
*************** $ambilight mode
*/
    // $toggle ambilight-mode
    player.el.ambilight.addEventListener('click', function(){

        if (player.el.container.classList.contains('ambilight-mode'))
        {
            player.el.container.classList.remove('ambilight-mode');
            document.body.style.background = '#F9F9F9';
        }
        else
        {
            player.el.container.classList.contains('ambilight-mode');
            player.el.container.classList.add('ambilight-mode');
            document.body.style.background = '#222';
        }
    });


    // Get context of player canvas object
    ctx = player.el.canvas.getContext('2d');
    var timer_id;

    // Draw canvas every 0.030 s
    timer_id = window.setInterval(function() {
          ctx.drawImage(player.el.video, 0, 0, 800, 660)
        }, 30);




/*
*************** $Awesome Keydown features :)
*/
    document.addEventListener('keydown', function(event){

        // controls appears on every keydown
        mouse_move();

        // Play / pause toggle with space key
        if (event.keyCode === 32) {
            if (player.el.video.paused)
            {
                player.el.video.play();
                player.el.thumbnail.video.play();
            }
            else {
                player.el.video.pause();
                player.el.thumbnail.video.pause();
            }
        }

        // F to activate / desactivate Fullscreen
        if (event.keyCode === 70)
        {
            if (player.el.container.classList.contains('full-screen')) {
                player.el.container.classList.remove('full-screen');
                full_screen_exit();
            }
            else {
                player.el.container.classList.contains('full-screen');
                player.el.container.classList.add('full-screen');
                full_screen();
            }
        }

        // direction key to increment timeCurrent
        if (event.keyCode === 39)
        {
            player.el.video.currentTime += 10 ;
        }

        // left direction key to decrease timeCurrent
        if (event.keyCode === 37)
        {
            player.el.video.currentTime -= 10 ;
        }

        // top direction key  to increment volume
        if (event.keyCode === 38)
        {
            if (player.el.video.volume <= 0.9)
            {
                player.el.video.volume += 0.1;
            }
        }

        // bottom direction key to decrease volume
        if (event.keyCode === 40)
        {
            if (player.el.video.volume >= 0.1)
            {
                player.el.video.volume -= 0.1;
            }
        }

        // " M " key to decrease volume
        if (event.keyCode === 77)
        {
            if (player.el.video.volume >= 0.1)
            {
                player.el.video.volume = 0;
            }
            else
            {
                player.el.video.volume = 0.5;
            }
        }

        // " A " key to activate ambilight mode
        if (event.keyCode === 65)
        {
            if (player.el.container.classList.contains('ambilight-mode'))
            {
                player.el.container.classList.remove('ambilight-mode');
                document.body.style.background = '#F9F9F9';
            }
            else
            {
                player.el.container.classList.contains('ambilight-mode');
                player.el.container.classList.add('ambilight-mode');
                document.body.style.background = '#222';
            }
        }
    });
