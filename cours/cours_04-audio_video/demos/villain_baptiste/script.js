/* Baptiste VILLAIN HETIC P2020 G1 */

/* create all needed variables */
var player                                = {};
player.elements                           = {},
  player.elements.container               = document.querySelector('.tv-container'),
  player.elements.video                   = player.elements.container.querySelector('.player video'),
  player.elements.button_volume           = player.elements.container.querySelector('.button-volume'),
  player.elements.button_volume_container = player.elements.container.querySelector('.controls-volume'),
  player.elements.volume_diode            = player.elements.container.querySelector('.volume-light .diode'),
  player.elements.button_mute             = player.elements.container.querySelector('.button-mute'),
  player.elements.button_fullscreen       = player.elements.container.querySelector('.button-fullscreen'),
  player.elements.button_time             = player.elements.container.querySelector('.button-seek-bar'),
  player.elements.button_time_container   = player.elements.container.querySelector('.controls-bottom-seek-bar'),
  player.elements.button_time_line        = player.elements.container.querySelector('.seek-bar'),
  player.elements.button_time_fill        = player.elements.container.querySelector('.seek-bar .fill'),
  player.elements.display_second          = player.elements.container.querySelector('.second'),
  player.elements.display_minute          = player.elements.container.querySelector('.minute'),
  player.elements.button_toggle           = player.elements.container.querySelector('.controls-bottom-toggleplay'),
  player.elements.thumbnail               = player.elements.container.querySelector('.thumbnail-container'),
  player.elements.thumbnail_video         = player.elements.container.querySelector('.thumbnail-container video'),
  player.elements.button_playlist         = player.elements.container.querySelector('.button-playlist'),
  player.elements.button_playlist_close   = player.elements.container.querySelector('.button-close-playlist'),
  player.elements.playlist_container      = player.elements.container.querySelector('.playlist-container'),
  player.elements.playlist_videos_list    = player.elements.container.querySelector('.playlist-container .video-list'),
  player.elements.button_prev             = player.elements.container.querySelector('.playlist-controls.control-prev'),
  player.elements.button_next             = player.elements.container.querySelector('.playlist-controls.control-next'),
  player.elements.button_transition       = player.elements.container.querySelector('.toggle-transition');

player.properties                   = {},
  player.properties.volume_position = 0,
  player.properties.fullscreen      = false;

setTimeout(function(){ // wait video metadata loading
  player.properties.volume_position = player.elements.button_volume_container.getBoundingClientRect();
  player.properties.volume          = player.elements.video.volume;
  player.properties.time_position   = player.elements.button_time_container.getBoundingClientRect();
  player.elements.thumbnail_video.pause();
},30);

/* volume drag variables */
var volume_drag              = {};
volume_drag.isOver      = false;
volume_drag.isDown      = false;
volume_drag.count       = 0;
volume_drag.left        = 0;
volume_drag.top         = 0;
volume_drag.start_left  = 0;
volume_drag.start_top   = 0;
volume_drag.angle       = 0;
volume_drag.last_angle  = 180;
volume_drag.save_angle  = 180;
volume_drag.move        = 180;
volume_drag.first_move  = 0;
volume_drag.first_count = 0;

/* time drag variables */
var time_drag        = {};
time_drag.isOver     = false;
time_drag.isDown     = false;
time_drag.last_pos   = 0;
time_drag.save_pos   = 0;
time_drag.count      = 0;
time_drag.moveX      = 0;

/* keys commands increment default*/
var incremental = 1;

/* get video list from JSON */
var arr = videos;
player.properties.videos_list = [];
for(var i in arr){
  player.properties.videos_list.push([i, arr [i]]);
}





