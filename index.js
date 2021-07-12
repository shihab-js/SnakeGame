const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

//get the canvas element
const snakeboard = document.getElementById('myCanvas');
//return a two dimentional element
const snakeboard_ctx = snakeboard.getContext('2d');

let snake = [
    { x: 200, y: 200},
    { x: 190, y: 200},
    { x: 180, y: 200},
    { x: 170, y: 200},
    { x: 160, y: 200}
];

//horizontal velocity
let dx = 10;
//vertical velocity
let dy = 0;


//start game
main();

function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawSnake();
        moveSnake();
        main();
    }, 100);
}


//draw a border around the canvas
function clearCanvas() {
    //select the color to fill the canvas
    snakeboard_ctx.fillStyle = board_background;
    //select the color to fill the border of the canvas
    snakeboard_ctx.strokeStyle = board_border;
    //draw a fill rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    //draw the border of the canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

//draw the snake part
function drawSnakePart(snakePart)
{
    //select the color to fill the drawing
    snakeboard_ctx.fillStyle = 'lightblue';
    //select the color to fill the border of the snake
    snakeboard_ctx.strokeStyle = 'darkblue';
    //draw a fill rectangle to cover the entire snake
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    //draw the border of the snake
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
//draw the snake on the canvas
function drawSnake() {
    //draw each part
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    //create the new snake head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    //add new head to the beginning of the snake body
    snake.unshift(head);
    snake.pop();
}