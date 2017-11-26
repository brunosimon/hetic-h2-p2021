var score_content = document.querySelector('.score');
var score = 0;

var lives_content = document.querySelector('.lives');
var lives = 3;

var home = document.querySelector('.home');
var lose_page = document.querySelector('.lose_page');
var lose_score = document.querySelector('.lose_page h1');
var lose_replay = document.querySelector('.lose_page a');


var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d');

canvas.style.display = "none";
score_content.style.display = "none";
lives_content.style.display = "none";
home.style.display = "block";
lose_page.style.display = "none";

var button_play = document.querySelector('.home a')

button_play.addEventListener("click", function(){
    canvas.style.display = "block";
    score_content.style.display = "block";
    lives_content.style.display = "block";
    home.style.display = "none";
});

/**
 * RESIZE
 */

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

/**
 * MOUSE
 */

var mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

// Controls key

var keyboard = {};
keyboard.values = {};
keyboard.values.left = false;
keyboard.values.right = false;
keyboard.values.up = false;

// SpaceShip Position 

var spaceship = {};

spaceship.rotation = 0;

spaceship.velocity = {};
spaceship.velocity.x = Math.sin(spaceship.rotation);
spaceship.velocity.y = -Math.cos(spaceship.rotation);

spaceship.move = {};
spaceship.move.x = 0;
spaceship.move.y = 0;

spaceship.hitbox = {};

// Action on keycode

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 37) {
        e.preventDefault();
        keyboard.values.left = true;
    } if (e.keyCode == 39) {
        e.preventDefault();
        keyboard.values.right = true;
    }

    if (e.keyCode == 38) {
        e.preventDefault();
        keyboard.values.up = true;
    }
    if (e.keyCode == 32)
    {
        e.preventDefault();
        keyboard.values.shoot = true;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.keyCode == 37) {
        e.preventDefault();
        keyboard.values.left = false;
    } else if (e.keyCode == 39) {
        e.preventDefault();
        keyboard.values.right = false;
    }

    if (e.keyCode == 38) {
        e.preventDefault();
        keyboard.values.up = false;
    }
    if (e.keyCode == 32)
    {
        e.preventDefault();
        keyboard.values.shoot = false;
    }
});

// Game Over

function lose()
{
    if (lives < 0)
    {
        lose_page.style.display = "block";
        lose_score.innerHTML = "Ton score = " + score;
        canvas.style.display = "none";
        score_content.style.display = "none";
        lives_content.style.display = "none";
        home.style.display = "none";
        lose_replay.addEventListener("click", function(){
            location.reload()
        });
    }
}

// Movement ship

function moveShip() {
    if (keyboard.values.left) {
        spaceship.rotation -= Math.PI * 0.02;

    } else if (keyboard.values.right) {
        spaceship.rotation += Math.PI * 0.02;
    }

    spaceship.velocity.x = (Math.sin(spaceship.rotation)) * 3;
    spaceship.velocity.y = (-Math.cos(spaceship.rotation)) * 3;

    if (keyboard.values.up) {
        spaceship.velocity.y *= 1.5;
        spaceship.velocity.x *= 1.5;
        spaceship.move.y += spaceship.velocity.y;
        spaceship.move.x += spaceship.velocity.x;
    }
}

// Red particles

var particles = [];

function add_particle() {

    for (var i = 0; i <= canvas.height; i += canvas.height) {

        var particle = {};
        particle.x = Math.random() * canvas.width;
        particle.y = i;

        particle.color = 'red';

        particle.radius = 20;

        particle.hitbox = {};

        particles.push(particle);
        for (var j = 0; j <= canvas.width; j += canvas.width) {

            var particle = {};
            particle.x = j;
            particle.y = Math.random() * canvas.height;

            particle.color = 'red';

            particle.radius = 20;

            particle.hitbox = {};

            particles.push(particle);
        }
    }
}

// Shield

var particles_blue = [];

function add_particle_blue() {

        var particle_blue = {};
        particle_blue.x = Math.random() * canvas.width;
        particle_blue.y = Math.random() * canvas.height;

        particle_blue.color = 'blue';

        particle_blue.radius = 10;

        particle_blue.hitbox = {};

        particles_blue.push(particle_blue);
}

