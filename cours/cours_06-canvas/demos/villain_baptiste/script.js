/* Baptiste VILLAIN | H2 P2020 - baptistevillain.fr/project/asteroidbelt - */

/* VARIABLES*/
var canvas    = document.querySelector('canvas'),
    context   = canvas.getContext('2d'),
    width     = window.innerWidth,
    height    = window.innerHeight,
    game_over = false,
    game_start = false,
    wait_restart = false,
    time_spend = 0,
    asteroid_destroyed = 0,
    score = 0;

var score_munition_update;

/* SPACESHIP VARIABLES */
var spaceship = {};
spaceship.rotation      = 0;
spaceship.velocity      = {};
spaceship.velocity.x    = Math.sin(spaceship.rotation);
spaceship.velocity.y    = -Math.cos(spaceship.rotation);
spaceship.move          = {};
spaceship.move.x        = 0;
spaceship.move.y        = 0;
spaceship.inertie       = false;
spaceship.inertie_count = false;
spaceship.inertie_power = 10;
spaceship.load          = 30;
spaceship.munition      = 50;

/* KEYBOARD VARIABLES */
var keyboard = {};
keyboard.values        = {};
keyboard.values.left   = false;
keyboard.values.up     = false;
keyboard.values.right  = false;
keyboard.values.action = false;

/* SPACESHIP TRAIL VARIABLES */
var particles               = {};
particles.items             = [];
particles.settings          = {};
particles.settings.index    = 0;

/* ASTEROIDS VARIABLES */
var asteroids               = {};
asteroids.items             = [];
asteroids.settings          = {};
asteroids.settings.index    = 0;
asteroids.settings.max_life = 10;

/* SPACESHIP EXPLOSION */
var spaceship_explosion   = {};
spaceship_explosion.items = [];

/* SHOOT VARIABLES */
var shoot_particules            = {};
shoot_particules.items          = [];
shoot_particules.settings       = {};
shoot_particules.settings.index = 0;

/* SHOOT EXPLOSION VARIABLES */
var shoot_explosions            = {};
shoot_explosions.items          = [];
shoot_explosions.settings       = {};
shoot_explosions.settings.index = 0;

/* RESIZE CANVAS */
function resizeCanvas(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  width         = window.innerWidth;
  height        = window.innerHeight;
}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

/* SET KEYBOARD VARIABLES TRUE */
document.addEventListener('keydown',function(e){
  if(e.keyCode == 37 && !keyboard.values.left){
    e.preventDefault();
    keyboard.values.left = true;
  }
  else if(e.keyCode == 39 && !keyboard.values.right){
    e.preventDefault();
    keyboard.values.right = true;
  }

  if(e.keyCode == 38 && !keyboard.values.up){
    e.preventDefault();
    keyboard.values.up = true;
    spaceship.inertie = false;
    spaceship.inertie_count = 0;
    spaceship.inertie_power = 10;
  }

  if(e.keyCode == 32){
    e.preventDefault();
    if(!game_start){
      render();
      game_start = true;
      score_munition_update = setInterval(function(){
        score += 10;
        if(spaceship.munition <= 90){
          spaceship.munition += 10;
        }
        time_spend++;
      },1000);
    }
    else if(wait_restart){
      reset();
      score_munition_update = setInterval(function(){
        score += 10;
        if(spaceship.munition <= 90){
          spaceship.munition += 10;
        }
        time_spend++;
      },1000);
    }
    else{
      keyboard.values.action = true;
    }
  }
});

/* SET KEYBOARD VARIABLES FALSE */
document.addEventListener('keyup',function(e){
  if(e.keyCode == 37){
    keyboard.values.left = false;
  }
  if(e.keyCode == 39){
    keyboard.values.right = false;
  }

  if(e.keyCode == 38){
    e.preventDefault();
    keyboard.values.up = false;
    spaceship.inertie = true;
    spaceship.inertie_count = 1;
  }

  if(e.keyCode == 32){
    e.preventDefault();
  }

});

