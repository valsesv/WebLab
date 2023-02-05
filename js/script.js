function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkX() {
    return $(".input-X:checked").length > 0 && isNumeric($(".input-X:checked").val());
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
        //alert(response);
    }
    return result;
}

function setRequire(elClass) {
    let el = document.getElementsByClassName(elClass);

    let atLeastOneChecked = false; //at least one cb is checked
    for (let i = 0; i < el.length; i++) {
        if (el[i].checked === true) {
            atLeastOneChecked = true;
        }
    }

    el[0].required = atLeastOneChecked !== true;
}