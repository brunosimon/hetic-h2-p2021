<?
    $articles = [
        [
            'title' => 'Article A',
            'author' => 'Author A',
            'text' => 'Lorem ipsum dolo resioufdjs oqsijdqsd',
        ],
        [
            'title' => 'Article B',
            'author' => 'Author B',
            'text' => 'Lorem ipsum dolo resioufdjs oqsijdqsd',
        ],
        [
            'title' => 'Article C',
            'author' => 'Author C',
            'text' => 'Lorem ipsum dolo resioufdjs oqsijdqsd',
        ],
    ];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Blog</title>
</head>
<body>
    <h1>Mon blog</h1>

    <? foreach($articles as $article) { ?>
        <article>
            <h3><?= $article['title'] ?></h3>
            <h5><?= $article['author'] ?></h5>
            <p><?= $article['text'] ?></p>
        </article>
    <? } ?>

</body>
</html>