/**********
 SPACESHIP
***********/

/* DRAW SPACESHIP */
function spaceshipDraw(){
  context.save(); 
  context.beginPath()
  context.translate(width/2 + spaceship.move.x ,height/2 + spaceship.move.y);
  context.rotate(spaceship.rotation);
  context.moveTo(0,-20);
  context.lineTo(16,10);
  context.lineTo(-16,10);
  context.closePath();
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 2;
  context.lineJoin = 'round';
  context.shadowColor = 'rgba(255,255,255,0.4)';
  context.shadowBlur = 10;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.stroke();
  context.restore();

  if(spaceship.move.x > width/2){
    spaceship.move.x *= -1;
  }
  else if(spaceship.move.x < -width/2){
    spaceship.move.x *= -1;
  }
  if(spaceship.move.y > height/2){
    spaceship.move.y *= -1;
  }
  else if(spaceship.move.y < -height/2){
    spaceship.move.y *= -1;
  }
}

/* UPDATE SPACESHIP VARIABLES */
function spaceshipUpdate(){
  if(keyboard.values.left){
    spaceship.rotation -= Math.PI * 0.03;
  }
  else if(keyboard.values.right){
    spaceship.rotation += Math.PI * 0.03;
  }

  spaceship.velocity.x = Math.sin(spaceship.rotation);
  spaceship.velocity.y = -Math.cos(spaceship.rotation);

  spaceship.velocity.y *= 5;
  spaceship.velocity.x *= 5;

  if(keyboard.values.up){
    if(spaceship.inertie_power > 1){
      spaceship.inertie_power -= 0.5;
    }
    spaceship.velocity.y *= 2;
    spaceship.velocity.x *= 2;
    spaceship.move.y += spaceship.velocity.y;
    spaceship.move.x += spaceship.velocity.x;
  }

  if(spaceship.inertie){
    spaceship.inertie_count -= spaceship.inertie_power*0.01;
    if(spaceship.inertie_count < 0){
      spaceship.inertie = false;
    }
    else{
      spaceship.velocity.y *= 1.2;
      spaceship.velocity.x *= 1.2;
      spaceship.move.y += spaceship.velocity.y * spaceship.inertie_count;
      spaceship.move.x += spaceship.velocity.x * spaceship.inertie_count;
    }
  }
}

/**********
   SHOOT
***********/

/* ADD SHOOT */
function shootParticlesAdd(){
  if(spaceship.munition >= 10){
    spaceship.munition -= 10;
    shoot_particules.items[shoot_particules.settings.index] = {}; 
    shoot_particules.items[shoot_particules.settings.index].x         = spaceship.move.x + spaceship.velocity.x*7;
    shoot_particules.items[shoot_particules.settings.index].y         = spaceship.move.y + spaceship.velocity.y*7;
    shoot_particules.items[shoot_particules.settings.index].vx        = spaceship.velocity.x*3;
    shoot_particules.items[shoot_particules.settings.index].vy        = spaceship.velocity.y*3;
    shoot_particules.items[shoot_particules.settings.index].rotation  =  spaceship.rotation;
    shootParticlesUpdate();
    shoot_particules.settings.index++;
  }
}

/* UPDATE SHOOT VARIABLES */
function shootParticlesUpdate(){
  for(var i = 0; i < shoot_particules.items.length; i++){
    shoot_particules.items[i].x += shoot_particules.items[i].vx;
    shoot_particules.items[i].y += shoot_particules.items[i].vy;
    if(shoot_particules.items[i].x > width/2 || shoot_particules.items[i].x < -width/2 || shoot_particules.items[i].y > height/2 || shoot_particules.items[i].y < -height/2 || shoot_particules.items[i].collision ){
      shoot_particules.items.splice(i,1);
      shoot_particules.settings.index--;
    }
    else{
      shootParticlesDraw(i);
    }
  }
}

