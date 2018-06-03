<?php

// Namespaces
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Home
$app
    ->get(
        '/',
        function(Request $request, Response $response, array $args)
        {
            return $this->twig->render($response, 'pages/home.twig');
        }
    )
    ->setName('home');

// Promotions
$app
    ->get(
        '/promotions',
        function(Request $request, Response $response)
        {
            // Fetch promotions
            $query = $this->db->query('SELECT * FROM promotions');
            $promotions = $query->fetchAll();

            // View data
            $viewData = [
                'promotions' => $promotions,
            ];

            // Twig render
            return $this->twig->render($response, 'pages/promotions.twig', $viewData);
        }
    )
    ->setName('promotions');

// Promotion single
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

            // Promotion not found
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
            $viewData = [
                'promotion' => $promotion,
                'students' => $students,
                'title' => 'P'.$promotion->year
            ];

            // Twig render
            return $this->twig->render($response, 'pages/promotion.twig', $viewData);
        }
    )
    ->setName('promotions_single');

// Random student
$app
    ->get(
        '/student/random',
        function(Request $request, Response $response)
        {
            $query = $this->db->query('SELECT * FROM students ORDER BY RAND() LIMIT 1');
            $student = $query->fetch();
            
            return $response->withRedirect($this->router->pathFor('student', [ 'slug' => $student->slug ]));
        }
    )
    ->setName('random_student');

// Student single
$app
    ->get(
        '/student/{slug:[a-zA-Z0-1_-]+}',
        function(Request $request, Response $response, array $arguments)
        {
            // Fetch student
            $prepare = $this->db->prepare('SELECT * FROM students WHERE slug = :slug');
            $prepare->bindValue('slug', $arguments['slug']);
            $prepare->execute();
            $student = $prepare->fetch();

            // Student not found
            if(!$student)
            {
                throw new \Slim\Exception\NotFoundException($request, $response);
            }

            // Fetch promotion
            $prepare = $this->db->prepare('SELECT * FROM promotions WHERE id = :id');
            $prepare->bindValue('id', $student->id_year);
            $prepare->execute();
            $promotion = $prepare->fetch();

            // Promotion not found
            if(!$promotion)
            {
                throw new \Slim\Exception\NotFoundException($request, $response);
            }

            // View data
            $viewData = [
                'student' => $student,
                'promotion' => $promotion,
                'title' => $student->first_name.' '.$student->last_name
            ];

            return $this->twig->render($response, 'pages/student.twig', $viewData);
        }
    )
    ->setName('student');
