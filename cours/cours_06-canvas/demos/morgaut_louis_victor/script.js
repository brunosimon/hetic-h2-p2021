var canvas = document.querySelector('.canvas'),
    context = canvas.getContext('2d');


/**
 * SMOKE
 */

var particles = [];

function create_particle(x, y, direction) {

    var particle           = {};
    particle.x             = x;
    particle.y             = y;
    particle.direction     = direction;
    particle.opacity       = 1;
    particle.speed         = {};
    particle.speed.x       = Math.random() * 2 - 1;
    particle.speed.y       = speed - 1;
    particle.acceleration  = {};
    particle.acceleration.x= 0.995;
    particle.acceleration.y= 0.99;
    particle.style         = 'hsl(0,0%,' + (Math.random() * 10 + 90) + '%)';
    particle.radius        = Math.random() * 30

    particles.push(particle);
}

/** 
 * SMOKE DRAW
 */

function drawSmoke() {

    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        particle.speed.x *= particle.acceleration.x;
        particle.speed.y *= particle.acceleration.y;

        particle.x += particle.speed.x;
        particle.y += particle.speed.y;

        particle.radius += 0.1;
        particle.opacity -= 0.005;

        if (particle.direction == 1) {
            particle.speed.x += 0.0015;
        } else {
            particle.speed.x -= 0.0015;
        };


        if (particle.opacity < 0.1) {
            particles.splice(i, 1);
        } else {
            context.globalAlpha = particle.opacity;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = particle.style;
            context.fill();
        }
    }
}

/**
 * STARS 
 */

var particles2 = [];

function create_particle2(x, y, direction) {

    var particle2           = {};
    particle2.x             = x;
    particle2.y             = y;
    particle2.direction     = direction;
    particle2.opacity       = 1;
    particle2.speed         = {};
    particle2.speed.x       = Math.random() * 2 - 1;
    particle2.speed.y       = Math.random() + 0.5 * speed;
    particle2.acceleration  = {};
    particle2.acceleration.x= 0;
    particle2.acceleration.y= 1;
    particle2.style         = 'hsl(0,0%,100%)';
    particle2.radius        = Math.random() * 1.5;

    particles2.push(particle2);
}

/** 
 * STARS DRAW
 */

function drawStars() {

    for (var i = 0; i < particles2.length; i++) {
        var particle2 = particles2[i];

        particle2.speed.x *= particle2.acceleration.x;
        particle2.speed.y *= particle2.acceleration.y;

        particle2.x += particle2.speed.x;
        particle2.y += particle2.speed.y;

        if (particle2.direction == 1) {
            particle2.speed.x += 0.0015;
        } else {
            particle2.speed.x -= 0.0015;
        };


        if (particle2.opacity < 0.1) {
            particles2.splice(i, 1);
        } else {
            context.globalAlpha = particle2.opacity;
            context.beginPath();
            context.arc(particle2.x, particle2.y, particle2.radius, 0, Math.PI * 2);
            context.fillStyle = particle2.style;
            context.fill();
        }
    }
}


/** 
 * ROCKET
 */

