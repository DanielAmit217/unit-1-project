// variables
let userSandwich = [];
let computerSandwich = [];
let level = 1;
let points = 0;

// items --------------------------------------------------------------------
const ingredientsList = {
  1: "Bread",
  2: "Meat",
  3: "Cheese",
  4: "Tomato",
  5: "Lettuce",
  6: "Cucumber",
  7: "Mayo",
  8: "Ketchup",
};

const emojiDict = {
  Bread: "./assets/food-emoji's/bread-emoji.png",
  Meat: "./assets/food-emoji's/salami-emoji.png",
  Cheese: "./assets/food-emoji's/cheese-emoji.png",
  Tomato: "./assets/food-emoji's/tomato-emoji.png",
  Lettuce: "./assets/food-emoji's/lettuce-emoji.png",
  Cucumber: "./assets/food-emoji's/cucumber-emoji.png",
  Mayo: "./assets/food-emoji's/mayo-emoji.png",
  Ketchup: "./assets/food-emoji's/ketchup-emoji.png",
}

const clickAudio = new Audio("./assets/final-audio/click.mp3")

// cached elements -------------------------------------------------------------
const ingredientsBtn = document.querySelectorAll(".button");
const cuttingBoardPreview = document.querySelector("#cutting-board");
const cuttingBoardImage = document.querySelector("#cutting-board-image");
const boardWrapper = document.querySelector("#board-wrapper");
const orderView = document.querySelector("#order");
const returnBtn = document.querySelector("#return-button");
const submitBtn = document.querySelector("#submit-button");
const displayLevel = document.querySelector("#level-display");
const displayPoints = document.getElementById("points-display");
const startBtn = document.getElementById("start-button");
const displayTimer = document.querySelector(".timer")
const popUpWindow = document.querySelector(".pop-up")
const popUpTitle = document.querySelector(".display-message h2");
const pupUpMsgContent = document.getElementById("message-content")

// functions -------------------------------------------------------------

function updateOrderUI() {
  let orderString = "";
  computerSandwich.forEach((ingredient) => {
    orderString += `<img class="order-images" src=${emojiDict[ingredient]}>`;
  });
  orderView.innerHTML = "";
  orderView.insertAdjacentHTML("beforeend", orderString);
}

function updateCuttingBoardUI() {
  let htmlString = "";
  userSandwich.forEach((ingredient) => {
    htmlString += `<img class="order-images" src=${emojiDict[ingredient]}>`
  });
  cuttingBoardPreview.innerHTML = "";
  cuttingBoardPreview.insertAdjacentHTML("beforeend", htmlString);
}

function compareSandos() {
  let smallerSando =
    userSandwich.length < computerSandwich.length ? userSandwich : computerSandwich;
  for (let i = 1; i < smallerSando.length -1; i++) {
    if (computerSandwich[i] === userSandwich[i]) {
      points++;
    }
  }
}

function addRandomIngredient() {
  function getRandomNumber(min, max) {
    //random number generator (got it from google)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomNum = getRandomNumber(1, 8);
  let randomIngredient = ingredientsList[randomNum];
  let insertBeforeBread = computerSandwich.length - 1;
  computerSandwich.splice(insertBeforeBread, 0, randomIngredient);
}

function startShake() {
  cuttingBoardImage.classList.add("shake-effect");
  setTimeout(() => {
    stopShake();
  }, 500); // Shake for 0.5 seconds
}
function stopShake() {
  cuttingBoardImage.classList.remove("shake-effect");
}

function countDownTimer(){
  let sec = 59;
  let timer = setInterval(function() {
    displayTimer.innerHTML = `timer: 00:` +sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer)
      // console.log(points) // log
      popUpWindow.style.display = "";
      popUpTitle.textContent = "Time Over"
      pupUpMsgContent.innerHTML = `Your score is: ${points} </br> You got to level ${level - 1}` 
      startBtn.textContent = "Start Over"
      level = 1
    }
  }, 1000)
}

// event listeners -------------------------------------------------------------

startBtn.addEventListener("click", () =>{
  popUpWindow.style.display = "none";
  countDownTimer();
  clickAudio.play();
  render();
});

returnBtn.addEventListener("click", () => {
  clickAudio.play();  
  userSandwich.pop();
  updateCuttingBoardUI();
  console.log(userSandwich); // log
});

submitBtn.addEventListener("click", () => {
  clickAudio.play();
  if (userSandwich.length !== computerSandwich.length) {
    startShake();
  } else {
    compareSandos();
    // console.log(points); // log
    render();
  }
});

ingredientsBtn.forEach((button) => {
  initRipple(button);
  button.addEventListener("click", (event) => {
    // console.log(`This is the ${event.target.textContent} container`); // log
    const clickedIngredient = event.target.dataset.ingredient
    userSandwich.push(clickedIngredient);
    playAudio(clickedIngredient)
    updateCuttingBoardUI();
    console.log(userSandwich); // log
  });
});

function playAudio(ingredient) {
  // console.log(ingredient) // log
  const audio = new Audio(`./assets/final-audio/${ingredient.toLowerCase()}.mp3`)
  // console.log(audio) // log
  audio.play();
}

function initRipple(btn) {
  //button animation
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple_span = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    ripple_span.style.width = ripple_span.style.height = `${diameter}px`;
    ripple_span.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    ripple_span.style.top = `${e.clientY - rect.top - diameter / 2}px`;
    ripple_span.classList.add("ripple_span");
    btn.appendChild(ripple_span);
    setTimeout(() => ripple_span.remove(), 600);
  });
}

function render() {
  computerSandwich = ["Bread", "Bread"];
  userSandwich = [];
  for (let i = 1; i <= level + 2; i++) {
    addRandomIngredient();
  }
  displayLevel.innerHTML = `${level}`;
  level++;
  updateOrderUI();
  updateCuttingBoardUI();
  displayPoints.textContent = `points: ${points}`;
  console.log(computerSandwich)
}
