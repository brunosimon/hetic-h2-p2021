//(function () {
var longueur = 40, //number of line, DO NOT TOUCH (except if you know what you're doing), default:40
	largeur = 5, //number of columns, default:5
	canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	pause = document.getElementById("pause"),
	play = document.getElementById("play"),
	divScore = document.getElementById("score"),
	divCanvas = document.getElementById("divCanvas"),
	divEnd = document.getElementById("divEnd"),
	grille = [],
	columnSize = parseInt(canvas.getAttribute('width')) / largeur,
	marginLeftCars = (columnSize/3.5),
	lineSize = parseInt(canvas.getAttribute('height')) / longueur,
	bgColor = "2a2a33", // background color
	lineColor = "0590c3", // lines color (qui séparent la route)
	speed = 30, //game speed (ms)
	speedLimit = 20, //max speed of the game (here 20ms)
	speedIncrGame = 2, // value of speed increasing (ms)
	speedObstSpawn = 900, // speed of Obstacles' spawn
	speedIncrObstSpawn = 100, // increasing speed of Obstacles' spawn
	speedObstSpawnLimit = 300, // max speed of Obstacles' spawn
	speedIncrInt = 15000, // wait time before speed level (obstacles are faster and spawn faster)
	nbObstMaxScreen = 20, // max number of obstacles on the screen (this is used to re-write cars passed)
	nbObstMaxLine = 4, //max number of obstacles on the line
	obstaclesArray = [], //array containing every obstacles' objects
	compteurObst = 0,
	stateGame = 1, //state of the game (0:stopped, 1:playing, 2:paused)
	score = [],
	speedScore = 100, //speed of score increase
	speedIncrScore = 100, //value of the score increase (100 = +1 so 10 = +0.10 each second)
	scoreDecimal = 0, //1 if you wanna see the numbers after the "," or 0 if you don't
	pointType = "", //type of the point, example : "YOU WON 5 €", here it's the currency (€)
	playerCar = new PlayerCar(), //player's car object
	scoreInt = "",
	playerCarInt = "",
	obstSpawnInt = "",
	colors = ["Blue", "Green", "Orange", "Pink", "Purple", "Red"]; //colors of the cars

divScore.innerHTML = score;

/*
 * init: initialize the grid and the player's car
 */

function init () {
	for (var i = 0; i < largeur; i++) {
		grille[i] = [];
		for (var j = 0; j < longueur; j++) {
			grille[i][j] = 0;
		}
	}
	for (var i = 0; i < nbObstMaxScreen; i++) {
		obstaclesArray[i] = new Obstacle();
	}
	playerCar.init(grille, context, columnSize, marginLeftCars, lineSize);
	for (var i = 0; i < 2; i++) {
		score[i] = 0;
	}
	divScore.innerHTML="0 "+pointType;
}

/*
 * background: create the background and the lines separating the columns
 */

function background () {
	context.fillStyle = "#" + bgColor;
	context.globalAlpha = 1;
	context.fillRect(0,0,canvas.width,canvas.height); //taille colonnes : 180 +2+ 192 +2+ 192 +2+ 180
	context.fillStyle = "#" + lineColor;
	context.globalAlpha = 0.5;
	for (var i = 0; i < largeur; i++) {
		context.fillRect(columnSize + (i*columnSize), 200, 2, 1300);
	}
	context.globalAlpha = 1;
}

/*
 * endGame: stop the game
 */

function endGame () {
	stateGame = 0;
	clearInterval(increaseSpeedInt);
	clearInterval(playerCarInt);
	clearInterval(obstSpawnInt);
	clearInterval(scoreInt);
	setTimeout(endScreen(), 100);
}

/*
 * pauseGame: pause the game
 */

