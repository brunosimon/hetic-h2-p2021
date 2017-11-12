var canvas  = document.querySelector("#canvas"),
	context = canvas.getContext('2d');

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event) {

  var x = event.pageX;
  var y = event.pageY;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  console.log("x:" + x + " y:" + y);
}


/** DRAWING THE TRUCK... **/

var back_truck_y = 200,
	front_truck_y = 200;

function drawing() {

	/*** SHAPE 1 ***/ 

	context.beginPath();
	context.moveTo(496, back_truck_y + 7);
	context.lineTo(961, front_truck_y);
	context.lineTo(966, front_truck_y + 335);
	context.lineTo(496, back_truck_y + 341);
	context.closePath();

	context.moveTo(966, front_truck_y + 335);
	context.lineTo(1174, front_truck_y + 333);
	context.lineTo(1173, front_truck_y + 204);
	context.lineTo(1126, front_truck_y + 173);
	context.lineTo(1065, front_truck_y + 26);
	context.lineTo(963, front_truck_y + 26);
	context.closePath();

	context.fillStyle = "#FFFFFF";
	context.fill();
	context.lineJoin = "round";
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	/*** SHAPE 2 (red band) ***/ 

	context.beginPath();
	context.moveTo(499,  back_truck_y +215);
	context.lineTo(1174, front_truck_y + 209);
	context.lineTo(1175, front_truck_y + 258);
	context.lineTo(499, back_truck_y + 264);
	context.moveTo(965, front_truck_y + 215);
	context.lineTo(965, front_truck_y + 266);
	context.moveTo(499, front_truck_y + 215);
	context.closePath();

	context.fillStyle = "#FF4553";
	context.fill();
	context.lineJoin = "round";
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	/*** SHAPE 3 red cross ***/ 

	context.beginPath();
	context.moveTo(704, back_truck_y + 53);
	context.lineTo(749, back_truck_y + 52);
	context.lineTo(750, back_truck_y + 85);
	context.lineTo(785, back_truck_y + 85);
	context.lineTo(787, back_truck_y + 132);
	context.lineTo(750, back_truck_y + 132);
	context.lineTo(751, back_truck_y + 168);
	context.lineTo(703, back_truck_y + 169);
	context.lineTo(702, back_truck_y + 132);
	context.lineTo(669, back_truck_y + 133);
	context.lineTo(669, back_truck_y + 86);
	context.lineTo(703, back_truck_y + 86);
	context.closePath();

	context.fillStyle = "#FF4553";
	context.fill();
	context.lineJoin = "round";	
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	/*** WINDOW ***/

	context.beginPath();
	context.moveTo(986, front_truck_y +49);
	context.lineTo(1058, front_truck_y + 47);
	context.lineTo(1104, front_truck_y + 169);
	context.lineTo(985, front_truck_y + 169);
	context.closePath();

	context.fillStyle = "#55D0DF";
	context.fill();
    context.lineJoin = "round";
    context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	context.beginPath();
	context.moveTo(1078, front_truck_y + 151);
	context.lineTo(1053, front_truck_y + 85);
	context.closePath();
	context.moveTo(1048, front_truck_y + 71);
	context.lineTo(1045, front_truck_y + 64);
	context.closePath();

	context.lineJoin = "round";
	context.lineWidth = 8;
  	context.strokeStyle = "white";
  	context.stroke();

  	context.beginPath();
  	context.moveTo(1013, front_truck_y + 192);
  	context.lineTo(985, front_truck_y + 192);
  	context.closePath();

  	context.lineJoin = "round";
  	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();


	/*** BUMPERS ***/ 

	// back bumber

	context.beginPath();
	context.moveTo(485, back_truck_y + 316);
	context.lineTo(484, back_truck_y + 349);
	context.lineTo(533, back_truck_y + 349);
	context.lineTo(533, back_truck_y + 316);
	context.closePath();

	context.fillStyle = "#5B596F";
	context.fill();
	context.lineJoin = "round";
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	// front bumper

	context.beginPath();
	context.moveTo(1139, front_truck_y + 311);
	context.lineTo(1139, front_truck_y + 344);
	context.lineTo( 1187, front_truck_y + 344);
	context.lineTo(1187, front_truck_y + 311);
	context.closePath();

	context.fillStyle = "#5B596F";
	context.fill();
	context.lineJoin = "round";
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();


	/** SHADOW **/ 

	context.beginPath();
	context.moveTo(shadow_back_x + 15, 593);
	context.lineTo(shadow_front_x + 166, 592);
	context.closePath();

	context.lineJoin = "round";
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	/*** WHEELS ***/ 

	// back wheel

	context.beginPath();
	context.arc(631, 533, 56, 0, Math.PI * 2);
	context.closePath();
	context.fillStyle = "#5B596F";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	context.beginPath();
	context.arc(631, 534, 26, 0, Math.PI * 2);
	context.closePath();
	context.fillStyle = "#FFFFFF";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	// front wheel

	context.beginPath();
	context.arc(1057, 532, 56, 0, Math.PI * 2);
	context.closePath();

	context.fillStyle = "#5B596F";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	context.beginPath();
	context.arc(1057, 532, 26, 0, Math.PI * 2);
	context.closePath();

	context.fillStyle = "#FFFFFF";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	/*** SIRENS LIGHTS ***/ 

	context.beginPath();
	context.arc(997, front_truck_y + 08, 18, Math.PI / 2.4, (3.2 * Math.PI) / 2, false);
	context.closePath();

	context.fillStyle = "#55D0DF";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	context.beginPath();
    context.arc(1035, front_truck_y + 08, 18, (2.8 * Math.PI) / 2, Math.PI / 1.7, false);
	context.closePath();

	context.fillStyle = "#FF4553";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

	context.beginPath();
	context.moveTo(1004, front_truck_y - 10);
	context.lineTo(1005, front_truck_y + 26);
	context.lineTo(1031, front_truck_y + 26);
	context.lineTo(1031, front_truck_y - 10);
	context.closePath();

	context.fillStyle = "#FFFFFF";
	context.fill();
	context.lineWidth = 8;
  	context.strokeStyle = "#282455";
	context.stroke();

}