/* Initialisation function */
function initialise(){
  /* LOCAL STORAGE */
  var select = localStorage.getItem('VINTAGETV-track-number');
  if(select == null){
    select = 0;
  }
  player.properties.video_select = select;
  player.elements.video.setAttribute('src', player.properties.videos_list[select][1].video_src);
  player.elements.thumbnail_video.setAttribute('src', player.properties.videos_list[select][1].video_src);

  var time = localStorage.getItem('VINTAGETV-time');
  if(time == null){
    time = 0;
  }
  player.elements.video.currentTime = time;

  var volume = localStorage.getItem('VINTAGETV-volume');
  if(volume == null){
    volume = .5;
  }
  player.elements.video.volume = volume;
  player.elements.button_volume.style.transform = 'rotate('+ volume*360 +'deg)';
  volume_drag.last_angle  = volume*360;
  volume_drag.save_angle  = volume*360;
  volume_drag.move        = volume*360;

  var mute = localStorage.getItem('VINTAGETV-mute');
  if(mute == null){
    mute = 0;
  }
  if(mute == 0){
    player.elements.video.muted = false;
    player.elements.button_mute.classList.remove('active');
  }
  else if(mute == 1){
    player.elements.video.muted = true;
    player.elements.button_mute.classList.add('active');
  }

  var loop = localStorage.getItem('VINTAGETV-loop');
  if(loop == null){
    loop = 1;
  }
  if(loop == 1){
    player.elements.video.loop = false;
    player.elements.button_transition.classList.remove('active');
  }
  else if(loop == 0){
    player.elements.video.loop = true;
    player.elements.button_transition.classList.add('active');

  }
}

initialise();






/********************

  GENERATE PLAYLIST 

********************/

function generatePlaylist(){

  var add = '';
  /* playlist set video list from JSON */
  for(var i = 0; i < player.properties.videos_list.length; i++){
    if(i == player.properties.video_select){
      add  += '<a href="#" class="video active" data-target="'+i+'">';
    }
    else{
      add  += '<a href="#" class="video" data-target="'+i+'">';
    }
    add += '<div class="banner-duration">',
      add += player.properties.videos_list[i][1].duration,
      add += '</div>',
      add += '<div class="banner-title">',
      add += player.properties.videos_list[i][1].title,
      add += '</div>',
      add += '<img src="'+ player.properties.videos_list[i][1].poster_src +'" alt="poster">',
      add += '</a>';
  }
  player.elements.playlist_videos_list.innerHTML = add;
  /* get all videos in variable */
  player.elements.playlist_videos = player.elements.playlist_videos_list.querySelectorAll('.video');
}

generatePlaylist();





/*****************

   VOLUME EVENTS 

*****************/

/* volume drag detection */
player.elements.button_volume.addEventListener('click', function(e){
  e.preventDefault(); // disable link
});

player.elements.button_volume_container.addEventListener('mouseenter',function(){
  volume_drag.isOver     = true;
});

player.elements.button_volume.addEventListener('mousedown',function(e){
  e.preventDefault();
  volume_drag.isDown     = true;
  volume_drag.start_left = e.pageX - player.properties.volume_position.left;
  volume_drag.start_top  = e.pageY - player.properties.volume_position.top;

  volume_drag.count      = 0;
});

player.elements.button_volume_container.addEventListener('mouseup',function(){
  volume_drag.isDown = false;
  volume_drag.last_angle = volume_drag.move;
  volume_drag.save_angle = volume_drag.angle;
});

player.elements.button_volume_container.addEventListener('mouseleave',function(){
  volume_drag.isDown     = false;
  volume_drag.isOver     = false;
  volume_drag.last_angle = volume_drag.move;
  volume_drag.save_angle = volume_drag.angle;
});


/* volume drag event */
player.elements.button_volume_container.addEventListener('mousemove', function(e){
  if(volume_drag.isDown && volume_drag.isOver && !player.elements.video.muted){
    volume_drag.left   = e.pageX - player.properties.volume_position.left;
    volume_drag.top    = e.pageY - player.properties.volume_position.top;
    volume_drag.angle  = Math.atan2(volume_drag.start_left - 60, volume_drag.start_top - 60);
    volume_drag.angle -= Math.atan2(volume_drag.left - 60, volume_drag.top - 60);
    volume_drag.angle *= 180/Math.PI;

    if(volume_drag.count == 0){
      volume_drag.save_angle = volume_drag.last_angle + volume_drag.angle;
      volume_drag.count++;
    }

    volume_drag.move = volume_drag.last_angle + volume_drag.angle;

    /* Test if user goes right or left first */
    if(volume_drag.first_count == 0){
      volume_drag.first_move   = volume_drag.move;
      volume_drag.first_count++;
    }

    /* Keep degree in [0-360] */
    if(volume_drag.move >= 360){
      volume_drag.move -= 360;
    }
    else if(volume_drag.move <= 0){
      volume_drag.move += 360;
    }

    /* calcul volume */
    if(volume_drag.first_move > 0){ // user goes right first
      player.properties.volume = Math.round((volume_drag.move/360)*100)/100;
    }
    else{ // user goes left first
      player.properties.volume = 1 - (1 - Math.round((volume_drag.move/360)*100)/100);
    }

    player.elements.button_volume.style.transition = 'transform 0s ease';
    player.elements.button_volume.style.transform  = 'rotate('+ volume_drag.move +'deg)';
    volume_drag.save_angle                         = volume_drag.move;
    player.elements.video.volume                   = player.properties.volume;

  }
});


