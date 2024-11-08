class Coin extends MovableObject {
  constructor(levelWidth) {
    super();
    this.loadImage("../img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * (levelWidth - 200);
    this.y = 100 + Math.random() * 200;
    this.width = 100;
    this.height = 100;
  }
  isCollected(character) {
    return this.isColliding(character);
  }
  generateCoins(coinCount) {
    for (let i = 0; i < coinCount; i++) {
      this.coins.push(new Coin(this.level_end_x));
    }
  }
}
