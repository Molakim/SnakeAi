const directionEnum = Object.freeze({"UP":1, "DOWN":2, "LEFT":3, "RIGHT":4, "PAUSE":5})
let snake;
const frameRate = 20;
let frameCounter = 0;
const speed = 1;
const size = 20;

function setup(){
  createCanvas(window.innerWidth/2, window.innerHeight/2);
  snake = new Snake();
}

function draw(){
  // snake.head.update();
  // snake.head.show();
  // snake.body.update();
  // snake.body.show();
  if (frameCounter <= frameRate ){
    frameCounter++;
  } else { // show every 20 framerate
    frameCounter = 0;
    background(0);
    snake.update();
    snake.show();
  }
  
}

function keyPressed (){
  frameCounter = 0;
  background(0);
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