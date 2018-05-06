<?php

define('DB_HOST', 'localhost');
define('DB_PORT', '8889');
define('DB_NAME', 'hetic_p2021_first_g2');
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

// $query = $pdo->query('SELECT * FROM users');
// $users = $query->fetchAll();

// $exec = $pdo->exec('DELETE FROM users WHERE age = 10');

// $exec = $pdo->exec('UPDATE users SET first_name = "Sudo" WHERE id = 2');

$data = [
    'first_name' => 'Bruno',
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