function pauseGame () {
	if (stateGame == 1) {
		stateGame = 2;
		clearInterval(increaseSpeedInt);
		clearInterval(playerCarInt);
		clearInterval(obstSpawnInt);
		clearInterval(scoreInt);
		pause.style.display = "none";
		play.style.display = "block";
		playerCar.listenTouch = 0;
	}
}

/*
 * endScreen: show the final screen
 */

function endScreen () {
	if(scoreDecimal) document.getElementById('prix').innerHTML = score[1]+"."+score[0]+" "+pointType;
	else document.getElementById('prix').innerHTML = score[1]+" "+pointType;
	divEnd.classList.add('transit');
	divEnd.classList.remove('divEnd');
}

/*
 * newObst: create the obstacles on the line
 */

function newObst () {
	var positionArray = [];
	for (var i = 0; i < nbObstMaxLine; i++) {
		var position = Math.floor(Math.random()*largeur);
		if (positionArray.lastIndexOf(position) == -1) positionArray.push(position);
	}
	for (var i = 0; i < positionArray.length; i++) {
		obstaclesArray[(i + compteurObst) % nbObstMaxScreen].init(positionArray[i], grille, randomColors(), context, columnSize, marginLeftCars, lineSize);
	}
	compteurObst += positionArray.length;
}

/*
 * obstMove: move the obstacles to the bottom
 */

function obstMove () {
	for (var i = 0; i < compteurObst && i < nbObstMaxScreen; i++) {
		obstaclesArray[i].move(grille, context);
	}
}

/*
 * randomColors: give a random color
 * return "string" (1 alea cell from colors table)
 */

function randomColors () {
	return colors[Math.floor(Math.random()*colors.length)];
}

/*
 * verifEndGame: verif if the game is really over, then end the game
 */

function verifEndGame () {
	if(!playerCar.get("etat")) endGame();
	for (var i = 0; i < compteurObst && i < nbObstMaxScreen; i++) {
		if(!obstaclesArray[i].get("etat")) endGame();
	}
}

/*
 * increaseSpeedGame: increase the speed of the game
 */

function increaseSpeedGame () {
	clearInterval(playerCarInt);
	if (speed - speedIncrGame >= speedLimit) speed -= speedIncrGame;
	else speed = speedLimit;
	playerCarInt = setInterval(function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		background();
		playerCar.move(grille, context);
		obstMove();
		verifEndGame();
	}, speed);
}

/*
 * increaseSpeedObstSpawn: increase the speed of the obstacles' spawn
 */

function increaseSpeedObstSpawn () {
	clearInterval(obstSpawnInt);
	if (speedObstSpawn - speedIncrObstSpawn >= speedObstSpawnLimit) speedObstSpawn -= speedIncrObstSpawn;
	else speedObstSpawn = speedObstSpawnLimit;
	obstSpawnInt = setInterval(function () {
		newObst();
	}, speedObstSpawn);
}

/*
 * increaseScore: increase the score
 */

function increaseScore () {
	if (score[0] + speedIncrScore > 99) {
		score[1] += parseInt((score[0] + speedIncrScore)/100);
	}
	score[0] = (score[0] + speedIncrScore) % 100;
	if (scoreDecimal) return score[1]+"."+score[0]+" "+pointType;
	else return score[1]+" "+pointType;
}

/*
 * startGame: launch the game
 */

function startGame () {
	if (stateGame != 0) {
		increaseSpeedInt = setInterval(function () {
			increaseSpeedGame();
			increaseSpeedObstSpawn();
		}, speedIncrInt);
		obstSpawnInt = setInterval(function () {
			newObst();
		}, speedObstSpawn);
		playerCarInt = setInterval(function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.beginPath();
			background();
			playerCar.move(grille, context);
			obstMove();
			verifEndGame();
		}, speed);
		scoreInt = setInterval (function () {
			divScore.innerHTML = increaseScore();
		}, speedScore);
		stateGame = 1;
		play.style.display = "none";
		pause.style.display = "block";
	}
}

init();
background();
startGame();
//}) ();
