<?php
    session_start();

    if(!empty($_POST))
    {
        $_SESSION['pseudo'] = $_POST['pseudo'];
    }
    
    $pseudo = empty($_SESSION['pseudo']) ? 'No name' : $_SESSION['pseudo'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    Votre pseudo est: <?= $pseudo ?>
    <form action="#" method="post">
        <input type="text" name="pseudo">
        <input type="submit">
    </form>
</body>
</html>