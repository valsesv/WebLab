<?php

function checkArea($x, $y, $r) : bool
{
    if ($x <= 0 && $y <= 0){
        if ($x >= -$r/2 && $y >= $r)
            return true;
    }
    if ($x <= 0 && $y >= 0){
        if ($x +$y <= $r)
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
    $response = "";

    $x = $_GET['x'];
    $response .= $x;
    $response .= ";";

    $y = $_GET['y'];
    $response .= $y;
    $response .= ";";

    $r = $_GET['r'];
    $response .= $r;
    $response .= ";";
    $result = checkArea($x, $y, $r) ? 'true' : 'false';
    $response .= $result;
    $response .= ";";

    $response .= date("Y-m-d H:i:s");
    $response .= ";";

    $endTime = round( microtime(true) - $startTime,5);
    $response .= $endTime;
    $response .= "/";

    echo $response;
}
