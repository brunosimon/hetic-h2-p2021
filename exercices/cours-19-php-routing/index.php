<?php

// Config
include 'config.php';

// Routing
$q = !empty($_GET['q']) ? $_GET['q'] : '';

switch($q)
{
    case '':
        $page = 'home';
        break;

    case 'about':
        $page = 'about';
        break;

    case 'contact':
        $page = 'contact';
        break;

    case 'blog/article':
        $page = 'article';
        break;

    default:
        $page = '404';
        break;
}

include 'views/pages/'.$page.'.php';