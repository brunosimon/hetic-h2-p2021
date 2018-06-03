<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

include './vendor/autoload.php';

$settings = [
    'displayErrorDetails' => true,
    'db' =>
    [
        'host' => 'localhost',
        'port' => 8889,
        'user' => 'root',
        'pass' => 'root',
        'name' => 'root',
    ]
];

$app = new \Slim\App([ 'settings' => $settings ]);

$container = $app->getContainer();

$container['view'] = function($container)
{
    $view = new \Slim\Views\Twig('./views');

    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new \Slim\Views\TwigExtension($router, $uri));

    return $view;
};

$app
    ->get(
        '/',
        function(Request $request, Response $response)
        {
            $dataView = [
                'values' => [
                    'key1' => 'a',
                    'key2' => 'b',
                    'key3' => 'c',
                    'key4' => 'd',
                    'key5' => 'e',
                ]
            ];

            return $this->view->render($response, 'pages/home.twig', $dataView);
        }
    )
    ->setName('home')
;

$app
    ->get(
        '/hello',
        function(Request $request, Response $response)
        {
            $response->getBody()->write('Coucou!');

            return $response;
        }
    )
    ->setName('hello')
;

$app
    ->get(
        '/page/{number:\d+}',
        function(Request $request, Response $response, array $arguments)
        {
            $response->getBody()->write('Page '.$arguments['number']);

            return $response;
        }
    )
    ->setName('page')
;

$app
    ->get(
        '/category/{categoryName:[a-z-]+}',
        function(Request $request, Response $response, array $arguments)
        {
            $response->getBody()->write('Category '.$arguments['categoryName']);

            return $response;
        }
    )
    ->setName('category')
;

$app->run();