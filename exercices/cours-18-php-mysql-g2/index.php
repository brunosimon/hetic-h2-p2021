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

// // Add
// $exec = $pdo->exec('INSERT INTO users (first_name, age, gender) VALUES ("Toto", 10, "male")');

// // Edit
// $exec = $pdo->exec('UPDATE users SET first_name = "foo" WHERE id = 2');

// // Delete
// $exec = $pdo->exec('DELETE FROM users WHERE id = 4');

$data = array(
    'first_name' => 'Sudooooooo',
    'age' => 3,
    'gender' => 'male',
);

$prepare = $pdo->prepare('
    UPDATE
        users
    SET
        first_name = :first_name,
        age = :age,
        gender = :gender
    WHERE
        id = 2
');

$execute = $prepare->execute($data);

// Fetch
$query = $pdo->query('SELECT * FROM users');
$users = $query->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Users</title>
</head>
<body>
    <?php foreach($users as $_user): ?>
        <div class="user">
            <br>ID: <?= $_user->id ?>
            <br>First Name: <?= $_user->first_name ?>
            <br>Age: <?= $_user->age ?>
            <br>Gender: <?= $_user->gender ?>
        </div>
    <?php endforeach; ?>
</body>
</html>

