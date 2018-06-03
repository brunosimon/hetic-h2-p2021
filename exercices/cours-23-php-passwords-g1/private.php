<?php 
    include 'config.php';

    if(empty($_SESSION['user']))
    {
        header('location:login.php');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Private</title>
</head>
<body>
    <h1>Private</h1>
    <?php include 'header.php' ?>
    <p>Bonjour <?= $_SESSION['user']['email'] ?></p>
</body>
</html>