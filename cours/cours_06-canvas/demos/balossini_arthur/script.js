/* Query Selector */
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var score_txt = document.querySelector('p.score');
var life_txt = document.querySelector('p.life span.life-var');
var game_over = document.querySelector('.container-game-over');
var game_over_button = document.querySelector('.container-game-over button');
var final_score = document.querySelector('.container-game-over .final-score');
var best = document.querySelector('.container-game-over .best-score');
canvas.height = window.innerHeight - 150;
var rules = document.querySelector('.container-rules');
var rules_button = document.querySelector('.container-rules button');

var game_start = 0;

/* Start game on click & Css Display */
function start_game() {
    window.requestAnimationFrame(start);
    game_start = 1;
}

rules_button.addEventListener('click', function() {
    rules.style.opacity = 0;
    setTimeout(function() {
        rules.style.display = "none";
    }, 500);
    start_game();
});

rules_button.addEventListener('touchstart', function() {
    rules.style.opacity = 0;
    setTimeout(function() {
        rules.style.display = "none";
    }, 500);
    start_game();
});

game_over_button.addEventListener('click', function() {
    game_over.style.opacity = 0;
    setTimeout(function() {
        game_over.style.display = "none";
    }, 500);
    start_game();
});

game_over_button.addEventListener('touchstart', function() {
    game_over.style.opacity = 0;
    setTimeout(function() {
        game_over.style.display = "none";
    }, 500);
    start_game();
});


/* Responsive (Resizing of playable area) */
if (window.matchMedia("(max-width: 615px)").matches) {
    function resize() {
        canvas.width = window.innerWidth - 15;
        canvas.height = window.innerHeight - 150;
    }
    resize();
}

window.addEventListener('resize', function() {
    if (window.matchMedia("(max-width: 615px)").matches) {
        function resize() {
            canvas.width = window.innerWidth - 15;
            canvas.height = window.innerHeight - 150;
        }
    } else {
        function resize() {
            canvas.height = window.innerHeight - 150;
        }
        canvas.height = window.innerHeight - 150;
    }
    resize();
});


