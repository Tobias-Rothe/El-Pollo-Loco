/**
 * Represents the main character in the game.
 * Extends the MovableObject class and includes various properties and methods
 * for animations, movements, interactions, and sound effects.
 */
class Character extends MovableObject {
  /** @type {number} The height of the character in pixels. */
  height = 250;

  /** @type {number} The width of the character in pixels. */
  width = 100;

  /** @type {number} The vertical position of the character on the canvas. */
  y = 200;

  /** @type {number} The horizontal speed of the character. */
  speed = 5;

  /** @type {number} The vertical speed of the character (used for jumping). */
  speedY = 1;

  /** @type {string[]} Array of image paths for the walking animation. */
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} Array of image paths for the jumping animation. */
  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} Array of image paths for the dead animation. */
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} Array of image paths for the hurt animation. */
  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} Array of image paths for the sleeping animation. */
  IMAGES_SLEEP = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {string[]} Array of image paths for the idle animation. */
  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {Object} A reference to the world object the character interacts with. */
  world;

  /**
   * Constructor for the Character class.
   * Initializes the character's properties, loads images, and starts animations.
   */
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.energy = 100;
    this.isDead = false;
    this.isHurt = false;
    this.hurtTime = 0;
    this.walking_sound = new Audio("./audio/walk.mp3");
    this.jumping_sound = new Audio("./audio/jump.mp3");
    this.hurt_sound = new Audio("./audio/young-man-being-hurt-95628.mp3");
    this.die_sound = new Audio("./audio/male-death.mp3");
    this.snore_sound = new Audio("./audio/male-snore-1-29322.mp3");
    this.animate();
  }

  /**
   * Handles character animations and movement logic.
   * Updates animations and interacts with the world object.
   */
  animate() {
    let lastActionTime = Date.now();
    let self = this;

    const movementInterval = setInterval(() => {
      self.walking_sound.pause();

      if (self.world && self.world.keyboard) {
        if (self.world.keyboard.RIGHT && self.x < self.world.level.level_end_x) {
          self.moveRight();
          self.otherDirection = false;
          lastActionTime = Date.now();
        } else if (self.world.keyboard.LEFT && self.x > 0) {
          self.moveLeft();
          self.otherDirection = true;
          self.walking_sound.play();
          lastActionTime = Date.now();
        }

        if (self.world.keyboard.SPACE && self.y === 200) {
          self.jump();
          lastActionTime = Date.now();
        }
      }

      self.world.camera_x = -self.x + 100;

      if (self.isDead) {
        clearInterval(movementInterval);
      }
    }, 1000 / 60);

    setInterval(() => {
      self.checkJumpingOnEnemies();
    }, 100);

    setInterval(() => {
      const idleTime = Date.now() - lastActionTime;

      if (self.isDead) {
        self.playAnimation(self.IMAGES_DEAD, 10);
      } else if (self.isHurt) {
        self.playAnimation(self.IMAGES_HURT, 10);
      } else if (self.isAboveGround()) {
        self.playAnimation(self.IMAGES_JUMPING, 10);
      } else if (
        idleTime >= 5000 &&
        this.world.level.enemies.find((enemy) => enemy instanceof Endboss).energy > 0
      ) {
        this.snore_sound.play();
        self.playAnimation(self.IMAGES_SLEEP, 100);
      } else if (!self.isMoving()) {
        this.snore_sound.pause();
        self.playAnimation(self.IMAGES_IDLE, 50);
      } else if (self.isMoving()) {
        self.playAnimation(self.IMAGES_WALKING, 10);
      }
    }, 1000 / 60);
  }

  /**
   * Makes the character jump.
   * Plays the jump sound and adjusts vertical speed.
   */
  jump() {
    if (this.y === 200) {
      this.speedY = -30;
      if (!isMuted) this.jumping_sound.play();
    }
  }

  /**
   * Checks if the character is moving horizontally.
   * @returns {boolean} True if the character is moving; otherwise, false.
   */
  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character is jumping on enemies.
   * If the character is above an enemy and close enough horizontally, the enemy is defeated.
   */
  checkJumpingOnEnemies() {
    this.world.level.enemies.forEach((enemy) => {
      const isAboveEnemy = this.y + this.height + 5 < enemy.y && this.speedY < 0;
      const isWithinEnemyBounds =
        this.x + this.width - 10 > enemy.x && this.x - 10 < enemy.x + enemy.width;

      if (isAboveEnemy && isWithinEnemyBounds) {
        this.speedY = -10;
      }
    });
  }

  /**
   * Checks the character's health and determines if the character is dead.
   */
  checkHealth() {
    if (this.health <= 0) {
      this.isDead = true;
      this.world.checkGameOverDisplay();
    }
  }

  /**
   * Handles collisions between the character and enemies.
   * Reduces health and triggers hurt animations if the character collides with an enemy.
   * @param {Object} enemy - The enemy object the character collides with.
   */
  checkCollision(enemy) {
    if (this.isColliding(enemy) && !this.isHurt) {
      this.health -= enemy.damage;
      this.isHurt = true;
      this.hurtTime = Date.now();
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_sound.play();
      setTimeout(() => {
        this.isHurt = false;
      }, 1000);
    }
  }

  /**
   * Resets the character's position and state.
   */
  reset() {
    this.isDead = false;
    this.x = 0;
    this.y = 0;
  }

  /**
   * Mutes or unmutes sound effects.
   * @param {boolean} muted - If true, mutes sound; otherwise, unmutes it.
   */
  mute(muted) {
    this.alarmSound.muted = muted;
    if (muted) {
      this.alarmSound.pause();
    } else if (this.isAlerting) {
      this.alarmSound.play();
    }
  }
}
