class Endboss extends MovableObject {
  height = 350;
  width = 250;
  y = 110;
  energy = 100;
  statusBar;
  IMAGES_WALKING = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 3250;
    this.statusBar = new StatusBarEndboss();
  }

  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.isDead = true;
      this.energy = 0;
    }
    this.statusBar.setPercentage(this.energy);
  }

  drawStatusBar(ctx) {
    this.statusBar.x = this.x + 50;
    this.statusBar.y = this.y - 30;
    this.statusBar.draw(ctx);
  }
}