function update_particles_blue() {
    for (var i = 0; i < particles_blue.length; i++) {
        var _particle_blue = particles_blue[i];

         _particle_blue.x += Math.cos(Math.atan2(spaceship.move.y - _particle_blue.y, spaceship.move.x - _particle_blue.x)) * 2;
        _particle_blue.y += Math.sin(Math.atan2(spaceship.move.y - _particle_blue.y, spaceship.move.x - _particle_blue.x)) * 2;

        _particle_blue.hitbox.minX = _particle_blue.x - 10;
        _particle_blue.hitbox.maxX = _particle_blue.x + 10;
        _particle_blue.hitbox.minY = _particle_blue.y - 10;
        _particle_blue.hitbox.maxY = _particle_blue.y + 10;

        spaceship.hitbox.minX = spaceship.move.x - 18;
        spaceship.hitbox.maxX = spaceship.move.x + 18;
        spaceship.hitbox.minY = spaceship.move.y - 18;
        spaceship.hitbox.maxY = spaceship.move.y + 18;

        if (
            _particle_blue.x < 0 ||
            _particle_blue.x > canvas.width ||
            _particle_blue.y < 0 ||
            _particle_blue.y > canvas.height
        ) {
            particles_blue.splice(i, 1);
            i--;
        }
        if (spaceship.hitbox.maxX > _particle_blue.hitbox.minX && spaceship.hitbox.minX < _particle_blue.hitbox.maxX && spaceship.hitbox.maxY > _particle_blue.hitbox.minY && spaceship.hitbox.minY < _particle_blue.hitbox.maxY) {
                particles_blue.splice(i, 1);
                canvas.classList.add('shield'); 
                time_shield = 600;
                score += 50;
                return score;
        }
    }
}

function draw_particles_blue() {

    for (var i = 0; i < particles_blue.length; i++) {
        var _particle_blue = particles_blue[i];

        context.beginPath();
        context.arc(_particle_blue.x, _particle_blue.y, _particle_blue.radius, 0, Math.PI * 2);
        context.fillStyle = _particle_blue.color;
        context.fill();
    }
}

// Lives glob

var particles_green = [];

function add_particle_green() {

        var particle_green = {};
        particle_green.x = Math.random() * canvas.width;
        particle_green.y = Math.random() * canvas.height;

        particle_green.color = 'green';

        particle_green.radius = 10;

        particle_green.hitbox = {};

        particles_green.push(particle_green);
}

function update_particles_green() {
    for (var i = 0; i < particles_green.length; i++) {
        var _particle_green = particles_green[i];

         _particle_green.x += Math.cos(Math.atan2(spaceship.move.y - _particle_green.y, spaceship.move.x - _particle_green.x)) * 2;
        _particle_green.y += Math.sin(Math.atan2(spaceship.move.y - _particle_green.y, spaceship.move.x - _particle_green.x)) * 2;

        _particle_green.hitbox.minX = _particle_green.x - 10;
        _particle_green.hitbox.maxX = _particle_green.x + 10;
        _particle_green.hitbox.minY = _particle_green.y - 10;
        _particle_green.hitbox.maxY = _particle_green.y + 10;

        spaceship.hitbox.minX = spaceship.move.x - 18;
        spaceship.hitbox.maxX = spaceship.move.x + 18;
        spaceship.hitbox.minY = spaceship.move.y - 18;
        spaceship.hitbox.maxY = spaceship.move.y + 18;

        if (
            _particle_green.x < 0 ||
            _particle_green.x > canvas.width ||
            _particle_green.y < 0 ||
            _particle_green.y > canvas.height
        ) {
            particles_green.splice(i, 1);
            i--;
        }
        if (spaceship.hitbox.maxX > _particle_green.hitbox.minX && spaceship.hitbox.minX < _particle_green.hitbox.maxX && spaceship.hitbox.maxY > _particle_green.hitbox.minY && spaceship.hitbox.minY < _particle_green.hitbox.maxY) {
                particles_green.splice(i, 1);
                lives += 1;
                score += 50;
                return score;
                return lives;
        }
    }
}

function draw_particles_green() {

    for (var i = 0; i < particles_green.length; i++) {
        var _particle_green = particles_green[i];

        context.beginPath();
        context.arc(_particle_green.x, _particle_green.y, _particle_green.radius, 0, Math.PI * 2);
        context.fillStyle = _particle_green.color;
        context.fill();
    }
}

// Speedy Ship

var particles_yellow = [];

function add_particle_yellow() {

    for (var i = 0; i <= canvas.height; i += canvas.height) {

        var particle_yellow = {};
        particle_yellow.lives = 3;
        particle_yellow.x = Math.random() * canvas.width;
        particle_yellow.y = i;

        particle_yellow.color = 'yellow';

        particle_yellow.radius = 15;

        particle_yellow.hitbox = {};

        particles_yellow.push(particle_yellow);
        for (var j = 0; j <= canvas.width; j += canvas.width) {

            var particle_yellow = {};
            particle_yellow.lives = 2;
            particle_yellow.x = j;
            particle_yellow.y = Math.random() * canvas.height;

            particle_yellow.color = 'yellow';

            particle_yellow.radius = 15;

            particle_yellow.hitbox = {};

            particles_yellow.push(particle_yellow);
        }
    }
}

