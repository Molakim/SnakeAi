const windW = window.outerWidth;
const windH = windW*18/32;

const directionEnum = Object.freeze({"UP":1, "DOWN":2, "LEFT":3, "RIGHT":4, "PAUSE":5})
let snake;
let fruit;
let snakeLength = 3;
const frameRate = 5;
let frameCounter = 0;
let speed = 1;
const size = windW/32;

function setup(){
  createCanvas(windW, windH);
  snake = new Snake();
  fruit = new Fruit();
}

function draw(){
  if (frameCounter <= frameRate ){
    frameCounter++;
  } else {
    frameCounter = 0;
    background(0);
    fruit.update();
    snake.update();
    fruit.show();
    snake.show();

  }
  
}

function keyPressed (){
  frameCounter = frameRate;
  switch (key){
    case ' ':
      snake.changeDirection(directionEnum.PAUSE);
      break;
  }

  switch (keyCode) {
    case UP_ARROW:
      snake.changeDirection(directionEnum.UP);
      break;
    case DOWN_ARROW:
      snake.changeDirection(directionEnum.DOWN);
      break;
    case LEFT_ARROW:
      snake.changeDirection(directionEnum.LEFT);
      break;
    case RIGHT_ARROW:
      snake.changeDirection(directionEnum.RIGHT);
      break;
  }
}