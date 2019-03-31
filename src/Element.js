
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
    fill(255);
    ellipse(this.x, this.y, size, size);
  }

  update(){
    let temp = this.speed*frameRate;    
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
  }
  

  changeDirection(direction){
    // if(this.head === null){
    //   // I am a head
    //   this.direction = direction;
      
    // } else {
    //   // I am not a head
    //   this.head.changeDirection(direction); // head update direction
    //   this.head.update(); // head update position
    //   this.head.show(); // head move
    // }
    this.direction = direction;
  }
}