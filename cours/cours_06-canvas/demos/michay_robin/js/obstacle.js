//(function () {
function Obstacle () {};
Obstacle.prototype = {
	/*
	 * init: initialize the obstacle
	 * arguments: position (int), grid (array), color (string), context (of canvas), columnSize (int), marginLeftCars (int), lineSize (int)
	 */
	init: function (position, grid, color, context, columnSize, marginLeftCars, lineSize) {
		this.sizeCar = 3;
		this.coord = [];
		this.position = position;
		this.color = color;
		this.images();
		this.create(grid, context);
		this.etat = 1;
		this.columnSize = columnSize;
		this.marginLeft = marginLeftCars;
		this.lineSize = lineSize;
	},
	/*
	 * create: create the obstacle on the line
	 * arguments : grid (array), context (of canvas)
	 */
	create: function (grid, context) {
		for (var i = 0; i < this.sizeCar; i++) {
			var coord = {
				x:this.position,
				y:i
			}
			this.coord.push(coord);
			if (i == 0) {
				grid[this.position][i] = 3; //derrière
				context.drawImage(this.Img3, (coord.x*this.columnSize)+this.marginLeft, coord.y*this.lineSize);
			}
			else if (i == this.sizeCar - 1) {
				grid[this.position][i] = 1; //devant
			}
			else {
				grid[this.position][i] = 2; //corps
				context.drawImage(this.Img2, (coord.x*this.columnSize)+this.marginLeft, coord.y*this.lineSize);
			}
		}
		context.drawImage(this.Img1, (this.coord[this.sizeCar-1].x*this.columnSize)+this.marginLeft, this.coord[this.sizeCar-1].y*this.lineSize);
	},
	/*
	 * images: load the image of the car
	 */
	images: function () {
		this.Img1 = document.getElementById('Car'+this.color+'1');
		this.Img2 = document.getElementById('Car'+this.color+'2');
		this.Img3 = document.getElementById('Car'+this.color+'3');
	},
	/*
	 * move: launch the check function and the move function
	 */
	move: function (grid, context) {
		if(!this.verifMove(grid)) this.collision(grid);
		else {
			this.reset(grid);
			this.moveObstacle(grid, context);
		}
	},
	/*
	 * verifMove: detect if the player's car and the obstacle have a collision
	 * return 0 if yes, else return 1
	 */
	verifMove: function (grid) {
		if(this.coord.length > 1) {
			if (grid[this.coord[this.coord.length-1].x][this.coord[this.coord.length-1].y+1] && grid[this.coord[this.coord.length-1].x][this.coord[this.coord.length-1].y+1] != 0) return 0;
			else return 1;
		}
		else return 1;
	},
	/*
	 * moveObstacle: move the obstacle to the bottom
	 * arguments : grid (array), context (of canvas)
	 */
	moveObstacle: function (grid, context) {		
		for (var i = 0; i < this.coord.length; i++) {
			if (this.coord[i].y + 1 < grid[this.coord[i].x].length) this.coord[i].y += 1;
			else this.coord.pop();
			if (i == 0) {
				grid[this.position][i] = 3; //derrière
				if (this.coord.length > 0) context.drawImage(this.Img3, (this.coord[i].x*this.columnSize)+this.marginLeft, this.coord[i].y*this.lineSize);
			}
			else if (i == this.sizeCar - 1) {
				grid[this.position][i] = 1; //devant
			}
			else {
				grid[this.position][i] = 2; //corps
				if (this.coord.length > 1) context.drawImage(this.Img2, (this.coord[i].x*this.columnSize)+this.marginLeft, this.coord[i].y*this.lineSize);
			}
		}
		if(this.coord.length > 2) context.drawImage(this.Img1, (this.coord[this.sizeCar-1].x*this.columnSize)+this.marginLeft, this.coord[this.sizeCar-1].y*this.lineSize);
	},
	/*
	 * reset: reset the last position of the obstacle before being moved
	 * arguments : grid (array)
	 */
	reset: function (grid) {
		for (var i = 0; i < this.coord.length; i++) {
			grid[this.coord[i].x][this.coord[i].y] = 0;
		}
	},
	/*
	 * collision: instructions started when there's a collision
	 */
	collision: function () {
		this.endGame();
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
	}
};
//}) ();