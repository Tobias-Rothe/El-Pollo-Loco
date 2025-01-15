class BossSmallChicken extends SmallChicken {
  /**
   * Represents a small boss chicken enemy.
   * @constructor
   * @extends SomeSuperClass
   * @property {number} width - The width of the chicken.
   * @property {number} height - The height of the chicken.
   * @property {number} speedX - The horizontal speed of the chicken.
   * @property {number} damage - The damage the chicken can inflict.
   * @property {string[]} IMAGES_WALKING - Array of image paths for the walking animation.
   * @property {number} x - The initial x-coordinate of the chicken.
   * @property {number} speed - The speed of the chicken.
   */

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

  /**
   * Applies gravity to the object, updating its vertical speed and position.
   * Ensures the object does not exceed a maximum vertical speed and stops
   * the object at a certain vertical position.
   */
  applyGravity() {
    this.speedY += this.gravity * 0.1;
    if (this.speedY > this.maxSpeedY) {
      this.speedY = this.maxSpeedY;
    }
    this.y += this.speedY;
    if (this.y + this.height > 200) {
      this.y = 200 - this.height;
      this.speedY = 0;
    }
  }

  /**
   * Mutes or unmutes the chicken sound.
   *
   * @param {boolean} isMuted - A boolean indicating whether the sound should be muted (true) or unmuted (false).
   */
  mute(isMuted) {
    if (this.CHICKEN_SOUND) {
      this.CHICKEN_SOUND.muted = isMuted;

      if (isMuted) {
        this.CHICKEN_SOUND.pause();
        this.CHICKEN_SOUND.currentTime = 0;
      } else {
        this.CHICKEN_SOUND.play();
      }
    }
  }
}
