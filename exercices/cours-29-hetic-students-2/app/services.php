<?php

// Namespaces
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Get slim container
$container = $app->getContainer();

// View with twig
$container['view'] = function($container)
{
    $view = new \Slim\Views\Twig('../views');

    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new \Slim\Views\TwigExtension($router, $uri));

    return $view;
};

// Database with PDO
$container['db'] = function($container)
{
    $db = $container['settings']['db'];
    
    $pdo = new PDO('mysql:host='.$db['host'].';dbname='.$db['name'].';port='.$db['port'], $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
};

// 404
$container['notFoundHandler'] = function($container)
{
    return function(Request $request, Response $response) use ($container)
    {
        return $container['view']->render($response->withStatus(404), 'pages/404.twig');
    };
};