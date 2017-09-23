var arm = document.getElementsByClassName('arm')[0];
var isPlaying = false;
var audio = document.getElementById('music');
var vinyle = document.getElementsByClassName('vinyle')[0];

var cover1 = document.getElementsByClassName('cover_1')[0];
var canPlay = true;

arm.addEventListener('click', function(){
	if (!isPlaying) { 
		this.classList.add('playing');
		vinyle.classList.add('playing');
		if (canPlay) audio.play();
		isPlaying = true;
	}
	else if (isPlaying) {
		this.classList.remove('playing');
		vinyle.classList.remove('playing');
		audio.pause();
		isPlaying = false;
	}
});

cover1.addEventListener('click', function() {
	if (!isPlaying) {
		this.nextSibling.nextSibling.classList.add('selected');
		this.nextSibling.nextSibling.classList.add('playing');
		vinyle.classList.add('off');
		audio.src = 'music2.mp3';
		canPlay = true;
	}
	else if (isPlaying) {
		audio.pause();
		vinyle.classList.add('off');
		arm.classList.remove('playing');
		this.nextSibling.nextSibling.classList.add('selected');
		this.nextSibling.nextSibling.classList.remove('playing');
		isPlaying = false;
		audio.src = 'music2.mp3';
		canPlay = true;
	}
});

vinyle.addEventListener('click', function() {
	if (!isPlaying) {
		this.classList.add('off');
		canPlay = false;
	}
	else if (isPlaying) {
		audio.pause()
		canPlay = false;
		this.classList.add('off');
		isPlaying = false;
	}
})