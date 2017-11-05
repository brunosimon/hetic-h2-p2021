
    +----------------------------+
    |    Projet: Video Player    |
    +----------------------------+

Je suis:
 - Jonathan CLERC
 - H2 P2019

Navigateur recommandé:
 - Firefox

Fonctionnalités:
 - Contrôles de base d'un player: play/pause, volume, plein écran
 - La barre de lecture et du volume sont draggable
 - En lecture, le fond change en fonction des couleurs de la vidéo
 - Partage du lien commençant directement au même endroit
 - Gestion de la qualité HD/SD
 - Indicateurs (icônes au centre de la vidéo) lors du chargement, pause ou erreur

Détails technique:
 - Design complet du player et icônes en CSS
 - Player responsive par rapport à la largeur de son parent
 - Génération des miniatures en JavaScript

Raccourcis clavier:
 - Ce sont les mêmes que la plupart des lecteurs vidéos:
   Espace: Play/Pause
   Flèche gauche/droite: Avancer / Reculer
   Flèche haut/bas: Volume + / -
   0-9: Change l'avancement de la vidéo (entre 0% et 100%)
   F: Plein écran
   M: Mute
   Q: Qualité

Problèmes rencontrés:
 - Sous certaines conditions (cross origin security) on ne peut pas récupérer les couleurs de la vidéo, un fallback a donc été ajouté
 - La durée de la vidéo n'est pas exactement la même selon la qualité, ce qui peut entrainer des petits décalages quand on change la qualité
 - On ne peut pas faire de transition avec des dégradés, il faut alors les superposer et jouer avec l'opacité 

Notes:
 - D'autres contrôles auraient pu être ajoutés (vitesse de lecture, thème du lecteur, ..), mais ils sont pas assez utiles et risquent d'encombrer le lecteur
 - Le CSS est aussi disponible sans préfix, plus lisible

Inspirations:
 - Design du player: https://www.youtube.com/
