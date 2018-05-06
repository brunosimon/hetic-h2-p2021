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
    <title>Mon blog</title>
</head>
<body>
    <h1><a href="index.php">Mon blog</a></h1>

    <?php foreach($articles as $_article): ?>
        <h3><a href="article.php?id=<?= $_article->id ?>"><?= $_article->title ?></a></h3>
        <small><?= date('d/m/Y H\hi', $_article->date) ?></small>
    <?php endforeach; ?>
</body>
</html>