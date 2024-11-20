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
