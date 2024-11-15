class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("../img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.speedX = 20;
    this.speedY = 30;

    this.trow();
  }
  trow() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 20;
    }, 25);
  }
}
