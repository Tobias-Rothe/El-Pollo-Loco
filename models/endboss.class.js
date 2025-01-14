/**
 * Represents the Endboss character in the game. Extends the functionality of MovableObject.
 */
class Endboss extends MovableObject {
  /**
   * The height of the Endboss.
   * @type {number}
   */
  height = 350;

  /**
   * The width of the Endboss.
   * @type {number}
   */
  width = 250;

  /**
   * The y-coordinate of the Endboss.
   * @type {number}
   */
  y = 110;

  /**
   * The energy level of the Endboss.
   * @type {number}
   */
  energy = 100;

  /**
   * The status bar that displays the Endboss's health.
   * @type {StatusBarEndboss}
   */
  statusBar;

  /**
   * The initial x-coordinate of the Endboss.
   * @type {number}
   */
  initialX = 3250;

  /**
   * The initial y-coordinate of the Endboss.
   * @type {number}
   */
  initialY = 110;

  /**
   * Images for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Images for the attacking animation.
   * @type {string[]}
   */
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

  /**
   * Images for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Images for the alert animation.
   * @type {string[]}
   */
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

  /**
   * Creates an instance of the Endboss.
   */
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

  /**
   * Marks the Endboss as defeated.
   */
  defeat() {
    this.isDefeated = true;
  }

  /**
   * Animates the dead sequence of the Endboss.
   */
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

  /**
   * Animates the walking sequence of the Endboss.
   */
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

  /**
   * Animates the attacking sequence of the Endboss.
   */
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
    }, 100);
  }

  /**
   * Animates the alert sequence of the Endboss.
   */
  animateAlert() {
    if (this.isDead) return;

    this.isAlerting = true;
    if (!isMuted) {
      this.alarmSound.play();
    }
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

  /**
   * Mutes or unmutes the Endboss's alarm sound.
   * @param {boolean} isMuted - Whether the sound should be muted.
   */
  mute(isMuted) {
    if (this.alarmSound) {
      this.alarmSound.muted = isMuted;
      if (isMuted) {
        this.alarmSound.pause();
      } else if (this.isAlerting) {
        this.alarmSound.play();
      }
    }
  }

  /**
   * Checks the proximity of the player and triggers the alert animation if necessary.
   * @param {number} playerX - The x-coordinate of the player.
   */
  checkProximity(playerX) {
    if (Math.abs(this.x - playerX) < 500 && !this.isAlerting && !this.isDead) {
      this.animateAlert();
    }
  }

  /**
   * Initiates the Endboss's attack sequence.
   */
  attack() {
    if (!this.isAttacking && !this.isDead) {
      this.animateAttacking();
    }
  }

  /**
   * Reduces the Endboss's energy when hit and checks if it is dead.
   */
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

  /**
   * Draws the Endboss's status bar on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawStatusBar(ctx) {
    this.statusBar.x = this.x + 50;
    this.statusBar.y = this.y - 30;
    this.statusBar.draw(ctx);
  }

  /**
   * Throws a small chicken during an attack.
   */
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

    smallChicken.mute(isMuted);

    this.world.level.enemies.push(smallChicken);
  }
}
