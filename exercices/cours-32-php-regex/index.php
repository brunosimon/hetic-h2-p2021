<?php

/**
 * Preg match
 * Test if pattern exist in string
 */
// // Ce code ne fonctionnera pas
// if(preg_match('/\w\s\w/', 'foo        bar'))
//     die('vrai');
// else
//     die('faux');

/**
 * Preg match all
 * Extract pattern from string
 */
// $text = 'Bonjour la P2021, vous succédez à la P2020 et ferez place à la P2022';
// $matches = [];
// preg_match_all('/p20[0-9]{2}/i', $text, $matches);
// echo '<pre>';
// print_r($matches);
// echo '</pre>';

/**
 * Preg replace
 * Replace pattern in string
 */
// $text = 'FouuuuUUUoooaAAAck la police';
// $text = preg_replace('/f[uoa]*ck/i', 'duck', $text);
// echo '<pre>';
// print_r($text);
// echo '</pre>';


// $tweet = 'After a month at the @Space_Station, Dragon is scheduled to return tomorrow with over 5,400 pounds of cargo. http://nasa.gov/ntv #space';
// echo $tweet;

// $tweet = preg_replace('/(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?)/', '<a href="$0">$2</a>', $tweet);
// echo '<br>'.$tweet;

// $tweet = preg_replace('/@([a-z0-9_]+)/i', '<a href="https://twitter.com/$1">$0</a>', $tweet);
// echo '<br>'.$tweet;

// $tweet = preg_replace('/#([a-z0-9_]+)/i', '<a href="https://twitter.com/hashtag/$1">$0</a>', $tweet);
// echo '<br>'.$tweet;