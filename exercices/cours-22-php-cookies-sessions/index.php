<?php

    // $alreadyPlayed = !empty($_COOKIE['played']);

    // if($alreadyPlayed)
    // {
    //     echo 'You\'ve already played';
    // }
    // else
    // {
    //     setcookie('played', '1', time() + 10, '/');
    //     echo 'Playing';
    // }

    session_start();
    
    $_SESSION['toto'] = 'tata';

    echo '<pre>';
    print_r($_SESSION);
    echo '</pre>';