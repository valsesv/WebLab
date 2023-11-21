<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="js/script.js" async defer></script>
    </head>
    <body id="error-page">
        <header>
            Demidovich Vseslav, P33091 P33091 var: 1110220
        </header>

        <div id="error-div">
        <h1>
        Error: ${error}
        </h1>
            <button onClick="window.location.replace('./index.jsp');" type="reset">←</button>
        </div>
    </body>
</html>