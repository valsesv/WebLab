function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkX() {
    return $(".input-X:checked").length > 0;
}

function getX(){
    return $(".input-X:checked").val();
}

function checkY() {
    const Y_MIN = -5;
    const Y_MAX = 3;

    let valY = getY();
    return (isNumeric(valY) && valY >= Y_MIN && valY <= Y_MAX);
}

function getY(){
    let yField = $('#input-Y');
    return yField.val().replace(',', '.');
}

function checkR() {
    let counter = 0;
    for (let i = 1; i <= 5; i++) {
        if ($('#r-checkbox' + i).is(":checked")) {
            counter++;
        }
    }
    return counter === 1;
}

function getR(){
    let result = 0;
    for (let i = 1; i <= 5; i++) {
        if ($('#r-checkbox' + i).is(":checked")) {
            result = $('#r-checkbox' + i).val();
        }
    }
    return result;
}

function validateVar() {
    let response = '';
    if (!checkX()) {
        response += "Не выбран X, ";
    }
    if (!checkY()) {
        response += "Неправильно ввёден Y, ";
    }
    if (!checkR()) {
        response += "Не выбран R";
    }

    let result = checkY() && checkR() && checkX();
    if (!result){
        alert(response);
    }
    return result;
}

let count = 1
const form = document.querySelector('#js-form');
form.onsubmit = function (event) {
    event.preventDefault();
    if (!validateVar()) {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.onload = function (){
        let arrayOfValues = xhr.responseText;
        arrayOfValues = arrayOfValues.split(' ');
        //alert(arrayOfValues);
        createNewRow(arrayOfValues[0], arrayOfValues[1], arrayOfValues[2], arrayOfValues[3], arrayOfValues[4], arrayOfValues[5])
    }
    xhr.open('GET', 'php/main.php?' + /*'countValues' + count +*/ 'x=' + getX() + '&y=' + getY() + '&r=' + getR());
    xhr.send();
}

function createNewRow(x, y, r, date, duration, result) {
    let tableRef = document.getElementById("table");
    let row = document.createElement("tr");
    row.setAttribute('class', 'infoOfRequest table1');
    row.setAttribute("align", "center");
    tableRef.append(row);
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.innerHTML = count;
    count += 1;

    td2.innerHTML = x + " " +y + " " + r;
    td3.innerHTML = date;
    td4.innerHTML = result + " " + duration + " секунд";
    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
}


/*window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onload = function (){
        createNewRow(xhr.responseText)
    }
    xhr.open('GET', 'php/data.php?', false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        let arrayOfValues = xhr.responseText;
        arrayOfValues = arrayOfValues.split(' ');
        for (let i = 0; i < arrayOfValues.length - 1; i += 6) {
            createNewRow(arrayOfValues[i], arrayOfValues[i + 1], arrayOfValues[i + 2], arrayOfValues[i + 3],arrayOfValues[i + 4],arrayOfValues[i + 5])
        }
    }
}*/
