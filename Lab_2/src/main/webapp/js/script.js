function validateX(){
    let xSelect = $('.y-input');
    let xError = document.getElementById('x-error');
    const X_MIN = -4;
    const X_MAX = 4;

    let atLeastOneChecked = false;
    let isValid = true;
    for (let i = 0; i < xSelect.length; i++) {
        if (xSelect[i].checked === true) {
            let valR = xSelect[i].value
            isValid = isValid && (isNumeric(valR) && valR >= X_MIN && valR <= X_MAX);
            atLeastOneChecked = true;
        }
    }

    if (!atLeastOneChecked || !isValid){
        xError.innerHTML = "Select one valid number in range!";
        return false;
    }
    else{
        xError.innerHTML = "";
        return true;
    }
}

function validateY(){
    let yInput = $('#y-input');
    let yError = document.getElementById('y-error');
    const Y_MIN = -3;
    const Y_MAX = 3;

    let valY = yInput.val().replace(',', '.');
    let isValid = isNumeric(valY) && valY >= Y_MIN && valY <= Y_MAX;
    if (!isValid){
        yError.innerHTML = "Enter one number from " + Y_MIN + " to " + Y_MAX + "!";
    }
    else{
        yError.innerHTML ="";
    }

    return isValid;
}

function validateR(){
    let rInput = $('#r-input');
    let rError = document.getElementById('r-error');
    const R_MIN = 1;
    const R_MAX = 3;

    let valR = rInput.val().replace(',', '.');
    let isValid = isNumeric(valR) && valR >= R_MIN && valR <= R_MAX;
    if (!isValid){
        rError.innerHTML = "Enter one number from " + R_MIN + " to " + R_MAX + "!";
    }
    else{
        rError.innerHTML ="";
    }

    return isValid;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function setRequire() {
    let isValidX = validateX();
    let isValidY = validateY();
    let isValidR = validateR();
    return (isValidR && isValidX && isValidY);
}