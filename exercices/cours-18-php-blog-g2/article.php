<?php
    include 'config.php';

    $query = $pdo->query('SELECT * FROM articles WHERE id = '.$_GET['id']);
    $article = $query->fetch();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mon blog - <?= $article->title ?></title>
</head>
<body>
    <h1><a href="index.php">Mon blog</a></h1>

    <h3><?= $article->title ?></h3>
    <small><?= date('d/m/Y H\hi', $article->date) ?></small>

    <div><?= nl2br($article->text) ?></div>

    <h4>Comments</h4>
    <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea necessitatibus maiores a inventore error sint ex est voluptate, optio numquam laborum cupiditate eligendi officia, unde consequatur deleniti beatae. Corporis, minus?</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, quo! Cupiditate facere est esse. Quia molestias at corporis, cumque quas inventore ducimus temporibus adipisci voluptatibus eligendi velit facere soluta rem.</li>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam eius quaerat ratione minima eligendi quasi consectetur. Quo laudantium eligendi reprehenderit quos est optio. Voluptate quasi neque eum praesentium quibusdam unde!</li>
    </ul>

</body>
</html>