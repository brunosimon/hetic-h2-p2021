var canvas  = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    lost    = document.querySelector('.lost'),
    score   = 1;

lost.addEventListener('click', function()
{
    lost.style.display = 'none';
    score = 1;
    location.reload();
});


/* MOUSE */


 var mouse = {};
 canvas.addEventListener( 'mousemove', function( event )
 {
     mouse.x =  event.pageX - this.offsetLeft;
     mouse.y =  event.pageY - this.offsetTop;
 });

 function draw_cursor()
 {
     context.beginPath();
     context.arc( mouse.x, mouse.y, 8, 0, Math.PI * 2);
     context.fillStyle = '#ff4a80';
     context.fill();
 }


/* BALLS */


var balls = [];
function create_balls()
{
    for (var i = 0; i < 10; i++)
    {
        var ball = {};
        ball.x = Math.round(Math.random() * canvas.width);
        ball.y = Math.round(Math.random() * canvas.height);
        ball.speed = Math.ceil(Math.random() * 5);

        balls.push(ball);
    }
}
create_balls();

function draw_balls()
{
    for (var i = 0; i < balls.length; i++)
    {
        var pos = {};
        pos.x = balls[i].x;
        pos.y = balls[i].y;

        context.beginPath();
        context.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
        context.fillStyle = '#aaaaaa';
        context.fill();
    }
}

function update()
{
    window.requestAnimationFrame(update);
    for (var i = 0; i < balls.length; i++)
    {
        update_ball = balls[i];
        update_ball.y += update_ball.speed;

        if (update_ball.y > canvas.height )
        {
            update_ball.x = Math.round(Math.random() * canvas.width);
            update_ball.y = 0;
            update_ball.speed = Math.ceil(Math.random() * 5);
        }
        context.beginPath();
        context.arc(update_ball.x, update_ball.y, 8, 0, Math.PI * 2);
        context.fillStyle = '#aaaaaa';
        context.fill();
    }
}
update();


/* COLLISION */


function collision()
{
    for (var i = 0; i < balls.length; i++)
    {
        if (balls[i].x - 16 <= mouse.x &&
            balls[i].x + 16 >= mouse.x &&
            balls[i].y - 16 <= mouse.y &&
            balls[i].y + 16 >= mouse.y)
        {
            lost.style.display = 'block';
        }
    }
}


/* SCORE */


function score_update()
{
  create_balls();
  context.beginPath();
  score++;
}

function draw_score()
{
  var score_display = "LVL " + score;
  context.beginPath();
  context.fillStyle = "#ff4a80";
  context.font="30px Arial";
  context.fillText(score_display, 20, 50);
}

setInterval(score_update, 6000);


 /* LOOP */
 function loop()
 {
 context.clearRect(0,0,canvas.width,canvas.height);
     window.requestAnimationFrame(loop);
     draw_cursor();
     draw_balls();
     collision();
     draw_score();
 }
 loop();
