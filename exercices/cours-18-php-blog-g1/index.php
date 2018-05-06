<?php
    include 'config.php';

    $query = $pdo->query('SELECT * FROM articles');
    $articles = $query->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mon super blog</title>
</head>
<body>
    <h1>Mon super blog</h1>

    <?php foreach($articles as $_article): ?>
        <a href="article.php?id=<?= $_article->id ?>">
            <h3><?= $_article->title ?></h3>
            <small><?= date('d/m/Y H\hi', $_article->date) ?></small>
        </a>
    <?php endforeach; ?>

</body>
</html>