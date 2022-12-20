const gridButtons = document.querySelector(".grid-buttons");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const display = document.querySelector(".display");
const progress = document.querySelector(".working-out");

let sum;

const operands = {
  arr: [],
  add: false,
  minus: false,
  subtract: false,
  divide: false,
};

// EVENT LISTENERS

gridButtons.addEventListener("click", (e) => {
  if (!e.target.closest == "button") return;

  let targetBtn = e.target;
  if (targetBtn.classList.contains("number")) {
    if (display.innerHTML != 0) {
      display.innerHTML += targetBtn.innerHTML;
      progress.innerHTML += targetBtn.innerHTML;
    } else {
      display.innerHTML = "";
      display.innerHTML = targetBtn.innerHTML;
      progress.innerHTML += targetBtn.innerHTML;
    }
  }

  if (targetBtn.classList.contains("decimal")) {
    if (display.innerHTML.includes(".")) return;
    display.innerHTML += ".";
    progress.innerHTML += ".";
  }

  if (targetBtn.classList.contains("add")) {
    add();
  }

  if (targetBtn.classList.contains("minus")) {
    let stringArr = progress.innerHTML.split("");
    let lastLetter = stringArr[stringArr.length - 1]
    switch(lastLetter){
        case "+":
            display.innerHTML+="-"
            progress.innerHTML+="-"
            break;
        case "x":
            display.innerHTML+="-"
            progress.innerHTML+="-"
            break;
        case "/":
            display.innerHTML+="-"
            progress.innerHTML+="-"
            break;
        default:
            minus();
    }
  }
  if (targetBtn.classList.contains("divide")) {
    divide();
  }
  if (targetBtn.classList.contains("multiply")) {
    multiply();
  }
});

equals.addEventListener("click", () => {
  parseString();
  if (operands.arr.length === 2) {
    reducer();
    display.innerHTML = sum;
    operands.arr = [];
  }
});

clear.addEventListener("click", () => {
  progress.innerHTML = "";
  display.innerHTML = 0;
  operands.arr = [];
});

// FUNCTIONS

function add() {
  const stringArr = display.innerHTML.split("")
  if(stringArr.includes("-")) {
    console.log(stringArr[0])
    display.innerHTML = stringArr[0]
  } else { 
    parseString();
  }
  
  console.log(operands.arr)
  progress.innerHTML += "+";
  if (operands.arr.length > 1) {
    reducer();
    operands.add = false
    operands.arr = [sum];
  }
  operands.add = true;
  operands.minus = false;
  operands.divide = false;
  operands.multiply = false;
  display.innerHTML = "";
}

function minus() {
  const stringArr = display.innerHTML.split("")
  if(stringArr.includes("-")) {
    console.log(stringArr[0])
    display.innerHTML = ""
  }
  progress.innerHTML += "-";
  parseString();
  console.log(operands.arr)
  if (operands.arr.length > 1) {
    reducer();
    operands.minus = false
    operands.arr = [sum];
  }
  operands.add = false;
  operands.minus = true;
  operands.divide = false;
  operands.multiply = false;
  display.innerHTML = "";
}

function divide() {
  const stringArr = display.innerHTML.split("")
  if(stringArr.includes("-")) {
    console.log(stringArr[0])
    display.innerHTML = ""
  }
  parseString();
  console.log(operands.arr)
  progress.innerHTML += "/";
  if (operands.arr.length > 1) {
    reducer();
    operands.divide = false
    operands.arr = [sum];
  }
  operands.add = false;
  operands.minus = false;
  operands.divide = true;
  operands.multiply = false;
  display.innerHTML = "";
}

function multiply() {
  const stringArr = display.innerHTML.split("")
  if(stringArr.includes("-")) {
    console.log(stringArr[0])
    display.innerHTML =""
  }
  parseString();
  console.log(operands.arr)
  progress.innerHTML += "x";
  if (operands.arr.length > 1) {
    reducer();
    operands.multiply = false
    operands.arr = [sum];
  }
  operands.add = false;
  operands.minus = false;
  operands.divide = false;
  operands.multiply = true;
  display.innerHTML = "";
}

function reducer() {
  if (operands.add) {
    sum = operands.arr.reduce((a, b) => a + b);
  } else if (operands.minus) {
    sum = operands.arr.reduce((a, b) => a - b);
  } else if (operands.divide) {
    sum = operands.arr.reduce((a, b) => a / b);
  } else if (operands.multiply) {
    sum = operands.arr.reduce((a, b) => a * b);
  }
}

let float = false;

function floatOrInt() {
  for (let i = 0; i < display.innerHTML.length; i++) {
    if (display.innerHTML[i] === ".") {
      float = true;
    }
  }
}

function parseString() {
  floatOrInt();
  if (display.innerHTML === "") return;
  if (float) {
    operands.arr.push(parseFloat(display.innerHTML));
  } else {
    operands.arr.push(parseInt(display.innerHTML));
    float = false;
  }
}
const errorText = document.getElementById("error");

window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
    });
  } else {
    errorText.innerHTML = "ERROR";
  }
});
