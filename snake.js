const world = document.getElementById('world')
const pen = world.getContext('2d')

let tileSize = 20
let tileCount = world.width/tileSize

let velocity = {
    x: 0,
    y: 0,
}

let food = {
    x: 15,
    y: 15,
}

let snake = []
let snakeHead = {
    x: 10,
    y: 10,
}

let snakeTailCount = 1

function drawWorld () {
    pen.fillStyle = 'black'
    pen.fillRect(0, 0, world.width, world.height)
}

function drawSnake () {
    pen.fillStyle = 'darkgreen'
    for (let i = 0; i < snake.length; i++) {
        pen.fillRect( snake[i].x * tileSize, snake[i].y * tileSize, tileSize - 2, tileSize - 2)

        if (
            snake[i].x === snakeHead.x &&
            snake[i].y === snakeHead.y
        ){
            snakeTailCount = 1
        }
    }
}

function drawFood () {
    pen.fillStyle = 'darkred'
    pen.fillRect( food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2)
}

function updateSnakeHead () {
    snakeHead.x += velocity.x
    snakeHead.y += velocity.y

    if (snakeHead.x < 0) {
        snakeHead.x = tileCount - 1
    }

    if (snakeHead.x > tileCount - 1) {
        snakeHead.x = 0
    }

    if (snakeHead.y < 0) {
        snakeHead.y = tileCount - 1
    }

    if (snakeHead.y > tileCount - 1) {
        snakeHead.y = 0
    }
}

function updateSnakeBody () {
    snake.push({
        x: snakeHead.x,
        y: snakeHead.y
    })
    while (snake.length > snakeTailCount) {
        snake.shift()
    }
}

function eatFood () {
    if (
        food.x === snakeHead.x &&
        food.y === snakeHead.y
    ){
        snakeTailCount++

        food.x = Math.floor( Math.random()*tileCount)
        food.y = Math.floor( Math.random()*tileCount)
    }
}

const keyDownHandlers = {
    'ArrowLeft': ()=> {
        velocity.x = -1
        velocity.y = 0
    },
    'ArrowRight': ()=> {
        velocity.x = 1
        velocity.y = 0
    },
    'ArrowUp': ()=> {
        velocity.x = 0
        velocity.y = -1
    },
    'ArrowDown': ()=> {
        velocity.x = 0
        velocity.y = 1
    },
}

function onKeyDown (event) {
    if (keyDownHandlers.hasOwnProperty(event.key)){
        keyDownHandlers[event.key]()
    }
}

function updateGame () {
    updateSnakeHead()

    drawWorld()
    drawSnake()

    eatFood()
    drawFood()

    updateSnakeBody()
}

document.addEventListener('keydown', onKeyDown)
setInterval(updateGame, 500)