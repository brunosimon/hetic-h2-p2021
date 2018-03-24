<?php
    include 'config.php';

    $query = $pdo->query('SELECT * FROM articles ORDER BY date DESC');
    $articles = $query->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Awesome blog</title>
</head>
<body>
    <h1><a href="index.php">Awesome blog</a></h1>

    <?php foreach($articles as $_article): ?>
        <a href="article.php?id=<?= $_article->id ?>" class="article">
            <h3><?= $_article->title ?></h3>
            <small><?= date('Y-m-d H\hi', $_article->date) ?></small>
        </a>
    <?php endforeach; ?>
</body>
</html>