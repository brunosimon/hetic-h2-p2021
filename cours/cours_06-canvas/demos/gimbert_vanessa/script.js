var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    color = '#000',
    width_brush = 5,
    painting = false,
    started = false,
    spray_active = 0;

/**
 * RESIZE
 */

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width);
    palette();
    size();
    pen();
    spray();
    felt();
    rubber();
}

window.addEventListener('resize', resize);
resize();

/**
 * MOUSE
 */

    document.addEventListener('mousedown', function (event) {
        painting = true;
        var mouse = {
            x: event.clientX,
            y: event.clientY
        };

    });

    document.addEventListener('mouseup', function (event) {
        painting = false;
        started = false;
    });

    document.addEventListener('mousemove', function (event) {
        if (painting) {
            var mouse = {
                x: (event.clientX - canvas.offsetLeft),
                y: (event.clientY - canvas.offsetTop)
            };

            drawLine();
        }
    });


/**
 * DRAW
 */

function drawLine(e) {
    if (!started) {
        var mouse = {
            x: event.clientX,
            y: event.clientY
        };

        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
        context.closePath();
        started = true;

    } else {
        var mouse = {
            x: event.clientX,
            y: event.clientY
        };
        if ((mouse.x > (canvas.width - 250)) || (mouse.x < (120))) {
            painting = false;
        } else {
            if (spray_active == 1) {
                var density = 40;
                for (var i = density; i--;) {
                    var radius = 20;
                    var offsetX = getRandomInt(-radius, radius);
                    var offsetY = getRandomInt(-radius, radius);
                    context.fillRect(mouse.x + offsetX, mouse.y + offsetY, 1, 1);
                }
            } else {
                context.lineTo(mouse.x, mouse.y);
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.stroke();
            }

        }

    }


}

/**
 * PALETTE
 */

function palette() {


    setTimeout(function () {
                                                                        // DRAW //
        // COLORS - YELLOW //
        context.beginPath();
        context.fillStyle = "#f5e38d";
        context.arc(canvas.width - 125, 100, 50, 0, 2 * Math.PI);
        context.fill();

        // COLORS - ORANGE //
        context.beginPath();
        context.fillStyle = "#fab387";
        context.arc(canvas.width - 125, 215, 50, 0, 2 * Math.PI);
        context.fill();

        // COLORS - RED //
        context.beginPath();
        context.fillStyle = "#db465a";
        context.arc(canvas.width - 125, 330, 50, 0, 2 * Math.PI);
        context.fill();

        // COLORS - BLUE //
        context.beginPath();
        context.fillStyle = "#88d4ec";
        context.arc(canvas.width - 125, 445, 50, 0, 2 * Math.PI);
        context.fill();

        // COLORS - GREEN //
        context.beginPath();
        context.fillStyle = "#85b2a9";
        context.arc(canvas.width - 125, 560, 50, 0, 2 * Math.PI);
        context.fill();

        // COLORS - BLACK //
        context.beginPath();
        context.fillStyle = "#000";
        context.arc(canvas.width - 125, 675, 50, 0, 2 * Math.PI);
        context.fill();
        
                                                                            // EVENT //
        
        // YELLOW //
        document.addEventListener("click", function (e) {
            if ((event.clientX > canvas.width - 175) && (event.clientX < canvas.width - 75) && (event.clientY > 50) && (event.clientY < 150)) {
                color = "#f5e38d";
            }
            //console.log(color);
        });

        // ORANGE //
        document.addEventListener("click", function (e) {
            if ((event.clientX > canvas.width - 175) && (event.clientX < canvas.width - 75) && (event.clientY > 165) && (event.clientY < 265)) {
                color = "#fab387";
            }
            //console.log(color);
        });

        // RED //
        document.addEventListener("click", function (e) {
            if ((event.clientX > canvas.width - 175) && (event.clientX < canvas.width - 75) && (event.clientY > 280) && (event.clientY < 380)) {
                color = "#db465a";
            }
            console.log(color);
        });

        // BLUE //
        document.addEventListener("click", function (e) {
            if ((event.clientX > canvas.width - 175) && (event.clientX < canvas.width - 75) && (event.clientY > 395) && (event.clientY < 495)) {
                color = "#88d4ec";
            }
            //console.log(color);
        });

        // GREEN //
        document.addEventListener("click", function (e) {
            if ((event.clientX > canvas.width - 175) && (event.clientX < canvas.width - 75) && (event.clientY > 510) && (event.clientY < 610)) {
                color = "#85b2a9";
            }
            //console.log(color);
        });

        // BLACK //
        document.addEventListener("click", function (e) {
            if ((event.clientX > canvas.width - 175) && (event.clientX < canvas.width - 75) && (event.clientY > 625) && (event.clientY < 725)) {
                color = "#000";
            }
            //console.log(color);
        });



    }, 100);

}

