//(function () {
function PlayerCar() {};
PlayerCar.prototype = {
	/*
	 * init: initialize player's car
	 * arguments: grid (array), context (of canvas), columnSize (int), marginLeftCars (int), lineSize (int)
	 */
	init: function (grid, context, columnSize, marginLeftCars, lineSize) {
		this.sizeCar = 3; //size (on the table) of the player's car
		this.coord = []; //table in which are coordinates of player's car
		this.position = 2; //position on the line on the beginning (max = number of columns-1)
		this.positionNew = this.position;
		this.images(); //load the images
		this.create(grid, context); //create the car
		this.etat = 1; //player car is actif
		this.dir = "";
		this.touch = "";
		this.xDown = null;                                                        
		this.yDown = null;   
		this.touchTime = null;
		this.singleTap = 10;
		this.gridLength = grid.length;
		this.columnSize = columnSize;
		this.margin = marginLeftCars;
		this.lineSize = lineSize;
	},
	/*
	 * create: create player's car
	 * arguments: grid(array), context (of canvas)
	 */
	create: function(grid, context) {
		for (var i = 0; i < this.sizeCar; i++) {
			var coord = {
				x: this.position,
				y: grid[this.position].length - 1 - i
			}
			this.coord.push(coord);
			if (i == 0) {
				grid[coord.x][coord.y] = 3;
				context.drawImage(this.playerCar3, (coord.x*this.columnSize)+this.margin, coord.y*this.lineSize);
			}
			else if (i == this.sizeCar - 1) {
				grid[coord.x][coord.y] = 1;
				context.drawImage(this.playerCar1, (coord.x*this.columnSize)+this.margin, coord.y*this.lineSize);
			}
			else {
				grid[coord.x][coord.y] = 2;
				context.drawImage(this.playerCar2, (coord.x*this.columnSize)+this.margin, coord.y*this.lineSize);
			}
		}
	},
	/*
	 * images: load images from HTML
	 */
	images: function () {
		this.playerCar1 = document.getElementById('PlayerCar1');
		this.playerCar2 = document.getElementById('PlayerCar2');
		this.playerCar3 = document.getElementById('PlayerCar3');
		this.fire = document.getElementById('fire');
	},
	/*
	 * move: launch the check function and the move function
	 * arguments: grid (array), context (of canvas)
	 */
	move: function(grid, context) {
		this.listenTouch = 1;
		if (window.navigator.msPointerEnabled) {
			window.addEventListener('MSPointerDown', this.handleTouchStart.bind(this), false);
			window.addEventListener('MSPointerMove', this.handleTouchMove.bind(this), false);
			window.addEventListener('MSPointerUp', this.handleTouchEnd.bind(this), false);
		}
		window.addEventListener('touchstart', this.handleTouchStart.bind(this), false);        
		window.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
		window.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
		this.moveKey(grid);
		this.reset(grid);
		if (!this.verifMove(grid)) { this.collision(); }
		else {
			this.position = this.positionNew;
			this.movePlayerCar(grid, context);
		}
	},
	/*
	 * moveKey: detect if right of left keys are pushed
	 * arguments: grid (array)
	 */
	moveKey: function (grid) {
		var self=this;
		window.onkeydown = function (e) {
			"use strict";
			var key = e.keypress || e.which;
			switch (key) {
				case 37: //bouger à gauche
					if (self.position - 1 >= 0) {
						self.positionNew = self.position - 1; //positionNew = nouvelle position
					}
					break;
				case 39: //bouger à droite
					if (self.position + 1 < grid.length) {
						self.positionNew = self.position + 1;
					}
					break;
				default: 
					self.positionNew = self.position;
					break;
				}
		}
	},
	/*
	 * movePlayerCar: move the car to the right and to the left
	 * arguments: grid (array), context (of canvas)
	 */
	movePlayerCar: function (grid, context) {
		for (var i = 0; i < this.sizeCar; i++) {
			var coord = {
				x: this.position,
				y: grid[this.position].length - 1 - i
			}
			this.coord[i] = coord;
			if (i == 0) {
				grid[coord.x][coord.y] = 3; //derrière = 60*38
				context.drawImage(this.playerCar3, (coord.x*this.columnSize)+this.margin, coord.y*this.lineSize);
			}
			else if (i == this.sizeCar - 1) {
				grid[coord.x][coord.y] = 1; //devant = 60*47 (1 cellule = 60*38)
				context.drawImage(this.playerCar1, (coord.x*this.columnSize)+this.margin, coord.y*this.lineSize);
			}
			else {
				grid[coord.x][coord.y] = 2; //milieu = 60*29
				context.drawImage(this.playerCar2, (coord.x*this.columnSize)+this.margin, coord.y*this.lineSize);
			}
		}
	},
	/*
	 * verifMove: verif if the car can be moved to the new direction
	 * return 1 if yes, else return 0
	 */
	verifMove: function (grid) {
		for (var i = 0; i < this.sizeCar; i++) {
			if (grid[this.positionNew][this.coord[i].y] != 0) {
				return 0;
			}
		}
		return 1;
	},
	/*
	 * collision: start the instructions after the collision is done
	 */
	collision: function () {
		this.endGame();
	},
	/*
	 * reset: empty the last position of the car before it was moved
	 */
	reset: function (grid) {
		for (var i = 0; i < this.coord.length; i++) {
			grid[this.coord[i].x][this.coord[i].y] = 0;
		}
	},
	/*
	 * endGame: end the game
	 */
	endGame: function () {
		this.etat = 0;
	},
	/*
	 * get: get an attribute
	 * return the attribute
	 */
	get: function(key) {
		return this[key];
	},
	/*
	 * THOSE FUNCTIONS ARE USED FOR MOBILE DEVICES
	 */
	setListenTouch: function(nb) {
		this.listenTouch = nb;
	},
	handleTouchStart: function(evt) {                                         
		if (window.navigator.msPointerEnabled) {
			this.xDown = evt.clientX;                                      
			this.yDown = evt.clientY; 
		} else {
			this.xDown = evt.touches[0].clientX;                                      
			this.yDown = evt.touches[0].clientY; 
		}
		this.touchTime = new Date().getTime();
	},
	handleTouchMove: function(evt) {
		if (window.navigator.msPointerEnabled) {
			var xUp = evt.clientX;                                    
			var yUp = evt.clientY;
		} else {
			var xUp = evt.touches[0].clientX;                                    
			var yUp = evt.touches[0].clientY;
		}
		var yDiff = this.yDown - yUp;
		var xDiff = this.xDown - xUp;

		/* Avoid problems with non-linear swipe */
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
			if ( xDiff > 0 ) {
				if(this.listenTouch) this.dir = "left";
			} else {
				if(this.listenTouch) this.dir = "right";
			}                       
		} else {
			if ( yDiff > 0 ) {
				if(this.listenTouch) this.dir = "up";
			} else { 
				if(this.listenTouch) this.dir = "down";
			}                                                                 
		}
	},
	handleTouchEnd: function(evt) {
		var self = this;
		var actualTime = new Date().getTime();
		var timeDiff = actualTime-this.touchTime;
		if(timeDiff > this.singleTap) {
			if(this.listenTouch) switch(this.dir) {
					case "left":
						if (self.position - 1 >= 0) {
							self.positionNew = self.position - 1; //positionNew = nouvelle position
						}
						break;
					case "right":
						if (self.position + 1 < this.gridLength) {
							self.positionNew = self.position + 1; //positionNew = nouvelle position
						}
						break;
			}
		}
	}
};
//}) ();