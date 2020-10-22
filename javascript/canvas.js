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

//..............images...............//
let caveMan = new Image()
caveMan.src = "./resources/images/caveMan.png"

let rock = new Image()
rock.src = "./resources/images/rock.png"

//..............audio...............//
//add sounds later

//..............variables...............//
let caveManX = 250;
let caveManY = 450;
let caveManWidth = 120;
let caveManHeight = 130;
let caveManXIncrement = 8;

let isRightArrow = false;
let isLeftArrow = false;

let score = 0;
let winScore = 10;

let rocks = [ { x: 600, y: 150 } ];
let rockX = rocks.x;
let rockY = rocks.y;
let rockWidth = 50;

let rockYincrement = 2;
let rockXincrement = 5;
let rockYincrementMore = 4;60

let totalRocks = 10;







function drawCaveMan() {
    ctx.drawImage(caveMan, caveManX, caveManY, caveManWidth, caveManHeight)
  }

//..............move caveMan to left and right...............//
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
    drawRock()
    addRocks()
    moveRocks()

    ctx.font = '22px Verdana'
    ctx.fillStyle = "white"
    ctx.fillText('Score: ' + score, 250, 50)

  }

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
 
  document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    })

//..............caveMan left and right colision...............//  
  function caveManCollision() {
    //right
    if (caveManX > canvas.width - caveManWidth) {
        caveManXIncrement = -1
    }
    //left
    if (caveManX - caveManWidth < 0) {
        caveManXIncrement = 1
    }
  }

//..............draw the rock...............// 

  function drawRock() {
 
    for (let i = 0; i < rocks.length; i++) { 
        ctx.drawImage(rock, rocks[i].x, rocks[i].y);
        //collisionRocks(i);
        }
    }
//..............rock colision...............// 

    const collisionRocks = (i) => {
    
        if (caveManX < rocks[i].x + rock.width &&
            caveManX + caveMan.width >= rocks[i].x &&
            caveManY < rocks[i].y + caveMan.height &&
            caveManY + caveMan.height > rocks[i].y) 
            {
            clearInterval(intervalId);
            gameOver();
        } 
    } 

    //..............add rocks...............// 

    const addRocks = () => {
        if (score < 8) {
            let randomPossibility = Math.floor(Math.random() * 190) 
            //randomPlace = place on x axis
            let randomPlace = Math.floor(Math.random() * (canvas.width  - 30))
            if(randomPossibility === 1){
                var rock = {
                    x: randomPlace,
                    y: 10
                }
                    rocks.push(rock);
            } 
        } else {
            let randomPossibility = Math.floor(Math.random() * 60) 
            let randomPlace = Math.floor(Math.random() * (canvas.width  - 30))
            if(randomPossibility === 1){
                var rock = {
                    x: randomPlace,
                    y: 10
                }
                    rocks.push(rock);
            } 
        }
    }


    //..............move rocks...............// 

    const moveRocks = () => {
        rocks.forEach((rocks) => {
            if (score <= 4) {
                rocks.y++
            } else if (score > 4 && score <= 8 ) {
                rocks.y += rockYincrement
            } else {
                rocks.y += rockYincrementMore
            }
        })
    }

    const gameOver = () => {
        let canvas = document.querySelector("canvas")
        canvas.clasName = "hidden"

        let gameOverScreen = document.createElement("div")
        gameOverScreen.innerHTML =`

            <button id="start-btn" onclick="location.href='index.html'"><span id="play">PLAY ONCE MORE!</span></button>
        `
        let body = document.querySelector("body")
        canvas.parentNode.removeChild(canvas)
        body.appendChild(gameOverScreen)
    }