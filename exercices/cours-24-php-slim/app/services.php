<?php

$container = $app->getContainer();
$container['logger'] = function($container)
{
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler('./logs/app.log');
    $logger->pushHandler($file_handler);

    return $logger;
};

$container['db'] = function($container)
{
    $db = $container['settings']['db'];
    $pdo = new PDO('mysql:host='.$db['host'].';dbname='.$db['dbname'].';port='.$db['port'], $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
};

$container['twig'] = function($container)
{
    $twig = new \Slim\Views\Twig('./views');

    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $twig->addExtension(new \Slim\Views\TwigExtension($router, $uri));

    return $twig;
};

// 404
$container['notFoundHandler'] = function($container)
{
    return function($request, $response) use ($container)
    {
        return $container['twig']
            ->render($response->withStatus(404), 'pages/404.twig');
    };
};
