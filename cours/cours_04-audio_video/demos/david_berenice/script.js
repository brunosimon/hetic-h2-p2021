var player = {};

player.elements 								= {};
player.elements.container   		= document.querySelector('.player');
player.elements.audio       		= player.elements.container.querySelector('audio');
player.elements.controls    		= player.elements.container.querySelector('.controls');

//choosing theme icons
player.elements.toggle_theme   	= document.querySelector('.toggle_theme');

//controls icons
player.elements.toggle_play 		= player.elements.controls.querySelector('.toggle_play');
player.elements.previous 				= player.elements.controls.querySelector('.previous');
player.elements.next 						= player.elements.controls.querySelector('.next');
player.elements.all_controls 		= player.elements.controls.querySelectorAll('a i');
player.elements.sound_lines 		= player.elements.controls.querySelectorAll('.sound_container div');
console.log(player.elements);

//song informations
player.elements.cover 					= document.querySelector('.cover img');
player.elements.artist 					= player.elements.container.querySelector('.song_infos .artist');
player.elements.song 						= player.elements.container.querySelector('.song_infos .song');

//time elements
player.elements.timeline 				= player.elements.container.querySelector('.timeline');
player.elements.timeline_fill 	= player.elements.timeline.querySelector('.timeline_current');
player.elements.audio_current 	= player.elements.timeline.querySelector('.audio_current');
player.elements.audio_full_time = player.elements.timeline.querySelector('.audio_full_time');
//console.log(player.elements);

//background elements
var background = {};

background.elements 								= {};
background.elements.background_fill = document.querySelector('.background_fill');
background.elements.frame 					= document.querySelector('.frame');
background.elements.time_display 		= document.querySelector('.time_display');

//initialisation of the theme use
var color_theme = 'day';

//array of background possible colors
var light_colors = ['#39CCC', '#FFF056', '#A8CD1B', '#F5DD90', '#FFE658', '#FF9009', '#DB3A34', '#FFC857', '#67BCDB', '#EE7674'];
var dark_colors = '#6f6f6f';

//['#021529', '#3B3738', '#1D2847', '#3d413b', '#323031', '#255957', '#54414E', '#402c2c', '#222422', '#392f39'];

//index of the position in the json file
var index_music = 0;

//theme night/day set on auto 
var force_theme = 0; // 0 == auto mode; 1 == manual mode


//choosing random color in function of the theme
function color_random() {
	if (color_theme == 'day') {
		var color_rand = Math.floor(Math.random() * light_colors.length);
		background.elements.background_fill.style.backgroundColor    = light_colors[color_rand];
	} else {
//		var color_rand = Math.floor(Math.random() * dark_colors.length);
		background.elements.background_fill.style.backgroundColor = dark_colors;
	}
}


//theme changes
function day_theme() {
	player.elements.container.style.background			= '#fefefe';
	player.elements.timeline_fill.style.background	= '#383838';
	player.elements.song.style.color								= '#151515';
	player.elements.artist.style.color							= '#383838';
	player.elements.audio_current.style.color				= '#383838';
	player.elements.audio_full_time.style.color			= '#383838';
	background.elements.frame.style.border 					= '23px solid #fefefe';
	background.elements.time_display.style.color		= '#fefefe';
	
	for (i=0; i< player.elements.all_controls.length; i++) {
		player.elements.all_controls[i].style.color		= '#383838';
	}
	for (i=0; i< player.elements.sound_lines.length; i++) {
		player.elements.sound_lines[i].style.background	= '#383838';
	}
}

function night_theme() {
	player.elements.container.style.background			= '#383838';
	player.elements.timeline_fill.style.background	= '#a7a7a7';
	player.elements.song.style.color								= '#fefefe';
	player.elements.artist.style.color							= '#e2e2e2';
	player.elements.audio_current.style.color				= '#e2e2e2';
	player.elements.audio_full_time.style.color			= '#e2e2e2';
	background.elements.frame.style.border					= '23px solid #383838';
	background.elements.time_display.style.color		= '#383838';
		
	for (i=0; i< player.elements.all_controls.length; i++) {
		player.elements.all_controls[i].style.color		= '#fefefe';
	}
	
	for (i=0; i< player.elements.sound_lines.length; i++) {
		player.elements.sound_lines[i].style.background	= '#fefefe';
	}
}

