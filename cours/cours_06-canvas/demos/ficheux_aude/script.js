var canvas  = document.querySelector('.canvas'),
	context = canvas.getContext('2d');

var stars = [];
var clouds = [];


function createCloud(position){
	var cloud = new Object();
	cloud.x       = 10;
	cloud.y       = Math.random()*300+25;
	cloud.speed   = position;
	cloud.size    = Math.random()*3+3.8;
	if( cloud.speed < 40)
		cloud.opacity = cloud.speed*0.025;
	else if (cloud.speed > 380 )
		cloud.opacity = (420-cloud.speed)*0.025;
	else
		cloud.opacity = 1;
	clouds.push(cloud);
}

function createStars(){
	for (var i = 0; i < 80; i ++ ){
		var star = new Object();
		do{
			star.x = Math.random()*345 + 112.5;
			star.y = Math.random()*345 + 37.5;
		} while ( (star.x-300)*(star.x-300) + (star.y-225)*(star.y-225) > (172.5*172.5) ) /*Check if the coordonates are in the circle*/
		star.r = Math.random()*2;
		stars.push(star);
	}
}

// INITIALS CLOUDS AND STARS
createCloud(0);
createCloud(60);
createCloud(120);
createCloud(180);
createCloud(240);
createCloud(300);
createStars();


/*
**  DRAW AT EVERY LOOP
*/

