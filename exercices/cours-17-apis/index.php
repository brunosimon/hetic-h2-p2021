<?php

    define('API_KEY', '9e8150c9d6fbf87d678d2cf7f7a2c00a');

    // Call
    $city = !empty($_GET['city']) ? $_GET['city'] : 'Paris';
    $url = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&q='.$city.'&APPID='.API_KEY;

    // Cache
    $fileName = md5($url);
    $filePath = './cache/'.$fileName;

    if(file_exists($filePath) && time() - filemtime($filePath) < 60)
    {
        $forecast = json_decode(file_get_contents($filePath));
    }
    else
    {
        $forecast = json_decode(file_get_contents($url));
        file_put_contents($filePath, json_encode($forecast));
    }
                                
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>APIs</title>
    <style>
        .day
        {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

    <!-- Form -->
    <form action="#" method="get">
        <input id="city" type="text" name="city" required value="<?= $city ?>">
        <label for="city">City*</label>
        <br>
        <input type="submit">
    </form>

    <!-- Results -->
    <h2>Weather for <?= $city ?></h2>

    <img src="https://maps.googleapis.com/maps/api/staticmap?center=<?= $forecast->city->coord->lat ?>,<?= $forecast->city->coord->lon ?>&markers=<?= $forecast->city->coord->lat ?>,<?= $forecast->city->coord->lon ?>&zoom=11&size=300x300&key=AIzaSyDyjC6DstNUFKyWd0_aNKWNIcL4KA0ZFXk" width="300" height="300">

    <div class="results">
        <?php foreach($forecast->list as $_forcast): ?>
            <div class="day">
                <div>Date: <?= date('Y-m-d', $_forcast->dt) ?></div>
                <div>Temp: <?= $_forcast->main->temp ?>°</div>
                <div>Humidity: <?= $_forcast->main->humidity ?>%</div>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>