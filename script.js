const digits = document.getElementsByClassName("digit");

console.log(Array(digits))


Array.from(digits).forEach(digit => {
    digit.addEventListener('click', () =>{
        alert(digit.id)
    })
});