/* DRAW SHOOT*/
function shootParticlesDraw(i){
  context.save(); 
  context.translate(width/2+ shoot_particules.items[i].x ,height/2+shoot_particules.items[i].y);
  context.rotate(shoot_particules.items[i].rotation);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(0,35);
  context.lineCap = "round";
  context.closePath();
  context.lineWidth = 5;
  context.strokeStyle = "#db3023";
  context.shadowColor = '#db3023';
  context.shadowBlur = 10;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.stroke();
  context.restore();
}

/* DETECT COLLISION BETWEEN SHOOT AND ASTEROID */
function shootCollision(){
  for(var i = 0; i < shoot_particules.items.length; i++){
    for(var j = 0; j < asteroids.items.length; j++){
      var circle1 = {
        radius: 2.5,
        x: shoot_particules.items[i].x+width/2,
        y: shoot_particules.items[i].y+height/2};
      var circle2 = {
        radius: asteroids.items[j].size,
        x: asteroids.items[j].x+width/2,
        y: asteroids.items[j].y+height/2};

      var dx = circle1.x - circle2.x;
      var dy = circle1.y - circle2.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < circle1.radius + circle2.radius){
        asteroids.items[j].collision = true;
        asteroids.items[j].health++;
        if(asteroids.items[j].health == 2 && asteroids.items[j].doublestroke){
          asteroidDivision(j);
          score += 50;
          asteroid_destroyed ++;
        }
        if(asteroids.items[j].health == 2 && !asteroids.items[j].doublestroke){
          score += 50;
          asteroid_destroyed ++;
        }
        shoot_particules.items[i].collision = true;
        shootExplosionGenerate(shoot_particules.items[i].x, shoot_particules.items[i].y);
      }
    }
  }
}

/* GENERATE SHOOT EXPLOSION */
function shootExplosionGenerate(x, y){
  var random = Math.random()*5+5;
  shoot_explosions.items[shoot_explosions.settings.index] = [];
  for(var i = 0; i < random; i++){
    shoot_explosions.items[shoot_explosions.settings.index][i] = {};
    shoot_explosions.items[shoot_explosions.settings.index][i].size       = Math.random()*10+5;
    shoot_explosions.items[shoot_explosions.settings.index][i].life       = 0;
    shoot_explosions.items[shoot_explosions.settings.index][i].velocity_x = (Math.random()+1) * (Math.round(Math.random()) * 2 - 1);
    shoot_explosions.items[shoot_explosions.settings.index][i].velocity_y = (Math.random()+1) * (Math.round(Math.random()) * 2 - 1);
    shoot_explosions.items[shoot_explosions.settings.index][i].x          = x;
    shoot_explosions.items[shoot_explosions.settings.index][i].y          = y;
    var _random = Math.random();
    if(_random < 0.5){
      shoot_explosions.items[shoot_explosions.settings.index][i].polygon = true;
      shoot_explosions.items[shoot_explosions.settings.index][i].sides   = Math.floor(Math.random()*6+3);
    }
    else{
      shoot_explosions.items[shoot_explosions.settings.index][i].polygon = false;
    }
    var _random = Math.random();
    if(_random < 0.25){
      shoot_explosions.items[shoot_explosions.settings.index][i].fill = true;
    }
    else{
      shoot_explosions.items[shoot_explosions.settings.index][i].fill = false;
    }
  }
  shoot_explosions.settings.index++;
}

