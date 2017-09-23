<?php

    // Set up
    $path = dirname(__FILE__).'/../cours/';
    $ignore  = array('.','..','src');
    $files   = array();
    $entries = array();

    // Read dir
    if($handle = opendir($path))
    {
        while (false !== ($entry = readdir($handle)))
            if(!in_array($entry,$ignore) && is_dir($path.$entry))
                $entries[] = $entry;

        closedir($handle);
    }

    // Sort
    sort($entries);

    // Each entry
    foreach($entries as $_entry)
    {
        // Parse folder name
        $matches = array();
        preg_match_all("/cours\_(.*)-(.*)/",$_entry,$matches);
        $file            = new stdClass();
        $file->url       = '../cours/'.$_entry;
        $file->num       = $matches[1][0];
        $file->title     = $matches[2][0];
        $file->resources = array();

        // Resources
        $glob = glob($path.$_entry.'/*.zip');
        foreach($glob as $_glob)
        {
            $resource          = new stdClass();
            $basename          = basename($_glob);
            $resource->url     = '../cours/'.$_entry.'/'.$basename;
            $resource->name    = $basename;
            $file->resources[] = $resource;
        }

        $files[] = $file;
    }

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Développement Web - P2020 - Bruno Simon</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="stylesheet" href="src/bootstrap-3.3.5-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/css/style.css">
    <script src="src/js/jquery-2.1.4.min.js"></script>
    <script src="src/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">P2020 - Dév<span class="hidden-xs">eloppement</span> Web</a>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="https://github.com/brunosimon/hetic-p2020" target="_blank">GitHub</a></li>
            </ul>
        </div>
    </nav>
    <div class="container main">
        <h3>Cours <a class="btn btn-primary" href="../cours" target="_blank"><i class="glyphicon glyphicon-folder-open glyphicon-white"></i></a></h3>
        <table class="table table-striped">
            <tr>
                <th class="number">Num<span class="hidden-xs">éro</span></th>
                <th class="title">Titre</th>
                <th class="action text-right">Actions</th>
            </tr>
            <?php foreach($files as $_file): ?>
                    <tr>
                        <td class="num"><?php echo $_file->num; ?></td>
                        <td class="title"><?php echo $_file->title; ?></td>
                        <td class="action text-right">

                            <?php if(!empty($_file->resources)): ?>
                                <div class="dropdown hidden-sm hidden-md hidden-lg">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <i class="glyphicon glyphicon-download glyphicon-white"></i>
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                        <?php foreach($_file->resources as $_resource): ?>
                                            <li><a href="<?php echo $_resource->url ?>" target="_blank"><i class="glyphicon glyphicon-download glyphicon-white hidden-xs"></i> <?= $_resource->name ?></a></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>

                            <span class="hidden-xs">
                                <?php foreach($_file->resources as $_resource): ?>
                                    <a class="btn btn-default" href="<?php echo $_resource->url ?>" target="_blank"><i class="glyphicon glyphicon-download glyphicon-white hidden-xs"></i> <?= $_resource->name ?></a>
                                <?php endforeach; ?>
                            </span>

                            <a class="btn btn-primary" href="<?php echo $_file->url ?>" target="_blank"><i class="glyphicon glyphicon-eye-open glyphicon-white"></i></a>
                        </td>
                    </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>
</html>
