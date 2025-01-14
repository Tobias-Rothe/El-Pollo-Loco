/**
 * Represents a chicken enemy in the game.
 * Extends the MovableObject class to inherit movement functionality.
 */
class Chicken extends MovableObject {
  /**
   * The height of the chicken in pixels.
   * @type {number}
   */
  height = 70;

  /**
   * The width of the chicken in pixels.
   * @type {number}
   */
  width = 70;

  /**
   * The vertical position of the chicken on the canvas.
   * @type {number}
   */
  y = 360;

  /**
   * The sound effect played when the chicken dies.
   * @type {HTMLAudioElement}
   */
  CHICKEN_SOUND = new Audio("./audio/chicken.mp3");

  /**
   * The amount of damage the chicken inflicts.
   * @type {number}
   */
  damage = 10;

  /**
   * Indicates whether the chicken is dead.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Array of image paths used for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Creates a new Chicken instance.
   * Initializes its position, speed, and animations.
   */
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

  isColliding(mo) {
    if (mo.isDead) return false;

    const enemyOffsetX = 5;
    const enemyOffsetY = 5;

    return (
      this.x + this.width - enemyOffsetX > mo.x &&
      this.x + enemyOffsetX < mo.x + mo.width &&
      this.y + this.height - enemyOffsetY > mo.y &&
      this.y + enemyOffsetY < mo.y + mo.height
    );
  }

  /**
   * Starts the chicken's animations.
   * Handles movement and frame updates for the walking animation.
   */
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
    }, 2000 / 60);
  }

  /**
   * Marks the chicken as dead, stops its movement, and changes its image.
   * Plays the death sound.
   */
  die() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage("./img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    this.CHICKEN_SOUND.play();

    setTimeout(() => {
      this.isRemoved = true;
    }, 50);
  }

  /**
   * Toggles the chicken's sound between muted and unmuted states.
   * Stops and resets the sound if muted.
   * @param {boolean} isMuted - Whether to mute the sound.
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
