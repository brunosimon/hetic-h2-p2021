<?php

    $city = isset($_GET['city']) ? $_GET['city'] : 'Paris';
    $url = 'http://api.openweathermap.org/data/2.5/forecast?q='.$city.'&appid=e48685844d2e3d64105a34297884b9d7&units=metric';
    $path = './cache/'.md5($url);

    if(file_exists($path) && time() - filemtime($path) < 60)
    {
        $data = file_get_contents($path);
        $data = json_decode($data);
    }
    else
    {
        $data = file_get_contents($url);
        $data = json_decode($data);
        file_put_contents($path, json_encode($data));
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    
    <form action="#" method="get">
        <input type="text" name="city" value="<?= $city ?>">
        <input type="submit">
    </form>

    <section class="results">
        <h2>Forecast <?= $city ?>:</h2>

        <img width="300" height="300" src="https://maps.googleapis.com/maps/api/staticmap?center=<?= $data->city->coord->lat ?>,<?= $data->city->coord->lon ?>&markers=<?= $data->city->coord->lat ?>,<?= $data->city->coord->lon ?>&zoom=11&size=300x300&key=AIzaSyD3s1JeBnKuusINra3m_q54pzQ7znFZ6lk">

        <?php foreach($data->list as $_forecast): ?>
            <div class="forecast" style="margin-bottom: 20px;">
                <div>Date: <?= date('Y-m-d H:i', $_forecast->dt) ?></div>
                <div>Temperature: <?= $_forecast->main->temp ?>°</div>
                <div>Humidity: <?= $_forecast->main->humidity ?>%</div>
            </div>
        <?php endforeach ?>

    </section>

</body>
</html>