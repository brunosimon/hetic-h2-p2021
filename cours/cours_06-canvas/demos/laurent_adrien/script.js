var canvas = document.querySelector('canvas')
    , context = canvas.getContext('2d');

/**** 
CHARAC
****/


var coords = {};
coords.x = 0;
coords.y = 0;

var mouse = {};
mouse.x = 0;
mouse.y = 0;

var pupils = {};
pupils.l = {};
pupils.r = {};

var arms = {};
arms.r = {};
arms.l = {};
arms.count = 0;
arms.width = 175;

var legs = {};
legs.r = {};
legs.l = {};
legs.count = 0;
legs.width = 100;

var hat = {};
hat.x = 180;
hat.y = -50;

var colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#d35400', '#3498db'];
var color;
var color_count = 0;

var dance = false;

var audioElm = document.querySelector('audio');
audioElm.pause();

var background = document.querySelector('body');

var keys = [];

document.addEventListener("keydown", function (event) {
    keys[event.keyCode] = true;
});
document.body.addEventListener("keyup", function (event) {
    keys[event.keyCode] = false;
});

document.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
        event.preventDefault();
        if (dance) {
            dance = false;
            audioElm.pause();
        } else {
            dance = true;
            audioElm.play();
        }
    }
});

function all() {

    boxRound(225, 115, 200, 75, 30);

    context.fillStyle = '#80AE4C';
    context.fillRect(200, 200, 200, 200);

    context.fillStyle = '#6F8D44';
    context.fillRect(400, 200, 50, 200);

    context.beginPath();
    context.moveTo(225, 150);
    context.lineTo(200, 200);
    context.lineTo(400, 200);
    context.lineTo(425, 150);
    context.fillStyle = '#AFCC69'; //Couleur du remplissage
    context.fill();

    context.beginPath();
    context.moveTo(425, 150);
    context.lineTo(400, 200);
    context.lineTo(450, 200);
    context.fillStyle = '#547642';
    context.fill();

    // yeux
    context.beginPath();
    context.arc(265, 275, 15, 0, Math.PI * 2, false);
    context.fillStyle = '#fefefe';
    context.fill();

    context.beginPath();
    context.arc(335, 275, 15, 0, Math.PI * 2, false);
    context.fillStyle = '#fefefe';
    context.fill();

    //foot

    context.beginPath();
    context.arc(275, 500, 25, Math.PI, 0, false);
    context.fillStyle = '#131418';
    context.fill();

    context.beginPath();
    context.arc(360, 500, 25, Math.PI, 0, false);
    context.fillStyle = '#131418';
    context.fill();

    //mouth

    context.beginPath();
    context.moveTo(275, 300); // X et Y du point de départ
    context.quadraticCurveTo(
        300, // X du seul point de tension
        315, // Y du seul point de tension
        325, // X du point d'arrivée
        300 // Y du point d'arrivée
    );
    context.lineCap = 'round';
    context.lineWidth = '7';
    context.stroke();

    //maracas
    maracasBot(30, 200, 10, 100, 6);

    context.beginPath();
    context.arc(35, 210, 30, 0, Math.PI * 2, false);
    context.fillStyle = '#EC387F';
    context.fill();

    context.beginPath();
    context.moveTo(45, 220);
    context.lineTo(55, 207);
    context.lineTo(65, 220);
    context.fillStyle = '#FDDE68';
    context.fill();

    context.beginPath();
    context.moveTo(25, 220);
    context.lineTo(35, 207);
    context.lineTo(45, 220);
    context.fillStyle = '#FDDE68';
    context.fill();

    context.beginPath();
    context.moveTo(5, 220);
    context.lineTo(15, 207);
    context.lineTo(25, 220);
    context.fillStyle = '#FDDE68';
    context.fill();

    context.beginPath();
    context.moveTo(35, 207);
    context.lineTo(45, 220);
    context.lineTo(55, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    context.beginPath();
    context.moveTo(15, 207);
    context.lineTo(25, 220);
    context.lineTo(35, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    context.beginPath();
    context.moveTo(5, 207);
    context.lineTo(5, 220);
    context.lineTo(15, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    context.beginPath();
    context.moveTo(55, 207);
    context.lineTo(65, 220);
    context.lineTo(65, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    //text
    var text = 'Press spacebar señor !';

    context.font = '40px Futura'; // Font
    context.textAlign = 'center'; // Alignement horizontal (left | center | right)
    context.textBaseline = 'bottom'; // Alignement vertical (top | bottom | middle | alphabetic | hanging)
    context.fillStyle = '#131418';
    context.fillText(text, 325, 550); // Faire apparaitre le texte
}


function update() {
    coords.x += (mouse.x - coords.x); //* 0.1;
    coords.y += (mouse.y - coords.y); //* 0.1;

    pupils.l.x = 262 + (mouse.x - 297) * 0.01; //coords.x * 0.1;
    pupils.l.y = 272 + (mouse.y - 272) * 0.02; //coords.y * 0.1;
    pupils.r.x = 332 + (mouse.x - 297) * 0.01; //coords.x * 0.1;
    pupils.r.y = 272 + (mouse.y - 272) * 0.02; //coords.y * 0.1;

    if (dance) {
        arms.count += 0.2;
        legs.count += 0.2;

        if (hat.y < 150) {
            hat.y += 6;
        }

        color_count += .1;
        color_count = color_count % colors.length;
        color = colors[Math.floor(color_count)];
        console.log(color);

        background.style.background = color;
    } else {
        background.style.background = 'none';
        if (hat.y > -50) {
            hat.y -= 6;
        }
    }

    arms.l.x = 30;
    arms.l.y = 275;
    arms.l.x2 = arms.l.x + (arms.width / 3) + (Math.cos(arms.count) * 50);
    arms.l.y2 = arms.l.y + (Math.sin(arms.count) * 100);
    arms.l.x3 = arms.l.x + (arms.width * 2 / 3) + (Math.cos(arms.count + 1.5) * 50);
    arms.l.y3 = arms.l.y + (Math.sin(arms.count + 1.5) * 100);

    arms.r.x = 425;
    arms.r.y = 275;
    arms.r.x2 = arms.r.x + (arms.width / 3) - (Math.cos(arms.count) * 50);
    arms.r.y2 = arms.r.y - (Math.sin(arms.count) * 100);
    arms.r.x3 = arms.r.x + (arms.width * 2 / 3) - (Math.cos(arms.count + 1.5) * 50);
    arms.r.y3 = arms.r.y - (Math.sin(arms.count + 1.5) * 100);

    legs.l.x = 305;
    legs.l.y = 385;
    legs.l.x2 = legs.l.x - (legs.width / 3) + (Math.cos(legs.count) * 50);
    legs.l.y2 = legs.l.y + (Math.sin(legs.count) * -20);
    legs.l.x3 = legs.l.x - (legs.width * 2 / 3) + (Math.cos(legs.count - 1.5) * 50);
    legs.l.y3 = legs.l.y + (Math.sin(legs.count + 1.5) * 2);

    legs.r.x = 330;
    legs.r.y = 385;
    legs.r.x2 = legs.r.x + (legs.width / 3) - (Math.cos(legs.count) * 50);
    legs.r.y2 = legs.r.y - (Math.sin(legs.count) * -20);
    legs.r.x3 = legs.r.x + (legs.width * 2 / 3) - (Math.cos(legs.count - 1.5) * 50);
    legs.r.y3 = legs.r.y - (Math.sin(legs.count + 1.5) * 2);

}

function draw() {

    //arms

    context.beginPath();
    context.moveTo(arms.l.x, arms.l.y); // X et Y du point de départ
    context.bezierCurveTo(
        arms.l.x2, // X du premier point de tension
        arms.l.y2, // Y du premier point de tension
        arms.l.x3, // X du second point de tension
        arms.l.y3, // Y du second point de tension
        arms.l.x + arms.width, // X du point d'arrivée
        arms.l.y // Y du point d'arrivée
    );

    context.stroke();

    context.beginPath();
    context.moveTo(legs.l.x, legs.l.y); // X et Y du point de départ
    context.bezierCurveTo(
        legs.l.x2, // X du premier point de tension
        legs.l.y2, // Y du premier point de tension
        legs.l.x3, // X du second point de tension
        legs.l.y3, // Y du second point de tension
        legs.l.x - 15, // X du point d'arrivée
        legs.l.y + legs.width // Y du point d'arrivée
    );
    context.lineWidth = '10';
    context.stroke();

    context.beginPath();
    context.moveTo(legs.r.x, legs.r.y); // X et Y du point de départ
    context.bezierCurveTo(
        legs.r.x2, // X du premier point de tension
        legs.r.y2, // Y du premier point de tension
        legs.r.x3, // X du second point de tension
        legs.r.y3, // Y du second point de tension
        legs.r.x + 15, // X du point d'arrivée
        legs.r.y + legs.width // Y du point d'arrivée
    );
    context.stroke();

    all();


    context.beginPath();
    context.moveTo(arms.r.x, arms.r.y); // X et Y du point de départ
    context.bezierCurveTo(
        arms.r.x2, // X du premier point de tension
        arms.r.y2, // Y du premier point de tension
        arms.r.x3, // X du second point de tension
        arms.r.y3, // Y du second point de tension
        arms.r.x + arms.width, // X du point d'arrivée
        arms.r.y // Y du point d'arrivée
    );
    context.stroke();


    // Pupils
    context.beginPath();
    context.moveTo(pupils.l.x, pupils.l.y);
    context.arc(pupils.l.x, pupils.l.y, 8, Math.PI * -0.15, Math.PI * 1.55);
    context.fillStyle = '#131418';
    context.fill();

    context.beginPath();
    context.moveTo(pupils.r.x, pupils.r.y);
    context.arc(pupils.r.x, pupils.r.y, 8, Math.PI * -0.15, Math.PI * 1.55);
    context.fillStyle = '#131418';
    context.fill();

    //maracas2
    maracasBot(590, 200, 10, 100, 6);

    context.beginPath();
    context.arc(595, 210, 30, 0, Math.PI * 2, false);
    context.fillStyle = '#EC387F';
    context.fill();

    context.beginPath();
    context.moveTo(605, 220);
    context.lineTo(615, 207);
    context.lineTo(625, 220);
    context.fillStyle = '#FDDE68';
    context.fill();

    context.beginPath();
    context.moveTo(585, 220);
    context.lineTo(595, 207);
    context.lineTo(605, 220);
    context.fillStyle = '#FDDE68';
    context.fill();

    context.beginPath();
    context.moveTo(565, 220);
    context.lineTo(575, 207);
    context.lineTo(585, 220);
    context.fillStyle = '#FDDE68';
    context.fill();

    context.beginPath();
    context.moveTo(595, 207);
    context.lineTo(605, 220);
    context.lineTo(615, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    context.beginPath();
    context.moveTo(575, 207);
    context.lineTo(585, 220);
    context.lineTo(595, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    context.beginPath();
    context.moveTo(565, 207);
    context.lineTo(565, 220);
    context.lineTo(575, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    context.beginPath();
    context.moveTo(615, 207);
    context.lineTo(625, 220);
    context.lineTo(625, 207);
    context.fillStyle = '#3CD2C5';
    context.fill();

    //hat
    hatBot(hat.x-20, hat.y, 320, 50, 30);
    
    context.beginPath();
    context.arc(hat.x+140, hat.y, 105, Math.PI, 0, false);
    context.fillStyle = '#E7A56A';
    context.fill();
    
    context.beginPath();
    context.moveTo(hat.x+35, hat.y);
    context.lineTo(hat.x+70, hat.y-40);
    context.lineTo(hat.x+105, hat.y);
    context.fillStyle = '#F27469';
    context.fill();
    
    context.beginPath();
    context.moveTo(hat.x+105, hat.y);
    context.lineTo(hat.x+140, hat.y-40);
    context.lineTo(hat.x+175, hat.y);
    context.fillStyle = '#F27469';
    context.fill();
    
    context.beginPath();
    context.moveTo(hat.x+175, hat.y);
    context.lineTo(hat.x+210, hat.y-40);
    context.lineTo(hat.x+245, hat.y);
    context.fillStyle = '#F27469';
    context.fill();
    
    context.beginPath();
    context.moveTo(hat.x-14, hat.y+15);
    context.lineTo(hat.x+4, hat.y+30);
    context.lineTo(hat.x+24, hat.y+15);
    context.lineTo(hat.x+44, hat.y+30);
    context.lineTo(hat.x+64, hat.y+15);
    context.lineTo(hat.x+84, hat.y+30);
    context.lineTo(hat.x+104, hat.y+15);
    context.lineTo(hat.x+124, hat.y+30);
    context.lineTo(hat.x+144, hat.y+15);
    context.lineTo(hat.x+164, hat.y+30);
    context.lineTo(hat.x+184, hat.y+15);
    context.lineTo(hat.x+204, hat.y+30);
    context.lineTo(hat.x+224, hat.y+15);
    context.lineTo(hat.x+244, hat.y+30);
    context.lineTo(hat.x+264, hat.y+15);
    context.lineTo(hat.x+284, hat.y+30);
    context.lineTo(hat.x+295, hat.y+15);
    
    context.strokeStyle = '#131418';
    context.stroke();
}

function move() {
    window.requestAnimationFrame(move);

    context.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw();

}

move();

function boxRound(x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.fillStyle = "#9ABE54";
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.fill();
}

function maracasBot(x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.fillStyle = "#FEA98A";
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.fill();
}

function hatBot(x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.fillStyle = "#E7A56A";
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.fill();
}