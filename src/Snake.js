class Snake {
  constructor (){
    this.body = [];
    this.body.push(new Element(true));
    for (let i = 1; i<snakeLength; i++){
      this.body.push(new Element(false, this.body[i-1]))
    }
    console.log(this.body)
  }

  update() {
    this.body[snakeLength - 1].update();
  }

  show() {
    this.body[snakeLength - 1].show();
  }

  changeDirection(direction){
    this.body[snakeLength - 1].changeDirection(direction);
    this.body[snakeLength - 1].show();    
  }
}