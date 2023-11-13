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
        <div class="header">
            <h2>

            </h2>
            <h3>
                Variant 1110220
            </h3>
        </div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="table">
            <!-- Title-->
            <tr>
                <th class="header" colspan="4">
                    <span>Demidovich Vseslav, P33091 <p class="header">Variant 1110220</p></span>
                </th>
            </tr>

            <!---->
            <form id="main-form"  method="get">
                <tr>
                    <!-- Input X-->
                    <td width="20%" align="center" valign="top">
                        <p><label class="info">X:</label></p>
                        <span class="js-input">
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="-2">-2
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="-1.5">-1.5
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="-1">-1
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="-2">-2
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="-0.5">-0.5
                    <br>
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="0">0
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="0.5"> 0.5
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="1"> 1
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="1.5"> 1.5
                    <input type="checkbox" name="x[]" class="y-input" onclick="validateX()" value="2"> 2
                </span>
                        <p class="error" id="x-error"></p>
                    </td>

                    <!-- Input y-->
                    <td width="20%" align="center" valign="top">
                        <p><label class="info">Y:</label></p>
                        <input type="text" id="y-input" name="y" placeholder="{-3..3}" onkeyup="validateY()" maxlength="10">
                        <p class="error" id="y-error"> </p>
                    </td>

                    <!-- Input R-->
                    <td width="20%" align="center" valign="top">
                        <p><label class="info">R:</label></p>
                        <input type="text" id="r-input" name="r" placeholder="{2..5}" onkeyup="validateY()" maxlength="10">
                        <p class="error" id="r-error"> </p>
                    </td>

                    <!--Chart Image-->
                    <td width="40%" align="center">
                        <img src="images/img.png" alt="Image is not found" class="image">
                    </td>
                </tr>

                <!-- Submit button-->
                <tr>
                    <td class = "btn" colspan="4" align="center">
                        <button type="submit"> Send </button>
                        <button type="reset"> Reset </button>
                    </td>
                </tr>

            </form>

        </table>

    </body>
</html>
