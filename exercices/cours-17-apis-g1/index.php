<?php

    $city = !empty($_GET['city']) ? $_GET['city'] : 'Paris';
    $url = 'http://api.openweathermap.org/data/2.5/forecast?q='.$city.'&units=metric&appid=e48685844d2e3d64105a34297884b9d7';
    $path = './cache/'.md5($url);

    if(file_exists($path) && time() - filemtime($path) < 10)
    {
        $forecast = json_decode(file_get_contents($path));
    }
    else
    {
        $forecast = json_decode(file_get_contents($url));
        file_put_contents($path, json_encode($forecast));
    }


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forecast</title>
</head>
<body>
    
    <!-- Form -->
    <form action="#" method="get">
        <input type="text" value="<?= $city; ?>" name="city">
        <input type="submit">
    </form>

    <!-- Results -->
    <div class="results">
        <h2>Forecast: <?= $city; ?></h2>

        <img src="https://maps.googleapis.com/maps/api/staticmap?center=<?= $forecast->city->coord->lat ?>,<?= $forecast->city->coord->lon ?>&markers=<?= $forecast->city->coord->lat ?>,<?= $forecast->city->coord->lon ?>&zoom=11&size=300x300&key=AIzaSyDyjC6DstNUFKyWd0_aNKWNIcL4KA0ZFXk" width="300" height="300">

        <?php foreach($forecast->list as $_forecast): ?>
            <div class="day" style="margin-bottom: 20px;">
                <div>Date: <?= date('Y-m-d H:i', $_forecast->dt); ?></div>
                <div>Temperature: <?= $_forecast->main->temp; ?>°</div>
            </div>
        <?php endforeach; ?>
    </div>

</body>
</html>