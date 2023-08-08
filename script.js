const digits = document.getElementsByClassName("digit");
const screen = document.getElementById("screentext")
const ZERO = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0"
const MIN = -99999999
const MAX =  99999999

let workingNumber = 0;
let currentNumber = 0;
let decimalMode = false;
let displayText = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0"



//current number gets displayed to the screen
function display(){
    // if(currentNumber<0) {
    //     displayText = "-" 
    // }else{
    //     displayText = "&nbsp"
    // }
    displayText = "" 

    //TODO: handle decimals
    displayText = displayText + Math.abs(currentNumber).toString()

    //TODO: maximum number of digits on screen
    if(displayText.length > 8) {
        return
    }

    for(let d = displayText.replace('.', '').length; d <= 8; d++) {
        displayText = "&nbsp" + displayText
    }

    screentext.innerHTML = displayText;
}

//gets the number of digits that would be displayed 
function dCount(number) {
    number.toString().replace('.', '').length
}


console.log(Array(digits))

function enterDigit(d_str) {
    d =  parseInt(d_str)
    if(decimalMode){
        currentNumber = 10*currentNumber + d;
    }else{
        currentNumber = 10*currentNumber + d;
    }
    
}


Array.from(digits).forEach(digit => {
    digit.addEventListener('click', () =>{
        enterDigit(digit.id)
        // alert(digit.id)
        display();
    })
});

display()



// C/AC
document.getElementById("ac").addEventListener('click', ()=> {    
    workingNumber = 0;
    currentNumber = 0;
    decimalMode = false;
    displayText = ZERO;
    display();
})


// decimal point
document.getElementById("point").addEventListener('click', ()=> {    
    decimalMode = true; 
})



display()