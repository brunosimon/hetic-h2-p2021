// @author Nans THOMAS
// Version 0.1
// Video Player with UI Background

// FOR THE PLAYER
var player = {};

player.container      = document.querySelector('.player'); // Global container of player
player.video          = player.container.querySelector('video'); // Video

player.info           = player.container.querySelector('.information'); // DIV information
player.controls       = player.container.querySelector('.controls'); // All the contrôls

player.seekbar        = player.container.querySelector('.seekbar'); // Progress Bar
player.time           = player.container.querySelector('.current_time'); // Current time
player.totaltime      = player.container.querySelector('.total_time'); // Total time

player.volume         = player.container.querySelector('.volume'); // Volume
player.mute           = player.container.querySelector('.mute img'); // Mute

player.fast_forward   = player.container.querySelector('.fast-forward'); // FAST FORWARD
player.etat           = player.container.querySelector('.etat img'); // Play / Pause
player.fast_back      = player.container.querySelector('.fast-back'); // FAST BACK

player.reload         = player.container.querySelector('.reload'); // Reload Button
player.fullscreen     = player.container.querySelector('.fullscreen'); // FullScreen Mode
player.quality        = player.container.querySelector('.quality'); // HD or Not

// FOR THE SEEK BAR
var sheet           = document.createElement('style'), // Create a Style Element
	prefs           = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track']; // For the Browser compatibility

// FOR THE BG VIDEO
var video = {};

video.bg = document.querySelector('.bg'); // BG Video
video.bg.muted = true; // Mute the sound of video



/////////////
// SEEK BAR
/////////////

player.seekbar.addEventListener("input",function(){
  // We take video duration and we * by the value of the input
  player.video.currentTime = player.video.duration * (player.seekbar.value / 100);
  // Make the same value for the BG Video
  video.bg.currentTime = player.video.duration * (player.seekbar.value / 100);
});

player.video.addEventListener("timeupdate",function(){
  // Update the event and execute
  player.seekbar.value = player.video.currentTime * (100 / player.video.duration);
});

// COLOR SEEK BAR

document.body.appendChild(sheet);

setInterval(function Beauty(){
  var curVal = player.seekbar.value,
      style  = '';

	  // Create a degrade before the thumb and a white slow opacity after to give an impression of a real seekbar
	  // The White opacity doesn't work automaticly, but it's work when you drag the seek-bar
      for (var i = 0; i < prefs.length; i++) {
        style += '.range::-' + prefs[i] + '{background: linear-gradient(to right, #08A8FF 0%, #AD17FF ' + curVal + '%, rgba(255, 255, 255, 0.4) ' + curVal + '%, rgba(255, 255, 255, 0.4) 100%)}';
      }

	  // Update the Style
      sheet.textContent = style;
},10)


/////////////////
// TIME DISPLAY
////////////////

// FORMAT TIME
// Creation of a function who convert the time

function formatTime(seconds) {
  seconds = Math.round(seconds);
  minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + "\'" + seconds + "\'\'";
}

// CURRENT TIME
// Just update the time

setInterval(function updateTimeDisplay(){
  player.time.innerHTML = formatTime(player.video.currentTime);
},100); // 100 because when we drag the duration, if it's 1000, the refresh is not very good.

// TOTAL TIME

// loadedmetadata for charge the video duration
player.video.addEventListener('loadedmetadata', function(){
  player.totaltime.innerHTML = formatTime(player.video.duration);
})


/////////
// SOUND
/////////

// VOLUME BAR
// For best UI, three level of sound (Mute, 1 & 2)

player.volume.addEventListener('input',function() {
  player.video.volume = player.volume.value;
  var volume = player.volume.value;
  if (volume > 0.5) {
    player.mute.src = "src/img/sound_2.svg"
  } else if (volume == 0){
    player.mute.src = "src/img/sound_mute.svg"
  } else {
    player.mute.src = "src/img/sound_1.svg"
  }
})

// MUTE

var srcMute; // For the SVG Destination when the user click on Mute.

