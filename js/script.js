function validateX(){
    let xRadio = $('.input-X');
    let xError = document.getElementById('x-error');

    const X_MIN = -2;
    const X_MAX = 2;
    let valX = $('.input-X:checked').val();

    if (!xRadio.checked && (isNumeric(valX) && valX >= X_MIN && valX <= X_MAX)){
        xError.innerHTML = "";
        return true;
    }

    xError.innerHTML = "Select one number in range!";
    return false;
}

function validateY(){
    let yInput = $('#y-input');
    let yError = document.getElementById('y-error');
    const Y_MIN = -5;
    const Y_MAX = 3;

    let valY = yInput.val().replace(',', '.');
    let isValid = isNumeric(valY) && valY >= Y_MIN && valY <= Y_MAX;
    if (!isValid){
        yError.innerHTML = "Enter one number from -5 to 3!";
    }
    else{
        yError.innerHTML ="";
    }

    return isValid;
}

function validateR(){
    let rSelect = $('.r-checkbox');
    let rError = document.getElementById('r-error');
    const R_MIN = 1;
    const R_MAX = 3;

    let atLeastOneChecked = false;
    let isValid = true;
    for (let i = 0; i < rSelect.length; i++) {
        if (rSelect[i].checked === true) {
            let valR = rSelect[i].value
            isValid = isValid && (isNumeric(valR) && valR >= R_MIN && valR <= R_MAX);
            atLeastOneChecked = true;
        }
    }

    if (!atLeastOneChecked || !isValid){
        rError.innerHTML = "Select one number in range!";
        return false;
    }
    else{
        rError.innerHTML = "";
        return true;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function setRequire() {
    let isValidR = validateR();
    let isValidX = validateX();
    let isValidY = validateY();
    if (isValidR && isValidX && isValidY){
        return true;
    }
    return false;
}