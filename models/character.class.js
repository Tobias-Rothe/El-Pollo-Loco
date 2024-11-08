class Character extends MovableObject {
  height = 250;
  width = 100;
  y = 80;
  speed = 5;
  speedY = 1;
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
  walking_sound = new Audio("../audio/walk.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applayGravaty();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  jump() {
    if (!this.isAboveGround()) {
      // Der Charakter kann nur springen, wenn er den Boden berührt
      this.speedY = 30; // Setze die Sprunggeschwindigkeit
      this.jumping_sound.play(); // Spiele den Sprungsound
      console.log("Springe mit speedY:", this.speedY); // Überprüfe den Wert von speedY
    }
  }

  checkJumpingOnEnemies() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.speedY > 0) {
        // Nur wenn der Charakter nach unten fällt
        const characterBottom = this.y + this.height;
        const enemyTop = enemy.y;
        const enemyBottom = enemy.y + enemy.height;

        // Überprüfe, ob der Charakter sich in einem Bereich über dem Gegner befindet und nach unten fällt
        const isAboveEnemy = characterBottom - 10 < enemyTop; // Über dem Gegner
        const isCloseEnoughHorizontal = Math.abs(this.x - enemy.x) < 75; // Horizontale Nähe

        if (isAboveEnemy && isCloseEnoughHorizontal && this.speedY > 0) {
          console.log("Gegner durch Sprung von oben getötet!");
          enemy.die(); // Gegner wird getötet
          this.speedY = -10; // Rückstoß nach oben
        }
      }
    });
  }
}
