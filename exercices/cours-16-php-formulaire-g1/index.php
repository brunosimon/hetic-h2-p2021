<?php
    include 'includes/handle_form.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Formulaire</title>
</head>
<body>

    <?php foreach($errorMessages as $message): ?>
        <p style="color: red;"><?= $message ?></p>
    <?php endforeach ?>

    <?php foreach($successMessages as $message): ?>
        <p style="color: green;"><?= $message ?></p>
    <?php endforeach ?>
    
    <form action="#" method="post">

        <input id="first-name" type="text" name="first-name" value="<?= $_POST['first-name'] ?>">
        <label for="first-name">First name</label>

        <br>

        <input id="age" type="number" name="age" value="<?= $_POST['age'] ?>">
        <label for="age">Age</label>

        <br>

        <label>
            <input type="radio" name="gender" value="male" <?= $_POST['gender'] == 'male' ? 'checked' : '' ?>>
            Male
        </label>

        <label>
            <input type="radio" name="gender" value="female" <?= $_POST['gender'] == 'female' ? 'checked' : '' ?>>
            Female
        </label>

        <br>

        <input type="submit" value="submit">

    </form>

</body>
</html>