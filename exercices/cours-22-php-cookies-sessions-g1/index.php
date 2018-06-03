<?php

// $alreadyPlayed = isset($_COOKIE['already_played']);

// if($alreadyPlayed)
// {
//     echo 'Sorry, you\'ve already played';
// }
// else
// {
//     setcookie('already_played', '1', time() + 10, '/');
//     echo 'You can play';
// }


session_start();

// $_SESSION['count'] = isset($_SESSION['count']) ? $_SESSION['count'] + 1 : 1;
// echo 'Vous avez visité cette page ' . $_SESSION['count'] . ' fois';

if(!empty($_POST))
{
    $_SESSION['pseudo'] = $_POST['pseudo'];
}

$pseudo = isset($_SESSION['pseudo']) ? $_SESSION['pseudo'] : 'John Doe';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie / Session</title>
</head>
<body>
    <form action="#" method="post">
        <input type="text" name="pseudo">
        <input type="submit">
    </form>
    Votre pseudo est : <?= $pseudo ?>
</body>
</html>