function drawRocket() {

    context.save();
    context.beginPath();
    context.moveTo(592, 45);
    context.bezierCurveTo(592, 45, 638, 76, 638, 124);
    context.bezierCurveTo(638, 173, 639, 370, 639, 370);
    context.lineTo(542, 370);
    context.bezierCurveTo(542, 370, 546, 167, 546, 128);
    context.bezierCurveTo(546, 76, 592, 45, 592, 45);
    context.closePath();
    context.fillStyle = "rgb(178, 53, 66)";
    context.fill();
    context.lineWidth = 2.0;
    context.strokeStyle = "rgb(60, 60, 59)";
    context.stroke();

    context.beginPath();
    context.moveTo(546, 451);
    context.bezierCurveTo(546, 446, 540, 438, 527, 438);
    context.bezierCurveTo(514, 438, 509, 446, 509, 451);
    context.lineTo(546, 451);
    context.closePath();
    context.fillStyle = "rgb(157, 156, 156)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(675, 451);
    context.bezierCurveTo(675, 446, 669, 438, 656, 438);
    context.bezierCurveTo(643, 438, 638, 446, 638, 451);
    context.lineTo(675, 451);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(645, 433);
    context.lineTo(667, 433);
    context.lineTo(667, 440);
    context.lineTo(645, 440);
    context.lineTo(645, 433);
    context.closePath();
    context.fillStyle = "rgb(87, 87, 86)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(516, 433);
    context.lineTo(538, 433);
    context.lineTo(538, 440);
    context.lineTo(516, 440);
    context.lineTo(516, 433);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(512, 426);
    context.lineTo(542, 426);
    context.lineTo(542, 435);
    context.lineTo(512, 435);
    context.lineTo(512, 426);
    context.closePath();
    context.fillStyle = "rgb(178, 178, 177)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(641, 426);
    context.lineTo(671, 426);
    context.lineTo(671, 435);
    context.lineTo(641, 435);
    context.lineTo(641, 426);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(514, 167);
    context.lineTo(500, 167);
    context.lineTo(500, 181);
    context.lineTo(514, 181);
    context.lineTo(514, 167);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(684, 167);
    context.lineTo(670, 167);
    context.lineTo(670, 181);
    context.lineTo(684, 181);
    context.lineTo(684, 167);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(509, 430);
    context.lineTo(544, 430);
    context.bezierCurveTo(544, 430, 544, 188, 544, 149);
    context.bezierCurveTo(544, 135, 534, 123, 527, 123);
    context.bezierCurveTo(519, 123, 509, 135, 509, 151);
    context.bezierCurveTo(509, 180, 509, 430, 509, 430);
    context.closePath();
    context.fillStyle = "rgb(239, 239, 238)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(639, 430);
    context.lineTo(673, 430);
    context.bezierCurveTo(673, 430, 673, 188, 673, 149);
    context.bezierCurveTo(673, 135, 663, 123, 656, 123);
    context.bezierCurveTo(648, 123, 638, 135, 638, 151);
    context.bezierCurveTo(638, 180, 639, 430, 639, 430);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(482.9, 412);
    context.lineTo(697, 412);
    context.bezierCurveTo(697, 412, 703, 372, 685, 354);
    context.bezierCurveTo(668, 337, 657, 329, 638, 311);
    context.bezierCurveTo(615, 288, 621, 205, 621, 205);
    context.lineTo(565, 205);
    context.bezierCurveTo(557, 205, 561, 291, 542, 309);
    context.bezierCurveTo(524, 327, 513, 335, 493, 355);
    context.bezierCurveTo(473, 375, 482, 412, 482, 412);
    context.closePath();
    context.fillStyle = "rgb(135, 135, 134)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(501, 412);
    context.lineTo(678, 412);
    context.bezierCurveTo(678, 412, 682, 378, 668, 364);
    context.bezierCurveTo(654, 350, 645, 343, 630, 328);
    context.bezierCurveTo(611, 309, 615, 241, 615, 241);
    context.lineTo(563, 241);
    context.bezierCurveTo(563, 241, 566, 311, 551, 327);
    context.bezierCurveTo(535, 342, 526, 348, 510, 365);
    context.bezierCurveTo(493, 381, 501, 412, 501, 412);
    context.closePath();
    context.fillStyle = "rgb(178, 178, 177)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(578, 435);
    context.bezierCurveTo(578, 429, 574, 425, 568, 425);
    context.bezierCurveTo(563, 425, 559, 429, 559, 435);
    context.lineTo(578, 435);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(621, 435);
    context.bezierCurveTo(621, 429, 617, 425, 611, 425);
    context.bezierCurveTo(606, 425, 601, 429, 601, 435);
    context.lineTo(621, 435);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(562, 426);
    context.lineTo(562, 417);
    context.lineTo(574, 417);
    context.lineTo(574, 426);
    context.lineTo(562, 426);
    context.closePath();
    context.fillStyle = "rgb(135, 135, 134)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(605, 426);
    context.lineTo(605, 417);
    context.lineTo(617, 417);
    context.lineTo(617, 426);
    context.lineTo(605, 426);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(560, 412);
    context.lineTo(620, 412);
    context.lineTo(620, 422);
    context.lineTo(560, 422);
    context.lineTo(560, 412);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(559, 414);
    context.lineTo(621, 414);
    context.bezierCurveTo(621, 414, 621, 236, 621, 200);
    context.bezierCurveTo(621, 188, 604, 129, 591, 129);
    context.bezierCurveTo(576, 129, 558, 188, 558, 200);
    context.bezierCurveTo(558, 227, 559, 414, 559, 414);
    context.closePath();
    context.fillStyle = "rgb(239, 239, 238)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(548, 455);
    context.lineTo(507, 455);
    context.bezierCurveTo(506, 455, 505, 454, 505, 453);
    context.lineTo(505, 453);
    context.bezierCurveTo(505, 452, 506, 451, 507, 451);
    context.lineTo(548, 451);
    context.bezierCurveTo(549, 451, 550, 452, 550, 453);
    context.lineTo(550, 453);
    context.bezierCurveTo(550, 454, 549, 455, 548, 455);
    context.closePath();
    context.fillStyle = "rgb(157, 156, 156)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(677, 455);
    context.lineTo(636, 455);
    context.bezierCurveTo(635, 455, 634, 454, 634, 453);
    context.lineTo(634, 453);
    context.bezierCurveTo(634, 452, 635, 451, 636, 451);
    context.lineTo(677, 451);
    context.bezierCurveTo(678, 451, 679, 452, 679, 453);
    context.lineTo(679, 453);
    context.bezierCurveTo(679, 454, 678, 455, 677, 455);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(571, 156);
    context.lineTo(609, 156);
    context.bezierCurveTo(609, 156, 603, 130, 591, 130);
    context.bezierCurveTo(579, 130, 571, 156, 571, 156);
    context.closePath();
    context.fillStyle = "rgb(60, 60, 59)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(509, 151);
    context.lineTo(544, 151);
    context.stroke();

    context.beginPath();
    context.moveTo(509, 180);
    context.lineTo(544, 180);
    context.stroke();

    context.beginPath();
    context.moveTo(509, 212);
    context.lineTo(544, 212);
    context.stroke();

    context.beginPath();
    context.moveTo(509, 244);
    context.lineTo(544, 244);
    context.stroke();

    context.beginPath();
    context.moveTo(509, 275);
    context.lineTo(544, 275);
    context.stroke();

    context.beginPath();
    context.moveTo(509, 307);
    context.lineTo(544, 307);
    context.stroke();

    context.beginPath();
    context.moveTo(639, 151);
    context.lineTo(674, 151);
    context.stroke();

    context.beginPath();
    context.moveTo(639, 180);
    context.lineTo(674, 180);
    context.stroke();

    context.beginPath();
    context.moveTo(639, 212);
    context.lineTo(674, 212);
    context.stroke();

    context.beginPath();
    context.moveTo(639, 243);
    context.lineTo(674, 243);
    context.stroke();

    context.beginPath();
    context.moveTo(639, 274);
    context.lineTo(674, 274);
    context.stroke();

    context.beginPath();
    context.moveTo(639, 307);
    context.lineTo(674, 307);
    context.stroke();

    context.beginPath();
    context.moveTo(548, 107);
    context.lineTo(635, 107);
    context.stroke();

    context.beginPath();
    context.moveTo(547, 124);
    context.lineTo(638, 124);
    context.stroke();

    context.beginPath();
    context.moveTo(582, 191);
    context.bezierCurveTo(579, 192, 577, 194, 577, 194);
    context.lineTo(574, 186);
    context.bezierCurveTo(574, 186, 577, 184, 581, 183);
    context.lineTo(582, 191);
    context.closePath();
    context.fillStyle = "rgb(111, 111, 110)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(597, 190);
    context.bezierCurveTo(595, 189, 593, 188, 591, 188);
    context.bezierCurveTo(589, 188, 586, 189, 584, 190);
    context.lineTo(583, 182);
    context.bezierCurveTo(585, 181, 588, 181, 591, 181);
    context.bezierCurveTo(594, 181, 596, 181, 598, 182);
    context.lineTo(597, 190);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(600, 183);
    context.bezierCurveTo(603, 185, 605, 186, 605, 186);
    context.lineTo(604, 194);
    context.bezierCurveTo(604, 194, 601, 192, 598, 191);
    context.lineTo(600, 183);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(576, 60);
    context.lineTo(609, 60);
    context.lineTo(592, 45);
    context.lineTo(576, 60);
    context.closePath();
    context.fillStyle = "rgb(142, 49, 61)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(543, 167);
    context.lineTo(551, 167);
    context.lineTo(551, 174);
    context.lineTo(543, 174);
    context.lineTo(543, 167);
    context.closePath();
    context.fillStyle = "rgb(178, 178, 177)";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(543, 209);
    context.lineTo(551, 209);
    context.lineTo(551, 216);
    context.lineTo(543, 216);
    context.lineTo(543, 209);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(543, 250);
    context.lineTo(551, 250);
    context.lineTo(551, 257);
    context.lineTo(543, 257);
    context.lineTo(543, 250);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(631, 167);
    context.lineTo(639, 167);
    context.lineTo(639, 174);
    context.lineTo(631, 174);
    context.lineTo(631, 167);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(631, 209);
    context.lineTo(639, 209);
    context.lineTo(639, 216);
    context.lineTo(631, 216);
    context.lineTo(631, 209);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(631, 250);
    context.lineTo(639, 250);
    context.lineTo(639, 257);
    context.lineTo(631, 257);
    context.lineTo(631, 250);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(543, 167);
    context.lineTo(551, 167);
    context.lineTo(551, 174);
    context.lineTo(543, 174);
    context.lineTo(543, 167);
    context.closePath();
    context.fill();
    context.stroke();

}

