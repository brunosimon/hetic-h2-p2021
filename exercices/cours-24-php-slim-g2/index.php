<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';

$settings = [
    'displayErrorDetails' => true,
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
            // Aller chercher données API
            // Aller chercher BDD
            // Faire des tests
            // Traiter formulaire
            $dataView = [
                'pokemons' =>
                [
                    'a' => 'Pikachu',
                    'b' => 'Salamèche',
                    'c' => 'Bulbizarre',
                    'd' => 'Mew',
                ],
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
            $response->getBody()->write('<html><head></head></</html>');
            return $response;
        }
    )
    ->setName('hello')
;

$app
    ->get(
        '/contact',
        function(Request $request, Response $response)
        {
            $response->getBody()->write('<h1>Contact</h1>');
            return $response;
        }
    )
    ->setName('contact')
;

$app
    ->get(
        '/category/{categoryName:[a-z][a-z-]*}',
        function(Request $request, Response $response, $arguments)
        {
            $response->getBody()->write('Catégorie '.$arguments['categoryName']);
            return $response;
        }
    )
    ->setName('category')
;

$app
    ->get(
        '/page/{pageNumber:\d+}',
        function(Request $request, Response $response, $arguments)
        {
            $response->getBody()->write('page '.$arguments['pageNumber']);
            return $response;
        }
    )
    ->setName('page')
;

$app->run();