function update_particles_yellow() {
    for (var i = 0; i < particles_yellow.length; i++) {
        var _particle_yellow = particles_yellow[i];

         _particle_yellow.x += Math.cos(Math.atan2(spaceship.move.y - _particle_yellow.y, spaceship.move.x - _particle_yellow.x)) * 2;
        _particle_yellow.y += Math.sin(Math.atan2(spaceship.move.y - _particle_yellow.y, spaceship.move.x - _particle_yellow.x)) * 2;

        _particle_yellow.hitbox.minX = _particle_yellow.x - 13;
        _particle_yellow.hitbox.maxX = _particle_yellow.x + 13;
        _particle_yellow.hitbox.minY = _particle_yellow.y - 13;
        _particle_yellow.hitbox.maxY = _particle_yellow.y + 13;

        spaceship.hitbox.minX = spaceship.move.x - 18;
        spaceship.hitbox.maxX = spaceship.move.x + 18;
        spaceship.hitbox.minY = spaceship.move.y - 18;
        spaceship.hitbox.maxY = spaceship.move.y + 18;

        if (
            _particle_yellow.x < 0 ||
            _particle_yellow.x > canvas.width ||
            _particle_yellow.y < 0 ||
            _particle_yellow.y > canvas.height
        ) {
            particles_yellow.splice(i, 1);
            i--;
        }
        if (spaceship.hitbox.maxX > _particle_yellow.hitbox.minX && spaceship.hitbox.minX < _particle_yellow.hitbox.maxX && spaceship.hitbox.maxY > _particle_yellow.hitbox.minY && spaceship.hitbox.minY < _particle_yellow.hitbox.maxY) {
                 if (canvas.classList.contains('shield'))
                {

                }
                else
                {
                    particles_yellow.splice(i, 1);
                    lives -= 1;
                }
        }
    }
}

function draw_particles_yellow() {

    for (var i = 0; i < particles_yellow.length; i++) {
        var _particle_yellow = particles_yellow[i];

        context.beginPath();
        context.arc(_particle_yellow.x, _particle_yellow.y, _particle_yellow.radius, 0, Math.PI * 2);
        context.fillStyle = _particle_yellow.color;
        context.fill();
    }
}

// Fatty ship

var particles_orange = [];

function add_particle_orange() {

    for (var i = 0; i <= canvas.height; i += canvas.height) {

        var particle_orange = {};
        particle_orange.lives = 5;
        particle_orange.x = Math.random() * canvas.width;
        particle_orange.y = i;

        particle_orange.color = 'orange';

        particle_orange.radius = 30;

        particle_orange.hitbox = {};

        particles_orange.push(particle_orange);
        for (var j = 0; j <= canvas.width; j += canvas.width) {

            var particle_orange = {};
            particle_orange.lives = 2;
            particle_orange.x = j;
            particle_orange.y = Math.random() * canvas.height;

            particle_orange.color = 'orange';

            particle_orange.radius = 30;

            particle_orange.hitbox = {};

            particles_orange.push(particle_orange);
        }
    }
}

function update_particles_orange() {
    for (var i = 0; i < particles_orange.length; i++) {
        var _particle_orange = particles_orange[i];

         _particle_orange.x += Math.cos(Math.atan2(spaceship.move.y - _particle_orange.y, spaceship.move.x - _particle_orange.x)) * 0.5;
        _particle_orange.y += Math.sin(Math.atan2(spaceship.move.y - _particle_orange.y, spaceship.move.x - _particle_orange.x)) * 0.5;

        _particle_orange.hitbox.minX = _particle_orange.x - 28;
        _particle_orange.hitbox.maxX = _particle_orange.x + 28;
        _particle_orange.hitbox.minY = _particle_orange.y - 28;
        _particle_orange.hitbox.maxY = _particle_orange.y + 28;

        spaceship.hitbox.minX = spaceship.move.x - 18;
        spaceship.hitbox.maxX = spaceship.move.x + 18;
        spaceship.hitbox.minY = spaceship.move.y - 18;
        spaceship.hitbox.maxY = spaceship.move.y + 18;

        if (
            _particle_orange.x < 0 ||
            _particle_orange.x > canvas.width ||
            _particle_orange.y < 0 ||
            _particle_orange.y > canvas.height
        ) {
            particles_orange.splice(i, 1);
            i--;
        }
        if (spaceship.hitbox.maxX > _particle_orange.hitbox.minX && spaceship.hitbox.minX < _particle_orange.hitbox.maxX && spaceship.hitbox.maxY > _particle_orange.hitbox.minY && spaceship.hitbox.minY < _particle_orange.hitbox.maxY) {
                 if (canvas.classList.contains('shield'))
                {

                }
                else
                {
                    particles_orange.splice(i, 1);
                    lives -= 1;
                }
        }
    }
}

