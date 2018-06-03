<ul>
    <?php if(empty($_SESSION['user'])): ?>
        <li><a href="inscription.php">inscription</a></li>
        <li><a href="login.php">login</a></li>
    <?php else: ?>
        <li><a href="logout.php">logout</a></li>
    <?php endif ?>
    <li><a href="private.php">private</a></li>
</ul>