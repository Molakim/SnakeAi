const windW = 640;
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
var showBest = false; //true if only show the best of the previous generation
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
  createCanvas(windW*2+440, windH*2+160);
  // snake = new Snake();
  // fruit = new Fruit();
  population = new Population(POPULATION_SIZE);

}

function draw(){
  // if (frameCounter <= frameRate ){
  //   frameCounter++;
  // } else {
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

  // }
  if (showNothing) {background(0)}
  drawBrain();
  writeInfo();
  
}

function drawToScreen () {
  if (!showNothing) {
    //pretty stuff
    background(0);
    // showAll();
    // updateAll();
  }
}

function drawBrain() { //show the brain of whatever genome is currently showing
  var startX = 1000; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  var startY = 200;
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

function writeInfo() {
  fill(255);
  stroke(255);
  textAlign(LEFT);
  textSize(30);
  textSize(50);
  textAlign(CENTER);
  if (showBestEachGen) {
    text(genPlayerTemp.score, (windW+360) / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textAlign(LEFT);
    textSize(30);

    text("Gen: " + (genPlayerTemp.gen + 1), 20, 50);
  } else if (humanPlaying) {
    text(humanPlayer.score, (windW+360) / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  } else if (runBest) {
    text(population.bestPlayer.score, windW + 180, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textSize(30);

    textAlign(LEFT);
    text("Gen: " + population.gen, 20, 50);
  } else if (showBest) {
    text(population.players[0].score, (windW+360) / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textAlign(LEFT);
    textSize(30);
    text("Gen: " + population.gen, 20, 50);

  } else {
    let bestCurrentPlayer = population.getCurrentBest();

    text(bestCurrentPlayer.score.toFixed(2), (windW+360) / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textSize(30);
    textAlign(LEFT);

    text("Gen: " + population.gen, 20, 50);

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