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
    let value_X = getX();
    let value_Y = getY();
    let value_R = getR();

    xhr.open('GET', 'php/main.php?' + 'x=' + value_X + '&y=' + value_Y + '&r=' + value_R);
    xhr.send();
    alert(xhr.response + ' ' + xhr.responseText);
}

function createNewRow(response) {
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
    let r = 0;
    for(let i = 1; i <= 9; i++) {
        if ($('#r-checkbox' + i).is(":checked"))
        {
            r = $('#r-checkbox' + i).val();
            break
        }
    }
    td2.innerHTML = $('.input-X:checked').val() + " " + $('#input-Y').val() + " " + r;
    td3.innerHTML = new Date().toLocaleTimeString();
    td4.innerHTML = response + " секунд";
    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
}
