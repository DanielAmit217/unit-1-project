// variables
let userSandwich = [];
let computerSandwich = [];
let level = 3;
let points = 0;

// items
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

// cached elements
const ingredientsBtn = document.querySelectorAll(".button");
const cuttingBoardPreview = document.querySelector("#cutting-board");
const orderView = document.querySelector("#order");
const returnBtn = document.querySelector("#return-button");
const submitBtn = document.querySelector("#submit-button");
// const displayLevel = document.querySelector("#")

// functions
function updateOrderUI() {
  let orderString = "";
  computerSandwich.forEach((ingredient) => {
    orderString += `<p>${ingredient}</p>`;
  });
  orderView.innerHTML = "";
  orderView.insertAdjacentHTML("beforeend", orderString);
}

function updateCuttingBoardUI() {
  let htmlString = "";
  userSandwich.forEach((ingredient) => {
    htmlString += `<p>${ingredient}</p>`;
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
  console.log(points);
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
  let getRandomIngredient = ingredientsList[randomNum];
  computerSandwich.push(getRandomIngredient);
}

// event listeners
returnBtn.addEventListener("click", () => {
  userSandwich.pop();
  updateCuttingBoardUI();
  console.log(userSandwich); // log
});

submitBtn.addEventListener("click", () => {
  compareSandos();
  // console.log(points); // log
  render();
});

ingredientsBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log(`This is the ${event.target.textContent} container`);
    userSandwich.push(event.target.textContent);
    updateCuttingBoardUI();
    console.log(userSandwich); // log
  });
});

function render() {
  computerSandwich = [];
  userSandwich = [];
  for (let i = 1; i <= level; i++) {
    addRandomIngredient();
  }
  level++;
  updateOrderUI();
  updateCuttingBoardUI();
}

function init() {
  render();
}

init();
