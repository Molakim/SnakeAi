const windW = 1280;
const windH = windW*9/16;
let headSprite;
let bodySprite;
const directionEnum = Object.freeze({"UP":1, "DOWN":-1, "RIGHT":2, "LEFT":-2, "PAUSE":5})
// let snake;
const SNAKE_LENGTH = 3;
const POPULATION_SIZE = 1000;

const frameRate = 1;
let frameCounter = 0;
// let speed = 1;
const size = 40;


//-------------------------------------------------------------------------------- neat globalsb

var nextConnectionNo = 1000;
var population;
var speed = 60;

var superSpeed = 1;
var showBest = true; //true if only show the best of the previous generation
var runBest = false; //true if replaying the best ever game
var humanPlaying = false; //true if the user is playing

var humanPlayer;


var showBrain = false;
var showBestEachGen = false;
var upToGen = 0;
var genPlayerTemp; //player

var showNothing = false;

function preload() {
  headSprite = loadImage("img/headAngry.png");
  bodySprite = loadImage("img/bodyAngry.png");
}



function setup(){
  createCanvas(windW, windH);
  // snake = new Snake();
  // fruit = new Fruit();
  population = new Population(POPULATION_SIZE);

}

function draw(){
  if (frameCounter <= frameRate ){
    frameCounter++;
  } else {
    frameCounter = 0;
    drawToScreen();

    // fruit.update();
    // snake.update();
    // fruit.show();
    // snake.show();

    if (runBest) { // if replaying the best ever game
      showBestEverPlayer();
    } else { //if just evolving normally
     if (!population.done()) { //if any players are alive then update them
        population.updateAlive();
      } else { //all dead
        //genetic algorithm
        population.naturalSelection();
      }
    }

  }
  
}

function drawToScreen () {
  if (!showNothing) {
    //pretty stuff
    background(0);
    // showAll();
    // updateAll();
    drawBrain();
  }
}

function drawBrain() { //show the brain of whatever genome is currently showing
  var startX = 350; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  var startY = 550;
  var w = 300;
  var h = 200;

  if (runBest) {
    population.bestPlayer.brain.drawGenome(startX, startY, w, h);
  } else
  if (humanPlaying) {
    showBrain = false;
  } else if (showBestEachGen) {
    genPlayerTemp.brain.drawGenome(startX, startY, w, h);
  } else {
    population.players[0].brain.drawGenome(startX, startY, w, h);
  }
}


function showBestEverPlayer() {
  if (!population.bestPlayer.dead) { //if best player is not dead
    population.bestPlayer.look();
    population.bestPlayer.think();
    population.bestPlayer.update();
    population.bestPlayer.show();
  } else { //once dead
    runBest = false; //stop replaying it
    population.bestPlayer = population.bestPlayer.cloneForReplay(); //reset the best player so it can play again
  }
}


function keyPressed (){
  frameCounter = frameRate;
  switch (key){
    case ' ':
      snake.changeDirection(directionEnum.PAUSE);
      break;
    case 'B':
      runBest = !runBest;
      break;
    case 'N': //show absolutely nothing in order to speed up computation
      showNothing = !showNothing;
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