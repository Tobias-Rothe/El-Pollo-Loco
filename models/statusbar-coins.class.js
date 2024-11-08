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
    if (this.coinsCollected >= 5) {
      return 5;
    } else if (this.coinsCollected >= 4) {
      return 4;
    } else if (this.coinsCollected >= 3) {
      return 3;
    } else if (this.coinsCollected >= 2) {
      return 2;
    } else if (this.coinsCollected >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
