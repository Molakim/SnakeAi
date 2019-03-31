class Fruit {

  constructor(){
    this.elem = new Element(true, null, directionEnum.PAUSE);
  }

  show(){
    this.elem.show(125);
  }

  update(){
    this.elem.update();
  }
 
}