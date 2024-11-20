class SmallChicken extends Chicken {
  constructor() {
    super();
    this.width = 50;
    this.height = 50;
    this.y = 380;
    this.damage = 5;

    this.IMAGES_WALKING = [
      "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 3100;
    this.speed = 0.1 + Math.random() * 0.2;

    this.animate();
  }
  reset() {
    this.isDead = false;
    this.x = 0;
    this.y = 0;
  }

  update() {}
}