/* UPDATE SHOOT EXPLOSION  VARIABLES*/
function shootExplosionUpdate(){
  for(var i = 0; i < shoot_explosions.items.length; i++){
    for(var j = 0; j < shoot_explosions.items[i].length-1; j++){
      shoot_explosions.items[i][j].x += shoot_explosions.items[i][j].velocity_x;
      shoot_explosions.items[i][j].y += shoot_explosions.items[i][j].velocity_y;
      if(shoot_explosions.items[i][j].size-0.5 >= 0){
        shoot_explosions.items[i][j].size -= 0.5;
        shootExplosionDraw(i,j);
      }
      else{
        shoot_explosions.items[i].splice(j,1);
      }
      if(shoot_explosions.items[i] == 1){
        shoot_explosions.items.splice(i,1);
      }
    }
  }
}

/* DRAW SHOOT EXPLOSION */
function shootExplosionDraw(i,j){
  context.save(); 
  context.translate(width/2 + shoot_explosions.items[i][j].x ,height/2 + shoot_explosions.items[i][j].y);
  if(shoot_explosions.items[i][j].polygon){
    context.beginPath();
    for (var n = 1; n <= shoot_explosions.items[i][j].sides; n++) {
      context.lineTo (0 + shoot_explosions.items[i][j].size * Math.cos(n * 2 * Math.PI / shoot_explosions.items[i][j].sides), 0 + shoot_explosions.items[i][j].size * Math.sin(n * 2 * Math.PI / shoot_explosions.items[i][j].sides));
    }
  }
  else{
    context.beginPath();
    context.arc(0, 0, shoot_explosions.items[i][j].size, 0, 2 * Math.PI);
  }
  context.closePath();
  if(shoot_explosions.items[i][j].fill){
    context.fillStyle = "#db3023";
    context.fill();
  }
  else{
    context.strokeStyle = "#db3023";
    context.stroke();
  }
  context.restore();
}

/**********
TRAIL PARTICULES
***********/

/* ADD TRAIL PARTICULES */
function particleAdd(){
  particles.items[particles.settings.index]            = {};
  particles.items[particles.settings.index].x          = spaceship.move.x + spaceship.velocity.x;
  particles.items[particles.settings.index].y          = spaceship.move.y + spaceship.velocity.y;
  particles.items[particles.settings.index].size       = Math.random()*8.5+1;
  particles.items[particles.settings.index].life       = 0;
  particles.items[particles.settings.index].rotation   = spaceship.rotation;
  particles.items[particles.settings.index].velocity_y = (spaceship.velocity.y*(Math.random()+1))*0.6;
  particles.items[particles.settings.index].velocity_x = (spaceship.velocity.x*(Math.random()+1))*0.6;
  particles.items[particles.settings.index].random     = Math.random();
  particles.settings.index++;
}

/* UPDATE TRAIL PARTICULES VARIABLES */
function particleUpdate(){
  for(var i = 0; i < particles.items.length; i++){
    particles.items[i].x   -= particles.items[i].velocity_x;
    particles.items[i].y   -= particles.items[i].velocity_y;

    if(particles.items[i].x > width/2){
      particles.items[i].x *= -1;
    }
    else if(particles.items[i].x < -width/2){
      particles.items[i].x *= -1;
    }
    if(particles.items[i].y > height/2){
      particles.items[i].y *= -1;
    }
    else if(particles.items[i].y < -height/2){
      particles.items[i].y *= -1;
    }

    if(particles.items[i].size-0.4 >= 0 ){
      particles.items[i].size -= 0.4;
      particleDraw(i);
    }
    else{
      particles.items.splice(i,1);
      particles.settings.index--;
    }
  }
}

/* DRAW TRAIL PARTICULES */
function particleDraw(i){
  context.save(); 
  context.translate(width/2+ particles.items[i].x ,height/2+particles.items[i].y);
  context.rotate(particles.items[i].rotation);

  context.beginPath();
  context.arc(0, 20, particles.items[i].size, 0, 2 * Math.PI);
  context.closePath();
  if(particles.items[i].random > 0.3){
    context.lineWidth = 2;
    context.strokeStyle = "#FFFFFF";
    context.stroke();
  }
  else{
    context.fillStyle = "#FFFFFF";
    context.fill();
  }
  context.restore();
}

