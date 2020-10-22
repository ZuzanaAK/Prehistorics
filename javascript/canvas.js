// target body
let body = document.querySelector("body")
// target splash screen
let splashScreen = document.querySelector("#splash")
// create the canvas tag element
// createElement
let canvasContainer = document.createElement("div")
canvasContainer.innerHTML = `<canvas width="600" height="600"></canvas>`
// target button
let startBtn = document.querySelector("#start-btn")

//let ctx = canvasContainer.getContext("2d")

startBtn.addEventListener("click", () => {
    // remove the splash
    splashScreen.parentNode.removeChild(splashScreen)
    // insert the canvas
    body.appendChild(canvasContainer)
    canvas = document.querySelector("canvas")
    canvas.style.backgroundColor = "#FFC300"
    ctx = canvas.getContext("2d")

    renderGame()
})

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(updateCanvas)
}


let caveMan = ""
let caveManX = 250;
let caveManY = 450;
let caveManWidth = 120
let caveManXIncrement = 1

function drawCaveMan() {
    let caveMan = new Image()
    caveMan.src = "./resources/images/caveMan.png"
    ctx.drawImage(caveMan, caveManX, caveManY, caveManWidth, 130)
  }

function updateCanvas() {
    if (isRightArrow && (caveManX + caveManWidth < canvas.width) ) {
        caveManX += caveManXIncrement
    }
    else if (isLeftArrow && (caveManX > 0) ) {
        caveManX -= caveManXIncrement
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    drawCaveMan()
    requestAnimationFrame(updateCanvas)
  }

  let isRightArrow = false;
  let isLeftArrow = false;
  //conditions for pressing left and right (movement defined in the if statement in the startGame ())
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39 || event.key == 'ArrowRight' ) {
        isRightArrow = true;
        isLeftArrow = false;
      }

    else if (event.keyCode == 37 || event.key == 'ArrowLeft' ) {
        isRightArrow = false;
        isLeftArrow = true;
      }
    })
  //when right or left button is released, it is set back to false
  document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    })

  function carCollision() {
    //right
    if (caveManX > canvas.width - caveManWidth) {
        caveManXIncrement = -1
    }
    //left
    if (caveManX - caveManWidth < 0) {
        caveManXIncrement = 1
    }
  }
 
