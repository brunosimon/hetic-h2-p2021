<?php
    include 'config.php';

    $q = empty($_GET['q']) ? '' : $_GET['q'];
    $page = null;

    switch($q)
    {
        case 'about':
            $page = 'about';
            break;

        case 'contact':
            $page = 'contact';
            break;

        case '':
            $page = 'home';
            break;

        case 'blog/article':
            $page = 'article';
            break;

        default:
            $page = '404';
            break;
    }

    include 'views/pages/'.$page.'.php';
