const gameBoard = document.querySelector('#gameBoard');
const canvasContext = gameBoard.getContext('2d');
const scoreDisplay = document.querySelector('#scoreDisplay');
const btnPlayAgain = document.querySelector('#btnPlayAgain');
const btnSpeed = document.querySelector('#btnSpeed');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "darkgreen";
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
    {xCoordinate:0, yCoordinate:0}
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

function nextTick(){}


function clearBoard(){}


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


function moveSnake(){}


function drawSnake(){}


function changeDirection(){}


function checkGameOver(){}


function displayGameOver(){}


function resetGame(){}




