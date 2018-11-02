<?php
    $files = scandir('./');
    array_shift($files);
    array_shift($files);
    foreach( $files as $file ) {
        if( preg_match('/^(.*?).html+$/', $file) && ! in_array($file['0'], array('.', '_')) ) {
            echo '<a href="./'.$file.'">'.$file.'</a><br />';
        }
    }