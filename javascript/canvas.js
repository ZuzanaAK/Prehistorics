//..............creating the canvas...............//
let body = document.querySelector("body")
let splashScreen = document.querySelector("#splash")
let canvasContainer = document.createElement("div")
canvasContainer.innerHTML = `<canvas width="600" height="600"></canvas>`
let startBtn = document.querySelector("#start-btn")

//let ctx = canvasContainer.getContext("2d")

startBtn.addEventListener("click", () => {
    splashScreen.parentNode.removeChild(splashScreen)
    body.appendChild(canvasContainer)
    canvas = document.querySelector("canvas")
    canvas.style.backgroundColor = "#FFC300"
    ctx = canvas.getContext("2d")

    renderGame()
})

//..............render game...............//

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    updateCanvas();
}

//..............images...............//

let caveMan = new Image()
caveMan.src = "./resources/images/caveMan.png"

let rock = new Image()
rock.src = "./resources/images/rock.png"

let mammut = new Image ()
mammut.src = "./resources/images/mammut.png"

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
let intervalId = 0; 

let rocks = [ { x: 500, y: 150 } ];
let rockX = rocks.x;
let rockY = rocks.y;
let rockWidth = 50;
let rockHeight = 50;

let rockYincrement = 2;
let rockXincrement = 4;
let rockYincrementMore = 5;

let mammuts = [];
let mammutX = 300;
let mammutY = 150;
let mammutWidth = 50;
let mammutHeight = 50;

let rocksYincrement = 3;
let rocksXincrement = 5;
let rocksYincrementMore = 5;

touchedMammut = [];


//..............draw caveMan...............//

const drawCaveMan = () => {
    ctx.drawImage(caveMan, caveManX, caveManY, caveManWidth, caveManHeight)
  }

//..............move caveMan to left and right...............//

updateCanvas = () => {
    if (isRightArrow && (caveManX + caveManWidth < canvas.width) ) {
        caveManX += caveManXIncrement
    }
    else if (isLeftArrow && (caveManX > 0) ) {
        caveManX -= caveManXIncrement
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    drawCaveMan()
    drawRock()
    addRocks()
    moveRocks()
    drawMammut()
    addMammut()
    moveMammut() 
    collisionRocks()
    collisionMammuts()


    ctx.font = '22px Verdana'
    ctx.fillStyle = "white"
    ctx.fillText('Score: ' + score, 250, 50)

    requestAnimationFrame(updateCanvas)
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
  const caveManCollision = () => {
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

  const drawRock = () => {

    for (let i = 0; i < rocks.length; i++) { 
        ctx.drawImage(rock, rocks[i].x, rocks[i].y);

    }
  }

//..............draw the mammut...............// 

    const drawMammut = () => {
        
    for (let i = 0; i < mammuts.length; i++) { 
        if (mammuts[i]!== null) {

        ctx.drawImage(mammut, mammuts[i].x, mammuts[i].y);
        }
    }
}
    
//..............rock colision...............// 

    const collisionRocks = () => {
        
        for (let i = 0; i < rocks.length; i++) { 
            if (caveManX < (rocks[i].x) + rockWidth &&
                caveManX + caveManWidth > (rocks[i].x) &&
                caveManY < (rocks[i].y) + rockHeight &&
                caveManY + caveManHeight > (rocks[i].y)) 
                {   
                   //?clearInterval(intervalId);                
                    gameOver();
                }
        }
    } 

//..............mammut colision...............//

    const collisionMammuts = (i) => {

        for (let i = 0; i < mammuts.length; i++) {
            if (caveManX < mammuts[i].x + mammutWidth &&
                caveManX + caveManWidth >= mammuts[i].x &&
                caveManY < mammuts[i].y + mammutHeight &&
                caveManY + caveManHeight > mammuts[i].y) 
                {
                
                if (!touchedMammut.includes(i)) {    
                    score++
                    touchedMammut.push(i)
                
                if (score === 10) {
                    winGame()
                }
                // I need to get rid of the picture ones it touches caveman
               // mammuts[i] = null
                } 
            } 
        } 
    }
//..............add rocks...............// 

    const addRocks = () => {
        if (score < 8) {
            let randomPossibility = Math.floor(Math.random() * 190) 
            let randomPlace = Math.floor(Math.random() * (canvas.width  - 40))
            if (randomPossibility === 1) {
                var rock = {
                    x: randomPlace,
                    y: 10
                }
                    rocks.push(rock)}
             
            } else {
                let randomPossibility = Math.floor(Math.random() * 60) 
                let randomPlace = Math.floor(Math.random() * (canvas.width  - 40))

            if (randomPossibility === 1) {
                var rock = {
                    x: randomPlace,
                    y: 10
                }
                    rocks.push(rock);
            } 
        }
    }

//..............add mammuts...............// 

    const addMammut = () => {
        let randomPossibility = Math.floor(Math.random() * 180) 
        let randomPlace = Math.floor(Math.random() * (canvas.width - 30))
            if(randomPossibility === 1){
                var mammut = {
                    x: randomPlace,
                    y: 10
                }

            mammuts.push(mammut);
        } 
    }


//..............move rocks and level it up...............// 

    const moveRocks = () => {
        rocks.forEach((rock) => {
            if (rock !== null) {
                rocks.y++}
                        
            if (score <= 3) {
                rock.y++
            } else if (score > 3 && score <= 7 ) {
                rock.y += rocksYincrement
            } else {
                rock.y += rocksYincrementMore
            }   
        })
    }

//..............move mammuts and level it up...............//    

    const moveMammut = () => {
        mammuts.forEach((mammuts) => {
            if (mammuts !== null) {
                mammuts.y++
            }
        })
    }
 //..............game-over screen...............// 

    const gameOver = () => {
        let canvas = document.querySelector("canvas")
        canvas.className = "hidden"

        let gameOverScreen = document.createElement("div")
        gameOverScreen.innerHTML =`
        <body id="body">
        <div id="splash">
        <section class="content" id="margin">
            <h2>Bummer, you lost!</h2>
            <h5>- no man, caveman included, can survive being hit by such a rock! -</h5>
            <p>- don't give up and try again -</p>
            <button id="start-btn" id="button" onclick="location.href='index.html'"><span id="play">PLAY ONCE MORE!</span></button>
        </section>
        </div>
        </body>
        `
        let body = document.querySelector("body")
        canvas.parentNode.removeChild(canvas)
        body.appendChild(gameOverScreen)
    }

 //..............winning screen...............//     

    const winGame = () => {
        let canvas = document.querySelector("canvas")
        canvas.clasName = "hidden"

        let winGame = document.createElement("div")
        winGame.innerHTML = `
            <body id="body">
            <div id="splash">
            <section class="content" id="margin">
                <h2>Congratulations, YOU WON!</h2>
                <h5>- all the mammuts have been caught and are ready to be brought to your cave -</h5>
                <p>- good job! -</p>
                <button id="start-btn" id="button" onclick="location.href='index.html'"><span id="play">PLAY ONCE MORE!</span></button>
            </section>
            </div>
            </body>
            `
        let body = document.querySelector("body")
        canvas.parentNode.removeChild(canvas)
        body.appendChild(winGame)
    }