palette();


/**
 * SIZE BRUSH
 */

function size() {

    setTimeout(function () {

                                                                        // DRAW //
        // 10 px //
        context.beginPath();
        context.arc(68, 90, 10, 0, 2 * Math.PI);
        context.fillStyle = "#000";
        context.fill();

        // 15 px //
        context.beginPath();
        context.fillStyle = "#000";
        context.arc(68, 135, 15, 0, 2 * Math.PI);
        context.fill();

        // 20 px //
        context.beginPath();
        context.fillStyle = "#000";
        context.arc(68, 185, 20, 0, 2 * Math.PI);
        context.fill();

        // 25 px //
        context.beginPath();
        context.fillStyle = "#000";
        context.arc(68, 245, 25, 0, 2 * Math.PI);
        context.fill();

                                                                        // EVENT //
        // 10 px //
        document.addEventListener("click", function (e) {
            if ((event.clientX > 58) && (event.clientX < canvas.width - 78) && (event.clientY > 80) && (event.clientY < 100)) {
                width_brush = 5;
            }
        });

        // 15 px //
         document.addEventListener("click", function (e) {
            if ((event.clientX > 53) && (event.clientX < 83) && (event.clientY > 120) && (event.clientY < 150)) {
                width_brush = 10;
            }
        });

        // 20 px //
        document.addEventListener("click", function (e) {
            if ((event.clientX > 48) && (event.clientX < 88) && (event.clientY > 165) && (event.clientY < 205)) {
                width_brush = 20;
            }
        });

        // 25 px //
        document.addEventListener("click", function (e) {
            if ((event.clientX > 43) && (event.clientX < 93) && (event.clientY > 220) && (event.clientY < 270)) {
                width_brush = 30;
            }
        });

    }, 300);

}

size();

/**
 * PEN
 */

function pen() {

    setTimeout(function () {

                                                            // DRAW //

        context.beginPath();
        context.rect(57, 310, 26, 35);
        context.fillStyle = '#6fa847';
        context.fill();

        context.beginPath();
        context.rect(57, 310, 8, 35);
        context.fillStyle = '#a5ce83';
        context.fill();

        context.beginPath();
        context.rect(57, 300, 26, 10);
        context.fillStyle = '#a0a19d';
        context.fill();

        context.beginPath();
        context.arc(70, 300, 13, 0, Math.PI, true); 
        context.fillStyle = '#bc6d81';
        context.fill();

        context.beginPath();
        context.moveTo(70, 365);
        context.lineTo(57, 345);
        context.lineTo(83, 345);
        context.fillStyle = '#f5c889';
        context.fill();

        context.beginPath();
        context.rect(66, 358, 8, 8);
        context.fillStyle = '#000';
        context.fill();
                                                            // EVENT //

        document.addEventListener("click", function (e) {
            if ((event.clientX > 40) && (event.clientX < 96) && (event.clientY > 300) && (event.clientY < 391)) {
                context.shadowBlur = 0;
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.stroke();
                spray_active = 0;
            }
        });

    }, 200);

}

pen();


