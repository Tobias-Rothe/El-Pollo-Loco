class Character extends MovableObject {
  height = 250;
  width = 100;
  y = 200;
  speed = 5;
  speedY = 1;
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

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

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

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

  world;

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
    this.die_sound = new Audio("./audio/male-death.mp3");
    this.animate();
  }

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
        self.playAnimation(self.IMAGES_JUMPING, 50);
      } else if (idleTime >= 15000) {
        self.playAnimation(self.IMAGES_SLEEP, 100);
      } else if (!self.isMoving()) {
        self.playAnimation(self.IMAGES_IDLE, 50);
      } else if (self.isMoving()) {
        self.playAnimation(self.IMAGES_WALKING, 10);
      }
    }, 1000 / 60);
  }

  jump() {
    if (this.y === 200) {
      this.speedY = -30;
      this.jumping_sound.play();
    }
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  checkJumpingOnEnemies() {
    this.world.level.enemies.forEach((enemy) => {
      const characterBottom = this.y + this.height;
      const enemyTop = enemy.y;
      const enemyBottom = enemy.y + enemy.height;
      const isAboveEnemy = characterBottom - 10 < enemyTop;
      const isCloseEnoughHorizontal = Math.abs(this.x - enemy.x) < 75;

      if (isAboveEnemy && isCloseEnoughHorizontal) {
        enemy.die();
        this.speedY = -10;
      }
    });
  }

  checkHealth() {
    if (this.health <= 0) {
      this.isDead = true;
      this.world.checkGameOverDisplay();
    }
  }

  checkCollision(enemy) {
    if (this.isColliding(enemy) && !this.isHurt) {
      this.health -= enemy.damage;
      this.isHurt = true;
      this.hurtTime = Date.now();
      n;
      this.playAnimation(this.IMAGES_HURT);
      console.log(`Kollision! Schaden: ${enemy.damage}, Verbleibende Gesundheit: ${this.health}`);

      setTimeout(() => {
        this.isHurt = false;
      }, 1000);
    }
  }

  reset() {
    this.isDead = false;
    this.x = 0;
    this.y = 0;
  }

  update() {}
}
