<?php
    include 'config.php';

    $message = '';

    if(!empty($_POST))
    {
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        $prepare = $pdo->prepare('INSERT INTO users (email, password) VALUES (:email, :password)');
        $prepare->bindValue('email', $email);
        $prepare->bindValue('password', $password);
        $prepare->execute();
        $message = 'User registered';
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inscription</title>
</head>
<body>
    <h1>Inscription</h1>
    <ul>
        <li><a href="inscription.php">Inscription</a></li>
        <li><a href="login.php">Login</a></li>
        <li><a href="private.php">Private</a></li>
        <li><a href="disconnect.php">Disconnect</a></li>
    </ul>

    <p><?= $message ?></p>

    <form action="#" method="POST">
        <div>
            <input type="email" name="email" id="email">
            <label for="email">Email</label>
        </div>
        <div>
            <input type="password" name="password" id="password">
            <label for="password">Password</label>
        </div>
        <div>
            <input type="submit">
        </div>
    </form>
</body>
</html>