/* Event on volume change */
player.elements.video.addEventListener('volumechange', function(){
  var volume = player.elements.video.volume;
  localStorage.setItem('VINTAGETV-mute', 0);

  /* diode color */
  if(player.elements.video.muted){
    player.elements.volume_diode.classList.remove('diode-up');
    player.elements.volume_diode.classList.add('diode-off');
    player.elements.volume_diode.classList.remove('diode-down');
    player.elements.volume_diode.classList.remove('diode-mid');
    localStorage.setItem('VINTAGETV-mute', 1);
  }
  else if(volume >= .75){
    player.elements.volume_diode.classList.add('diode-up');
    player.elements.volume_diode.classList.remove('diode-off');
    player.elements.volume_diode.classList.remove('diode-down');
    player.elements.volume_diode.classList.remove('diode-mid');
  }
  else if(volume >= .5){
    player.elements.volume_diode.classList.remove('diode-up');
    player.elements.volume_diode.classList.remove('diode-off');
    player.elements.volume_diode.classList.remove('diode-down');
    player.elements.volume_diode.classList.add('diode-mid');
  }
  else if(volume >= .05){
    player.elements.volume_diode.classList.remove('diode-up');
    player.elements.volume_diode.classList.remove('diode-off');
    player.elements.volume_diode.classList.add('diode-down');
    player.elements.volume_diode.classList.remove('diode-mid');
  }
  else if(volume <= .05){
    player.elements.volume_diode.classList.remove('diode-up');
    player.elements.volume_diode.classList.add('diode-off');
    player.elements.volume_diode.classList.remove('diode-down');
    player.elements.volume_diode.classList.remove('diode-mid');
  }

  localStorage.setItem('VINTAGETV-volume', player.elements.video.volume);

});


/* Event mute button */
player.elements.button_mute.addEventListener('click', function(){
  if(player.elements.video.muted){
    player.elements.video.muted = false;
    player.elements.button_mute.classList.remove('active');
  }
  else{
    player.elements.video.muted = true;
    player.elements.button_mute.classList.add('active');
  }
});


/******************

  Keyboard events 

******************/

