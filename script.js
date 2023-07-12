gsap.from (".box-one", {x: 500, easy: "bounce", opacity: 0, duration: 1.5, delay: .5})
const button = document.querySelector(".btn");
let userRunTime;
let userResrTime;
let attempts;
let timerIdRun;
let timerIdRest;
let amountTimeRun;
let amountTimeRest
let repeat = 0;
let text = document.querySelector(".text");
button.addEventListener("click", function() {
    userRunTime = document.querySelector("#inputRunTime").value;
    userResrTime = document.querySelector("#inputRestTime").value;
    attempts = document.querySelector("#inputAttempts").value;
    amountTimeRun = userRunTime * 60;
    amountTimeRest = userResrTime * 60;
    if (isNaN(userRunTime) || isNaN(userResrTime) || isNaN(attempts) || userRunTime === "" || userResrTime === "" || attempts === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Enter the correct value!',
        })
    }
    else {
        document.querySelector(".display-block").style.display = "none";
        document.querySelector(".display-none").style.display = "block";
        timerIdRun = setInterval(calculateTimeRun, 1000);
    }
})

function calculateTimeRun() {
    console.log("calculateTimeRun");
    let countdown = document.querySelector("#countdown");
    let minutes = Math.floor(amountTimeRun/60);
    let seconds = amountTimeRun%60;
    text.textContent = "RUN RUN RUN!!!";
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    countdown.textContent = `${minutes} : ${seconds}`;
    amountTimeRun --;
    if (amountTimeRun === 0) {
        stopTimerRun();
        repeat ++;
        amountTimeRest = userResrTime * 60;
        timerIdRest = setInterval(calculateTimeRest, 1000);
        amountTimeRun = 0;
        function stopTimerRun() {
            clearInterval(timerIdRun);
        }
    }
} 

function calculateTimeRest() {
    let countdown = document.querySelector("#countdown");
    let minutes = Math.floor(amountTimeRest/60);
    let seconds = amountTimeRest%60;
    text.textContent = "BREATHE!!!";
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    countdown.textContent = `${minutes} : ${seconds}`;
    amountTimeRest --;
    if (amountTimeRest === 0) {
        stopTimerRest();
        amountTimeRest = 0;
        if (repeat < attempts) {
            amountTimeRun = userRunTime * 60;
            timerIdRun = setInterval(calculateTimeRun, 1000);
        }
        else {
            document.querySelector(".rest").style.display = "block";
            document.querySelector(".run").style.display = "none";
        }
        function stopTimerRest() {
            clearInterval(timerIdRest);
        }
    }
}