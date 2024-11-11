class Bottle extends MovableObject {
  constructor(levelWidth) {
    super();
    this.loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = 200 + Math.random() * (levelWidth - 400);

    this.y = 380;
    this.width = 50;
    this.height = 50;
  }
  isCollected(character) {
    return this.isColliding(character);
  }
}
