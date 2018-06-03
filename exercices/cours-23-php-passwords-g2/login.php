<?php
    include 'config.php';

    $message = '';

    if(!empty($_POST))
    {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $prepare = $pdo->prepare('
            SELECT
                *
            FROM
                users
            WHERE
                email = :email
            LIMIT
                1
        ');
        $prepare->bindValue('email', $email);
        $prepare->execute();
        $user = $prepare->fetch();

        if(!$user)
        {
            $message = 'Email not found';
        }
        else
        {
            if(password_verify($password, $user->password))
            {
                $_SESSION['user'] = [
                    'email' => $user->email,
                ];
                $message = 'You are logged in';
            }
            else
            {
                $message = 'Wrong password';
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>

    <?php
        include 'header.php';
    ?>

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