/**********
 ASTEROIDS
***********/

/* GENERATE SPLIT ASTEROID IF SHOOT */
function asteroidDivision(i){
  for(var n = 1; n < 3; n++){
    asteroids.items[asteroids.settings.index]            = {};
    asteroids.items[asteroids.settings.index].size       = asteroids.items[i].size/2;
    asteroids.items[asteroids.settings.index].sides      = Math.floor(Math.random()*8+6);
    asteroids.items[asteroids.settings.index].life       = 0;
    asteroids.items[asteroids.settings.index].health     = 1;
    asteroids.items[asteroids.settings.index].x          = asteroids.items[i].x;
    asteroids.items[asteroids.settings.index].y          = asteroids.items[i].y;
    asteroids.items[asteroids.settings.index].velocity_x = asteroids.items[i].velocity_x * (Math.sin(Math.PI/(2*n)));;
    asteroids.items[asteroids.settings.index].velocity_y = asteroids.items[i].velocity_y * (-Math.cos(Math.PI/(2*n)));
    asteroids.items[asteroids.settings.index].doublestroke = false;
    asteroids.settings.index++;
  }
}

/* ADD ASTEROID */
function asteroidAdd(){
  var random = Math.random();
  if(random > 0.97){
    asteroids.items[asteroids.settings.index]       = {};
    asteroids.items[asteroids.settings.index].size  = Math.floor(Math.random()*50+30);
    asteroids.items[asteroids.settings.index].sides = Math.floor(Math.random()*8+6);
    asteroids.items[asteroids.settings.index].life  = 0;
    asteroids.items[asteroids.settings.index].health = 0;
    asteroids.items[asteroids.settings.index].doublestroke = true;


    var randomX = Math.random();
    var randomY = Math.random();

    if(randomX <= 0.5){
      asteroids.items[asteroids.settings.index].x          = -10 - asteroids.items[asteroids.settings.index].size;
      asteroids.items[asteroids.settings.index].x         -= width/2; 
      asteroids.items[asteroids.settings.index].velocity_x = Math.random()*4+1;
    }
    else{
      asteroids.items[asteroids.settings.index].x          = 10+ asteroids.items[asteroids.settings.index].size;
      asteroids.items[asteroids.settings.index].x         += width/2; 
      asteroids.items[asteroids.settings.index].velocity_x = (Math.random()*4+1)*-1;
    }

    if(randomY <= 0.5){
      asteroids.items[asteroids.settings.index].y   = -10 - asteroids.items[asteroids.settings.index].size;
      asteroids.items[asteroids.settings.index].y         -= height/2; 
      asteroids.items[asteroids.settings.index].velocity_y = Math.random()*4+1;
    }
    else{
      asteroids.items[asteroids.settings.index].y   = 10+ asteroids.items[asteroids.settings.index].size;
      asteroids.items[asteroids.settings.index].y         += height/2; 
      asteroids.items[asteroids.settings.index].velocity_y = (Math.random()*4+1)*(-1);
    }
    asteroids.settings.index++;
  }
}

/* UPDATE ASTEROID VARIABLES */
function asteroidUpdate(){
  for(var i = 0; i < asteroids.items.length; i++){
    asteroids.items[i].x   += asteroids.items[i].velocity_x;
    asteroids.items[i].y   += asteroids.items[i].velocity_y;
    asteroids.items[i].life++;

    if((asteroids.items[i].life > 50 && asteroids.items[i].x > width/2 + asteroids.items[i].size )|| (asteroids.items[i].life > 50 && asteroids.items[i].x < -width/2 - asteroids.items[i].size ) || (asteroids.items[i].life > 50 && asteroids.items[i].y > height/2 + asteroids.items[i].size )||(asteroids.items[i].life > 50 && asteroids.items[i].y < -height/2 - asteroids.items[i].size)||(asteroids.items[i].health == 2)){
      asteroids.items.splice(i, 1);
      asteroids.settings.index--;
    }
    else{
      asteroidDraw(i);
    }
  }
}