document.addEventListener('keydown', function(e){

  /* incremental value */
  if(e.keyCode  == 16){
    incremental = 2;
  }

  /* volume up */
  if(e.keyCode == 38 && !player.elements.video.muted){ // player is not muted
    e.preventDefault();
    var volume = player.elements.video.volume;
    console.log(incremental);
    if(volume+(0.1*incremental) <= 1){
      volume_drag.last_angle += 36*incremental;
      volume_drag.save_angle += 36*incremental;
      volume_drag.move       += 36*incremental;
      player.elements.button_volume.style.transition = 'transform .2s ease';
      player.elements.button_volume.style.transform = 'rotate('+ volume_drag.move +'deg)';
      volume += 0.1*incremental;
      player.elements.video.volume = volume;
    }
    else{
      volume_drag.last_angle = 360;
      volume_drag.save_angle = 360;
      volume_drag.move       = 360;
      player.elements.button_volume.style.transition = 'transform .2s ease';
      player.elements.button_volume.style.transform = 'rotate('+ volume_drag.move +'deg)';
      volume = 1;
      player.elements.video.volume = volume;

    }
  }

  /* volume down */
  if(e.keyCode == 40 && !player.elements.video.muted){ // player is not muted
    e.preventDefault();
    var volume = player.elements.video.volume;
    if(volume-(0.1*incremental) >= 0){
      volume_drag.last_angle -= 36*incremental;
      volume_drag.save_angle -= 36*incremental;
      volume_drag.move       -= 36*incremental;
      player.elements.button_volume.style.transition = 'transform .2s ease';
      player.elements.button_volume.style.transform  = 'rotate('+ volume_drag.move +'deg)';
      volume -= 0.1*incremental;
      player.elements.video.volume = volume;
    }
    else{
      volume_drag.last_angle = 0;
      volume_drag.save_angle = 0;
      volume_drag.move       = 0;
      player.elements.button_volume.style.transition = 'transform .2s ease';
      player.elements.button_volume.style.transform = 'rotate('+ volume_drag.move +'deg)';
      volume = 0;
      player.elements.video.volume = volume;
    }
  }

  /* volume mute */
  if(e.keyCode == 77){
    if(player.elements.video.muted){
      player.elements.video.muted = false;
      player.elements.button_mute.classList.remove('active');
    }
    else{
      player.elements.video.muted = true;
      player.elements.button_mute.classList.add('active');
    }
  }

  /* time forward */
  if(e.keyCode == 39){
    e.preventDefault();
    var time = player.elements.video.currentTime/player.elements.video.duration;
    if(time + .05*incremental <= 1){
      time += .05*incremental;
    }
    else{
      time = 1;
    }
    player.elements.video.currentTime = time*player.elements.video.duration;
  }

  /* time backward */
  if(e.keyCode == 37){
    e.preventDefault();
    var time = player.elements.video.currentTime/player.elements.video.duration;
    if(time - .05*incremental >= 0){
      time -= .05*incremental;
    }
    else{
      time = 0;
    }
    player.elements.video.currentTime = time*player.elements.video.duration;
  }

  /* toggle play */
  if(e.keyCode == 32){
    e.preventDefault();
    togglePlay();
  }
  /* toggle fullscreen */
  if(e.keyCode == 70){
    toggleFullscreen();
  }

  /* prev track */
  if(e.keyCode == 74){
    var target = player.properties.video_select;
    target--;
    if(target < 0){
      target = player.elements.playlist_videos.length-1;
    }
    changeVideo(target);
  }

  /* next track */
  if(e.keyCode == 76){
    var target = player.properties.video_select;
    target++;
    if(target > player.elements.playlist_videos.length-1){
      target = 0;
    }
    changeVideo(target);
  }

});

document.addEventListener('keyup', function(e){
  /* increment to default */
  if(e.keyCode  == 16){
    incremental = 1; 
  }
});


/*****************

   TIME EVENT 

*****************/

/* time drag detection */
player.elements.button_time.addEventListener('click', function(e){
  e.preventDefault(); // disable link
});

player.elements.button_time_container.addEventListener('mouseenter',function(){
  time_drag.isOver   = true;
});

player.elements.button_time.addEventListener('mousedown',function(e){
  e.preventDefault();
  time_drag.isDown   = true;
  time_drag.save_pos = e.clientX - player.properties.time_position.left;
});

player.elements.button_time_container.addEventListener('mouseup',function(e){
  time_drag.isDown = false;
  time_drag.count  = 0;
  window.requestAnimationFrame(updateTimeLine);
});

player.elements.button_time_container.addEventListener('mouseleave',function(e){
  time_drag.isDown = false;
  time_drag.isOver = false;
  time_drag.count  = 0;
  window.requestAnimationFrame(updateTimeLine);
});

