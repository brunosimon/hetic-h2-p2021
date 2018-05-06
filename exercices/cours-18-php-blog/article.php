<?php
    include 'config.php';

    // Fetch articles
    $prepare = $pdo->prepare('SELECT * FROM articles WHERE id = :id');
    $prepare->execute([ 'id' => $_GET['id'] ]);
    $article = $prepare->fetch();

    // Fetch comments
    $prepare = $pdo->prepare('SELECT * FROM comments WHERE id_article = :id_article');
    $prepare->execute([ 'id_article' => $_GET['id'] ]);
    $comments = $prepare->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Awesome blog - <?= $article->title ?></title>
</head>
<body>
    <h1><a href="index.php">Awesome blog</a></h1>

    <div class="article">
        <h2><?= $article->title ?></h2>
        <small><?= date('Y-m-d H\hi', $article->date) ?></small>
        <div class="text">
            <?= nl2br($article->text) ?>
        </div>
    </div>

    <div class="comments">
        <h4>Commentaires</h4>
        <ul>
            <?php foreach($comments as $_comment): ?>
                <li><?= $_comment->text ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
</body>
</html>