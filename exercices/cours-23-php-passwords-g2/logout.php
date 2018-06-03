<?php
    include 'config.php';

    session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Logout</title>
</head>
<body>
    <h1>Logout</h1>
    <?php
        include 'header.php';
    ?>
    <p>You have been logged out</p>
</body>
</html>