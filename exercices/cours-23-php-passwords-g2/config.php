<?php

// Session
session_start();

// Salt
define('SALT', '7890PM/43.?');

// Connexion variables
define('DB_HOST', 'localhost');
define('DB_PORT', '8889');
define('DB_NAME', 'hetic_p2021_passwords_g2');
define('DB_USER', 'root');
define('DB_PASS', 'root');

try
{
    $pdo = new PDO('mysql:dbname='.DB_NAME.';host='.DB_HOST.';port='.DB_PORT, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
}
catch(PDOException $e)
{
    die('Couldn\'t connect');
}