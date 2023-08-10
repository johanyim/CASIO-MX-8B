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

// let displayNumber = "0."
let displayText = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0"



//current number gets displayed to the screen
function display() {

    displayText = getDigits();
    n = getDigitCount();
    dp = decimalPlaces;



    
    

    //number of whitespaces
    for (let d = n; d < MAX_DIGITS - 1; d++) {
        displayText = "&nbsp" + displayText
    }

    //whether to add '-' or not
    if (currentNumber < 0) {
        displayText = "-" + displayText
    } else {
        displayText = "&nbsp" + displayText
    }


    // // where to put the decimal place
    // position = displayText.length-dp
    // displayText = [
    //     displayText.slice(0,position), ".", displayText.slice(position)
    // ].join('');

    screentext.innerHTML = displayText;
    console.log("Display:" + currentNumber)
}

//gets the number of digits (excluding '-') that should be displayed 
function getDigitCount() {
    return getDigits().length + decimalPlaces
}

//raw digits 
function getDigits() {
    let num = Math.abs(currentNumber)


    //special behavior when 0
    if(num === 0){
        ret = "0"
        for(let i = 0; i < decimalPlaces; i++){
            ret = ret + "0" 
        }
        return ret
    }
    //special behavior when decimal part is all zero
    if(num%1 == 0) {
        ret = (currentNumber%1).toString()
        for(let i = 0; i < decimalPlaces; i++){
            ret = ret + "0" 
        }
        return ret
    }

    return num.toString().replace('.','')
}

function enterDigit(d_str) {
    //maximum of 8 digits on screen
    if (getDigitCount() + 1 >= MAX_DIGITS) {
        return
    }

    d = parseInt(d_str)
    if (!decimalMode) {
        currentNumber = 10 * currentNumber + d;
    } else {
        let shift = 10 ** (decimalPlaces + 1)
        // currentNumber = currentNumber + (0.1**decimalPlaces)*d 
        currentNumber = (((currentNumber * shift) + d) / shift)
        decimalPlaces++;
        currentNumber = currentNumber.toFixed(decimalPlaces);
        console.log("enterDigit:" + currentNumber)
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
    display();
})

// C/AC
document.getElementById("ac").addEventListener('click', () => {
    workingNumber = 0;
    currentNumber = 0;
    decimalMode = false;
    decimalPlaces = 0;
    displayText = ZERO;
    display();
})


// +/-
document.getElementById("sign").addEventListener('click', () => {
    currentNumber = -currentNumber;
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