function draw(){

	context.clearRect(0,0,600,450);

	/**
	* BACKGROUND
	**/

	// BACKGROUND SKY
	context.beginPath();
	var grad_back2 = context.createLinearGradient(225,112.5,225,472.5);
	grad_back2.addColorStop(0, '#1d3f43');
	grad_back2.addColorStop(1, '#82a88a');
	context.fillStyle = grad_back2;
	context.arc(300, 225, 172.5, 0, 2*Math.PI);
	context.fill();

	// LITTLE STARS SKY

	drawStars();
	function drawStars(){
		for (var i = 0; i < stars.length; i ++ ){
			var star = stars[i];
			context.fillStyle = '#88b7a7';
			context.beginPath();
			context.arc(star.x, star.y, star.r, 0, 2*Math.PI);
			context.fill();
		}
	}

	// SHINING STARS
	context.fillStyle = '#b2a96c';
	context.beginPath();
	context.arc(202.5, 112.5, 7.5, 0, Math.PI/2);
	context.arc(202.5, 127.5, 7.5, 3*Math.PI/2, 0);
	context.arc(217.5, 127.5, 7.5, Math.PI, 3*Math.PI/2);
	context.arc(217.5, 112.5, 7.5, Math.PI/2, Math.PI);
	context.fill();
	context.beginPath();
	context.arc(412.5, 150, 7.5, 0, Math.PI/2);
	context.arc(412.5, 165, 7.5, 3*Math.PI/2, 0);
	context.arc(427.5, 165, 7.5, Math.PI, 3*Math.PI/2);
	context.arc(427.5, 150, 7.5, Math.PI/2, Math.PI);
	context.fill();
	context.beginPath();
	context.arc(225, 255, 7.5, 0, Math.PI/2);
	context.arc(225, 270, 7.5, 3*Math.PI/2, 0);
	context.arc(240, 270, 7.5, Math.PI, 3*Math.PI/2);
	context.arc(240, 255, 7.5, Math.PI/2, Math.PI);
	context.fill();
	context.beginPath();
	context.arc(420, 300, 7.5, 0, Math.PI/2);
	context.arc(420, 315, 7.5, 3*Math.PI/2, 0);
	context.arc(435, 315, 7.5, Math.PI, 3*Math.PI/2);
	context.arc(435, 300, 7.5, Math.PI/2, Math.PI);
	context.fill();
	context.beginPath();
	context.arc(172.5, 285, 7.5, 0, Math.PI/2);
	context.arc(172.5, 300, 7.5, 3*Math.PI/2, 0);
	context.arc(187.5, 300, 7.5, Math.PI, 3*Math.PI/2);
	context.arc(187.5, 285, 7.5, Math.PI/2, Math.PI);
	context.fill();

	// SKYLINE
	context.beginPath();
	var grad_skyline = context.createLinearGradient(225,312,225,405);
	grad_skyline.addColorStop(0, '#283e35');
	grad_skyline.addColorStop(1, '#779c77');
	context.fillStyle = grad_skyline;
	context.arc(300, 225, 172.5, 3*Math.PI/10 , 7*Math.PI/10);
	context.lineTo(219,364.5);
	context.lineTo(219,351);
	context.lineTo(240,351);
	context.lineTo(240,364.5);
	context.lineTo(247.5,364.5);
	context.lineTo(247.5,312);
	context.lineTo(271.5,312);
	context.lineTo(271.5,364.5);
	context.lineTo(283.5,364.5);
	context.lineTo(283.5,349.5);
	context.lineTo(309,349.5);
	context.lineTo(309,364.5);
	context.lineTo(318,364.5);
	context.lineTo(318,349.5);
	context.lineTo(325.5,342);
	context.lineTo(333,349.5);
	context.lineTo(333,337.5);
	context.lineTo(352.5,337.5);
	context.lineTo(352.5,364.5);
	context.lineTo(367.5,364.5);
	context.lineTo(367.5,330);
	context.lineTo(384,330);
	context.lineTo(384,364.5);
	context.lineTo(391.5,364.5);
	context.lineTo(391.5,352.5);
	context.lineTo(402,352.5);
	context.lineTo(402,364.5);
	context.fill();

	// SKYLINE WINDOWS LIGHT
	context.beginPath();
	context.fillStyle = '#88a97f';
	context.rect(223 ,358, 2, 2);
	context.rect(230 ,355, 2, 2);
	context.rect(235 ,360, 2, 2);
	context.rect(255 ,320, 2, 2);
	context.rect(255 ,330, 2, 2);
	context.rect(255 ,350, 2, 2);
	context.rect(265 ,345, 2, 2);
	context.rect(265 ,330, 2, 2);
	context.rect(262 ,360, 2, 2);
	context.rect(290 ,357, 2, 2);
	context.rect(300 ,360, 2, 2);
	context.rect(304 ,353, 2, 2);
	context.rect(323 ,352, 2, 2);
	context.rect(327 ,358, 2, 2);
	context.rect(338 ,355, 2, 2);
	context.rect(345 ,350, 2, 2);
	context.rect(348 ,360, 2, 2);
	context.rect(371 ,340, 2, 2);
	context.rect(371 ,350, 2, 2);
	context.rect(379 ,358, 2, 2);
	context.rect(379 ,348, 2, 2);
	context.rect(394 ,356, 2, 2);
	context.rect(397 ,360, 2, 2);
	context.fill();
	
	//CLOUDS
	for (var i = 0; i < clouds.length; i++)
	{
		context.globalAlpha = 1;
		var cloud = clouds[i];
		cloud.speed += 1;
		if (cloud.speed <= 40){
			cloud.opacity += 0.025;
		}
		if (cloud.speed >= 380) {
			cloud.opacity -= 0.025;
		};
		if (cloud.opacity > 0.024){
			var x = cloud.x,
			y = cloud.y,
			m = cloud.size;
			s = cloud.speed;
			context.globalAlpha = cloud.opacity;
			context.beginPath();
			context.fillStyle = '#f7efc1';
			context.arc( (x+1)*m+s , y , (x-9)*m , Math.PI/2 , 3*Math.PI/2 );
			context.lineTo ( (x+3)*m+s , y-(1*m) ) ;
			context.arc( (x+4.5)*m+s , y ,(x-7)*m , Math.PI , Math.PI*2 );
			context.lineTo( (x+6)*m+s , y-(1*m) );
			context.lineTo( (x+8)*m+s , y-(1*m) );
			context.arc( (x+8)*m+s , y , (x-9)*m , 3*Math.PI/2 , 5*Math.PI/2 );
			context.lineTo( (x+1)*m+s , y+(1*m) );
			context.fill();
			context.beginPath();
			context.fillStyle = '#eae1a3';
			context.arc( (x+1)*m+s , y , (x-9)*m , Math.PI/2 , 3*Math.PI/2 );
			context.lineTo ( (x+3)*m+s , y-(1*m) ) ;
			context.arc( (x+3)*m+s , y-(1*m) ,(x-9)*m , Math.PI , Math.PI*2 );
			context.lineTo( (x+3)*m+s , y-(1*m) );
			context.lineTo( (x+5)*m+s , y-(1*m) );
			context.arc( (x+5)*m+s , y , (x-9)*m , 3*Math.PI/2 , 5*Math.PI/2 );
			context.lineTo( (x+1)*m+s , y+(1*m) );
			context.fill();
		}
		else {
			clouds.splice(i,1);
			createCloud(0);
		}
	}

	/**
	* COMPASS
	**/

	context.globalAlpha = 1;

	// ROUND EAST WEST NORTH SOUTH COMPASS
	context.beginPath();
	context.fillStyle = '#f5edc0';
	context.arc(150, 225, 4.5, 0, 2*Math.PI);
	context.fill();
	context.beginPath();
	context.arc(450, 225, 4.5, 0, 2*Math.PI);
	context.fill();
	context.beginPath();
	context.arc(300, 75, 4.5, 0, 2*Math.PI);
	context.fill();
	context.beginPath();
	context.arc(300, 375, 4.5, 0, 2*Math.PI);
	context.fill();

	// CIRCLES COMPASS
	context.beginPath();
	context.lineWidth = 3;
	context.strokeStyle = '#54877f';
	context.arc(300, 225, 123, 0, 2*Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(300, 225, 102, 0, 2*Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(300, 225, 67.5, 0, 2*Math.PI);
	context.stroke();

	// LINES COMPASS
	context.beginPath();
	context.strokeStyle = '#e1d887';
	context.moveTo(237.5, 162.5);
	context.lineTo(207.5, 132.5);
	context.stroke();
	context.moveTo(362.5, 162.5);
	context.lineTo(392.5, 132.5);
	context.stroke();
	context.moveTo(362.5, 287.5);
	context.lineTo(392.5, 317.5);
	context.stroke();
	context.moveTo(237.5, 287.5);
	context.lineTo(207.5, 317.5);
	context.stroke();

	// SMALL NEEDLES
	/*Top Left*/
	context.beginPath();
	context.fillStyle = '#1b3c42'
	context.moveTo(300,225);
	context.lineTo(277.5,225);
	context.lineTo(247.5,172.5);
	context.lineTo(300,225);
	context.fill();
	context.beginPath();
	context.fillStyle = '#669483'
	context.moveTo(300,225);
	context.lineTo(247.5,172.5);
	context.lineTo(300,202.5);
	context.lineTo(300,225);
	context.fill();
	/*Top Right*/
	context.beginPath();
	context.fillStyle = '#1b3c42'
	context.moveTo(300,225);
	context.lineTo(300,202.5);
	context.lineTo(352.5,172.5);
	context.lineTo(300,225);
	context.fill();
	context.beginPath();
	context.fillStyle = '#669483'
	context.moveTo(300,225);
	context.lineTo(352.5,172.5);
	context.lineTo(322.5,225);
	context.lineTo(300,225);
	context.fill();
	/*Bottom Right*/
	context.beginPath();
	context.fillStyle = '#1b3c42'
	context.moveTo(300,225);
	context.lineTo(322.5,225);
	context.lineTo(352.5,277.5);
	context.lineTo(300,225);
	context.fill();
	context.beginPath();
	context.fillStyle = '#669483'
	context.moveTo(300,225);
	context.lineTo(352.5,277.5);
	context.lineTo(300,247.5);
	context.lineTo(300,225);
	context.fill();
	/*Bottom Left*/
	context.beginPath();
	context.fillStyle = '#1b3c42'
	context.moveTo(300,225);
	context.lineTo(300,247.5);
	context.lineTo(247.5,277.5);
	context.lineTo(300,225);
	context.fill();
	context.beginPath();
	context.fillStyle = '#669483'
	context.moveTo(300,225);
	context.lineTo(247.5,277.5);
	context.lineTo(277.5,225);
	context.lineTo(300,225);
	context.fill();

	// BIG NEEDLES
	/*Red*/
	context.beginPath();
	context.fillStyle = '#e14555'
	context.moveTo(300,90);
	context.lineTo(285,210);
	context.lineTo(300,225);
	context.lineTo(300,90);
	context.fill();
	context.beginPath();
	context.fillStyle = '#ef546c'
	context.moveTo(300,90);
	context.lineTo(300,225);
	context.lineTo(315,210);
	context.lineTo(300,90);
	context.fill();
	/*Yellow*/
	context.beginPath();
	context.fillStyle = '#fcedb5'
	context.moveTo(435,225);
	context.lineTo(315,210);
	context.lineTo(300,225);
	context.lineTo(435,225);
	context.fill();
	context.beginPath();
	context.fillStyle = '#f6d186'
	context.moveTo(435,225);
	context.lineTo(300,225);
	context.lineTo(315,240);
	context.lineTo(435,225);
	context.fill();
	/*Green*/
	context.beginPath();
	context.fillStyle = '#92b894'
	context.moveTo(300,360);
	context.lineTo(315,240);
	context.lineTo(300,225);
	context.lineTo(300,360);
	context.fill();
	context.beginPath();
	context.fillStyle = '#49796a'
	context.moveTo(300,360);
	context.lineTo(300,225);
	context.lineTo(285,240);
	context.lineTo(300,360);
	context.fill();
	/*Brown*/
	context.beginPath();
	context.fillStyle = '#3a4642'
	context.moveTo(165,225);
	context.lineTo(285,240);
	context.lineTo(300,225);
	context.lineTo(165,225);
	context.fill();
	context.beginPath();
	context.fillStyle = '#9a773c'
	context.moveTo(165,225);
	context.lineTo(300,225);
	context.lineTo(285,210);
	context.lineTo(165,225);
	context.fill();

}


function loop() {
	window.requestAnimationFrame(loop);
	draw();
	console.log('loop');
}

loop();