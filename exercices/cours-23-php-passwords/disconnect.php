<?php
    include 'config.php';

    session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Disconnect</title>
</head>
<body>
    <h1>Disconnect</h1>
    <ul>
        <li><a href="inscription.php">Inscription</a></li>
        <li><a href="login.php">Login</a></li>
        <li><a href="private.php">Private</a></li>
        <li><a href="disconnect.php">Disconnect</a></li>
    </ul>
    <p>Vous avez été déconnecté</p>
</body>
</html>