<?php

function checkArea($x, $y, $r) : bool
{
    if ($x <= 0 && $y <= 0){
        if ($x >= -$r/2 && $y >= -$r)
            return true;
    }
    if ($x <= 0 && $y >= 0){
        if (-$x +$y <= $r)
            return true;
    }
    if ($x >= 0 && $y <= 0){
        if ($x * $x + $y * $y <= $r*$r)
            return true;
    }
    return false;
}

main();

function main(): void
{
    $startTime = microtime(true);
    //$countValues = $_GET['countValues'];
    $x = $_GET['x'];
    $y = $_GET['y'];
    $r = $_GET['r'];
    $result = checkArea($x, $y, $r) ? 'true' : 'false';
    $date = date("H:i:s");
    $duration = round( microtime(true) - $startTime,5);

    $arrayOfValues = array($x, $y, $r, $date, $duration, $result);
    $_SESSION['value' /*. $countValues*/] = $arrayOfValues;

    echo $x, ' ', $y, ' ' , $r, ' ',  $date, ' ', $duration, ' ', $result, ' ';
}
