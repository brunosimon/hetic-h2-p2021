<?php
    include 'handle_form.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Formulaire</title>
    <style>
        .success-message { color: green; }
        .error-message { color: red; }
    </style>
</head>
<body>

    <!-- Error message -->
    <?php foreach($errorMessages as $_message): ?>
        <p class="error-message"><?= $_message ?></p>
    <?php endforeach; ?>

    <!-- Success message -->
    <?php foreach($successMessages as $_message): ?>
        <p class="success-message"><?= $_message ?></p>
    <?php endforeach; ?>
    
    <!-- Form -->
    <form action="#" method="post">
        <input id="first-name" type="text" value="<?= $_POST['first-name'] ?>" placeholder="Toto" name="first-name">
        <label for="first-name">First name</label>

        <br>

        <input id="age" type="number" value="<?= $_POST['age'] ?>" name="age">
        <label for="age">Age</label>
        
        <br>

        <input id="gender-male" type="radio" value="male" name="gender" <?= $_POST['gender'] === 'male' ? 'checked' : '' ?>>
        <label for="gender-male">Male</label>

        <input id="gender-female" type="radio" value="female" name="gender" <?= $_POST['gender'] === 'female' ? 'checked' : '' ?>>
        <label for="gender-female">Female</label>

        <br>
        <input type="submit" value="submit">
    </form>

</body>
</html>