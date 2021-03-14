// Wait until the DOM has loaded before running the game
// Get the button elements, and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

// if users presses enter we submit answer
    document.getElementById("answer-box").addEventListener("keydown", function(event){
      if (event.key === "Enter"){
        checkAnswer();
      }
    })
// default to show addition game    
runGame("addition");

});





function runGame(gameType){

  //Generate two random numbers between 1 and 25
  // Math.floor rounds down to the whole number
  // Math.random generates random number

// clears the inout box for each go
  document.getElementById("answer-box").value = "";

//puts cursor in input box on each run
document.getElementById("answer-box").focus();

  let num1 = Math.floor(Math.random() * 25 ) + 1;
  let num2 = Math.floor(Math.random() * 25 ) + 1;

  if (gameType === "addition"){
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply"){
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract"){
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "division"){
    displayDivisionQuestion(num1, num2);
  } else{
    alert(`unknown game type ${gameType}`);
    throw `unknown game type ${gameType}, aborting!`;
    // throw sends message to console and stops game from running
  }
}

function checkAnswer(){
//checks the answer against the first element in the returned array

let userAnswer = parseInt(document.getElementById("answer-box").value);
let calculatedAnswer= calculateCorrectAnswer();

let isCorrect = userAnswer === calculatedAnswer[0];

if(isCorrect){
  alert("Hey! You got it right! :D");
  incrementScore();
}else{
  alert(`Awww... you answered ${userAnswer}. The correct Answer was ${calculatedAnswer[0]}!`);
  incrementWrongAnswer();
}

runGame(calculatedAnswer[1]);

}

function calculateCorrectAnswer(){

let operand1 = parseInt(document.getElementById("operand1").innerText);
let operand2 = parseInt(document.getElementById("operand2").innerText);
let operator = document.getElementById("operator").innerText;

if(operator === "+"){
  return[operand1 + operand2, "addition"];
} else if(operator === "x"){
  return[operand1 * operand2, "multiply"];
} else if(operator === "-"){
  return[operand1 - operand2, "subtract"];  
} else if(operator === "/"){
  return[operand1 / operand2, "division"];  
}else{
  alert(`unimplemented operator ${operator}`);
  throw `unimplemented operator ${operator}, aborting`;
}

}

function incrementScore(){

// Gets current score from DOM and increements
let oldScore = parseInt(document.getElementById("score").innerText);
document.getElementById("score").innerText = ++oldScore;


}

function incrementWrongAnswer(){
// Gets current score from DOM and increements
let oldScore = parseInt(document.getElementById("incorrect").innerText);
document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2){
document.getElementById("operand1").textContent = operand1;
document.getElementById("operand2").textContent = operand2;
document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2){
  if(operand1 > operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
  }else{
    document.getElementById("operand1").textContent = operand2;
    document.getElementById("operand2").textContent = operand1;
    document.getElementById("operator").textContent = "-";
  }

}

function displayMultiplyQuestion(operand1, operand2){
document.getElementById("operand1").textContent = operand1;
document.getElementById("operand2").textContent = operand2;
document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2){
  document.getElementById("operand1").textContent = operand1 < operand2 ? operand1 * operand2 : operand1 * operand2 ;
  document.getElementById("operand2").textContent = operand1 < operand2 ? operand1 : operand2 ;
  document.getElementById("operator").textContent = "/";
}