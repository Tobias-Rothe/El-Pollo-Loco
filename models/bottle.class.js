class Bottle extends MovableObject {
  constructor(levelWidth) {
    super();
    this.loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = 200 + Math.random() * (levelWidth - 200);
    this.y = 100 + Math.random() * 200;
    this.width = 50;
    this.height = 100;
  }
  isCollected(character) {
    return this.isColliding(character);
  }
}
