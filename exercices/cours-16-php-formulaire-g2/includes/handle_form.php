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

        // Test errors
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
        else if(!in_array($gender, $genders))
        {
            $errorMessages[] = 'Wrong gender';
        }

        // Success
        if(empty($errorMessages))
        {
            $prepare = $pdo->prepare('
                INSERT INTO
                    users (first_name, age, gender)
                VALUES
                    (:first_name, :age, :gender)
            ');

            $prepare->bindValue('first_name', $firstName);
            $prepare->bindValue('age', $age);
            $prepare->bindValue('gender', $gender);

            $prepare->execute();

            $successMessages[] = 'User registered';
            
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
