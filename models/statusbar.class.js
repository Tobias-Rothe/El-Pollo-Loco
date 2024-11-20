class StatusBar extends DrawableObject {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;
  constructor() {
    super();

    this.loadImages(this.IMAGES);
    this.x = 5;
    this.y = 45;
    this.height = 60;
    this.width = 150;
    this.setPercentages(100);
  }

  setPercentages(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }
  resolveImageIndex() {
    return this.getIndexForPercentage(this.percentage);
  }

  getIndexForPercentage(percentage) {
    if (percentage === 100) return 5;
    if (percentage > 80) return 4;
    if (percentage > 60) return 3;
    if (percentage > 40) return 2;
    if (percentage > 20) return 1;
    return 0;
  }
}
