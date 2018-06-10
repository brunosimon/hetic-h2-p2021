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
            die('random student');
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

            // Fetch promotion
            $prepare = $this->db->prepare('SELECT * FROM promotions WHERE id = :id');
            $prepare->bindValue('id', $student->id_year);
            $prepare->execute();
            $promotion = $prepare->fetch();

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
