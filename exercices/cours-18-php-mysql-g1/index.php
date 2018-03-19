<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'hetic_p2021_first_g1');
define('DB_PORT', '8889');
define('DB_USER', 'root');
define('DB_PASS', 'root');

try
{
    $pdo = new PDO('mysql:dbname='.DB_NAME.';host='.DB_HOST.';port='.DB_PORT, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
}
catch(Exception $e)
{
    die('Couldn\'t connect');
}

$query = $pdo->query('SELECT * FROM users');
$users = $query->fetchAll();

echo '<pre>';
print_r($users);
echo '</pre>';