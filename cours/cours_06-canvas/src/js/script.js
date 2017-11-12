var canvas   = null,
    context  = null,
    canvass  = [],
    contexts = [];

for(var i = 1; i < 21; i++)
{
    canvas = document.getElementById('canvas-'+i);
    if(canvas)
    {
        context = canvas.getContext('2d');
        canvass.push(canvas);
        contexts.push(context);
    }
}

/* Lignes */
contexts[0].beginPath();      // Commencer un tracé
contexts[0].moveTo(50,50);    // Placer le tracé
contexts[0].lineTo(200,200);  // Tracer une ligne (théorique)
contexts[0].lineTo(50,200);   // Tracer autre une ligne (théorique)
contexts[0].closePath();      // Tracer une dernière ligne qui ferme la forme (non obligatoire)
contexts[0].stroke();         // Faire apparaitre les lignes tracées

/* Remplissage */
contexts[1].beginPath();      // Commencer un tracé
contexts[1].moveTo(50,50);    // Placer le tracé
contexts[1].lineTo(200,200);  // Tracer une ligne (théorique)
contexts[1].lineTo(50,200);   // Tracer autre une ligne (théorique)
contexts[1].fill();           // Faire apparaitre la forme dessinée

/* Style de ligne */
contexts[2].beginPath();
contexts[2].moveTo(50,50);
contexts[2].lineTo(200,200);
contexts[2].lineTo(50,200);
contexts[2].lineWidth   = 20;       // Largeur de la ligne
contexts[2].lineCap     = 'round';  // Fin de ligne (round | butt | square)
contexts[2].lineJoin    = 'bevel';  // Jointure des lignes (bevel | round | mitter)
contexts[2].strokeStyle = 'orange'; // Couleur de la ligne
contexts[2].stroke();

/* Style de remplissage */
contexts[3].beginPath();
contexts[3].moveTo(50,50);
contexts[3].lineTo(200,200);
contexts[3].lineTo(50,200);
contexts[3].fillStyle = 'rgba(255,0,0,0.5)'; // Couleur du remplissage
contexts[3].fill();

/* Ombres */
contexts[4].beginPath();
contexts[4].moveTo(50,50);
contexts[4].lineTo(200,200);
contexts[4].lineTo(50,200);
contexts[4].fillStyle     = 'rgba(255,0,0,1)';
contexts[4].shadowColor   = 'blue';   // Couleur de l'ombre
contexts[4].shadowBlur    = 50;       // Largeur du flou
contexts[4].shadowOffsetX = 5;        // Décalage en X
contexts[4].shadowOffsetY = 10;       // Décalage en Y
contexts[4].fill();

/* Formes prédéfinies */
contexts[5].fillStyle = 'orange';
contexts[5].strokeStyle = 'orange';

contexts[5].beginPath();
contexts[5].rect(50,50,200,100);
contexts[5].fill();

contexts[5].beginPath();
contexts[5].arc(400,50,100,0,Math.PI,false);
contexts[5].fill();

contexts[5].beginPath();
contexts[5].fillStyle = 'orange';
contexts[5].rect(50,200,200,100);
contexts[5].stroke();

contexts[5].beginPath();
contexts[5].arc(400,200,100,0,Math.PI,false);
contexts[5].stroke();


/* Remplissage par forme */
contexts[6].fillStyle = 'orange';
contexts[6].fillRect(50,50,300,160);           //Tracer un rectangle (sans appel de la fonction fill)
contexts[6].clearRect(50,50,100,80);           //Effacer un rectangle (sans appel de la fonction fill)
contexts[6].beginPath();
contexts[6].fillStyle = 'black';
contexts[6].arc(280,210,50,0,Math.PI,false);   //Tracer un arc de cercle (theorique) x,y,r,rad1,rad2,s
contexts[6].arc(120,210,50,0,Math.PI,false);   //Tracer un autre arc de cercle (theorique)
contexts[6].fill();                            //Faire apparaitre les formes tracées
contexts[6].fillStyle = '#00EEFF';
contexts[6].fillRect(160,60,20,70);

