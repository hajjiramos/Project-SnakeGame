const canvas = document.querySelector('#canvas');
const canvasContext = canvas.getContext('2d');
const square = 25;
let xAxis = square;
let yAxis = 0;
let foodXCoordinate;
let foodYCoordinate;
let snake = [
    {xCoordinate: 50, yCoordinate: 0},
    {xCoordinate: 25, yCoordinate: 0},
    {xCoordinate: 0, yCoordinate: 0}
]
let move = false;
let score = 0;
let speed = 200;

//--Function Game Front Page Display --//

function frontPageDisplay(){
    let img = document.getElementById('snake');
    canvasContext.drawImage(img, 130, 10, 250, 480)
    canvasContext.fillStyle = "black";
    canvasContext.font = "10px san-serif";
    canvasContext.fillText("https://www.freepik.com/free-photos-vectors/snake-clipart", 265, 498);
    img.remove();

    canvasContext.fillStyle = "darkgreen";
    canvasContext.textAlign = "center";
    canvasContext.font = "150px MyFault";
    canvasContext.fillText("Snake", canvas.width/2, 230);
    canvasContext.fillText("Game", canvas.width/2, 370);
    
}
frontPageDisplay();


//-- Function Game Start and enter player name--//

const scoreDisplay = document.querySelector('#scoreDisplay');
const btnPlay = document.querySelector('#btnPlay');
    document.querySelector('#btnTryAgain').disabled = true;
    btnPlay.addEventListener('click', enterName); 


function enterName() {
    let name = prompt ("Please Enter your Name:");
    const displayName = document.querySelector('.name');
        
    if (name != null && name !="") {
        displayName.textContent = name;
        game();  
    }
    else {
        window.location.reload();
    }
}

function game() {
    move = true;
    scoreDisplay.textContent = score; 
    document.querySelector('#btnTryAgain').disabled = false;
    startTimer();
    drawFood();
    foodDisplay();
    snakeMoving();
    }


//-- Function calling functions while snake is moving --//

function snakeMoving(){
    if(move) {
        setTimeout(()=>{
            clearCanvas();
            foodDisplay();
            moveSnake();
            drawSnake();
            gameOver();
            snakeMoving();    
        }, speed);
    }
    else {
        gameOverDisplay();
    }
}

//-- Function to clear canvas every game --//

function clearCanvas(){
    canvasContext.fillStyle = "lightgray";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}


//--Function to Draw Food in random locations--//
function drawFood(){
    function randomFood(min, max){
        const randNum= Math.round((Math.random() * (max - min) + min) / square) * square;
        return randNum;
    }
    foodXCoordinate = randomFood(0, canvas.width - square);
    foodYCoordinate = randomFood(0, canvas.width - square);
}


//-- Function to display the food --//

function foodDisplay(){
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(foodXCoordinate, foodYCoordinate, square, square);
}

//-- Function to make the snake move and eat the food --//
function moveSnake(){
    const head = {xCoordinate: snake[0].xCoordinate + xAxis,
                  yCoordinate: snake[0].yCoordinate + yAxis}

    //adds box to the beginning of the Snake Array
    snake.unshift(head);
   
    //check if food is eaten
    if (snake[0].xCoordinate == foodXCoordinate && snake[0].yCoordinate == foodYCoordinate){
        score +=1;
        speed -=3;
        scoreDisplay.innerHTML = score;
        drawFood();
    }  
    else {
        snake.pop();
    }
}

//-- Function to draw the snake starting at the firstCoordinate --//
function drawSnake(){
    canvasContext.fillStyle = 'lightgreen';
    canvasContext.strokeStyle = "black";
    snake.forEach(snakeMove => {
        canvasContext.fillRect(snakeMove.xCoordinate, snakeMove.yCoordinate, square, square)
        canvasContext.strokeRect(snakeMove.xCoordinate, snakeMove.yCoordinate, square, square)
    });
}


//-- Function keypressing the Keyboard arrow keys -- //

window.addEventListener('keydown', arrowKeys);
function arrowKeys(event){
    const keyPressed = event.keyCode;
    const arrowUp = 38;
    const arrowDown = 40;
    const arrowRight = 39;
    const arrowLeft = 37;
    
    const goingUp = (yAxis == -square);
    const goingDown = (yAxis == square);
    const goingRight = (xAxis == square);
    const goingLeft = (xAxis == -square);
    
    //prevent pressing opposite directions
    switch(true){
        case (keyPressed == arrowLeft && !goingRight) :
            xAxis = -square;
            yAxis = 0;
            break;

        case (keyPressed == arrowRight && !goingLeft) :
            xAxis = square;
            yAxis = 0;
            break;
        
        case (keyPressed == arrowUp && !goingDown) :
            xAxis = 0
            yAxis = -square;
            break;

        case (keyPressed == arrowDown && !goingUp) :
            xAxis = 0;
            yAxis = square;
            break;    
    }

}


//-- Function Game Over --//

function gameOver(){
    switch(true){
        //touches the walls
        case (snake[0].xCoordinate < 0) :
            move = false;
            break;

        case (snake[0].xCoordinate >= canvas.width) :
            move = false;
            break;

        case (snake[0].yCoordinate < 0) :
            move = false;
            break;

        case (snake[0].yCoordinate >= canvas.height) :
            move = false;
            break;
    }

    //touches the body of the snake
    for (let i = 1; i < snake.length; i+=1){
        if (snake[i].xCoordinate == snake[0].xCoordinate && snake[i].yCoordinate == snake[0].yCoordinate){
            move = false;
        }     
    }
}


//--Function Display Game Over --//

function gameOverDisplay(){
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "blue";
    canvasContext.font = "150px Hansa";
    canvasContext.fillText("Game Over!", canvas.width/2, canvas.height/2);
    document.querySelector('#btnPlay').disabled=true;
    move = false;
    stopTimer();
}




//-- Function Try Again Game --//

const btnTryAgain = document.querySelector('#btnTryAgain');
btnTryAgain.addEventListener('click', tryAgain);
function tryAgain(){
    score = 0;
    speed = 200;
    xAxis = square;
    yAxis = 0;
    snake = [
        {xCoordinate: 50, yCoordinate: 0},
        {xCoordinate: 25, yCoordinate: 0},
        {xCoordinate: 0, yCoordinate: 0}
    ];
    game();
    resetTimer();
}



//-- Functions Display Time Interval every seconds and minutes --//

const timerDisplay = document.querySelector('#timerDisplay')
let [minute, second] = [0,0];
let time = null;
scoreDisplay.innerHTML = 0;
timerDisplay.innerHTML = "00:00";

function timer() {
    second++;
    if (second == 60){
        second = 0;
        minute++;
    }
    let min = minute < 10 ? "0" + minute : minute;
    let sec = second < 10 ? "0" + second : second;

    timerDisplay.innerHTML = min +":"+ sec;
}


function startTimer() {
    if (time !== null) {
        clearInterval(time);
    }
    time = setInterval(timer,1000);
}


function stopTimer() {
    clearInterval(time);
}


function resetTimer() {
    clearInterval(time);
    [minute, second] = [0,0];
    timerDisplay.innerHTML = "00:00";
    startTimer();
}

   
 