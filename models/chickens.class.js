class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;

  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  // chicken_sound = new Audio("../audio/chicken.mp3")
  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 500;
    this.speed = 0.2 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      // this.chicken_sound.play();
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
