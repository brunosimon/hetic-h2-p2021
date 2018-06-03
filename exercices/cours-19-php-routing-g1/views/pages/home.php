<?php

    $title = 'Mon site';

    include 'views/partials/header.php';
?>

<h1>Home</h1>

<li><a href="<?= URL ?>blog/article?id=1">Article 1</a></li>
<li><a href="<?= URL ?>blog/article?id=2">Article 2</a></li>
<li><a href="<?= URL ?>blog/article?id=3">Article 3</a></li>

<?php include 'views/partials/footer.php'; ?>