//manual theme (on click) 
player.elements.toggle_theme.addEventListener('click', function() {
	force_theme = 1;
	
	if (player.elements.toggle_theme.classList.contains('sun')) {
		player.elements.toggle_theme.classList.remove('sun');
		color_theme = 'night';
		color_random();
		night_theme();
		have_fill_background = 0;
		
	} else {
		if (!player.elements.toggle_theme.classList.contains('sun'))
			player.elements.toggle_theme.classList.add('sun');
		
		color_theme = 'day';
		color_random();
		day_theme();
		have_fill_background = 1;
	}
});

//when on auto mode and go from night to day mode, fill once the background with a light color
var have_fill_background = 0;

window.setInterval(function() {
	var date		= new Date();
  var hours		= date.getHours();
	var minutes	= date.getMinutes();
	var seconds	= date.getSeconds();
	//console.log(hour);
	//when color theme on auto mode : look if have to diplay night or day theme
	if (force_theme == 0) {
		if ((hours <= 7) || (hours >= 19)) {
			if (player.elements.toggle_theme.classList.contains('sun'))
				player.elements.toggle_theme.classList.remove('sun');
			
			color_theme = 'night';
			night_theme();
			background.elements.background_fill.style.backgroundColor = '#6f6f6f';
			have_fill_background = 0;
		
		} else {
			if (!player.elements.toggle_theme.classList.contains('sun'))
				player.elements.toggle_theme.classList.add('sun');
			
			color_theme = 'day';
			day_theme();
			if (have_fill_background == 0) {
				background.elements.background_fill.style.backgroundColor = '#FFE658';
				have_fill_background = 1;
			} 
		}
	}
	
	//get time and display it
	if (hours < 10) hours 		= "0" + hours;
	if (minutes < 10)	minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;
		
	background.elements.time_display.innerText = hours + ':' + minutes + ':' + seconds;
	
//		console.log(force_theme);
}, 1000);


//function called to update the player with infos (music, cover, artist, time, ...)
function update_song_info() {
	player.elements.audio.setAttribute('src', music_data[index_music].music);
	player.elements.artist.innerText = music_data[index_music].artist;	player.elements.song.innerText = music_data[index_music].song_name;
	player.elements.cover.setAttribute('src', music_data[index_music].song_cover);
	
	//display audio duration time
	player.elements.audio.addEventListener("loadeddata", function() {
		display_minutes_seconds(player.elements.audio.duration, player.elements.audio_full_time);
	});
}


//class add : audio playing or paused
player.elements.audio.addEventListener('play', function() {
	player.elements.container.classList.add('playing');
});

player.elements.audio.addEventListener('pause', function() {
	player.elements.container.classList.remove('playing');
});


//play pause music
function play_pause() {
	if(player.elements.audio.paused)
		player.elements.audio.play();
	else
		player.elements.audio.pause();

  event.preventDefault();
}

player.elements.toggle_play.addEventListener('click', function(event) {
	play_pause();
});


//next music
function next_music() {
	if (index_music == music_data.length - 1)
		index_music = 0;
	else
		index_music++;
	
	color_random();
	update_song_info();
	
	if (player.elements.container.classList.contains('playing'))
		player.elements.audio.play();
	else
		player.elements.audio.pause();
}

player.elements.next.addEventListener('click', function(event) {
	next_music();
});


//previous music
function previous_music() {
	if (index_music == 0)
		index_music = music_data.length - 1;
	else
		index_music--;
	
	color_random();
	update_song_info();
	
	if (player.elements.container.classList.contains('playing'))
		player.elements.audio.play();
	else
		player.elements.audio.pause();
}

player.elements.previous.addEventListener('click', function(event) {
	previous_music();
});


