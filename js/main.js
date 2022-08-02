const start = document.querySelector('.btn-start');
const myContainer = document.querySelector('.my-container')
const enter = document.querySelector('.enter');
const enterNumber = document.querySelector('.enter-number')

//////////// Create Elements ///////////////

const textNumberGuess = document.createElement('div');
textNumberGuess.className = 'text-light my-guess';
textNumberGuess.innerText = 'Guess the number';

const elementForm = document.createElement('form');
elementForm.className = 'd-flex mt-5 justify-content-center';
elementForm.action = '#';

const checkButton = document.createElement('button');
checkButton.type = 'button';
checkButton.className = 'btn-check btn btn-danger mt-4';
checkButton.innerText = 'Check Number';

const elementGuide = document.createElement('div');
elementGuide.className = 'text-secondary mt-4';
elementGuide.innerText = 'Guide: guess the number, green color means correct, blue color means higher and red means lower';

////////////////// Apending Elements //////////////////////////

let gamePlay = false;
let myArray = [];
let i = 0;
let conter = 0;
let numberGuess = '';
let WinFlag = 0;

start.addEventListener('click',funcAddElement);
checkButton.addEventListener('click',funcCheck);

function funcAddElement(){

    if(enterNumber.value == '' || enterNumber.value < '1' || enterNumber.value > 10){
        alert('You have to enter a number beetween 1-10')
    }
    else {

        enter.remove();
        enterNumber.remove();
        start.remove();

        checkButton.innerText = "Check Number";
        textNumberGuess.innerText = 'Guess the number';
        makerGameArea(enterNumber.value);  
    }
}

function makerGameArea(enterNumber){

    elementForm.innerHTML = " ";
    for (let i = 0; i<enterNumber; i++) {
        const elementInput = document.createElement('input');
        elementInput.type = 'number';
        elementInput.value = '0';
        elementInput.max = '9';
        elementInput.min = '0';
        elementInput.order = i;
        elementInput.className = 'w-25 pl-2 text-light border';
        elementForm.appendChild(elementInput) ;
    }

    myContainer.appendChild(textNumberGuess) +
    myContainer.appendChild(elementForm) + 
    myContainer.appendChild(checkButton) +
    myContainer.appendChild(elementGuide) ;  

    randomNumber(enterNumber);
    console.log(randomNumber(enterNumber));

    
}

function randomNumber(x){
    for(let i = 0; i < x; i++){
        myArray[i] = Math.floor(Math.random()*10);
    }
    return myArray;   
}

function funcCheck(){

    if (WinFlag == 1){
        gameEnd(); 
        WinFlag = 0;
    }

    else{
        const myInputs = document.querySelectorAll('input');

        conter ++ ;
        textNumberGuess.innerText = 'Guesses : ' + conter + "  ";
        myInputs.forEach(item => {

        if (item.value == myArray[i]) {
            item.style.backgroundColor = "green";
        }
        else if (item.value > myArray[i]) {
            item.style.backgroundColor = "red";  
        } 
        else {
            item.style.backgroundColor = "blue";
        }
        i++;
        if (i == myInputs.length) {
            i = 0 ;
        }
        });

        let colorAll = 0 ;
        for (let k = 0; k < myInputs.length; k++) {

            let itemInput = myInputs[k].style.backgroundColor;

            if (itemInput == 'blue' ||  itemInput == 'red') {
                break;
            }
            else {
                colorAll ++;
                if (colorAll == myInputs.length) {
                    textNumberGuess.innerHTML  = "You solved this game with  " + conter + '  Guesses' ;
                    checkButton.innerText = "Restart Game";
                    conter = 0;
                    WinFlag = 1;
                    
                }
            }
        }
    }
}

function gameEnd(){
       
    funcAddElement();
}
