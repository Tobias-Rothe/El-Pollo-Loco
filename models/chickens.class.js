class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  CHICKEN_SOUND = new Audio("./audio/chicken.mp3");
  damage = 10;
  isDead = false;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 400 + Math.random() * 3100;
    this.startX = this.x;
    this.startY = this.y;
    this.speed = 0.2 + Math.random() * 0.25;
    this.startSpeed = this.speed;
    this.animate();
  }

  animate() {
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationFrameInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  die() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage("./img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    this.CHICKEN_SOUND.play();
  }
}