/** 
 * FIRE
 */

function drawFire() {
    var gradient;

    context.beginPath();
    context.moveTo(618, 800);
    context.lineTo(604, 800);
    context.lineTo(604, 436);
    context.lineTo(618, 436);
    context.lineTo(618, 598);
    context.closePath();
    gradient = context.createLinearGradient(611, 597, 611, 436);
    gradient.addColorStop(0, "rgba(255, 238, 38, " + opacity + "");
    gradient.addColorStop(0.8, "rgba(226, 48, 100, 1");
    context.fillStyle = gradient;
    context.fill();

    context.beginPath();
    context.moveTo(576, 800);
    context.lineTo(561, 800);
    context.lineTo(561, 436);
    context.lineTo(576, 436);
    context.lineTo(576, 598);
    context.closePath();
    gradient = context.createLinearGradient(568, 598, 568, 436);
    gradient.addColorStop(0, "rgba(255, 238, 38, " + opacity + "");
    gradient.addColorStop(0.8, "rgba(226, 48, 100, 1)");
    context.fillStyle = gradient;
    context.fill();
    context.restore();
}



/** 
 * LOOP
 */

var speed = 4,
    frame = 0,
    opacity = 0;

function loop() {
    window.requestAnimationFrame(loop);

    //TO DECREASE THE NUMBER OF SMOKE'S PARTICULES PER FRAMES 
    if (frame % 1 == 0) {
        create_particle(528, 468, 0);
        create_particle(658, 468, 1);
    };
    //STARS 
    create_particle2((Math.random() * 1300), 0, 0);
    create_particle2((Math.random() * 1300), 0, 0);
    //TO DECREASE THE VALUES AUTOMATICLY
    speed -= 0.005;
    opacity -= 0.005;
    //TO AVOID A NEGATIVE NUMBER OR A NUMBER TO BIG
    if (opacity < 0) {
        opacity = 0;
    };

    if (speed > 10) {
        speed = 10;
    };

    if (speed < 4) {
        speed = 4;
    };
    //CLEAR DRAWS
    context.clearRect(0, 0, canvas.width, canvas.height);

    //DRAWS
    drawStars();
    if (speed > 5) {
        drawFire();
    };
    drawSmoke();
    drawRocket();
    console.log(speed)
    //PRESS UP KEY TO SPEED 
    window.onkeydown = function(e) {
        if (e.keyCode == 38) {
            speed += 0.05;
            if (speed > 5) {
                speed   += 0.05
                opacity += 0.03;
            };


        };
    };
}

loop();


