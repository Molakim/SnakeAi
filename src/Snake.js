class Snake {
  constructor (){
    this.fruit = new Fruit(true, null, directionEnum.PAUSE, true);
    this.head = new Element(true, null, directionEnum.RIGHT, false, this.fruit);
    this.snakeLength = SNAKE_LENGTH;
    this.body = [];
    this.body.push(this.head);
    for (let i = 1; i<this.snakeLength; i++){
      this.body.push(new Element(false, this.body[i-1]))
    }
    this.tail = this.body[this.snakeLength - 1];
    this.head.setBody(this.body);
    this.directionChangeCount = 0;
    
    //-----------------------------------------------------------------------
    //neat stuff
    this.fitness = 0;
    this.vision = []; //the input array fed into the neuralNet
    this.decision = []; //the out put of the NN
    this.unadjustedFitness;
    this.lifespan = 0; //how long the player lived for this.fitness
    this.leftToLive = 100; //how long the player lived for this.fitness
    this.bestScore = 0; //stores the this.score achieved used for replay
    this.dead = false;
    this.score = 0;
    this.gen = 0;

    this.genomeInputs = 9;
    this.genomeOutputs = 4;
    this.brain = new Genome(this.genomeInputs, this.genomeOutputs);
  }

  update() {

    if(!this.dead) {
      this.lifespan ++;
      this.leftToLive --;
    }
    if (this.head.detectFruit()){
      // If there is a fruit infront
      this.gainLength();
      this.fruit = new Fruit(true, null, directionEnum.PAUSE, true);
      this.head.setFruit(this.fruit);
    };
    if (this.head.detectBody()){
      // If there is a part of body infront
      this.tail.changeDirection(directionEnum.PAUSE);
      this.dead = true;
    }
    if (this.leftToLive === 0 ) {
      this.dead = true;
    }
    this.tail.update();
    this.fruit.update();
  }

  show() {
    if( this.directionChangeCount / this.lifespan < 1/30) {
      this.dead = true;
      this.lifespan *= 2;
      this.score = 0;
      // console.log("SUPPRESSION");
    } else {
      // console.log(this.directionChangeCount / this.lifespan)
    }
    

    if(!this.dead) {
      this.tail.show();
      this.fruit.show();
    }
  }

  changeDirection(direction){
    this.tail.changeDirection(direction);
    this.tail.show();
    this.fruit.show();    
  }

  gainLength(){

      this.snakeLength++;
      this.score ++;
      this.leftToLive += 200;
      this.body.push(new Element(false, this.tail));
      this.tail = this.body[this.snakeLength - 1];
  }

  randomDirection(){
    let randNum = round(Math.random()*3);
    switch (randNum){
      case 0:
        return directionEnum.UP;
      case 1:
        return directionEnum.DOWN;
      case 2:
        return directionEnum.LEFT;
      case 3:
        return directionEnum.RIGHT;
    }
  }


  lookInDirection(direction){
    let temp = size;
    let res = [];

    let positionX = this.head.x;
    let positionY = this.head.y;

    let fruitDetected = false;
    let bodyDetected = false;

    let moveCounter;
    let distance;

    if((Math.abs(direction) % 2 ===  1)){
      moveCounter = 18;
    } else {
      moveCounter = 32;
    }


    switch (direction){ // calculate next position
      case directionEnum.UP:
        if (positionY - temp < 0){
          // reached the top screen
          positionY = windH;
        } else {
          positionY -= temp;
        }
        break;
      case directionEnum.DOWN:
        if (positionY + temp > windH){
          // reached the bottom screen
          positionY = 0;
        } else {
          positionY += temp;
        }
        break;
      case directionEnum.LEFT:
        if (positionX - temp < 0){
          // reached the left screen
          positionX = windW;
        } else {
          positionX -= temp;
        }
        break;
      case directionEnum.RIGHT:
        if (positionX + temp > windW){
          // reached the right screen
          positionX = 0;
        } else {
          positionX += temp;
        }
        break;
    }

    for (let i = 1; i<this.snakeLength; i++){
      if(this.body[i].x === positionX && this.body[i].y === positionY){
        bodyDetected = true;
        res.push(1/i);
        break;
      }
    }
    if (!bodyDetected) res.push(0);

    while(moveCounter !== 0){


      if((this.fruit.elem.x === positionX) && (this.fruit.elem.y === positionY)){
          fruitDetected = true;
          res.push(1);
          break;
      }

      switch (direction){ // calculate next position
        case directionEnum.UP:
          if (positionY - temp < 0){
            // reached the top screen
            positionY = windH;
          } else {
            positionY -= temp;
          }
          break;
        case directionEnum.DOWN:
          if (positionY + temp > windH){
            // reached the bottom screen
            positionY = 0;
          } else {
            positionY += temp;
          }
          break;
        case directionEnum.LEFT:
          if (positionX - temp < 0){
            // reached the left screen
            positionX = windW;
          } else {
            positionX -= temp;
          }
          break;
        case directionEnum.RIGHT:
          if (positionX + temp > windW){
            // reached the right screen
            positionX = 0;
          } else {
            positionX += temp;
          }
          break;
      }

      moveCounter--;
      distance++;
    } 

    if(!fruitDetected) res.push(0);

    return res;
    
  }


  //-------------------------------------------------------------------neat functions
  look() {
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    this.vision = [];
    let absDirection = Math.abs(this.head.direction);


    let tempValues = this.lookInDirection(this.head.direction);
    this.vision.push(tempValues[0]);
    this.vision.push(tempValues[1]);

    tempValues = this.lookInDirection(absDirection > 1 ? absDirection/2 : absDirection*2);
    this.vision.push(tempValues[0]);
    this.vision.push(tempValues[1]);

    tempValues = this.lookInDirection(absDirection > 1 ? -absDirection/2 : -absDirection*2);
    this.vision.push(tempValues[0]);
    this.vision.push(tempValues[1]);
    
    this.vision.push(map(this.fruit.elem.x, 0, windW, 0, 1));
    this.vision.push(map(this.fruit.elem.y, 0, windH, 0, 1));


  }


  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //gets the output of the this.brain then converts them to actions
  think() {

      let max = 0;
      let maxIndex = 0;
      //get the output of the neural network
      this.decision = this.brain.feedForward(this.vision);
      // console.log(this.decision)

      for(let i = 0; i < this.decision.length; i++) {
        max = this.decision[i] > max ? this.decision[i] : max;
        maxIndex = this.decision[i] > max ? i : maxIndex;
      }
      // console.log(this.directionChangeCount / this.lifespan > 1/8);
      if((this.decision[0] === this.decision[1]) && (this.decision[2] === this.decision[3]) && (this.decision[1] === this.decision[2])){
        this.changeDirection(this.randomDirection());
        this.directionChangeCount++;
      } else {
        switch(maxIndex) {
          case 0:
            if (this.head.direction !== directionEnum.UP) this.directionChangeCount++;
            this.changeDirection(directionEnum.UP);
            break;
          case 1:
            if (this.head.direction !== directionEnum.DOWN) this.directionChangeCount++;
            this.changeDirection(directionEnum.DOWN);
            break;
          case 2:
            if (this.head.direction !== directionEnum.LEFT) this.directionChangeCount++;
            this.changeDirection(directionEnum.LEFT);
            break;
          case 3:
            if (this.head.direction !== directionEnum.RIGHT) this.directionChangeCount++;
            this.changeDirection(directionEnum.RIGHT);
            break;
        }
      }

      
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    //returns a clone of this player with the same brain
  clone() {
    var clone = new Snake();
    clone.brain = this.brain.clone();
    clone.fitness = this.fitness;
    clone.brain.generateNetwork();
    clone.gen = this.gen;
    clone.bestScore = this.score;
    print("cloning done");
    return clone;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //since there is some randomness in games sometimes when we want to replay the game we need to remove that randomness
  //this fuction does that

  cloneForReplay() {
    var clone = new Snake();
    clone.brain = this.brain.clone();
    clone.fitness = this.fitness;
    clone.brain.generateNetwork();
    clone.gen = this.gen;
    clone.bestScore = this.score;

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    return clone;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //fot Genetic algorithm
  calculateFitness() {

    // this.fitness = round(this.lifespan * this.lifespan * pow(2, (round(this.snakeLength))));

    this.fitness = this.score;
    // this.fitness = this.score + this.directionChangeCount/this.lifespan + max(this.directionChangeCount/this.lifespan, 0) > 0.03 ? 1 : 0;

    // console.log(this.fitness);
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  crossover(parent2) {

    var child = new Snake();
    child.brain = this.brain.crossover(parent2.brain);
    child.brain.generateNetwork();
    return child;
  }


}