window.reqFrame = (function(){
  return window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.requestAnimationFrame ||
         function(callback){
            window.setTimeout(callback, 1000/60);
         };
})();


// Initialize variables
var canvas, ctx;
var W = window.innerWidth;
var H = window.innerHeight;

var particles = [];

function randColor(){
  //Creates random color in red hues
  var r = 100 + Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*150);
  var b = Math.floor(Math.random()*15);
  
  return "rgb("+255+","+255+","+45+")";
}

 
particle = function(){
  this.xpos = W/2;
  this.ypos = H/2;
  
  // Initializes X-axis speed between
  // -1.5 and 1.5
  this.xSpeed = -1.5 + Math.random()* 3;
  
  // Initialize Y speed between 1 and 5.5
  this.ySpeed = 1 + Math.random()* 5.5;
  
  // Initialize radius between 1 and 24
  // Any larger and the circles are too 
  // clearly defined
  this.rad = 1 + Math.floor(Math.random()* 25);
  
  // Ahh the short life of the flame
  this.life = 50;
  this.color = randColor();
  this.opacity = 1;
  this.dead = false;
    
  this.draw = function(){
    // 
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.xpos,this.ypos,this.rad,0,Math.PI*2);
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.closePath();
  };
  
  // Updates position of the particle
  // and checks if it is alive dead or 
  // mostly dead
  this.update = function(){
    if(this.ypos < 0 || this.life === 0 || this.opacity === 0 || this.rad < 1){
      this.dead = true;
  }
  
    if(!this.dead){
      this.ypos -= this.ySpeed;
      this.xpos += this.xSpeed;
      this.life --;
      this.opacity -= 0.05;
      this.rad --;
    }
  }
  
};
 
function paintCanvas(){
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#3498db";
  ctx.fillRect(0,0,W,H);
}
 
function looper(){
  paintCanvas();
  var L = particles.length; 
  if(L < 100){
    particles.push(new particle());
  }
 
  for(i = 0; i < L; i++){
    var p = particles[i];
    p.draw();
    p.update();
    if(p.dead){
      particles[i] = new particle();
    }
  }
  
  reqFrame(looper);
}
 
function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = H;
  looper();
}

init();

