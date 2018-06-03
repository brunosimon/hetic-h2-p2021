<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

include './vendor/autoload.php';

$settings = [
    'displayErrorDetails' => true,
];

$app = new \Slim\App([ 'settings' => $settings ]);

$container = $app->getContainer();

$container['view'] = function()
{
    $view = new \Slim\Views\Twig('./views');
    return $view;
};

$app
    ->get(
        '/',
        function(Request $request, Response $response)
        {
            $dataView = [
                'value' => false,
            ];

            return $this->view->render($response, 'pages/home.twig', $dataView);
        }
    )
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