/**
 * Represents a cloud object that extends the MovableObject class.
 * The cloud object has a fixed position on the y-axis and a random position on the x-axis.
 * It continuously moves to the left.
 *
 * @class Cloud
 * @extends {MovableObject}
 */
class Cloud extends MovableObject {
  y = 10;
  width = 719;
  height = 250;
  constructor() {
    super().loadImage("./img//5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 3595;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
