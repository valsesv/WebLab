function updateTime(){
    let now = new Date();
    let clock = document.getElementById("clock");
    clock.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

window.onload = function(){
    updateTime();
    window.setInterval(function() {updateTime()}, 1000);
};