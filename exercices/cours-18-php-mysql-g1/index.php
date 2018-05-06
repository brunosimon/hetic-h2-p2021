<?php

// Connexion variables
define('DB_HOST', 'localhost');
define('DB_PORT', '8889');
define('DB_NAME', 'hetic_p2021_first_g1');
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

// $query = $pdo->query('SELECT id, age FROM users');
// $users = $query->fetchAll();

// $exec = $pdo->exec('
//     INSERT INTO
//         users (first_name, age, gender)
//     VALUES
//         ("Bernard", 30, "male"),
//         ("Bianca", 30, "female")
// ');

// $exec = $pdo->exec('
//     UPDATE
//         users
//     SET
//         age = 28
//     WHERE
//         first_name = "Bernard"
// ');

// $exec = $pdo->exec('
//     DELETE FROM
//         users
//     WHERE
//         first_name = "Bernard"
// ');

// echo '<pre>';
// var_dump($exec);
// echo '</pre>';

$data = [
    'first_name' => 'Paul',
    'age' => 28,
    'gender' => 'male',
];

$prepare = $pdo->prepare('
    INSERT INTO
        users (first_name, age, gender)
    VALUES
        (:first_name, :age, :gender)
');

$execute = $prepare->execute($data);

echo '<pre>';
var_dump($execute);
echo '</pre>';