//strings
const digits = document.getElementsByClassName("digit");
const screen = document.getElementById("screentext")
const ZERO = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0"
const MIN = -99999999;
const MAX = 99999999;
const MAX_DIGITS = 9;


//TODO: Try with all string values, only calculating when using function buttons
let workingNumber = 0;
let currentNumber = 0;
let decimalMode = false;
let decimalPlaces = 0;
let isZero = true
let isPositive = true;
let displayNumber = "0."
let displayText = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0."

function display() {
    if(isPositive) displayText = "&nbsp"
    else           displayText = "-"

    for(i = displayNumber.length; i < MAX_DIGITS; i++){
        displayText = displayText + "&nbsp"
    }

    displayText = displayText +  displayNumber    
    screentext.innerHTML = displayText;
}

function enterDigit(d) {
    //maximum of 8 digits on screen
    if (displayNumber.length >= MAX_DIGITS) return

    if (!decimalMode) {
        displayNumber = displayNumber.slice(0,-1) + d + '.'
    } else {
        displayNumber = displayNumber + d
    }

    // first number being entered
    if(isZero){
        if(d === "0"){
            isZero = true
            //intentional (bug in CASIO MX-8B?)
        }else{
            isZero = false
            //intentional (bug in CASIO MX-8B?)
        }
        displayNumber = d + "."
        isPositive = true
        
    }

    display();
}

//digits
Array.from(digits).forEach(digit => {
    digit.addEventListener('click', () => {
        enterDigit(digit.id[1])
        display();
    })
});


//decimal point
document.getElementById("point").addEventListener('click', () => {
    decimalMode = true;
    isZero = false;
    display();
})

// C/AC
document.getElementById("ac").addEventListener('click', () => {
    workingNumber = 0;
    currentNumber = 0;
    decimalMode = false;
    decimalPlaces = 0;
    isZero = true
    isPositive = true;
    displayNumber = "0."
    display();
})

// +/-
document.getElementById("sign").addEventListener('click', () => {
    isPositive = !isPositive;
    iszero = false;
    display();
})

// decimal point
document.getElementById("point").addEventListener('click', () => {
    decimalMode = true;
})

// currentNumber = 3.1415
display()



// console.log(getDigitCount(3.1415)) //5
// console.log(getDigitCount(1113.1415)) //8
// console.log(getDigitCount(11113.1415)) //9
// console.log(getDigitCount(-3.1415)) //5
// console.log(getDigitCount(-3)) //1
// console.log(getDigitCount(3)) //1
