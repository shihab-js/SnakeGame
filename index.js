const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

//get the canvas element
const snakeboard = document.getElementById('snakeboard');
//return a two dimentional element
const snakeboard_ctx = snakeboard.getContext('2d');

//true if changing direction
let changing_direction = false;

document.addEventListener("keydown", change_direction);


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


//main function call repeatedly to keep the game running
function main() {
    if (has_game_ended()) return;
    changing_direction = false;
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

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    //prevent the snake from reversing
    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }

}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWal = snake[0].x > snakeboard.width - 10;
    const hitUpWall = snake[0].y < 0;
    const hitDownWall = snake[0].y > snakeboard.height - 10;

    return hitLeftWall || hitRightWal || hitUpWall || hitDownWall;

}