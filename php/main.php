<?php

main();

function main(): void
{
    session_start();
    $x = $_GET['x'];
    $y = $_GET['y'];
    $y = str_replace(',', '.', $y);
    $r = $_GET['r'];
    $r = str_replace(',', '.', $r);
    $startTime = microtime(true);

    if (isset($_SESSION['saves'])) {
        $saves = unserialize($_SESSION['saves']);
    } else {
        $saves = array();
    }

    foreach ($x as $value){
        $correct = checkValues($value, $y, $r);
        $result = checkArea($value, $y, $r, $correct);

        $curr = array(
            "x" => $value,
            "y" => $y,
            "r" => $r,
            "is_hit" => $result,
            "is_correct" => $correct
        );
        $saves[] = $curr;
        $_SESSION['saves'] = serialize($saves);
    }

        echo '
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Результаты</title>
            
                <!-- Import styles-->
                <link rel="stylesheet" href="../css/style.css">
            </head>
            <body>
                <header class="header">
                    Демидович Всеслав, P33091
                </header>
                <input type="button" onclick="history.back()" value="Назад" />';

        echo "<div class='grid-container'>
                <div class='header'>X</div>
                <div class='header'>Y</div>
                <div class='header'>R</div>
                <div class='header'>Результат</div>
    
    ";

        foreach ($saves as &$element) {
            echo "
            <div>" . $element["x"] . "</div>
            <div>" . $element["y"] . "</div>
            <div>" . $element["r"] . "</div>
            <div>" . ($element["is_correct"] ? ($element["is_hit"] ? "да" : "нет") : "Некорректные данные"). "</div>";
        }
        echo "</div>";

        $date = date("H:i:s");
        $duration = round(microtime(true) - $startTime, 5);

        echo "Текущая время: " . $date . "<br>";
        echo "Время работы скрипта: " . $duration;

        echo '
            <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
            <script src="../js/script.js"></script>
        </body>
    </html>
    ';

// Очистить данные сессии
    $reset = $_GET['reset'] ?? 'no';
    if ($reset !== 'no') {
        $_SESSION['saves'] = serialize(array());
    }
}

function checkValues($x, $y, $r) : bool{
    return isset($x) && isset($y) && isset($r)
        && is_numeric($x) && is_numeric($y) && is_numeric($r)
        && -2 <= $x and $x <= 2 and -5 <= $y and $y <= 5 and 2 <= $r and $r <= 5;
}

function checkArea($x, $y, $r, $correct) : bool
{
    if (!$correct)
        return false;

    if ($x >= 0 && $y >= 0) {
        return $x <= $r && $y <= $r;
    }

    if ($x <= 0 && $y <= 0){
        return $x +$y <= $r;
    }
    if ($y > 0 && $x < 0){
        return $x * $x + $y * $y <= $r*$r;
    }
    return false;
}