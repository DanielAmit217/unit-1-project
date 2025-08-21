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

// functions -------------------------------------------------------------

function updateOrderUI() {
  //
  let orderString = "";
  computerSandwich.forEach((ingredient) => {
    orderString += `<span>${ingredient}</span>`;
  });
  orderView.innerHTML = "";
  orderView.insertAdjacentHTML("beforeend", orderString);
}

function updateCuttingBoardUI() {
  //
  let htmlString = "";
  userSandwich.forEach((ingredient) => {
    htmlString += `<span>${ingredient}</span>`;
  });
  cuttingBoardPreview.innerHTML = "";
  cuttingBoardPreview.insertAdjacentHTML("beforeend", htmlString);
}

function compareSandos() {
  // user > comp
  // user < comp
  // user == comp
  let smallerSando =
    userSandwich.length < computerSandwich.length
      ? userSandwich
      : computerSandwich;
  for (let i = 0; i < smallerSando.length; i++) {
    if (computerSandwich[i] === userSandwich[i]) {
      // Implement a pointCalculator(pointsObj) function that you pass raw points to
      // pointsCalculator({comp: 2, user: 3})
      points++;
    }
  }
  // console.log(points); // log
  // Clear userSandwich board
  // Rerender computer sandwich board
  // Reset timer
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
  computerSandwich.push(randomIngredient);
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

// event listeners -------------------------------------------------------------
returnBtn.addEventListener("click", () => {
  userSandwich.pop();
  updateCuttingBoardUI();
  console.log(userSandwich); // log
});

submitBtn.addEventListener("click", () => {
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
    // console.log(`This is the ${event.target.textContent} container`);
    userSandwich.push(event.target.dataset.ingredient);
    updateCuttingBoardUI();
    console.log(userSandwich); // log
  });
});

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
  computerSandwich = [];
  userSandwich = [];
  for (let i = 1; i <= level + 2; i++) {
    addRandomIngredient();
  }
  displayLevel.innerHTML = `${level}`;
  level++;
  updateOrderUI();
  updateCuttingBoardUI();
  displayPoints.textContent = `points: ${points}`;
}

function init() {
  render();
}

init();
