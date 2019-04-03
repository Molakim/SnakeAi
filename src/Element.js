
class Element {
  constructor(isHead = false, head = null, direction = directionEnum.RIGHT, isFruit = false, fruit = null) {
    if (isHead){
      if(isFruit){
        let isAvailable = true;
        this.x = (1 + round(random()*15))*size;
        this.y = (1 + round(random()*8))*size;
        // while (isAvailable) {
        //   snake.body.forEach(element => {
        //     element.x === this.x ? isAvailable = isAvailable && false : isAvailable = isAvailable && true;
        //   }); 
        //   if (isAvailable) {
        //     break;
        //   } else {
        //     this.x = (1 + round(random()*30))*size;
        //   }
        // }
      } else {
        this.x = round(random()*16)*size;
        this.y = round(random()*9)*size;
      }
      this.direction = direction;
    } else {
      this.x = head.x - size;
      this.y = head.y;
      this.direction = head.direction;
    }
    this.head = head;
    this.isHead = isHead;
    this.isFruit = isFruit;
    if(fruit !== null) this.fruit = fruit;
  }
  show(){
    if(this.isFruit){
      fill(0, 255, 0);
      ellipse(this.x+160, this.y+160, size, size);

    } else {
      if(this.head === null){
        // I am a head
        // image(headSprite, this.x, this.y);
        fill(255, 0, 0);
        ellipse(this.x+160, this.y+160, size, size);
      } else {
        this.head.show();
        fill(255);
        ellipse(this.x+160, this.y+160, size, size);
      }
    } 
  }

  update(){
    let temp = size;
    
    if(this.head === null){
      // I am a head
      switch(this.direction){
        case directionEnum.UP:
          if (this.y - temp < 0){
            // reached the top screen
            this.y = windH;
          } else {
            this.y -= temp;
          }
          break;
        case directionEnum.DOWN:
          if (this.y + temp > windH){
            // reached the bottom screen
            this.y = 0;
          } else {
            this.y += temp;
          }
          break;
        case directionEnum.LEFT:
          if (this.x - temp < 0){
            // reached the left screen
            this.x = windW;
          } else {
            this.x -= temp;
          }
          break;
        case directionEnum.RIGHT:
          if (this.x + temp > windW){
            // reached the right screen
            this.x = 0;
          } else {
            this.x += temp;
          }
          break;
        case directionEnum.PAUSE:
          break;
      }
      
    } else {
      // I am not a head
      if(this.direction !== directionEnum.PAUSE){
        this.x = this.head.x;
        this.y = this.head.y;
        this.direction = this.head.direction;
      }
      this.head.update();
    }
  }

  changeDirection(direction){
    if(direction !== (-1*this.direction)){
      //The command direction is not the opposite direction
      if(this.head === null){
        this.direction = direction;
      } else {
        this.direction = direction;
        this.head.changeDirection(direction); 
      }
    }
  }

  detectFruit(){
    //fruit collision detection
    let temp = 0;
    let movement = size;
    switch(this.direction){
      case directionEnum.UP:
        temp = this.y - movement;
        return this.fruit.elem.y === temp ? this.fruit.elem.x === this.x ? true : false : false;
      case directionEnum.DOWN:
        temp = this.y + movement;
        return this.fruit.elem.y === temp ? this.fruit.elem.x === this.x ? true : false : false;
      case directionEnum.LEFT:
        temp = this.x - movement;
        return this.fruit.elem.x === temp ? this.fruit.elem.y === this.y ? true : false : false;
      case directionEnum.RIGHT:
        temp = this.x + movement;
        return this.fruit.elem.x === temp ? this.fruit.elem.y === this.y ? true : false : false;
      case directionEnum.PAUSE:
        break;
    }
  }

  detectBody(){
    //body collision detection
    let temp = 0;
    let movement = size;
    let isBodyDetected = false;
    this.body.forEach(elem => {
      // check if there is an element of body in the next move
      
      switch(elem.direction){
        case directionEnum.UP:
          temp = this.y - movement;
          isBodyDetected = isBodyDetected || ((temp === elem.y) && (this.x === elem.x))
          break;
        case directionEnum.DOWN:
          temp = this.y + movement;
          isBodyDetected = isBodyDetected || ((temp === elem.y) && (this.x === elem.x))
          break;
        case directionEnum.LEFT:
          temp = this.x - movement;
          isBodyDetected = isBodyDetected || ((temp === elem.x) && (this.y === elem.y))
          break;
        case directionEnum.RIGHT:
          temp = this.x + movement;
          isBodyDetected = isBodyDetected || ((temp === elem.x) && (this.y === elem.y))
          break;
        case directionEnum.PAUSE:
          break;
      }
    }); 
    return isBodyDetected;
  }

  setBody (body){
    this.body = body;
  }

  setFruit (fruit){
    this.fruit = fruit;
  }

}