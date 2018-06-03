<?php

// setcookie('cookiename', 'cookievalue', time() + 200, '/');

// echo '<pre>';
// print_r($_COOKIE);
// echo '</pre>';

// $count = isset($_COOKIE['count']) ? $_COOKIE['count'] + 1 : 1;
// setcookie('count', $count, time() + 99999, '/');

// echo 'Nombre de visites : '.$count;

// $alreadyVoted = isset($_COOKIE['already_played']);

// if($alreadyVoted)
// {
//     echo 'Sorry, you cannot vote';
// }
// else
// {
//     setcookie('already_played', '1', time() + 10, '/');
//     echo 'You can vote';
// }

session_start();

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
    <title>Document</title>
</head>
<body>
    <form action="#" method="post">
        <input type="text" name="pseudo">
        <input type="submit">
    </form>
    Votre pseudo est : <?= $pseudo ?>
</body>
</html>