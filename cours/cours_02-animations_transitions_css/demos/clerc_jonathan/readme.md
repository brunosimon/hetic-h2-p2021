
-----------------------
    Projet: Horloge
-----------------------

Je suis:
 - Jonathan CLERC
 - H2 P2019

Navigateur recommandé:
 - Firefox

Fonctionnalités CSS:
 - Design complet de l'horloge (aucune image)
 - Aiguilles animées avec deux animations:
   1. rotate: fait le tour complet en 60s, 3600s, ou 43200s (12h)
   2. ticker: fait l'effet de mouvement de l'aiguille chaque seconde / minute
 - Passage en vue éclatée avec une classe
 - Design et animation des boutons

Fonctionnalités JS:
 - Affiche l'heure courante
 - Fonctions Javascript pour changer le point de vue éclaté / le temps:
   1. setTime(hours, minutes, seconds);
   2. setView(view); avec view: "bottom", "middle" ou "top"

Problèmes:
 - Sous Chrome, la vue éclatée a quelques glitchs visuels
 - Sous Safari, on ne peux pas changer plus d'une fois l'heure via JS
 - Lors de la vue normale, les éléments sont en fait décalés de quelques pixels sur l'axe Z pour les empêcher de se chevaucher sous Chrome quand on passe en 3D

Notes:
 - L'animation vue éclatée était au départ sur le hover de l'horloge, mais ça causait trop de glitch visuels sur Chrome
 - Changer l'heure n'anime pas les aiguilles, car en fait les aiguilles ne bougent pas, seul l'animation-delay est modifié

Inspirations:
 - https://dribbble.com/shots/1015985-Clock
 - https://dribbble.com/shots/1256723-Free-Clock-Flat-Icon-PSD
 - http://montre24.com/postimg/ExplodedViewSonataMovement(1).jpg