/**
 * SPRAY
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spray() {

    setTimeout(function () {
                                                                // DRAW //

        context.beginPath();
        context.arc(70, 410, 15, 0, Math.PI, true);
        context.fillStyle = '#95afbc';
        context.fill();

        context.beginPath();
        context.rect(55, 410, 30, 45);
        context.fillStyle = '#848484';
        context.fill();

        context.beginPath();
        context.rect(55, 410, 30, 5);
        context.fillStyle = '#dedede';
        context.fill();

        context.beginPath();
        context.rect(66, 385, 8, 10); 
        context.fillStyle = '#000';
        context.fill();

        context.beginPath();
        context.rect(66, 393, 8, 3);
        context.fillStyle = '#dedede';
        context.fill();

        context.beginPath();
        context.rect(71, 388, 3, 3);
        context.fillStyle = '#95afbc';
        context.fill();

                                                                 // EVENT//
        document.addEventListener("click", function (e) {
            if ((event.clientX > 55) && (event.clientX < 101) && (event.clientY > 380) && (event.clientY < 440)) {
                var radius = 20;
                context.globalCompositeOperation = 'destination-over';
                context.shadowBlur = 0;
                context.lineWidth = 10;
                context.lineJoin = context.lineCap = 'round';
                context.fillStyle = color;
                spray_active = 1;
            }
        });


    }, 200);


}

spray();


/**
 * FELT
 */

function felt() {

    setTimeout(function () {
                                                                    // DRAW //

        context.beginPath();
        context.rect(55, 500, 30, 49);
        context.fillStyle = '#e25046';
        context.fill();

        context.beginPath();
        context.rect(55, 500, 6, 49);
        context.fillStyle = '#f77167';
        context.fill();

        context.lineJoin = "round";
        context.beginPath();
        context.moveTo(55, 500);
        context.lineTo(63, 490); 
        context.lineTo(77, 490);
        context.lineTo(85, 500);
        context.closePath();
        context.fillStyle = '#000';
        context.fill();

        context.beginPath();
        context.moveTo(63, 480);
        context.lineTo(63, 490);
        context.lineTo(77, 490);
        context.lineTo(77, 483)
        context.closePath();
        context.fillStyle = '#ed4f44';
        context.fill();

                                                                    // EVENT //
        document.addEventListener("click", function (e) {
            if ((event.clientX > 55) && (event.clientX < 115) && (event.clientY > 470) && (event.clientY < 530)) {
                context.globalCompositeOperation = 'destination-over';
                context.lineWidth = 10;
                context.lineJoin = context.lineCap = 'round';
                context.shadowBlur = 10;
                context.shadowColor = color;
                spray_active = 0;
            }
        });

    }, 200);
}

felt();

/**
 * RUBBER
 */

function rubber() {

    setTimeout(function () {

                                                                        // DRAW //
        context.beginPath();
        context.moveTo(55, 600);
        context.lineTo(55, 580);
        context.lineTo(85, 573);
        context.lineTo(85, 600);
        context.closePath();
        context.fillStyle = '#f4c1df';
        context.fill();

        context.beginPath();
        context.rect(55, 600, 30, 40);
        context.fillStyle = '#8bc9e0';
        context.fill();

        context.beginPath();
        context.rect(58, 600, 6, 40);
        context.fillStyle = '#efefef';
        context.fill();

                                                                        // EVENT //
        document.addEventListener("click", function (e) {
            if ((event.clientX > 55) && (event.clientX < 95) && (event.clientY > 573) && (event.clientY < 600)) {
                context.globalCompositeOperation = 'destination-out';
                context.lineWidth = width_brush;
                context.strokeStyle = 'rgba(0,0,0,1)';
            }
        });

    }, 200);

}

rubber();

/**
 * SAVE
 */

function save(){

    document.getElementById('save').addEventListener('click', function () {
            var canvas_tmp = document.getElementById("canvas");   
            window.location = canvas_tmp.toDataURL("image/png");
    });
}
save();

/**
 * CLEAR
 */

    function clear(){
    document.getElementById('clear').addEventListener('click', function () {
        context.clearRect(130, 0, canvas.width - 380, canvas.height);
    }, false);
}

clear();