function draw_particles_orange() {

    for (var i = 0; i < particles_orange.length; i++) {
        var _particle_orange = particles_orange[i];

        context.beginPath();
        context.arc(_particle_orange.x, _particle_orange.y, _particle_orange.radius, 0, Math.PI * 2);
        context.fillStyle = _particle_orange.color;
        context.fill();
    }
}

// Shot

bullets = [];
function bullet()
{
    if (keyboard.values.shoot) {
        
        var bullet = {};

        bullet.x = spaceship.move.x + Math.sin(spaceship.rotation) * 25;
        bullet.y = spaceship.move.y - Math.cos(spaceship.rotation) * 25;
        bullet.velocity = {};
        bullet.velocity.x = Math.sin(spaceship.rotation) * 10;
        bullet.velocity.y = - Math.cos(spaceship.rotation) * 10;

        bullet.color = "white";

        bullet.radius = 5;

        bullet.hitbox = {};

        bullets.push(bullet);

    }   
}

function update_bullet()
{
    for (var i = 0; i < bullets.length; i++) {
        var _bullet = bullets[i];

        _bullet.x += _bullet.velocity.x ;
        _bullet.y += _bullet.velocity.y ;

        _bullet.hitbox.minX = _bullet.x - 5;
        _bullet.hitbox.maxX = _bullet.x + 5;
        _bullet.hitbox.minY = _bullet.y - 5;
        _bullet.hitbox.maxY = _bullet.y + 5;

        if (
            _bullet.x < 0 ||
            _bullet.x > canvas.width ||
            _bullet.y < 0 ||
            _bullet.y > canvas.height
        ) {
            bullets.splice(i, 1);
            i--;
        }

        for (var j = 0; j < particles.length; j++) {
            var _particle = particles[j];
            if (_bullet.hitbox.maxX > _particle.hitbox.minX && _bullet.hitbox.minX < _particle.hitbox.maxX && _bullet.hitbox.maxY > _particle.hitbox.minY && _bullet.hitbox.minY < _particle.hitbox.maxY) {
                
                bullets.splice(i, 1);
                particles.splice(j, 1);
                score += 10;
                return score;
            }
        }

        for (var j = 0; j < particles_yellow.length; j++) {
            var _particle_yellow = particles_yellow[j];
            if (_bullet.hitbox.maxX > _particle_yellow.hitbox.minX && _bullet.hitbox.minX < _particle_yellow.hitbox.maxX && _bullet.hitbox.maxY > _particle_yellow.hitbox.minY && _bullet.hitbox.minY < _particle_yellow.hitbox.maxY) {
                
                bullets.splice(i, 1);

                _particle_yellow.lives--;

                _particle_yellow.x -= Math.cos(Math.atan2(spaceship.move.y - _particle_yellow.y, spaceship.move.x - _particle_yellow.x)) * 80;
                _particle_yellow.y -= Math.sin(Math.atan2(spaceship.move.y - _particle_yellow.y, spaceship.move.x - _particle_yellow.x)) * 80;

                if (_particle_yellow.lives <= 0){
                    particles_yellow.splice(j, 1);
                score += 20;
                return score;
                }
            }
        }

        for (var j = 0; j < particles_orange.length; j++) {
            var _particle_orange = particles_orange[j];
            if (_bullet.hitbox.maxX > _particle_orange.hitbox.minX && _bullet.hitbox.minX < _particle_orange.hitbox.maxX && _bullet.hitbox.maxY > _particle_orange.hitbox.minY && _bullet.hitbox.minY < _particle_orange.hitbox.maxY) {
                
                bullets.splice(i, 1);

                _particle_orange.lives--;

                if (_particle_orange.lives <= 0){
                    particles_orange.splice(j, 1);
                score += 30;
                return score;
                }
            }
        }

    }
}


function draw_bullets() {

    for (var i = 0; i < bullets.length; i++) {
        var _bullet = bullets[i];

        context.beginPath();
        context.arc(_bullet.x, _bullet.y, _bullet.radius, 0, Math.PI * 2);
        context.fillStyle = _bullet.color;
        context.fill();
    }
}

