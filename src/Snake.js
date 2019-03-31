class Snake {
  constructor (){
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
      console.log("FRUIT DETECTED");
      this.gainLength();
      fruit = new Fruit();
    };
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