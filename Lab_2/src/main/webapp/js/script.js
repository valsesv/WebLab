function validateX(){
    const sel = document.getElementById('x-input').selectedIndex;
    const options = document.getElementById('x-input').options;
    let xError = document.getElementById('x-error');
    const X_MIN = -4;
    const X_MAX = 4;

    let valX = options[sel].value.replace(',', '.');
    let isValid = isNumeric(valX) && valX >= X_MIN && valX <= X_MAX;
    xError.innerHTML = isValid ? "" : getErrorText(X_MIN, X_MAX);

    return isValid
}

function validateY(){
    let yInput = document.getElementById('y-input');
    let yError = document.getElementById('y-error');
    const Y_MIN = -3;
    const Y_MAX = 3;

    let valY = yInput.value.replace(',', '.');
    let isValid = isNumeric(valY) && valY >= Y_MIN && valY <= Y_MAX;
    yError.innerHTML= isValid ? "" : getErrorText(Y_MIN, Y_MAX);

    return isValid;
}

function validateR(){
    const sel = document.getElementById('r-input').selectedIndex;
    const options = document.getElementById('r-input').options;
    let rError = document.getElementById('r-error');
    const R_MIN = 1;
    const R_MAX = 3;

    let valR = options[sel].value.replace(',', '.');
    console.log(valR);
    let isValid = isNumeric(valR) && valR >= R_MIN && valR <= R_MAX;
    rError.innerHTML = isValid ? "" : getErrorText(R_MIN, R_MAX);

    return isValid;
}

function getErrorText(from, to){
    return "Enter one number from " + from + " to " + to + "!";
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function CheckValidation() {
    let isValidX = validateX();
    let isValidY = validateY();
    let isValidR = validateR();
    return (isValidR && isValidX && isValidY);
}

function sendData(){
    $.ajax({
        url: 'control',
        method: 'GET',
        dataType: "html",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),

        success: function(result) {
            console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

$("#main-form").on("submit", function(event){
    event.preventDefault();

    //console.log("Got data for check!" );
    //console.log('y: ', yCoordinate.value);

    if(!CheckValidation()){
        console.log("post canceled");
        return;
    }
    console.log("data sending...");
    sendData();
});

$(".reset_button").on("click",function(e){
    e.preventDefault();
    const params = {'clear': true}
    //window.location.replace("control" + formatParams(params));
})