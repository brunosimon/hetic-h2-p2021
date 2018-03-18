<?php

$pdo = new PDO('mysql:dbname=hetic_p2021_first;host=localhost;port=8889', 'root', 'root');
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

// Ajoute une ligne dans la table users
$exec = $pdo->exec('INSERT INTO users (first_name, age, gender) VALUES (\'bruno\', 27, \'male\'), (\'bruno\', 27, \'male\')');

echo '<pre>';
var_dump($exec);
echo '</pre>';