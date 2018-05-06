<?php

// Connexion variables
define('DB_HOST', 'localhost');
define('DB_PORT', '8889');
define('DB_NAME', 'hetic_p2021_first_g2');
define('DB_USER', 'root');
define('DB_PASS', 'root');

try
{
    // Try to connect to database
    $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';port='.DB_PORT, DB_USER, DB_PASS);

    // Set fetch mode to object
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
}
catch (Exception $e)
{
    // Failed to connect
    die('Could not connect');
}