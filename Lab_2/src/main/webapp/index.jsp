<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lab 2</title>
        <!-- Import styles-->
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="table">
            <!-- Title-->
            <tr>
                <th class="header" colspan="4">
                    <span>Demidovich Vseslav, P33091 <p class="header">Variant 1110220</p></span>
                </th>
            </tr>

            <!---->
            <form id="main-form"  method="post">
                <tr>
                    <!-- Input X-->
                    <td width="20%" align="center" valign="top">
                        <p><label class="info">X:</label></p>
                        <label>
                            <select id="x-input">
                                <option class="input-data" onclick="validateX()" value="-4">-4</option>
                                <option class="input-data" onclick="validateX()" value="-3">-3</option>
                                <option class="input-data" onclick="validateX()" value="-2">-2</option>
                                <option class="input-data" onclick="validateX()" value="-1">-1</option>
                                <option class="input-data" onclick="validateX()" value="0">0</option>
                                <option class="input-data" onclick="validateX()" value="1">1</option>
                                <option class="input-data" onclick="validateX()" value="2">2</option>
                                <option class="input-data" onclick="validateX()" value="3">3</option>
                                <option class="input-data" onclick="validateX()" value="4">4</option>
                            </select>
                        </label>
                        <p class="error" id="x-error"></p>
                    </td>

                    <!-- Input y-->
                    <td width="20%" align="center" valign="top">
                        <p><label class="info">Y:</label></p>
                        <input type="text" id="y-input" placeholder="{-3..3}" onkeyup="validateY()" maxlength="10">
                        <p class="error" id="y-error"> </p>
                    </td>

                    <!-- Input R-->
                    <td width="20%" align="center" valign="top">
                        <p><label class="info">R:</label></p>
                        <label>
                            <select id = "r-input">
                                <option class="input-data" onclick="validateR()" value="1">1</option>
                                <option class="input-data" onclick="validateR()" value="1.5">1.5</option>
                                <option class="input-data" onclick="validateR()" value="2">2</option>
                                <option class="input-data" onclick="validateR()" value="2.5">2.5</option>
                                <option class="input-data" onclick="validateR()" value="3">3</option>
                            </select>
                        </label>
                        <p class="error" id="r-error"> </p>
                    </td>

                    <!--Chart Image-->
                    <td width="40%" align="center">
                        <img src="images/area.png" alt="Image is not found" width="300" height="300">
                    </td>
                </tr>

                <!-- Submit button-->
                <tr>
                    <td class = "btn" colspan="4" align="center">
                        <button type="reset"> Reset </button>
                        <button type="submit"> Send </button>
                    </td>
                </tr>

            </form>

            <tr align="center" class="infoOfRequest">
                <th>
                    <td width="10%">
                        X
                    </td>
                    <td width="10%">
                        Y
                    </td>
                    <td width="10%">
                        R
                    </td>
            </tr>

            <tr align="center" class="infoOfRequest">
                <td>
                    Current time
                </td>
            </tr>
            <tr align="center" class="infoOfRequest">
                <td>
                    Script work time
                </td>
            </tr>

        </table>

        <!-- JS library-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="js/script.js">CheckValidation()</script>
    </body>
</html>
