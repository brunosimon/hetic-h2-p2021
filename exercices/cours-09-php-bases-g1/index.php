<?php
    $articles = [
        [
            'title'  => 'Titre A',
            'author' => 'Author A',
            'text'   => 'lorem ipsum dolor machin truc'
        ],
        [
            'title'  => 'Titre B',
            'author' => 'Author B',
            'text'   => 'lorem ipsum dolor machin truc'
        ],
        [
            'title'  => 'Titre C',
            'author' => 'Author C',
            'text'   => 'lorem ipsum dolor machin truc'
        ]
    ];
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
    <h1>Mes articles</h1>
    
    <?php foreach($articles as $article): ?>
        <article>
            <h3><?= $article['title'] ?></h3>
            <small><?= $article['author'] ?></small>
            <p><?= $article['text'] ?></p>
        </article>
    <?php endforeach ?>
</body>
</html>

    