//timeline addapt time to position of the click 
var elementRect = player.elements.timeline.getBoundingClientRect();

player.elements.timeline.addEventListener('click', function(event) {
	var ratio = (event.clientX -  elementRect.left);
	ratio /= player.elements.timeline.offsetWidth;
	
	var time = ratio * player.elements.audio.duration;

  player.elements.audio.currentTime = time;
});


//timeline update filling 
window.setInterval(function() {
	var ratio = player.elements.audio.currentTime / player.elements.audio.duration;
	
	player.elements.timeline_fill.style.transform = 'scaleX(' + ratio + ')';							 
}, 50);


//convert and display audio time in mm:ss
function display_minutes_seconds(time, target_element) {
	var minutes = Math.floor((time % 3600) / 60);
	var seconds = Math.floor((time % 3600) % 60);

	if (seconds < 10) seconds = "0" + seconds;
	if (minutes < 10)	minutes = "0" + minutes;
		
	target_element.innerText = minutes + ':' + seconds;
}


window.setInterval(function() {
	//update current time
	display_minutes_seconds(player.elements.audio.currentTime, player.elements.audio_current);
	
	//when audio is finish launch the next one
	if (player.elements.audio.currentTime == player.elements.audio.duration) {
		next_music();
		player.elements.audio.play();
	}
}, 50);

//keypress event
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 32) {
		play_pause();
		event.preventDefault();
	}
	if (event.keyCode == 68) {
		next_music();
		event.preventDefault();
	}
	if (event.keyCode == 65) {
		previous_music();	
		event.preventDefault();
	}
	if (event.keyCode == 39) {
		player.elements.audio.currentTime += 1;	
		event.preventDefault();
	}
	if (event.keyCode == 37) {
		player.elements.audio.currentTime += -1;
		event.preventDefault();
	}
});


//volume change
player.elements.sound_lines[0].addEventListener('click', function() {
	if (player.elements.sound_lines[0].classList.contains('mute')) {
		player.elements.sound_lines[0].classList.remove('mute');
		player.elements.audio.volume = 1;
		
		for (i=0; i < player.elements.sound_lines.length; i++) {
			player.elements.sound_lines[i].style.background ='#383838';
		}
		
	}	else {
		player.elements.sound_lines[0].classList.add('mute');
		player.elements.audio.volume = 0;
		
		for (i=0; i < player.elements.sound_lines.length; i++) {
			player.elements.sound_lines[i].style.background ='#797979';
		}
	}

});

player.elements.sound_lines[1].addEventListener('click', function() {
	player.elements.audio.volume = 0.25;
	
	for (i=2; i < player.elements.sound_lines.length; i++) {
		player.elements.sound_lines[i].style.background ='#797979';
	}
	for (j=1; j < 0; j--) {
		player.elements.sound_lines[j].style.background ='#383838';
	}
});
	
player.elements.sound_lines[2].addEventListener('click', function() {
	player.elements.audio.volume = 0.5;
	for (i=3; i < player.elements.sound_lines.length; i++) {
		player.elements.sound_lines[i].style.background ='#797979';
	}
	for (j=2; j < 0; j--) {
		player.elements.sound_lines[j].style.background ='#383838';
		console.log(j);
	}
	
	
});
	
player.elements.sound_lines[3].addEventListener('click', function() {
	player.elements.audio.volume = 0.75;
	for (i=4; i < player.elements.sound_lines.length; i++) {
		player.elements.sound_lines[i].style.background ='#797979';
	}
	for (j=3; j < 0; j--) {
		player.elements.sound_lines[j].style.background ='#383838';
		console.log(j);
	}
});
	
player.elements.sound_lines[4].addEventListener('click', function() {
	player.elements.audio.volume = 1;
	for (i=5; i < player.elements.sound_lines.length; i++) {
		player.elements.sound_lines[i].style.background ='#797979';
	}
	
	for (j=4; j < 0; j--) {
		player.elements.sound_lines[j].style.background ='#383838';
		console.log(j);
	}
});

//initialisation of the player informations displayed
update_song_info();