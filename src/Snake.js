class Snake {
  constructor (){
    this.head = new Element(true);
    this.tail = new Element(false, this.head);
  }

  update() {
    this.head.update();
    this.tail.update();
  }

  show() {
    this.head.show();
    this.tail.show();
  }

  changeDirection(direction){
    this.tail.update(); // tail update position
    this.tail.changeDirection(direction); //tail update direction
    this.head.show(); // tail move
    this.head.changeDirection(direction); // head update direction
    this.head.update(); // head update position
    this.head.show(); // head move

    // this.tail.changeDirection(direction);
    
    
  }
}