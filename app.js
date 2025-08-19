let userSandwich = []



const ingredientsBtn = document.querySelectorAll(".button");
const returnBtn = document.querySelector("button")
const cuttingBoardPreview = document.querySelector("#cutting-board")

function updateIngredientsUI () {
  let htmlString = ""

  // userSandwich = ["cheese", "Bread", "tomato"]
  userSandwich.forEach((ingredient) => {
    htmlString += `<p>${ingredient}</p>`
  })

  cuttingBoardPreview.innerHTML = ""

  cuttingBoardPreview.insertAdjacentHTML("beforeend", htmlString)
}


returnBtn.addEventListener("click", remove => {
    userSandwich.pop()
    updateIngredientsUI()
    console.log(userSandwich)
})

ingredientsBtn.forEach((button) => {
  button.addEventListener("click", event => {
    console.log(`This is the ${event.target.textContent} container`)
    userSandwich.push(event.target.textContent)
    // cuttingBoardPreview.textContent += event.target.textContent
    updateIngredientsUI()
     console.log(userSandwich)
    });
  });
  