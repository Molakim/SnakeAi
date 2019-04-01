class Fruit {

  constructor(){
    this.elem = new Element(true, null, directionEnum.PAUSE, true);
  }

  show(){
    this.elem.show();
  }

  update(){
    this.elem.update();
  }
 
}