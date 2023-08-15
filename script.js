const digits = document.getElementsByClassName("digit");
const screentext = document.getElementById("digits")
const signtext = document.getElementById("signtext")
const ZERO = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0."
const MIN = -99999999;
const MAX =  99999999;
const MAX_DIGITS = 8;


let decimalMode = false;
// let decimalPlaces = 0;
let temporary = true
let isPositive = true;
let onScreenDigits = "0.";
let onScreenText = ZERO 

let workingNumber = null;

let operation = "none"

let operandNumber = null;



//takes any real number, returns displayable string  
function format(n) {
    // determine if number is positive
    // and whether to start with a whitespace or a minus
    if(n<0){text = "-"}
    else{text = "&nbsp"}

    //positive string version of n
    s = Math.abs(n).toString()

    //digits required to write this number 
    let digits = (s.replace('.','')).length

    //determine amount of whitespace from the left
    for(i = digits; i < MAX_DIGITS; i++){
        text = text + "&nbsp";
    }

    text = text + s
    
    // add a period to the end of the text if integer
    if(!text.includes('.')){text=text + '.'}
    return text
}

//digits, text, html updates
function show(n) {
    //put to the screen
    // onScreenDigits = Math.abs(n).toString();
    // onScreenText = format(n)
    // screentext.innerHTML = onScreenText;

    onScreenDigits = Math.abs(n).toString()
    if(!onScreenDigits.includes('.')){
        onScreenDigits=onScreenDigits + '.'
    }
    updateHTML()
}

//takes the sign and and onScreenDigits
function read() {
    return parseFloat(onScreenDigits);
}


function updateHTML() {
    console.log('updateHTML:', onScreenDigits)
    if(isPositive) {
        onScreenText = format(read(onScreenDigits)) 
    }else{
        onScreenText = format(read(onScreenDigits)) 
    }
    
    screentext.innerHTML = onScreenText;
}




function enterDigit(d) {
    // // first number being entered
    // if(temporary){
    //     if(d === "0"){
    //         temporary = true
    //         //intentional (bug in CASIO MX-8B?)
    //     }else{
    //         temporary = false
    //         //intentional (bug in CASIO MX-8B?)
    //     }
    //     onScreenText = d + "."
    //     isPositive = true
    // }else{
    //     //maximum of 8 digits on screen
    //     if (onScreenText.length >= MAX_DIGITS) return
        
    //     if (decimalMode) {
    //         onScreenText = onScreenText + d
    //     } else {
    //         onScreenText = onScreenText.slice(0,-1) + d + '.'
            
    //     }

    // }
    if(temporary){
        if(d==="0"){
            temporary = true
        }else{
            temporary = false
        }
        
        isPositive = true
        onScreenDigits = d + '.'
        

        updateHTML()
        return
    }


    // maximum of 8 digits on screen
    if (onScreenDigits.length > MAX_DIGITS){     
        return
    }


    if (decimalMode) {
        onScreenDigits = onScreenDigits + d
    } else {
        onScreenDigits = onScreenDigits.slice(0,-1) + d + '.'
    }
    temporary = false
    
    //read the number that was just written and store in current number
    // console.log('onScreenText', onScreenText )

    console.log(onScreenDigits)
    updateHTML()
}

//digits
Array.from(digits).forEach(digit => {
    digit.addEventListener('click', () => {
        enterDigit(digit.id[1])
    })
});

//decimal point
document.getElementById("point").addEventListener('click', () => {
    decimalMode = true;
    temporary = false;
    // display();
})

// C/AC
function clear(){
    temporary = true;
    isPositive = true;
    onScreenDigits = 0;
    onScreenText = "0."
    show(0)
}

function reset(){
    workingNumber = null;
    operandNumber = null;
    decimalMode = false;
    operation = "none"
    clear();
    // display()
    
}



document.getElementById("ac").addEventListener('click', () => {
    reset();
})

// +/-
document.getElementById("sign").addEventListener('click', () => {
    isPositive = !isPositive;
    temporary = false;
    updateHTML()
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
        & operandNumber == null) {
            operandNumber = 1;
    }

    if((operation === "multiply") 
        & operandNumber == null) {
            operandNumber = 1;
    }

    if(
        (operation === "plus" || operation === "minus") 
        & operandNumber == null
    ) {
        operandNumber = 0;
    }



    if(operation == "divide"){
        workingNumber = workingNumber / operandNumber;
    }
    if(operation == "multiply"){
        workingNumber = workingNumber * operandNumber;
    }
    if(operation == "minus"){
        workingNumber = workingNumber - operandNumber;
    }
    if(operation == "plus"){
        workingNumber = workingNumber + operandNumber;
    }
    
    temporary = true;
    show(workingNumber)
}


// decimal point
document.getElementById("point").addEventListener('click', () => {
    decimalMode = true;
})

show(onScreenDigits)

// show(-83.231111)