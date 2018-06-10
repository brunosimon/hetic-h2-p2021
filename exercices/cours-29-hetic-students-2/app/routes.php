<?php

// Namespaces
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Home
$app
    ->get(
        '/',
        function(Request $request, Response $response)
        {
            $dataView = [];
            return $this->view->render($response, 'pages/home.twig', $dataView);
        }
    )
    ->setName('home')
;

// Promotions
$app
    ->get(
        '/promotions',
        function(Request $request, Response $response)
        {
            // Fetch promotions
            $query = $this->db->query('SELECT * FROM promotions');
            $promotions = $query->fetchAll();

            // Data view
            $dataView = [
                'promotions' => $promotions,
            ];

            // Render
            return $this->view->render($response, 'pages/promotions.twig', $dataView);
        }
    )
    ->setName('promotions')
;

// Promotion
$app
    ->get(
        '/promotions/{year:[0-9]{4}}',
        function(Request $request, Response $response, $arguments)
        {
            // Fetch promotion
            $prepare = $this->db->prepare('SELECT * FROM promotions WHERE year = :year');
            $prepare->bindValue('year', $arguments['year']);
            $prepare->execute();
            $promotion = $prepare->fetch();

            // Not found
            if(!$promotion)
            {
                throw new \Slim\Exception\NotFoundException($request, $response);
            }

            // Fetch students
            $prepare = $this->db->prepare('SELECT * FROM students WHERE id_year = :id_year');
            $prepare->bindValue('id_year', $promotion->id);
            $prepare->execute();
            $students = $prepare->fetchAll();

            // View data
            $dataView = [
                'promotion' => $promotion,
                'students' => $students,
            ];

            // Render
            return $this->view->render($response, 'pages/promotion.twig', $dataView);
        }
    )
    ->setName('promotion')
;

// Random student
$app
    ->get(
        '/students/random',
        function(Request $request, Response $response)
        {
            // Fetch random student
            $query = $this->db->query('SELECT slug FROM students ORDER BY RAND() LIMIT 1');
            $student = $query->fetch();

            // Create URL
            $url = $this->router->pathFor('student', [ 'slug' => $student->slug ]);
            
            // Return response with redirect
            return $response->withRedirect($url);
        }
    )
    ->setName('random_student')
;

// Student
$app
    ->get(
        '/students/{slug:[a-zA-Z0-9_-]+}',
        function(Request $request, Response $response, $arguments)
        {
            // Fetch student
            $prepare = $this->db->prepare('SELECT * FROM students WHERE slug = :slug');
            $prepare->bindValue('slug', $arguments['slug']);
            $prepare->execute();
            $student = $prepare->fetch();

            // Not found
            if(!$student)
            {
                throw new \Slim\Exception\NotFoundException($request, $response);
            }

            // Fetch promotion
            $prepare = $this->db->prepare('SELECT * FROM promotions WHERE id = :id');
            $prepare->bindValue('id', $student->id_year);
            $prepare->execute();
            $promotion = $prepare->fetch();

            // Not found
            if(!$promotion)
            {
                throw new \Slim\Exception\NotFoundException($request, $response);
            }

            // View data
            $dataView = [
                'student' => $student,
                'promotion' => $promotion,
            ];

            // Render
            return $this->view->render($response, 'pages/student.twig', $dataView);
        }
    )
    ->setName('student')
;
