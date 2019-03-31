
class Element {
  constructor(isHead = false, head = null, direction = directionEnum.RIGHT) {
    if (isHead){
      this.x = round(random()*32)*40;
      this.y = round(random()*18)*40;
      this.direction = direction;
    } else {
      this.x = head.x - size;
      this.y = head.y;
      this.direction = head.direction;
    }
    this.head = head;
    this.isHead = isHead;
    this.speed = speed;
  }
  show(color = 255){
    if(this.head === null){
      // I am a head
      fill(color);
      ellipse(this.x, this.y, size, size);
      
    } else {
      this.head.show();
      fill(255);
      ellipse(this.x, this.y, size, size);
    }
    
  }

  update(){
    let temp = this.speed*size;
    
    if(this.head === null){
      // I am a head
      switch(this.direction){
        case directionEnum.UP:
          this.y -= temp;
          break;
        case directionEnum.DOWN:
          this.y += temp;
          break;
        case directionEnum.LEFT:
          this.x -= temp;
          break;
        case directionEnum.RIGHT:
          this.x += temp;
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

  detectCollision(){
    let temp = 0;
    let movement = this.speed*size;
    console.log(fruit.elem.x);
    switch(this.direction){
      case directionEnum.UP:
        temp = this.y - movement;
        return fruit.elem.y === temp ? fruit.elem.x === this.x ? true : false : false;
      case directionEnum.DOWN:
        temp = this.y + movement;
        return fruit.elem.y === temp ? fruit.elem.x === this.x ? true : false : false;
      case directionEnum.LEFT:
        temp = this.x - movement;
        console.log(temp) 
        return fruit.elem.x === temp ? fruit.elem.y === this.y ? true : false : false;
      case directionEnum.RIGHT:
        temp = this.x + movement;
        return fruit.elem.x === temp ? fruit.elem.y === this.y ? true : false : false;
      case directionEnum.PAUSE:
        break;
    }
  }



  changeDirection(direction){
    if(this.head === null){
      this.direction = direction;
    } else {
      this.direction = direction;
      this.head.changeDirection(direction); 
    }
  }
}