/* DRAW ASTEROIDS */
function asteroidDraw(j){
  context.save();
  context.translate(width/2, height/2);
  context.beginPath();
  var size  = asteroids.items[j].size;
  var sides =  asteroids.items[j].sides;
  for (var i = 1; i <= sides; i++){
    context.lineTo (asteroids.items[j].x + size * Math.cos(i * 2 * Math.PI / sides), asteroids.items[j].y + size * Math.sin(i * 2 * Math.PI / sides));
  }
  context.closePath();
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 3;
  context.stroke();
  context.beginPath();
  if(asteroids.items[j].doublestroke){
    for (var i = 1; i <= sides;i += 1){
      context.lineTo (asteroids.items[j].x + (size-6) * Math.cos(i * 2 * Math.PI / sides), asteroids.items[j].y + (size-6) * Math.sin(i * 2 * Math.PI / sides));
    }
    context.closePath();
    context.strokeStyle = "#FFFFFF";
    if(asteroids.items[j].collision){
      context.strokeStyle = "#db3023";
    }
    context.lineWidth = 2.5;
    context.stroke();
  }
  context.restore();
}

/* DETECT COLLISION BETWEEN ASTEROIDS AND SPACESHIP */
function detectCollision(){
  for(var i = 0; i < asteroids.items.length; i++){
    var circle1 = {
      radius: 10,
      x: width/2+spaceship.move.x,
      y: height/2+spaceship.move.y
    };
    var circle2 = {
      radius: asteroids.items[i].size,
      x:asteroids.items[i].x+width/2,
      y: asteroids.items[i].y+height/2};

    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius && !game_over) {
      game_over = true;
      spaceship_explosion_generate();
      clearInterval(score_munition_update);
    }
  }
}

/* GENERATE SPACESHIP EXPLOSION */
function spaceship_explosion_generate(){
  var random = Math.random()*15+10;
  for(var i = 0; i < random; i++){
    spaceship_explosion.items[i] = {};
    spaceship_explosion.items[i].size       = Math.random()*10+10;
    spaceship_explosion.items[i].life       = 0;
    spaceship_explosion.items[i].velocity_x = (Math.random()*2+1) * (Math.round(Math.random()) * 2 - 1);
    spaceship_explosion.items[i].velocity_y = (Math.random()*2+1) * (Math.round(Math.random()) * 2 - 1);
    spaceship_explosion.items[i].x          = spaceship.move.x;
    spaceship_explosion.items[i].y          = spaceship.move.y;
    var _random = Math.random();
    if(_random < 0.5){
      spaceship_explosion.items[i].polygon = true;
      spaceship_explosion.items[i].sides   = Math.floor(Math.random()*7+3);
    }
    else{
      spaceship_explosion.items[i].polygon = false;
    }
    var _random = Math.random();
    if(_random < 0.25){
      spaceship_explosion.items[i].fill = true;
    }
    else{
      spaceship_explosion.items[i].fill = false;
    }
  }
  spaceship_explosion_update();
};

/* UPDATE SPACESHIP EXPLOSION VARIABLES */
function spaceship_explosion_update(){
  for(var i = 0; i < spaceship_explosion.items.length-1; i++){
    spaceship_explosion.items[i].x += spaceship_explosion.items[i].velocity_x;
    spaceship_explosion.items[i].y += spaceship_explosion.items[i].velocity_y;
    if(spaceship_explosion.items[i].size-0.4 >= 0){
      spaceship_explosion.items[i].size -= 0.4;
      spaceship_explosion_draw(i);
    }
    else{
      spaceship_explosion.items[i].size = 0;
      spaceship_explosion.items.splice(i,1);
    }
  }
}

