<?php

    // Messages
    $errorMessages = [];
    $successMessages = [];

    // Form sent
    if(!empty($_POST))
    {
        if(empty($_POST['gender']))
        {
            $_POST['gender'] = '';
        }

        // Retrieve values
        $firstName = trim($_POST['first-name']);
        $age = (int)$_POST['age'];
        $gender = trim($_POST['gender']);

        // Handle errors
        if(empty($firstName))
        {
            $errorMessages[] = 'Missing first name';
        }

        if(empty($age))
        {
            $errorMessages[] = 'Missing age';
        }
        else if($age < 0 || $age > 120)
        {
            $errorMessages[] = 'Wrong age';
        }

        if(empty($gender))
        {
            $errorMessages[] = 'Missing gender';
        }
        else if(!in_array($gender, ['male', 'female']))
        {
            $errorMessages[] = 'Wrong gender';
        }

        // No error
        if(empty($errorMessages))
        {
            $successMessages[] = 'User saved';

            // Reset values
            $_POST['first-name'] = '';
            $_POST['age'] = '';
            $_POST['gender'] = '';
        }
    }
    else
    {
        $_POST['first-name'] = '';
        $_POST['age'] = '';
        $_POST['gender'] = '';
    }
    