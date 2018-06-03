<?php 

    include 'config.php';

    $message = '';

    if(!empty($_POST))
    {
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        $prepare = $pdo->prepare('
            INSERT INTO
                users (email, password)
            VALUES
                (:email, :password)
        ');
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
    <title>Inscription</title>
</head>
<body>
    <h1>Inscription</h1>
    
    <?php include 'header.php' ?>

    <p><?= $message ?></p>

    <form action="#" method="post">
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