const gameBoard = document.querySelector('#gameBoard');
const canvasContext = gameBoard.getContext('2d');
const scoreDisplay = document.querySelector('#scoreDisplay');
const btnPlayAgain = document.querySelector('#btnPlayAgain');
const btnSpeed = document.querySelector('#btnSpeed');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodXCoordinate;
let foodYCoordinate;
let score = 0;
let snake = [
    {xCoordinate:unitSize * 4, yCoordinate:0},
    {xCoordinate:unitSize * 3, yCoordinate:0},
    {xCoordinate:unitSize * 2, yCoordinate:0},
    {xCoordinate:unitSize, yCoordinate:0},
    {xCoordinate:0, yCoordinate:0},
]


//-- Keyboard arrow keys function -- //
window.addEventListener('keydown', changeDirection);
btnPlayAgain.addEventListener('click', resetGame);

gameStart();


function gameStart() {
    running = true;
    scoreDisplay.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick(){
    if(running) {
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();    
        }, 200);
    }
    else {
        displayGameOver();
    }
}


function clearBoard(){
    canvasContext.fillStyle = boardBackground;
    canvasContext.fillRect(0, 0, gameWidth, gameHeight)
}


function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodXCoordinate = randomFood(0, gameWidth - unitSize);
    foodYCoordinate = randomFood(0, gameWidth - unitSize);
}


function drawFood(){
    canvasContext.fillStyle = foodColor;
    canvasContext.fillRect(foodXCoordinate, foodYCoordinate, unitSize, unitSize);
}


function moveSnake(){
    const head = {xCoordinate: snake[0].xCoordinate + xVelocity,
                  yCoordinate: snake[0].yCoordinate + yVelocity}

    //adds box to the beginning of the Snake Array
    snake.unshift(head);

    //check if food is eaten
    if (snake[0].xCoordinate == foodXCoordinate && snake[0].yCoordinate == foodYCoordinate){
        score+=1;
        scoreDisplay.textContent = score;
        createFood();
    }  
    else {
        snake.pop();
    }
}


function drawSnake(){
    canvasContext.fillStyle = snakeColor;
    canvasContext.strokeStyle = snakeBorder;
    snake.forEach(snakeMove => {
        canvasContext.fillRect(snakeMove.xCoordinate, snakeMove.yCoordinate, unitSize, unitSize)
        canvasContext.strokeRect(snakeMove.xCoordinate, snakeMove.yCoordinate, unitSize, unitSize)
    });
}


function changeDirection(event){
    const keyPressed = event.keyCode;
    const arrowLeft = 37;
    const arrowUp = 38;
    const arrowRight = 39;
    const arrowDown = 40;

    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingUp = (yVelocity == -unitSize);

    //prevent pressing opposite directions
    switch(true){
        case (keyPressed == arrowLeft && !goingRight) :
            xVelocity = -unitSize;
            yVelocity = 0;
            break;

        case (keyPressed == arrowRight && !goingLeft) :
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        
        case (keyPressed == arrowUp && !goingDown) :
            xVelocity = 0
            yVelocity = -unitSize;
            break;

        case (keyPressed == arrowDown && !goingUp) :
            xVelocity = 0;
            yVelocity = unitSize;
            break;
            
    }



}


function checkGameOver(){
    switch(true){
        //touches the walls
        case (snake[0].xCoordinate < 0) :
            running = false;
            break;

        case (snake[0].xCoordinate >= gameWidth) :
            running = false;
            break;

        case (snake[0].yCoordinate < 0) :
            running = false;
            break;

        case (snake[0].yCoordinate >= gameHeight) :
            running = false;
            break;
    }

    //touches the body of the snake
    for (let i = 1; i < snake.length; i+=1){
        if (snake[i].xCoordinate == snake[0].xCoordinate && snake[i].yCoordinate == snake[0].yCoordinate){
            running = false;
        }     
    }
}


function displayGameOver(){
    canvasContext.font = "50px MV Boli";
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    canvasContext.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
    running = false;
}


function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {xCoordinate:unitSize * 4, yCoordinate:0},
        {xCoordinate:unitSize * 3, yCoordinate:0},
        {xCoordinate:unitSize * 2, yCoordinate:0},
        {xCoordinate:unitSize, yCoordinate:0},
        {xCoordinate:0, yCoordinate:0},
    ];
    gameStart();
}