/* Écrire du texte */
var text = 'Lorem ipsum dolor sit amet';
contexts[7].font         = '40px Arial';          // Font
contexts[7].textAlign    = 'center';              // Alignement horizontal (left | center | right)
contexts[7].textBaseline = 'top';                 // Alignement vertical (top | bottom | middle | alphabetic | hanging)
contexts[7].fillText(text,300,100);               // Faire apparaitre le texte
contexts[7].strokeText(text,300,160);             // Faire apparaitre le contour du texte

/* Image */
/* L'image doit être créée en javascript il faut écouter l'événement load avant de l'utiliser */
var image = new Image();
image.onload = function()
{
    contexts[8].drawImage(image,0,0,image.width / 6,image.height / 6);
    //drawImage permet aussi de dessiner un autre canvas ou de la vidéo
};
image.src = 'src/img/image-1.jpg';

/* Dégradé linéaire */
var gradient = contexts[9].createLinearGradient(50,50,250,250); // x,y,width,height
gradient.addColorStop(0,  'rgb(255,80,0)');    // Départ
gradient.addColorStop(0.5,'rgb(255,191,0)');   // Milieu
gradient.addColorStop(1,  'rgb(255,246,155)'); // Arrivée
contexts[9].fillStyle = gradient;                  // Le gradient devient le style de remplissage
contexts[9].fillRect(0,0,400,400);                 // Faire apparaître

/* Dégradé radial */
gradient = contexts[10].createRadialGradient(0,0,50,0,250,350); // cx1, cy1, cr1, cx2, cy2, cr2
gradient.addColorStop(0,  'rgb(255,80,0)');    // Départ
gradient.addColorStop(0.5,'rgb(255,191,0)');   // Milieu
gradient.addColorStop(1,  'rgb(255,246,155)'); // Arrivée
contexts[10].fillStyle = gradient;                  // Le gradient devient le style de remplissage
contexts[10].fillRect(0,0,400,400);                 // Faire apparaître

/* Save() et Restore() */
contexts[11].beginPath();
contexts[11].moveTo(50,50);
contexts[11].lineTo(300,50);
contexts[11].save();              // Sauvegarde les propriétés du context
contexts[11].lineWidth = 20;      // Changement d'une des propriétés
contexts[11].stroke();            // Dessin du trait
contexts[11].beginPath();
contexts[11].moveTo(50,100);
contexts[11].lineTo(300,100);
contexts[11].save();              // Nouvelle sauvegarde des propriétés du context
contexts[11].strokeStyle = 'red'; // Changement d'une autre propriété
contexts[11].stroke();            // Dessin du trait
contexts[11].beginPath();
contexts[11].moveTo(50,150);
contexts[11].lineTo(300,150);
contexts[11].restore();           // Restauration des propriétés à la derniène sauvegarde
contexts[11].restore();           // Restauration des propriétés à la sauvegarde encore avant
contexts[11].stroke();            // Dessin du trait

/* Courbe de Bézier */
contexts[12].beginPath();
contexts[12].moveTo(50,50);
contexts[12].bezierCurveTo(300,100,100,300,300,300);
contexts[12].stroke();

/* Courbe quadratique (de bézier) */
contexts[13].beginPath();
contexts[13].moveTo(50,50);
contexts[13].quadraticCurveTo(300,100,300,300);
contexts[13].stroke();

/* globalAlpha */
contexts[14].globalAlpha = 0.3; /* Réduction de l'opacité */
contexts[14].fillStyle = '#ff0000';
contexts[14].fillRect(50,50,200,200);
contexts[14].fillStyle = '#00ff00';
contexts[14].fillRect(100,100,200,200);
contexts[14].fillStyle = '#0000ff';
contexts[14].fillRect(150,150,200,200);