/* time drag event */
player.elements.button_time_container.addEventListener('mousemove', function(e){
  if(time_drag.isDown && time_drag.isOver){
    if(time_drag.count == 0){
      time_drag.last_pos = time_drag.moveX;
      time_drag.count++;
    }

    var mouse_left   = e.clientX - player.properties.time_position.left,
        ratio        = (mouse_left/player.properties.time_position.width),
        time         = ratio * player.elements.video.duration;
    time_drag.moveX  = mouse_left - time_drag.save_pos;
    time_drag.moveX += time_drag.last_pos;

    /* keep button in container */
    if (time_drag.moveX < -10){
      time_drag.moveX = -10;
    }
    else if(time_drag.moveX > 750){
      time_drag.moveX = 750;
    }

    player.elements.button_time.style.transition = 'transform .0s linear';
    player.elements.button_time.style.transform = 'translateX('+ time_drag.moveX +'px)';

    player.elements.button_time_fill.style.transition = 'transform .0s linear';
    player.elements.button_time_fill.style.transform = 'scaleX('+ ratio +')';

    player.elements.video.currentTime = time;
  }
});


/* time click event */
player.elements.button_time_line.addEventListener('click',function(e){
  e.preventDefault();
  var mouse_left   = e.clientX - player.properties.time_position.left,
      ratio        = (mouse_left/player.properties.time_position.width),
      time         = ratio * player.elements.video.duration;

  player.elements.button_time.style.transition = 'transform .1s linear';
  player.elements.button_time.style.transform = 'translateX('+ (mouse_left-10) +'px)';

  player.elements.button_time_fill.style.transition = 'transform .1s linear';
  player.elements.button_time_fill.style.transform = 'scaleX('+ ratio +')';

  time_drag.moveX = mouse_left-10;

  player.elements.video.currentTime = time;
  window.requestAnimationFrame(updateTimeLine);
});

player.elements.video.addEventListener("timeupdate", function(e){
  player.elements.button_time.style.transform = 'translateX('+ player.elements.video.audio +'px)';
});

/* update time position */
function updateTimeLine(){
  // stop when drag&drop event
  if(!time_drag.isDown || !time_drag.isOver){
    var time = player.elements.video.currentTime,
        ratio = time/player.elements.video.duration;

    player.elements.button_time.style.transform      = 'translateX('+ (ratio * player.properties.time_position.width-10) +'px)';
    player.elements.button_time_fill.style.transform = 'scaleX('+ ratio +')';
    time_drag.moveX = ratio * player.properties.time_position.width-10;

    localStorage.setItem('VINTAGETV-time', time);
    window.requestAnimationFrame(updateTimeLine);
  }
}

/* display time and trigger next track */
player.elements.video.addEventListener('timeupdate',function(){
  var time   = player.elements.video.currentTime,
      minute = 0,
      second = 0;

  second  = time%60;
  second  = Math.floor(second);
  minute  = Math.floor(time/60);

  if(minute < 10){
    minute = '0' + minute;
  }
  if(second < 10){/* volume drag variables */
    var volume_drag         = {};
    volume_drag.isOver      = false;
    volume_drag.isDown      = false;
    volume_drag.count       = 0;
    volume_drag.left        = 0;
    volume_drag.top         = 0;
    volume_drag.start_left  = 0;
    volume_drag.start_top   = 0;
    volume_drag.angle       = 0;
    volume_drag.first_move  = 0;
    volume_drag.first_count = 0;
    second = '0' + second;
  }

  window.requestAnimationFrame(updateTimeLine);

  player.elements.display_minute.textContent = minute;
  player.elements.display_second.textContent = second;

  /* trigger next loop */
  if(!player.elements.video.loop && player.elements.video.currentTime == player.elements.video.duration){
    var target = player.properties.video_select;
    target++;
    if(target > player.properties.videos_list.length-1){
      target = 0;
    }
    changeVideo(target);
    player.elements.video.play();
    player.elements.button_toggle.classList.add('playing');
  }
});


/* thumbnail */
player.elements.button_time_line.addEventListener('mouseenter',function(){
  player.elements.thumbnail.style.opacity = 1;
});

player.elements.button_time_line.addEventListener('mouseleave',function(){
  player.elements.thumbnail.style.opacity = 0;
});

player.elements.button_time_line.addEventListener('mousemove',function(e){
  var mouse_left   = e.clientX - player.properties.time_position.left,
      ratio        = (mouse_left/player.properties.time_position.width),
      time         = ratio * player.elements.video.duration;

  player.elements.thumbnail.style.transform = 'translate('+ mouse_left +'px)';

  player.elements.thumbnail_video.currentTime = time;

});

