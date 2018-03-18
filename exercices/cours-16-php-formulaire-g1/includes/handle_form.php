<?php

$errorMessages = [];
$successMessages = [];

$genders = ['male', 'female'];

// Form sent
if(!empty($_POST))
{
    // Default gender
    if(!isset($_POST['gender']))
    {
        $_POST['gender'] = '';
    }

    // Retrieve form data
    $firstName = trim($_POST['first-name']);
    $age = (int)$_POST['age'];
    $gender = $_POST['gender'];

    // Handle errors
    if(empty($firstName))
    {
        $errorMessages[] = 'Missing first name';
    }

    if(empty($age))
    {
        $errorMessages[] = 'Missing age';
    }
    else if($age <= 0 || $age > 120)
    {
        $errorMessages[] = 'Wrong age';
    }

    if(empty($gender))
    {
        $errorMessages[] = 'Missing gender';
    }
    else if(!in_array($gender, $genders))
    {
        $errorMessages[] = 'Wrong gender';
    }

    // Success
    if(empty($errorMessages))
    {
        $successMessages[] = 'User registered';

        $_POST['first-name'] = '';
        $_POST['age'] = '';
        $_POST['gender'] = '';
    }
}

// Form not sent
else
{
    $_POST['first-name'] = '';
    $_POST['age'] = '';
    $_POST['gender'] = '';
}