/* globalCompositeOperation */
contexts[15].globalCompositeOperation = 'lighter';
contexts[15].fillStyle = '#ff0000';
contexts[15].fillRect(50,50,200,200);
contexts[15].fillStyle = '#00ff00';
contexts[15].fillRect(100,100,200,200);
contexts[15].fillStyle = '#0000ff';
contexts[15].fillRect(150,150,200,200);

/* globalCompositeOperation */
contexts[16].fillStyle = 'red';
contexts[16].fillRect(200,150,200,200);
contexts[16].globalCompositeOperation = 'destination-out';
contexts[16].beginPath();
contexts[16].fillStyle = 'blue';
contexts[16].arc(200,200,100,0,Math.PI,false);
contexts[16].fill();

/* getImageData */
image = new Image();
image.onload = function()
{
    /* Dessiner l'image chargée dans le canvas */
    contexts[17].drawImage(image,0,0,image.width / 6,image.height / 6);

    /* Récupérer les pixels dans image_data */
    var image_data = contexts[17].getImageData(0,0,image.width / 6,image.height / 6);

    /* parcourir les pixels 4 par 4 */
    for(var i = 0; i < image_data.data.length; i += 4)
    {
        /* Traiter ces pixels couleur par couleur */
        /* Ici on rend l'image noir et blanc */
        var b = 0.4 * image_data.data[i] + 0.4 * image_data.data[i + 1] + 0.4 * image_data.data[i + 2];
        image_data.data[i]     = b;
        image_data.data[i + 1] = b;
        image_data.data[i + 2] = b;
        // image_data.data[i + 3] = 1; /* On ne touche pas à l'apha */
    }

    /* Dessiner la nouvelle image par dessus l'ancienne */
    contexts[17].putImageData(image_data,0,0);
};
image.src = 'src/img/image-1.jpg';

/* Exemple d'animation */
(function()
{
    var coords = { x: 200, y: 200 };
    function loop()
    {
        window.requestAnimationFrame(loop); //Avant d'effectuer d'autre action
        
        // Mise à jour des coordonnées
        coords.x += 4;
        coords.y = 200 - Math.abs( Math.cos( + new Date() / 300 ) ) * 100;

        // Limite
        if( coords.x > canvas.width + 50 )
            coords.x = -50;

        // Dessin de la balle
        contexts[18].fillStyle = 'rgba(238, 238, 238, 0.2)';
        contexts[18].fillRect( 0, 0, canvas.width, canvas.height );
        contexts[18].beginPath();
        contexts[18].arc( coords.x, coords.y, 50, 0, Math.PI * 2 );
        contexts[18].fillStyle = 'orange';
        contexts[18].fill();
    }
    loop();
})();

/* Exemple d'animation */
(function()
{
    // Coordonnées de base
    var coords = { x: 200, y: 200 },
        mouse  = { x: 0,   y: 0 };

    // Fonction déclenchée à chaque frame
    function loop()
    {
        window.requestAnimationFrame( loop );

        // Mise à jour des coordonnées avec easing
        coords.x += (mouse.x - coords.x) * 0.01;
        coords.y += (mouse.y - coords.y) * 0.01;

        // Dessin de la balle
        contexts[19].fillStyle = 'rgba(238, 238, 238, 0.2)';
        contexts[19].fillRect( 0, 0, canvas.width, canvas.height );
        contexts[19].beginPath();
        contexts[19].arc( coords.x, coords.y, 50, 0, Math.PI * 2 );
        contexts[19].fillStyle = 'orange';
        contexts[19].fill();
    }

    loop();

    // Écoute de l'événement mousemove
    document.addEventListener( 'mousemove', function( event )
    {
        var bouding = canvass[19].getBoundingClientRect();

        // Mise à jour des coordonnées
        mouse.x = event.clientX - bouding.left;
        mouse.y = event.clientY - bouding.top;
    } );
})();