/* Main function */
function start() {
    /* Variables */
    var score = 0;
    var old_score = 0;
    var spawn_rate = 1000;
    var velocity_rate = 0;
    var break_target = {};
    var particles_color;
    var score_particles = 0;
    var reward = 0;
    var boss = 0;
    var boss_down = 0;
    var boss2_down = 0;
    var boss_spawn = 0;
    var bonus = 0;
    var bonus_time = 0;
    var best_score;
    var nb_life = 3;

    /* Define X and Y of the playable area */
    if (game_start == 1) {
        function get_XY(canvas, event) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            }
        }

        var mouse = { x: canvas.width / 2, y: canvas.width }; // Initial mouse position

        /* Update position on mousemove */
        document.addEventListener('mousemove', function(e) {
            mouse = get_XY(canvas, e);
        });

        var startx = 0
        var finger = 0

        /* Update mouse position on finger move */
        document.addEventListener('touchmove', function(e) {
            var rect = canvas.getBoundingClientRect(); // 
            var touchobj = e.changedTouches[0];
            var finger = {};
            finger.x = parseInt(touchobj.clientX) - rect.left - 5;
            finger.y = parseInt(touchobj.clientY) - rect.top - 20;
            mouse = finger;
            e.preventDefault();
        }, false)



        /* Fire variables */
        var fires = [];
        var _fire = 0;
        var n = 0;

        /* Add fire where mouse is */
        function add_fire(pos) {
            var fire = {};
            fire.x = mouse.x + pos;
            fire.y = mouse.y;
            fires.push(fire);
            fire.velocity = {};
            fire.velocity.x = 0;
            fire.velocity.y = -10;
        }

        /* Draw fire at the position define in add_fire() */
        function draw_fire() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < fires.length; i++) {
                var _fire = fires[i];
                context.beginPath();
                context.arc(_fire.x, _fire.y, 5, 0, Math.PI * 2);
                context.fillStyle = "#dbfbff";
                context.fill();
            }
        }

        /* Update fire */
        function update_fire() {
            for (n = 0; n < fires.length; n++) {
                _fire = fires[n];
                if (_fire != undefined) { // Fires go to the top of the playable area
                    _fire.x += _fire.velocity.x;
                    _fire.y += _fire.velocity.y;

                    if ( // Fires disappear when out of playale area
                        _fire.x < 0 ||
                        _fire.x > canvas.width ||
                        _fire.y < 0
                    ) {
                        fires.splice(n, 1);
                        n--;
                    }

                    for (p = 0; p < targets.length; p++) {
                        _target = targets[p];
                        if (((_target.y <= _fire.y) && (_fire.y <= _target.y + _target.h)) && ((_target.x - 5 <= _fire.x) && (_fire.x <= _target.x + _target.w + 5))) { // Destroy targets and fires when they touch each others
                            if (_target.type == "target") { // Need only 1 hit to get destroy
                                break_target.x = _target.x + _target.w / 2;
                                break_target.y = _target.y + _target.h / 2;
                                fires.splice(n, 1);
                                n--;
                                targets.splice(p, 1);
                                p--;
                                score += 2;
                                particles_color = _target.color;
                                reward = 10;
                            } else if (_target.type == "target_huge") {
                                fires.splice(n, 1);
                                n--;
                                _target.touch++;
                                if (_target.touch == 4) { // Need 4 hits to get destroy
                                    break_target.x = _target.x + _target.w / 2;
                                    break_target.y = _target.y + _target.h / 2;
                                    targets.splice(p, 1);
                                    p--;
                                    particles_color = _target.color;
                                    _target.touch = 0;
                                    reward = 20;
                                }

                            } else if (_target.type == "target_insane") {
                                fires.splice(n, 1);
                                n--;
                                _target.touch++;
                                if (_target.touch == 8) { // Need 8 hits to get destroy
                                    break_target.x = _target.x + _target.w / 2;
                                    break_target.y = _target.y + _target.h / 2;
                                    targets.splice(p, 1);
                                    p--;
                                    particles_color = _target.color;
                                    _target.touch = 0;
                                    reward = 80;
                                }

                            } else if (_target.type == "boss") {
                                fires.splice(n, 1);
                                n--;
                                _target.touch++;
                                if (_target.touch == 80) { // Need 80 hits to get destroy
                                    break_target.x = _target.x + _target.w / 2;
                                    break_target.y = _target.y + _target.h / 2;
                                    targets.splice(p, 1);
                                    p--;
                                    particles_color = _target.color;
                                    _target.touch = 0;
                                    reward = 600;
                                    boss_down = 1;
                                    score_particles += 200;
                                }
                            } else if (_target.type == "boss2") { // Need 120 hits to get destroy
                                fires.splice(n, 1);
                                n--;
                                _target.touch++;
                                if (_target.touch == 120) {
                                    break_target.x = _target.x + _target.w / 2;
                                    break_target.y = _target.y + _target.h / 2;
                                    targets.splice(p, 1);
                                    p--;
                                    particles_color = _target.color;
                                    _target.touch = 0;
                                    reward = 600;
                                    boss2_down = 1;
                                    score_particles += 600;
                                }
                            }
                        }
                    }
                }
            }

            if (targets != undefined) {
                for (p = 0; p < targets.length; p++) {
                    _target = targets[p];
                    if (((mouse.x - (_target.w + 32) <= _target.x) && (_target.x <= mouse.x + 35)) && ((mouse.y - (_target.h + 12) <= _target.y) && (_target.y <= mouse.y + 30))) { // What happen a target touche the main cube depend of target type
                        if (_target.type == "life") { // Add 1 life
                            nb_life++;
                        } else if (_target.type == "bonus") { // Add the bonus
                            bonus = 1;
                            bonus_time = 0;
                        } else if (_target.type == "boss") { // Set boss statement to down and lose 3 lives
                            boss_down = 1;
                            nb_life -= 3;
                        } else if (_target.type == "boss2") { // Set boss statement to down and lose 4 lives
                            boss2_down = 1;
                            nb_life -= 4;
                        } else { // Lose 1 life
                            nb_life--;
                        }
                        targets.splice(p, 1);
                        p--;
                    }
                }
            }
            if (particles != undefined) {
                for (var i = 0; i < particles.length; i++) {
                    _particle = particles[i];
                    if (((mouse.x - (_particle.w + 32) <= _particle.x) && (_particle.x <= mouse.x + 35)) && ((mouse.y - 5 <= _particle.y) && (_particle.y <= mouse.y + 25))) { // When particules touche the main cube : add 1 point to score
                        particles.splice(i, 1);
                        i--;
                        score_particles++;
                        _particle.particle_pos = 0;
                    }
                }

            }
        }

        function fire() { // Call fire functions (update and draw) each frame
            window.requestAnimationFrame(fire);
            update_fire();
            draw_fire();
        }

        function fire2() { // Call fire function (add) each 50ms
            setTimeout(function() {
                window.requestAnimationFrame(fire2);
                if ((bonus == 1) && (bonus_time < 150)) { // Check if a bonus has been catched and activate it for 15s
                    add_fire(-22); // Add a the DOUBLE FIRE !!!!
                    add_fire(22);
                    bonus_time++;
                } else {
                    add_fire(0);
                }
            }, 50);
        };




        /* Targets variables */
        var targets = [];
        var _target = 0;
        var p = 0;

        /* Add bosses function */
        function add_boss() {
            var target = {};
            target.x = 25;
            target.y = -400;
            target.velocity = {};
            target.velocity.x = 0;
            if (boss_spawn == 0) {
                target.type = "boss";
                target.color = "#d60019";
                target.w = canvas.width - 50;
                target.h = 300;
                target.velocity.y = 1;
            } else if (boss_spawn == 1) {
                target.type = "boss2";
                target.color = "#2cff00";
                target.w = canvas.width - 50;
                target.h = 300;
                target.velocity.y = 0.5;
            }
            target.touch = 0;
            targets.push(target);
        }

        /* Add targets function */
        function add_target() {
            var target = {};
            target.velocity = {};
            target.velocity.x = 0;

            target_spawn = Math.floor((Math.random() * 400) + 1); // Generate a number between 1 - 400

            if ((target_spawn > 10) && (target_spawn <= 30)) { // If number is 11 - 30 spawn life
                target.w = 20;
                target.h = 20;
                target.velocity.y = 3;
                target.type = "life";
                target.color = "deeppink";
            } else if ((target_spawn > 397) && (target_spawn <= 399)) { // If number is 398 - 399 spawn bonus
                target.w = 20;
                target.h = 20;
                target.velocity.y = 3;
                target.type = "bonus";
                target.color = "#00ff82";
            } else if ((target_spawn > 40) && (target_spawn <= 60)) { // If number is 41 - 60 spawn huge target
                target.w = 90;
                target.h = 30;
                target.velocity.y = 5;
                target.type = "target_huge";
                target.color = "#8a08ff";
                target.touch = 0;
            } else if ((target_spawn > 30) && (target_spawn <= 37)) { // If number is 31 - 37 spawn insane target
                target.w = 100;
                target.h = 100;
                target.velocity.y = 2;
                target.type = "target_insane";
                target.color = "#f3ff19";
                target.touch = 0;
            } else { // For all other number spawn normal target
                target.w = 30;
                target.h = 30;
                target.velocity.y = 5;
                target.type = "target";
                target.color = "#00d9ff";
            }
            target.x = Math.random() * (canvas.width - 30); // Pos x = random
            target.y = -target.h; // Pos y = on top of the playable area

            targets.push(target);
        }

        /* Draw fire at the position define in add_target() */
        function draw_target() {
            for (var i = 0; i < targets.length; i++) {
                var _target = targets[i];
                context.beginPath();
                context.rect(_target.x, _target.y, _target.w, _target.h);
                context.fillStyle = _target.color;
                context.fill();
            }
        }

        /* Update target */
        function update_target() {
            for (p = 0; p < targets.length; p++) {
                _target = targets[p];
                if ((_target.type == "boss") || (_target.type == "boss2")) { // Boss are slower than targets
                    _target.x += 0;
                    _target.y += _target.velocity.y;
                } else { // Moving slowly to the main cube
                    _target.x += (mouse.x - _target.x) * 0.0075;
                    _target.y += _target.velocity.y + velocity_rate;
                }
                if (_target.x < 0 ||
                    _target.x > canvas.width ||
                    _target.y > canvas.height + 40) { // Delete target and score = -2 if target reach the bottom of the playable area
                    targets.splice(p, 1);
                    p--;
                    score--;
                    score_particles -= 2;
                }
            }
        }


        function target() { // Call fire functions (update and draw) each frame
            window.requestAnimationFrame(target);
            update_target();
            draw_target();
        }


        function target2() { // Call fire functions (add) at a defined spawn rate
            setTimeout(function() {
                window.requestAnimationFrame(target2);
                if ((score_particles > 900) && (boss_spawn == 0)) { // when reach 900 points spawn the first boss
                    add_boss();
                    boss_spawn = 1;
                } else if ((boss_spawn == 1) && (score_particles > 2200)) { // when reach 2200 points spawn the second boss
                    add_boss();
                    boss_spawn = 2;
                } else if ((((boss_down == 0) && (score_particles <= 900)) || ((boss_down == 1)) && boss_spawn == 1) ||
                    ((((boss2_down == 0) && (score_particles <= 2200)) || (boss2_down == 1)) && (boss_down == 1))) { // when boss aren't alive spawn targets
                    add_target();
                }
            }, spawn_rate);
        }

        /* Spawn function */
        function spawn() {
            if (old_score + 2 == score) { // When destroy a target 
                spawn_rate -= 10; // Target spawn 10ms more often
                velocity_rate += 0.015; // Their speed is increase 
                if (spawn_rate < 40) { // Spawn can not be minus than 1 target each 40ms
                    spawn_rate = 40;
                }
                old_score = score;
            } else if (old_score - 1 == score) { // When a target reach the bottom of playable area
                spawn_rate += 4; // Target spawn 4ms less often
                velocity_rate -= 0.001; // Their speed is decrease 
                old_score = score;
            } else {
                old_score = score;
            }
        }

        /* Particles on each fires variables */
        var particles_fire = [];

        /* Add particles on each fires variables */
        function add_particles_fire(pos) {
            var particle = {};
            _particle = pos; // Depending of the fire position
            particle.x = _particle.x + 0;
            particle.y = _particle.y + 5;
            particle.velocity = {};
            particle.velocity.x = Math.random() * 1 - 0.5;
            particle.velocity.y = 4;

            var hue = Math.round(Math.random() * 360);
            // particle.color = 'hsl(' + hue + ',100%,50%)';

            particle.radius = Math.random() * 1;

            particles_fire.push(particle);
        }

        /* Update the particles on each fires variables */
        function update_particles_fire() {
            for (var i = 0; i < particles_fire.length; i++) {
                var _particle = particles_fire[i];
                _particle.x += _particle.velocity.x;
                _particle.y += _particle.velocity.y;
                if ( // And delete them when reach the top of the playable area
                    _particle.x < 0 ||
                    _particle.x > canvas.width ||
                    _particle.y < 0 ||
                    _particle.y > canvas.height
                ) {
                    particles_fire.splice(i, 1);
                    i--;
                } else if (particles_fire.length > 10 * fires.length) { // Number of particles on each fires can not exceed 10
                    particles_fire.splice(i, 1);
                    i--;
                }
            }
        }

        /* Draw the particles on each fires variables */
        function draw_particles_fire() {
            context.globalCompositeOperation = 'lighten';
            for (var i = 0; i < particles_fire.length; i++) {
                var _particle = particles_fire[i];
                context.beginPath();
                context.arc(_particle.x, _particle.y, _particle.radius, 0, Math.PI * 2);
                context.fillStyle = '#def9ff';
                context.fill();
            }
        }


        var particles = [];

        /* Add particles on each destroyed target */
        function add_particle() {
            var particle = {};
            particle.x = break_target.x; // Get the target position
            particle.y = break_target.y;
            particle.velocity = {};
            particle.velocity.x = (Math.random() * 12 - 6) * 4.5;
            particle.velocity.y = (Math.random() * 12 - 6) * 4;
            particle.w = 6;
            particle.h = 6;
            particle.particle_pos = 0;
            particle.color = particles_color; // Get the arget color
            particles.push(particle);
        }

        /* Updates particles */
        function update_particles() {
            for (var i = 0; i < particles.length; i++) {
                var _particle = particles[i];
                if (
                    _particle.x < 10 ||
                    _particle.x > canvas.width + 10 ||
                    _particle.y < 10 ||
                    _particle.y > canvas.height + 10
                ) {
                    _particle.particle_pos = 1;
                }
                if ((_particle.particle_pos == 1) || ((_particle.velocity.x == 0) && (_particle.velocity.x == 0))) { // When particles reach the border of playable area particles go to main cube
                    _particle.x += (mouse.x - _particle.x) * 0.06;
                    _particle.y += (mouse.y - _particle.y) * 0.06;
                } else { // Particles go to the borders of the playable area
                    _particle.x += _particle.velocity.x;
                    _particle.y += _particle.velocity.y;
                }
            }
        }

        /* Draw particles on the position of destroyed target */
        function draw_particles() {
            context.globalCompositeOperation = 'lighten';
            for (var i = 0; i < particles.length; i++) {
                var _particle = particles[i];
                context.beginPath();
                context.rect(_particle.x, _particle.y, _particle.w, _particle.h);
                context.fillStyle = _particle.color;
                context.fill();
            }
        }

        /* Detect the border */
        function border_detect() {
            if (mouse.x < 0) { // If touch left
                if (mouse.y + 10 < 0) { // If touch top and left
                    context.rect(-35, -12, 70, 30); // Stay on top left
                } else if (mouse.y > canvas.height - 12) { // If touch bottom and left
                    context.rect(-35, canvas.height - 12, 70, 30); // Stay on bottom left
                } else {
                    context.rect(-35, mouse.y, 70, 30); // Stay on left
                }
            } else if (mouse.x > canvas.width) { // If touch right
                if (mouse.y + 10 < 0) { // If touch top and right
                    context.rect(canvas.width - 35, -12, 70, 30); // Stay on top right
                } else if ((mouse.y > canvas.height - 12)) { // If touch bottom and right
                    context.rect(canvas.width - 35, canvas.height - 12, 70, 30); // Stay on bottom right
                } else {
                    context.rect(canvas.width - 35, mouse.y, 70, 30); // Stay on right
                }
            } else if (mouse.y + 10 < 0) { // If touch top
                context.rect(mouse.x - 35, -12, 70, 30); // Stay on top
            } else if (mouse.y > canvas.height - 12) { // If touch bottom
                context.rect(mouse.x - 35, canvas.height - 12, 70, 30); // Stay on bottom
            } else {
                context.rect(mouse.x - 35, mouse.y, 70, 30); // Else just follow the mouse or finger position
            }
        }

        /* Life count function */

        function life_count() {
            if (nb_life == 0) { // when number of life reach 0
                game_start = 0; // Stop the game
                game_over.style.opacity = 1; // Display the game-over div
                game_over.style.display = "block";
                best_score = localStorage.getItem("best_score"); // Get the higest score in local storage
                if (score_particles > best_score) { // If the current score is better than the higest score
                    localStorage.removeItem("best_score"); // Delete the higest score
                    localStorage.setItem("best_score", score_particles); // And replace it with the current score
                    best_score = score_particles;
                }
                final_score.innerHTML = score_particles;
                best.innerHTML = best_score;
            }
        }

        /* Main loop function */
        function loop() {
            if (game_start == 1) { // Draw the main cube when game start
                window.requestAnimationFrame(loop);
                context.globalAlpha = 1;
                context.beginPath();
                border_detect(); // Get the position main cube
                context.fillStyle = '#dbfbff';
                context.fill();
                score_txt.innerHTML = score_particles;
                life_txt.innerHTML = nb_life;
                spawn(); // Define speed and spawn rate
                for (n = 0; n < fires.length; n++) {
                    add_particles_fire(fires[n]); // Draw particles on each fires
                }
                if (break_target.x > 0) { // Check if a target as been destroyed
                    for (var i = 0; i < reward; i++) {
                        add_particle();
                    }
                    break_target.x = 0;
                }
                update_particles();
                draw_particles();
                update_particles_fire();
                draw_particles_fire();
                life_count();
            }
        }
        fire();
        fire2();
        target();
        target2();
        loop();
    }
}
start();
