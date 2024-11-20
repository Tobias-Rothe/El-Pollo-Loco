class StatusBarCoins extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];
  coinsCollected = 0;

  constructor() {
    super();

    this.loadImages(this.IMAGES);
    this.x = 5;
    this.y = 90;
    this.height = 60;
    this.width = 150;
    this.setCoins(0);
  }

  setCoins(coins) {
    this.coinsCollected = coins;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }
  resolveImageIndex() {
    return Math.min(this.coinsCollected, 5);
  }
}
