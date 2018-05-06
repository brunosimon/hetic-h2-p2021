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
    <title>Mon super blog - <?= $article->title ?></title>
</head>
<body>
    <h1><a href="index.php">Mon super blog</a></h1>

    <h2><?= $article->title ?></h2>
    <small><?= date('d/m/Y H\hi', $article->date) ?></small>
    <div class="text">
        <?= nl2br($article->text) ?>
    </div>

    <h3>Comments</h3>
    <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, cupiditate, ducimus dolorem labore facilis adipisci accusamus delectus qui laboriosam voluptates aperiam similique voluptate voluptatibus libero. Alias, ratione. Mollitia, id repudiandae.</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis necessitatibus quis veritatis at pariatur modi ipsum in, dicta expedita rem sunt ad nihil optio eaque laboriosam beatae odio impedit possimus!</li>
    </ul>
</body>
</html>