/* DRAW SPACESHIP EXPLOSION*/
function spaceship_explosion_draw(i){
  context.save(); 
  context.translate(width/2+ spaceship_explosion.items[i].x ,height/2+spaceship_explosion.items[i].y);
  if(spaceship_explosion.items[i].polygon){
    context.beginPath();
    for (var j = 1; j <= spaceship_explosion.items[i].sides; j++) {
      context.lineTo (0 + spaceship_explosion.items[i].size * Math.cos(j * 2 * Math.PI / spaceship_explosion.items[i].sides), 0 + spaceship_explosion.items[i].size * Math.sin(j * 2 * Math.PI / spaceship_explosion.items[i].sides));
    }
  }
  else{
    context.beginPath();
    context.arc(0, 0, spaceship_explosion.items[i].size, 0, 2 * Math.PI);
  }
  context.closePath();
  if(spaceship_explosion.items[i].fill){
    context.fillStyle = "#FFFFFF";
    context.fill();
  }
  else{
    context.strokeStyle = "#FFFFFF";
    context.stroke();
  }
  context.restore();
}



/* DRAW SCORE */
function displayScore(){
  context.font = "26px Helvetica";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "right";
  context.fillText(score, width-20, 40);

}

/* DRAW MUNITION BAR */
function displayMunition(){
  context.beginPath();
  context.rect(width-120, 50 ,100, 8);
  context.strokeStyle = "#db3023";
  context.lineWidth = 1.5;
  context.stroke();

  context.beginPath();
  context.rect(width-120+(100-spaceship.munition), 50 ,spaceship.munition, 8);
  context.fillStyle = "#db3023";
  context.fill();
}



/* DRAW LANDINGFRAME*/
function firstFrame(){
  /* TITLE */
  context.save();
  context.font = "700 56px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "center";
  context.fillText("ASTEROID", width/2-95, height/4);
  context.font = " 400 56px PT Sans";
  context.fillText("BELT", width/2+95, height/4);
  context.font = "400 26px PT Sans";
  context.fillStyle = "rgba(255, 255, 255, 0.71)";
  context.fillText("A CANVAS GAME", width/2+95, height/3.5);

  /* KEYBOARD */
  context.translate(250,75);
  context.font = " 400 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.fillText("MOVE", width/2, height/3.2);
  context.rect(width/2-25,height/2.8,50,50);
  context.strokeStyle = "#FFFFFF";
  context.stroke();

  context.moveTo(width/2-10,height/2.8 +30);
  context.lineTo(width/2,height/2.8+20);
  context.lineTo(width/2+10,height/2.8 +30);

  context.stroke();

  context.moveTo(width/2-85+30,height/2.5 -10);
  context.lineTo(width/2-85+20,height/2.5);
  context.lineTo(width/2-85+30,height/2.5 +10);

  context.stroke();

  context.moveTo(width/2+35+20,height/2.5 -10);
  context.lineTo(width/2+35+30,height/2.5);
  context.lineTo(width/2+35+20,height/2.5 +10);

  context.stroke();

  context.strokeStyle = "#FFFFFF";

  context.rect(width/2-85,height/2.70,50,50);
  context.stroke();
  context.rect(width/2+35,height/2.70,50,50);
  context.stroke();
  context.restore();


  context.font = " 400 20px PT Sans";
  context.textAlign = "center";
  context.fillStyle = "#FFFFFF";
  context.fillText("AND", width/2, height/2.5+75);

  context.save();
  context.translate(-250,75);
  context.font = " 400 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "center";
  context.fillText("SHOOT", width/2, height/3.2);
  context.font = " 400 16px PT Sans";
  context.fillText("SPACE", width/2, height/2.55);
  context.rect(width/2-75,height/2.8,150,50);
  context.strokeStyle = "#FFFFFF";
  context.stroke();
  context.restore();

  /* GOAL */

  context.font = " 700 30px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "center";
  context.fillText("STAY ALIVE ! ", width/2, height/1.5);
  context.font = " 400 18px PT Sans";
  context.fillStyle = "rgba(255, 255, 255, 0.71)";
  context.fillText("Press 'SPACE' to start", width/2, height/1.4);

}
firstFrame();
stripesDraw();

