const digits = document.getElementsByClassName("digit");
const screen = document.getElementById("screentext")
const ZERO = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0"
const MIN = -99999999;
const MAX =  99999999;
const MAX_DIGITS = 9;

let workingNumber = null;
let currentNumber = 0;
let decimalMode = false;
// let decimalPlaces = 0;
let temporary = true
let isPositive = true;
let displayNumber = "0."
let operation = "none"


function display() {
    if(isPositive) displayText = "&nbsp"
    else           displayText = "-"

    //only
    displayText = displayText.slice(0,MAX_DIGITS)


    for(i = displayNumber.length; i < MAX_DIGITS; i++){
        displayText = displayText + "&nbsp"
    }

    displayText = displayText + displayNumber    
    screentext.innerHTML = displayText;
}


function show(n) {
    s = Math.abs(n).toString()
    if(n<0){isPositive=false}
    else{   isPositive=true}

    displayNumber = s

    if(!s.includes('.')){displayNumber = displayNumber + '.'}

    

    display();
}

function read() {
    if(isPositive)  return  parseFloat(displayNumber);
    else            return -parseFloat(displayNumber);
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
    if(temporary){
        if(d === "0"){
            temporary = true
            //intentional (bug in CASIO MX-8B?)
        }else{
            temporary = false
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
    temporary = false;
    display();
})

// C/AC
function clear(){
    temporary = true;
    isPositive = true;
    displayNumber = "0."
}

function reset(){
    workingNumber = null;
    currentNumber = 0;
    decimalMode = false;
    // decimalPlaces = 0;
    operation = "none"
    clear();
    display()
    
}



document.getElementById("ac").addEventListener('click', () => {
    reset();
})

// +/-
document.getElementById("sign").addEventListener('click', () => {
    isPositive = !isPositive;
    temporary = false;
    display();
})


const operations = document.getElementsByClassName("operation");
Array.from(operations).forEach(op => {
    op.addEventListener('click', () => {
        operation = op.id;
        workingNumber = read();
        temporary = true;
    })
});

document.getElementById("equals").addEventListener('click', () => {
    equate()
    console.log(operation)
})

function equate() {

    if((operation === "divide") 
        & workingNumber == null) {
        workingNumber = read() * read();
    }

    if((operation === "multiply") 
        & workingNumber == null) {
        workingNumber = 1;
    }

    if(
        (operation === "plus" || operation === "minus") 
        & workingNumber == null
    ) {
        workingNumber = 0;
    }

    if(operation == "divide"){
        currentNumber = workingNumber / read();
    }
    if(operation == "multiply"){
        currentNumber = workingNumber * read();
    }
    if(operation == "minus"){
        currentNumber = workingNumber - read();
    }
    if(operation == "plus"){
        currentNumber = workingNumber + read();
    }
    
    
    temporary = true;
    // displayNumber = currentNumber.toString() 

    console.log("equate(): current number = ", currentNumber)
    show(currentNumber)
    console.log("equate(): current number = ", currentNumber)

    workingNumber = currentNumber;
    console.log("equate(): working number = ", workingNumber)
}


// decimal point
document.getElementById("point").addEventListener('click', () => {
    decimalMode = true;
})

display()