function update_particles() {
    for (var i = 0; i < particles.length; i++) {
        var _particle = particles[i];

         _particle.x += Math.cos(Math.atan2(spaceship.move.y - _particle.y, spaceship.move.x - _particle.x)) * 1;
        _particle.y += Math.sin(Math.atan2(spaceship.move.y - _particle.y, spaceship.move.x - _particle.x)) * 1;

        _particle.hitbox.minX = _particle.x - 18;
        _particle.hitbox.maxX = _particle.x + 18;
        _particle.hitbox.minY = _particle.y - 18;
        _particle.hitbox.maxY = _particle.y + 18;

        spaceship.hitbox.minX = spaceship.move.x - 10;
        spaceship.hitbox.maxX = spaceship.move.x + 10;
        spaceship.hitbox.minY = spaceship.move.y - 10;
        spaceship.hitbox.maxY = spaceship.move.y + 10;

        if (
            _particle.x < 0 ||
            _particle.x > canvas.width ||
            _particle.y < 0 ||
            _particle.y > canvas.height
        ) {
            particles.splice(i, 1);
            i--;
        }
        if (spaceship.hitbox.maxX > _particle.hitbox.minX && spaceship.hitbox.minX < _particle.hitbox.maxX && spaceship.hitbox.maxY > _particle.hitbox.minY && spaceship.hitbox.minY < _particle.hitbox.maxY) {
                // alert('Vous avez perdu ! :(');
                if (canvas.classList.contains('shield'))
                {

                }
                else
                {
                    particles.splice(i, 1);
                    lives -= 1;
                }
                
        }
    }
}

function draw_particles() {

    for (var i = 0; i < particles.length; i++) {
        var _particle = particles[i];

        context.beginPath();
        context.arc(_particle.x, _particle.y, _particle.radius, 0, Math.PI * 2);
        context.fillStyle = _particle.color;
        context.fill();
    }
}

// Spawn enemies ships

function timer() {
            setTimeout(function() {
                    window.requestAnimationFrame(timer);
                    add_particle();

                }, 2500);
            };

function timer_yellow() {
            setTimeout(function() {
                    window.requestAnimationFrame(timer_yellow);
                    add_particle_yellow();

                }, 8000);
            };

function timer_orange() {
            setTimeout(function() {
                    window.requestAnimationFrame(timer_orange);
                    add_particle_orange();

                }, 12000);
            };

function timer_blue() {
            setTimeout(function() {
                    window.requestAnimationFrame(timer_blue);
                    add_particle_blue();

                }, 16000);
            };

function timer_green() {
            setTimeout(function() {
                    window.requestAnimationFrame(timer_green);
                    add_particle_green();

                }, 20000);
            };

function timer_bullet() {
            setTimeout(function() {
                    window.requestAnimationFrame(timer_bullet);
                    bullet();

                }, 90);
            };

timer();
timer_bullet();
timer_yellow();
timer_orange();
timer_green();
timer_blue();

var time_shield;

// Draw ship

function drawSpaceship() {
    context.save();
    context.beginPath();
    context.translate(0 + spaceship.move.x, 0 + spaceship.move.y);
    context.rotate(spaceship.rotation);
    context.moveTo(0, -20);
    context.lineTo(15, 10);
    context.lineTo(-15, 10);
    context.closePath();
    if (canvas.classList.contains('shield')){
        context.fillStyle = "blue";   
        time_shield--;
        if (time_shield <= 0){
            canvas.classList.remove('shield');
        }if (time_shield <= 200){

            if (time_shield % 10 < 5){
                context.fillStyle = "blue";   
            }
            else {
                context.fillStyle = "#fff"; 
            }
        }
    }
    else {
        context.fillStyle = "#fff";

    }
    context.fill();
    context.restore();

    if (spaceship.move.x > canvas.width) {
        spaceship.move.x = 0;
    } else if (spaceship.move.x < 0) {
        spaceship.move.x = canvas.width;
    }
    if (spaceship.move.y > canvas.height) {
        spaceship.move.y = 0;
    } else if (spaceship.move.y < -0) {
        spaceship.move.y = canvas.height;
    }
}

/**
 * LOOP
 */

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(loop);

    moveShip();
    drawSpaceship();
    draw_particles();
    update_particles();
    draw_particles_yellow();
    update_particles_yellow();
    draw_particles_orange();
    update_particles_orange();
    draw_particles_blue();
    update_particles_blue();
    draw_particles_green();
    update_particles_green();
    draw_bullets();
    update_bullet();
    score_content.innerHTML = score;
    lives_content.innerHTML = lives;
    lose();
}

loop();