/* DRAW GAME OVER FRAME*/
function game_over_frame(){
  context.save();
  context.font = "700 56px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "center";
  context.fillText("GAME", width/2-70, height/4);
  context.font = " 400 56px PT Sans";
  context.fillText("OVER", width/2+70, height/4);
  context.font = "400 26px PT Sans";
  context.fillStyle = "rgba(255, 255, 255, 0.71)";
  context.fillText("YOUR SPACESHIP IS DESTROYED", width/2+95, height/3.5);

  context.font = "400 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.fillText("TIME SPEND", width/2-125, height/2.5);

  context.font = "700 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "right";

  context.fillText(time_spend+'  x 10', width/2+125, height/2.5);

  context.font = "400 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "center";
  context.fillText("ASTEROID DESTROYED", width/2-125, height/2.2);

  context.font = "700 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "right";
  context.fillText(asteroid_destroyed+'  x 50', width/2+125, height/2.2);

  context.beginPath();
  context.rect(width/2,height/2,150,4);
  context.fill();

  context.font = "700 26px PT Sans";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "right";
  context.fillText(score, width/2+125, height/1.8);

  context.font = "400 18px PT Sans";
  context.fillStyle = "rgba(255, 255, 255, 0.71)";
  context.textAlign = "center";
  context.fillText("Press 'SPACE' to restart", width/2, height/1.6);
}



/* DRAW STRIPES*/
function stripesDraw(){
  var h = 10;
  context.save();
  while(h < height/2*2){
    context.beginPath();
    context.arc(width/2,height/2, h, 0, Math.PI*2);
    context.strokeStyle = "rgba(0,0,0,1)";
    context.lineWidth = 5;
    context.globalAlpha = 0.03;
    context.closePath();
    context.stroke();
    h += 20;
  }
  context.restore();
}

/* RESTART FUNCTION*/
function reset(){
  wait_restart = false;
  spaceship.rotation      = 0;
  spaceship.velocity      = {};
  spaceship.velocity.x    = Math.sin(spaceship.rotation);
  spaceship.velocity.y    = -Math.cos(spaceship.rotation);
  spaceship.move          = {};
  spaceship.move.x        = 0;
  spaceship.move.y        = 0;
  spaceship.inertie       = false;
  spaceship.inertie_count = false;
  spaceship.inertie_power = 10;
  spaceship.load          = 30;
  spaceship.munition      = 50;
  score = 0;
  game_over = false;
  game_start = true;
  time_spend = 0;
  asteroid_destroyed = 0;
  asteroids.items                 = [];
  asteroids.settings.index        = 0;
  particles.items                 = [];
  particles.settings.index        = 0;
  shoot_particules.items          = [];
  shoot_particules.settings.index = 0;
  shoot_explosions.items          = [];
  shoot_explosions.settings.index = 0;
}

/**********
   LOOP
***********/

/* RENDER FUNCTION*/
function render(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(keyboard.values.up || keyboard.values.left || keyboard.values.right){
    particleAdd();
  }

  if(!game_over){
    spaceshipUpdate();
    if(keyboard.values.action){
      shootParticlesAdd();
      keyboard.values.action = false;
    }
    shootParticlesUpdate();
    spaceshipDraw();
    particleUpdate();
    detectCollision();
    shootCollision();
    asteroidAdd();
  }
  else{
    game_over_frame();
    wait_restart = true;
  }

  asteroidUpdate();
  shootExplosionUpdate();
  displayScore();
  displayMunition();
  spaceship_explosion_update();
  stripesDraw();
  window.requestAnimationFrame(render);
}