// Change the SVG when the user click on Mute
player.mute.addEventListener('click', function(){

  var volume = player.volume.value;

  if (player.video.muted == false) {
    srcMute = player.mute.src;
    player.video.muted = true;
    player.mute.src = "src/img/sound_mute.svg"
  } else {
    player.video.muted = false;
    player.mute.src = srcMute;
  }
})



////////////////////////////////
// PLAY, PAUSE & BACK & FORWARD
////////////////////////////////


// PLAY PAUSE

// Change the SVG when the video is on pause & on play
player.etat.addEventListener('click',function(){

    if (player.video.paused) {

    player.video.play();
    video.bg.play(); // Copy for the BG Video
    player.etat.src = 'src/img/pause.svg';

    } else {

    player.video.pause();
    video.bg.pause(); // Copy for the BG Video
    player.etat.src = 'src/img/play.svg';
  }
});

// FAST FORWARD

// Fast lecture of the video, when the user click on the button, when i release the button, stop the action.
player.fast_forward.addEventListener('mousedown', function () {
  player.video.playbackRate += 8;
  video.bg.playbackRate += 8; // // Copy for the BG Video
});

player.fast_forward.addEventListener('mouseup', function(){
  player.video.playbackRate = 1;
  video.bg.playbackRate = 1; // Copy for the BG Video
});

// FAST BACK

var back; // For clear the function

// The playbackRate doesn't work when it's back forward, so i create a similar function
// With video player muted like the real playbackRate

player.fast_back.addEventListener('mousedown', function () {
  back = setInterval(function rewind(){
    player.video.currentTime -= 0.4;
    video.bg.currentTime -= 0.4;
    player.video.muted = true; // Copy for the BG Video
  },30); // To give a impression of fluidity
});

// Clear the interval and play normal
player.fast_back.addEventListener('mouseup', function(){
  window.clearInterval(back);
  player.video.muted = false;
});


// VIDEO END
// When the video is over, we put pause and reload the video.

setInterval(function endMovie(){
  if(player.video.currentTime == player.video.duration){
    player.video.currentTime = 0;
    video.bg.currentTime = 0;
    player.video.pause();
    video.bg.pause();
    player.etat.src = 'src/img/play.svg';
  }
},1000)



////////////////////////
// EXTRA FUNCTIONNALITY
////////////////////////


// RELOAD
// Just put the timer at 0sec

player.reload.addEventListener('click', function(){
  player.video.currentTime = 0;
  video.bg.currentTime = 0;
});

// FULL SCREEN
// Request of Full Screen of the browser

player.fullscreen.addEventListener('click', function enterFullscreen() {
	if (player.video.requestFullScreen) {
		player.video.requestFullScreen();
	} else if (player.video.webkitRequestFullScreen) {
		player.video.webkitRequestFullScreen(player.video.ALLOW_KEYBOARD_INPUT);
	} else if (player.video.mozRequestFullScreen) {
		player.video.mozRequestFullScreen();
	} else {
		alert(
			'Votre navigateur ne supporte pas le mode plein Ã©cran, il est temps de passer Ã  un plus rÃ©cent ;)'
		);
	}
})

// QUALITE
// Change the quality of the video
// I have 2 source on my folder one SD and one HD

player.quality.addEventListener('click', function(){

  var time = player.video.currentTime;

  if (player.video.src.match("SD")) {
    player.video.pause();
    player.video.src = 'src/video/DrakeHD.mp4';
    player.video.currentTime = time;
    player.video.play();
    player.quality.style.opacity = "1";
  } else {
    player.video.pause();
    player.video.src = 'src/video/DrakeSD.mp4';
    player.video.currentTime = time;
    player.video.play();
    player.quality.style.opacity = "0.4";
  }
})


/////////
// OTHER
/////////

// HOVER ON THE VIDEO FOR INFORMATION
// I prefer a Javascript method to make the over because it's more modulable.

player.container.addEventListener('mouseenter', function(){
  player.controls.style.opacity = "0.9"; // Control opacity
  player.info.style.opacity = "0.9"; // Informations of the video opacity
})

player.container.addEventListener('mouseleave', function(){
  player.controls.style.opacity = "0"; // Hide control
  player.info.style.opacity = "0"; // Hide Informations
})
