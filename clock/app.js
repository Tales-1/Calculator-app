const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");
const oneSecDeg = 6;
let currentHour
let currentMinute
let currentSecond



function moveSecond(turnS){
    secondHand.style.transform = `translateY(-100%) rotate(${turnS}deg)`;
}

function moveMinute(turnM){
    minuteHand.style.transform =`translateY(-100%) rotate(${turnM}deg)`
}

function moveHour(turnH){
    hourHand.style.transform = `translateY(-100%) rotate(${turnH}deg)`
}

function moveHands(currentHour,currentMinute,currentSecond){
    let currentTime = new Date().getTime()
    let oneDay =  86400000;
    let oneHour = 3600000;
    let oneMinute = 60000;
    currentHour = Math.floor((currentTime%oneDay)/oneHour);
    currentMinute = Math.floor((currentTime%oneHour)/oneMinute);
    currentSecond = Math.floor((currentTime%oneMinute)/1000);
 
    let turnS = oneSecDeg * currentSecond;
    let turnM = oneSecDeg * currentMinute;
    let turnH;
    if(currentHour > 12){
        turnH = ((currentHour % 12) * 30) + (currentMinute*0.5);
    }else{turnH = (currentHour * 30) + (currentMinute*0.5)};

    moveSecond(turnS);
    moveMinute(turnM)
    moveHour(turnH)

}

setInterval(moveHands, 1000)


