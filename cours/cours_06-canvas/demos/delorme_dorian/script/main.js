// ============== LETSGO ================= //

var canvas  = document.querySelector('.canvas'),
	context = canvas.getContext ('2d');


//MOUSE

var mouse = { x : 680, y : 360};
canvas.addEventListener ( 'mousemove',function(e)
{

	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

// =============== STARCREATION =============== //

var coords = [];

function create_star()
{
	var coord = {};
	coord.x       = 1440;
	coord.y       = Math.random() * 900;
	coord.width   = 10;
	coord.speed   = {};
	coord.speed.x = 20;
	coord.speed.y = 0;
	coord.style   = 'white';
	coords.push( coord );
}
	
function star ()
{	
	context.clearRect( 0, 0, canvas.width, canvas.height );
		for (var i = 0; i < coords.length; i++ )
		{
			var coord = coords [i];

			coord.x += -coord.speed.x;
			coord.y += coord.speed.y;

			context.beginPath();
			context.rect(coord.x,coord.y,20,5);
			context.rect(coord.x+7,coord.y-7,5,20);
			context.fillStyle = coord.style;
			context.fill();	
		}

}

// ============== DRAW NYAN ================ //
var tails = [];

function create_tail()
{
	var tail     = {};
	tail.x       = mouse.x;
	tail.y       = mouse.y;
	tail.width   = 10;
	tails.push( tail );

}

function draw()
	{
		
		for (var i = 0; i < tails.length; i++ )
		{
			var tail = tails [i];

			tail.x += -80;
			tail.y += 0;
			tail.width++;

// ============== NYANCATTAIL ================= //

			context.beginPath();
			context.fillStyle = '#ff0000';
			context.fillRect(tail.x,tail.y-45,40,15);
			context.fillStyle = '#ff9900';
			context.fillRect(tail.x,tail.y-30,40,15);
			context.fillStyle = '#ffff00';
			context.fillRect(tail.x,tail.y-15,40,15);
			context.fillStyle = '#33ff00';
			context.fillRect(tail.x,tail.y,40,15);
			context.fillStyle = '#0099ff';
			context.fillRect(tail.x,tail.y+15,40,15);
			context.fillStyle = '#6633ff';
			context.fillRect(tail.x,tail.y+30,40,15);

			context.fillStyle = '#ff0000';
			context.fillRect(tail.x+40,tail.y-40,40,15);
			context.fillStyle = '#ff9900';
			context.fillRect(tail.x+40,tail.y-25,40,15);
			context.fillStyle = '#ffff00';
			context.fillRect(tail.x+40,tail.y-10,40,15);
			context.fillStyle = '#33ff00';
			context.fillRect(tail.x+40,tail.y+5,40,15);
			context.fillStyle = '#0099ff';
			context.fillRect(tail.x+40,tail.y+20,40,15);
			context.fillStyle = '#6633ff';
			context.fillRect(tail.x+40,tail.y+35,40,15);

		}
	}

function nyan()
	{
		// ==============    NYANCAT    ================= //
		
		//back
	
		context.beginPath();
		context.fillStyle = '#ffcc99';
		context.fillRect(mouse.x-10,mouse.y-55,150,120);

		//top

		context.fillStyle = '#ff99ff';
		context.fillRect(mouse.x,mouse.y-45,130,100);


		//border

		context.fillStyle = 'black';
		context.fillRect(mouse.x-20,mouse.y-45,10,110);
		context.fillRect(mouse.x-10,mouse.y-55,10,10);
		context.fillRect(mouse.x,mouse.y-65,130,10);
		context.fillRect(mouse.x+130,mouse.y-55,10,10);
		context.fillRect(mouse.x-10,mouse.y+55,10,10);
		context.fillRect(mouse.x,mouse.y+65,140,10);;
		context.fillRect(mouse.x+140,mouse.y-45,10,110);
		context.fillRect(mouse.x-10,mouse.y+65,10,10);

		//marmelade

		context.fillStyle = '#ff3399';
		context.fillRect(mouse.x+15,mouse.y-25,10,10);
		context.fillRect(mouse.x+55,mouse.y-25,10,10);
		context.fillRect(mouse.x+85,mouse.y-35,10,10);
		context.fillRect(mouse.x+45,mouse.y,10,10);
		context.fillRect(mouse.x+20,mouse.y+35,10,10);
		context.fillRect(mouse.x+55,mouse.y+25,10,10);
		context.fillRect(mouse.x+10,mouse.y+15,10,10);
		context.fillRect(mouse.x+100,mouse.y-15,10,10);
		context.fillRect(mouse.x+30,mouse.y,10,10);
		context.fillRect(mouse.x+40,mouse.y-40,10,10);
		context.fillRect(mouse.x+45,mouse.y+40,10,10);

		//eraser_topleft

		context.fillStyle = '#ffcc99';
		context.fillRect(mouse.x,mouse.y-45,10,10);
		context.fillRect(mouse.x,mouse.y-35,10,10);
		context.fillRect(mouse.x+10,mouse.y-45,10,10);
	
		//eraser_bottomleft

		context.fillRect(mouse.x,mouse.y+35,10,10);
		context.fillRect(mouse.x+10,mouse.y+45,10,10);
		context.fillRect(mouse.x,mouse.y+45,10,10);
	
		//eraser_topright

		context.fillRect(mouse.x+120,mouse.y-45,10,10);
		context.fillRect(mouse.x+120,mouse.y-35,10,10);
		context.fillRect(mouse.x+110,mouse.y-45,10,10);
	
		//PAW FORWARD RIGHT

		context.fillStyle = '#a6a6a6';
		context.fillRect(mouse.x+80,mouse.y+75,20,10);
	
		context.fillStyle = 'black';
		context.fillRect(mouse.x+80,mouse.y+85,20,10);
		context.fillRect(mouse.x+70,mouse.y+75,10,20);
		context.fillRect(mouse.x+100,mouse.y+75,10,10);
	
		// PAW FORWARD LEFT 

		context.fillStyle = '#a6a6a6';
		context.fillRect(mouse.x+130,mouse.y+75,20,10);
		context.fillRect(mouse.x+140,mouse.y+65,10,10);
	
		context.fillStyle = 'black';
		context.fillRect(mouse.x+130,mouse.y+85,20,10);
		context.fillRect(mouse.x+120,mouse.y+75,10,10);
		context.fillRect(mouse.x+150,mouse.y+65,10,30);
	
		// PAW BACK LEFT

		context.fillStyle = '#a6a6a6';
		context.fillRect(mouse.x+20,mouse.y+75,20,10);
	
		context.fillStyle = 'black';
		context.fillRect(mouse.x+20,mouse.y+85,20,10);
		context.fillRect(mouse.x+10,mouse.y+75,10,20);
		context.fillRect(mouse.x+40,mouse.y+75,10,10);
	
		// PAW BACK RIGHT

		context.fillStyle = '#a6a6a6';
		context.fillRect(mouse.x-40,mouse.y+65,30,10);
		context.fillRect(mouse.x-30,mouse.y+55,10,10);
		context.fillRect(mouse.x-40,mouse.y+75,20,10);
	
		context.fillStyle = 'black';
		context.fillRect(mouse.x-50,mouse.y+65,10,20);
		context.fillRect(mouse.x-50,mouse.y+85,30,10);
		context.fillRect(mouse.x-20,mouse.y+75,10,10);
		context.fillRect(mouse.x-40,mouse.y+55,10,10);
		context.fillRect(mouse.x-30,mouse.y+45,10,10);
	
		//TAIL

		context.fillStyle = '#a6a6a6';
		context.fillRect(mouse.x-40,mouse.y-5,20,20);
		context.fillRect(mouse.x-60,mouse.y-5,20,10);
		context.fillRect(mouse.x-70,mouse.y-25,20,20);
	
		context.fillStyle = 'black';
		context.fillRect(mouse.x-40,mouse.y+15,20,10);
		context.fillRect(mouse.x-50,mouse.y-15,30,10);
		context.fillRect(mouse.x-60,mouse.y+5,20,10);
		context.fillRect(mouse.x-70,mouse.y-5,10,10);
		context.fillRect(mouse.x-80,mouse.y-25,10,20);
		context.fillRect(mouse.x-70,mouse.y-35,20,10);
		context.fillRect(mouse.x-50,mouse.y-25,10,10);
	

		// HEAD STROKE

		context.fillRect(mouse.x+100,mouse.y-25,40,10);
		context.fillRect(mouse.x+90,mouse.y-35,10,10);
		context.fillRect(mouse.x+140,mouse.y-35,10,10);
		context.fillRect(mouse.x+150,mouse.y-45,10,10);
		context.fillRect(mouse.x+160,mouse.y-55,20,10);
		context.fillRect(mouse.x+180,mouse.y-45,10,30);
		context.fillRect(mouse.x+190,mouse.y-15,10,50);
		context.fillRect(mouse.x+180,mouse.y+35,10,10);
		context.fillRect(mouse.x+170,mouse.y+45,10,10);
		context.fillRect(mouse.x+70,mouse.y+55,100,10);
		context.fillRect(mouse.x+80,mouse.y-45,10,10);
		context.fillRect(mouse.x+60,mouse.y-55,20,10);
		context.fillRect(mouse.x+50,mouse.y-45,10,30);
		context.fillRect(mouse.x+40,mouse.y-15,10,50);
		context.fillRect(mouse.x+50,mouse.y+35,10,10);
		context.fillRect(mouse.x+60,mouse.y+45,10,10);
	

		// HEAD FILL

		context.fillStyle = '#999999';
		context.fillRect(mouse.x+70,mouse.y-5,100,60);
		context.fillRect(mouse.x+50,mouse.y-5,20,40);
		context.fillRect(mouse.x+170,mouse.y-5,20,40);
		context.fillRect(mouse.x+60,mouse.y-35,20,30);
		context.fillRect(mouse.x+160,mouse.y-35,20,30);
		context.fillRect(mouse.x+150,mouse.y-25,10,20);
		context.fillRect(mouse.x+80,mouse.y-25,10,20);
		context.fillRect(mouse.x+90,mouse.y-15,10,10);
		context.fillRect(mouse.x+140,mouse.y-15,10,10);
		context.fillRect(mouse.x+60,mouse.y+35,120,10);
		context.fillRect(mouse.x+100,mouse.y-15,40,10);
		context.fillRect(mouse.x+150,mouse.y-35,10,20);
		context.fillRect(mouse.x+160,mouse.y-45,20,10);
		context.fillRect(mouse.x+60,mouse.y-45,20,10);
		context.fillRect(mouse.x+80,mouse.y-35,10,10);
		context.fillRect(mouse.x+90,mouse.y-25,10,10);
		context.fillRect(mouse.x+50,mouse.y-15,140,10);
		context.fillRect(mouse.x+140,mouse.y-25,10,10);
		
		// HEAD CONTENT

		context.fillStyle = 'black';
		context.fillRect(mouse.x+150,mouse.y-5,20,20);
		context.fillRect(mouse.x+80,mouse.y-5,20,20);
		context.fillRect(mouse.x+130,mouse.y+5,10,10);
		context.fillRect(mouse.x+90,mouse.y+35,70,10);
		context.fillRect(mouse.x+90,mouse.y+25,10,20);
		context.fillRect(mouse.x+150,mouse.y+25,10,20);
		context.fillRect(mouse.x+120,mouse.y+25,10,20);
	
		context.fillStyle = '#FFFFFF';
		context.fillRect(mouse.x+150,mouse.y-5,10,10); 	
		context.fillRect(mouse.x+80,mouse.y-5,10,10);
	
		context.fillStyle = '#ff9999';
		context.fillRect(mouse.x+170,mouse.y+15,20,20);
		context.fillRect(mouse.x+60,mouse.y+15,20,20);

}
		
	// reference x : 635
	// reference y : 415 

function text()
{
	var text =  'NYAN CAT RACER';

	context.fillStyle = 'hsl(' + ( Math.random() * 360 ) + ',100%,50%)';
	context.font = '100px Arial';
	context.textAlign =  'center';
	context.textBaseLine = 'top';
	context.fillText(text, 700, 150);
	context.lineWidth = 2;	
	context.strokeStyle = 'black';
	context.strokeText(text,700,150);
}

// ============== LOOP ================= //


function loop() 
{
	window.requestAnimationFrame( loop );
	create_tail();
	create_star();
	star();
	draw();
	nyan();
	text();
}
loop();





































