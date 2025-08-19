let userSandwich = [];
let computerSandwich = [];
// initialize a gloal variable to keep track of ingredient level
let level = 3;


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


const ingredientsBtn = document.querySelectorAll(".button");
const returnBtn = document.querySelector("button");
const cuttingBoardPreview = document.querySelector("#cutting-board");
const orderView = document.querySelector("#order");


function updateOrderUI() {
  let orderString = "";
  computerSandwich.forEach((ingredient) => {
    orderString += `<p>${ingredient}</p>`
  });
  orderView.innerHTML = "";
  orderView.insertAdjacentHTML("beforeend", orderString)
}

function updateIngredientsUI() {
  let htmlString = "";
  userSandwich.forEach((ingredient) => {
    htmlString += `<p>${ingredient}</p>`;
  });
  cuttingBoardPreview.innerHTML = "";
  cuttingBoardPreview.insertAdjacentHTML("beforeend", htmlString);
}


function addRandomIngredient() {
  function getRandomNumber(min, max) { //random number generator (got it from google)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomNum = getRandomNumber(1, 8);
  let getRandomIngredient = ingredientsList[randomNum];
  computerSandwich.push(getRandomIngredient);
}

function int() {
  for(let i = 0; i < level; i++) {
    addRandomIngredient();
  }
  level ++
  updateOrderUI();
}


returnBtn.addEventListener("click", (remove) => {
  userSandwich.pop();
  updateIngredientsUI();
  console.log(userSandwich); // log
});

ingredientsBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log(`This is the ${event.target.textContent} container`);
    userSandwich.push(event.target.textContent);
    updateIngredientsUI();
    console.log(userSandwich); // log
  });
});


int();
console.log(computerSandwich) // log