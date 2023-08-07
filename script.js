const digits = document.getElementsByClassName("digit");
const screen = document.getElementById("screentext")
const ZERO = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0"


let workingNumber = 0;
let currentNumber = 0;
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
        
    }



    for(let d = displayText.length; d <= 8; d++) {
        displayText = "&nbsp" + displayText
    }

    screentext.innerHTML = displayText;



}




console.log(Array(digits))





Array.from(digits).forEach(digit => {
    digit.addEventListener('click', () =>{
        currentNumber = 10*currentNumber + parseInt(digit.id);
        // alert(digit.id)
        display();
    })
});

display()



// C/AC
document.getElementById("ac").addEventListener('click', ()=> {    
    workingNumber = 0;
    currentNumber = 0;
    displayText = ZERO;
    display();
})
