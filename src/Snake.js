class Snake {
  constructor (){
    this.isAlive = true;
    this.head = new Element(true);
    this.body = [];
    this.body.push(this.head);
    for (let i = 1; i<snakeLength; i++){
      this.body.push(new Element(false, this.body[i-1]))
    }
    this.tail = this.body[snakeLength - 1];
  }

  update() {

    
    if (this.head.detectFruit()){
      // If there is a fruit infront
      this.gainLength();
      fruit = new Fruit();
    };
    if (this.head.detectBody()){
      // If there is a part of body infront
      this.tail.changeDirection(directionEnum.PAUSE);
      speed = 0;
      this.isAlive = false;
    }

    this.tail.update();
  }

  show() {
    this.tail.show();
  }

  changeDirection(direction){
    this.tail.changeDirection(direction);
    this.tail.show();    
  }

  gainLength(){
    snakeLength++;
    this.body.push(new Element(false, this.tail));
    this.tail = this.body[snakeLength - 1];
  }
}