class Endboss extends MovableObject {
  height = 350;
  width = 250;
  y = 110;
  energy = 100;
  statusBar;
  initialX = 3250;
  initialY = 110;
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ATTACKING = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.alarmSound = new Audio("./audio/enboss.mp3");
    this.x = this.initialX;
    this.statusBar = new StatusBarEndboss();
    this.currentImageIndex = 0;
    this.attackIndex = 0;
    this.isAttacking = false;
    this.isAlerted = false;
    this.isDead = false;
    this.isAlerting = false;
    this.isDefeated = false;
  }

  defeat() {
    this.isDefeated = true;
  }

  animateDead() {
    this.isDead = true;
    let deadInterval = setInterval(() => {
      this.currentImageIndex++;
      if (this.currentImageIndex >= this.IMAGES_DEAD.length) {
        clearInterval(deadInterval);
      } else {
        this.loadImage(this.IMAGES_DEAD[this.currentImageIndex]);
      }
    }, 200);
  }

  animateWalking() {
    setInterval(() => {
      if (!this.isAttacking && !this.isDead && !this.isAlerting) {
        this.currentImageIndex++;
        if (this.currentImageIndex >= this.IMAGES_WALKING.length) {
          this.currentImageIndex = 0;
        }
        this.loadImage(this.IMAGES_WALKING[this.currentImageIndex]);
      }
    }, 100);
  }

  animateAttacking() {
    this.isAttacking = true;
    let attackInterval = setInterval(() => {
      this.attackIndex++;

      if (this.attackIndex % 2 === 0) {
        this.throwSmallChicken();
      }

      if (this.attackIndex >= this.IMAGES_ATTACKING.length) {
        clearInterval(attackInterval);
        this.attackIndex = 0;
        this.isAttacking = false;
        this.loadImage(this.IMAGES_WALKING[0]);
      } else {
        this.loadImage(this.IMAGES_ATTACKING[this.attackIndex]);
      }
    }, 150);
  }

  animateAlert() {
    if (this.isDead) return;

    this.isAlerting = true;
    this.alarmSound.play();
    let alertInterval = setInterval(() => {
      this.currentImageIndex++;
      if (this.currentImageIndex >= this.IMAGES_ALERT.length) {
        clearInterval(alertInterval);
        this.isAlerting = false;
      } else {
        this.loadImage(this.IMAGES_ALERT[this.currentImageIndex]);
      }
    }, 200);
  }

  checkProximity(playerX) {
    if (Math.abs(this.x - playerX) < 500 && !this.isAlerting && !this.isDead) {
      this.animateAlert();
    }
  }

  attack() {
    if (!this.isAttacking && !this.isDead) {
      this.animateAttacking();
    }
  }

  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.isDead = true;
      this.energy = 0;
      this.animateDead();
      this.defeat();
      this.world.checkGameOver();
    }
    this.statusBar.setPercentage(this.energy);
  }

  drawStatusBar(ctx) {
    this.statusBar.x = this.x + 50;
    this.statusBar.y = this.y - 30;
    this.statusBar.draw(ctx);
  }

  throwSmallChicken() {
    if (!this.world || !this.world.level) {
      return;
    }

    const smallChickenCount = this.world.level.enemies.filter(
      (enemy) => enemy instanceof SmallChicken
    ).length;

    if (smallChickenCount >= 3) return;

    const smallChicken = new BossSmallChicken();
    smallChicken.x = this.x;
    smallChicken.y = this.y + 280;
    smallChicken.speedX = -1;
    smallChicken.speedY = 0;
    smallChicken.world = this.world;
    this.world.level.enemies.push(smallChicken);
  }

  reset() {
    this.isDead = false;
    this.x = 0;
    this.y = 0;
  }
}
