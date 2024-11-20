class StatusBarBottle extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 100;
  constructor() {
    super();

    this.loadImages(this.IMAGES);
    this.x = 5;
    this.y = 1;

    this.height = 60;
    this.width = 150;
    this.setBottles(0);
  }

  setBottles(bottles) {
    this.bottlesCollected = bottles;
    this.percentage = (bottles / 5) * 100;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    return Math.floor(this.percentage / 20);
  }
}
