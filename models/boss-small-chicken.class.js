class BossSmallChicken extends SmallChicken {
  constructor() {
    super();
    this.width = 40;
    this.height = 40;
    this.speedX = 1;
    this.damage = 10;

    this.IMAGES_WALKING = [
      "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 3100;
    this.speed = 0.2 + Math.random() * 0.3;
    this.animate();
  }

  moveLeft() {
    this.x += this.speedX;
  }

  applyGravity() {
    this.speedY += this.gravity * 0.1;
    if (this.speedY > this.maxSpeedY) {
      this.speedY = this.maxSpeedY;
    }
    this.y += this.speedY;
    if (this.y + this.height > 200) {
      this.y = 200 - this.height;
      n;
      this.speedY = 0;
    }
  }
}
