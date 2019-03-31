
class Element {
  constructor(isHead = false, head = null) {
    if (isHead){
      this.x = round(random()*window.innerWidth/2);
      this.y = round(random()*window.innerHeight/2);
      this.direction = directionEnum.RIGHT;
    } else {
      this.x = head.x - size;
      this.y = head.y;
      this.direction = head.direction;
    }
    this.head = head;
    this.isHead = isHead;
    this.speed = speed;
  }
  show(){
    if(this.head === null){
      // I am a head
      fill(255);
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
  

  changeDirection(direction){
    this.direction = direction;
    this.head.changeDirection(direction); 
    update(); // tail update position
  }
}