/*****************

   TOGGLE PLAY 

*****************/

function togglePlay(){
  if(player.elements.video.paused){
    player.elements.video.play();
    player.elements.button_toggle.classList.add('playing');
  }
  else{
    player.elements.video.pause();
    player.elements.button_toggle.classList.remove('playing');

  }
  window.requestAnimationFrame(updateTimeLine);
}

/* toggle play */
player.elements.button_toggle.addEventListener('click',function(e){
  e.preventDefault();
  togglePlay();
});


/*****************

    FULLSCREEN 

*****************/
function toggleFullscreen(){
  if(!player.properties.fullscreen){
    if(player.elements.video.requestFullscreen){
      player.elements.video.requestFullscreen();
    }
    else if(player.elements.video.webkitRequestFullscreen){
      player.elements.video.webkitRequestFullscreen();
    }
    else if(player.elements.video.mozRequestFullscreen){
      player.elements.video.mozRequestFullscreen();
    }
    else if(player.elements.video.mosRequestFullscreen){
      player.elements.video.msRequestFullscreen();
    }
  }
  else{
    if(document.mozCancelFullScreen){
      document.mozCancelFullScreen();
    }
    else{
      document.webkitCancelFullScreen();
    }
  }
  player.properties.fullscreen = !player.properties.fullscreen;
}

player.elements.button_fullscreen.addEventListener('click',function(){
  toggleFullscreen();
});


/*****************

    PLAYLIST 

*****************/
player.elements.button_playlist.addEventListener('click',function(e){
  e.preventDefault();
  if(player.elements.playlist_container.classList.contains('active')){
    player.elements.playlist_container.classList.remove('active');
  }
  else{
    player.elements.playlist_container.classList.add('active');
  }
});

player.elements.button_playlist_close.addEventListener('click',function(e){
  e.preventDefault();
  player.elements.playlist_container.classList.remove('active');
});

function changeVideo(target){
  var playing = true;
  if(player.elements.video.paused){
    playing = false;
  }
  player.elements.playlist_videos[player.properties.video_select].classList.remove('active');
  player.elements.playlist_videos[target].classList.add('active');
  player.properties.video_select = target;
  player.elements.video.setAttribute('src', player.properties.videos_list[target][1].video_src);
  player.elements.thumbnail_video.setAttribute('src', player.properties.videos_list[target][1].video_src);

  player.elements.container.classList.add('transition');

  setTimeout(function(){
    player.elements.container.classList.remove('transition');
  },450);

  if(playing){
    player.elements.video.play();
  }
  else{
    player.elements.video.pause();
  }

  player.elements.thumbnail_video.pause();
  player.elements.video.currentTime = 0;
  player.elements.display_minute.textContent = '00';
  player.elements.display_second.textContent = '00';

  /* local storage */
  localStorage.setItem('VINTAGETV-track-number', player.properties.video_select);
}

/* on playlist-video click*/
for (var i = 0; i < player.elements.playlist_videos.length; i++){
  player.elements.playlist_videos[i].addEventListener('click',function(e){
    e.preventDefault()
    var target = this.getAttribute('data-target');
    if(target != player.properties.video_select){
      changeVideo(target);
    }
  });
}

/* prev track */
player.elements.button_prev.addEventListener('click',function(e){
  e.preventDefault();
  var target = player.properties.video_select;
  target--;
  if(target < 0){
    target = player.elements.playlist_videos.length-1;
  }
  changeVideo(target);
});

/* next track */
player.elements.button_next.addEventListener('click',function(e){
  e.preventDefault();
  var target = player.properties.video_select;
  target++;
  if(target > player.elements.playlist_videos.length-1){
    target = 0;
  }
  changeVideo(target);
});

/* loop toggle */
player.elements.button_transition.addEventListener('click', function(e){
  e.preventDefault();
  localStorage.setItem('VINTAGETV-loop', 0);
  if(player.elements.video.loop){
    player.elements.video.loop = false;
    player.elements.button_transition.classList.remove('active');
    localStorage.setItem('VINTAGETV-loop', 1);
  }
  else{
    player.elements.video.loop = true;
    player.elements.button_transition.classList.add('active');
  }
});


/* THE END */






