/** PARTICLES **/

var particles = [];

function create_particle() {

	var particle = {};
	particle.x = 426;
	particle.y = 559;

	particle.speed = {};
    particle.speed.x = Math.random() * -18 ;
    particle.speed.y = Math.random() * -0.1  ;
    particle.fill   = 'white';
    particle.radius = 30;

	particles.push( particle );
}

/** DRAW PARTICLES **/

function draw_particles() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < particles.length; i++ ) {
		var particle = particles[ i ];

		particle.x += particle.speed.x;
		particle.y += particle.speed.y;

		if (particle.radius > 10)
			particle.radius -= 0.8;
		else
			particles.splice(i,1);

		context.beginPath();
		context.arc(particle.x, particle.y, particle.radius , 0, Math.PI * 2);
		
		context.fillStyle = particle.style;
		context.fill();

	}

}

/** ANIMATION **/ 

var shadow_back_x  = 500,
	shadow_front_x = 1000, 
	shadow_speed   = 1;
	truck_speed    = 1;


function loop() {

	window.requestAnimationFrame( loop );
	context.clearRect(0,0,canvas.width,canvas.height);
	create_particle();
	draw_particles();
	drawing();


	if ( shadow_back_x > 515 || shadow_back_x < 500) 
			shadow_speed *= -1;
		

	if ( back_truck_y > 207 || back_truck_y < 200 ) 
		truck_speed *= -1;
	

	shadow_back_x  += shadow_speed;
	shadow_front_x -= shadow_speed;
	back_truck_y -= truck_speed;
	front_truck_y += truck_speed;
	
}

loop();