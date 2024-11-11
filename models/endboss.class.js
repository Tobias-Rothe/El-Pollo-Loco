class Endboss extends MovableObject {
  height = 350;
  width = 250;
  y = 110;
  energy = 100; // Start-Energie des Endbosses
  statusBar; // Referenz zur Statusbar

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
    this.statusBar = new StatusBarEndboss(); // Statusbar initialisieren
  }

  hit() {
    this.energy -= 20; // Reduziert die Energie um 20
    if (this.energy <= 0) {
      this.isDead = true;
      this.energy = 0;
    }
    this.statusBar.setPercentage(this.energy); // Statusbar aktualisieren
  }

  drawStatusBar(ctx) {
    this.statusBar.x = this.x + 50; // Position relativ zum Endboss
    this.statusBar.y = this.y - 30; // Über dem Endboss
    this.statusBar.draw(ctx);
  }
}
