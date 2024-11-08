class Level {
  enemies;
  clouds;
  backgrounds;
  coins = [];
  throwableObjects = [];
  bottles = [];
  level_end_x = 3500;

  constructor(enemies, clouds, backgrounds, coinCount, bottleCount, throwableObjects) {
    (this.enemies = enemies), (this.clouds = clouds);
    this.backgrounds = backgrounds;
    this.throwableObjects = throwableObjects;
    this.generateCoins(coinCount);
    this.generateBottles(bottleCount);
  }
  generateCoins(coinCount) {
    for (let i = 0; i < coinCount; i++) {
      const randomX = Math.random() * this.level_end_x;
      const randomY = 200 + Math.random() * 10000;
      this.coins.push(new Coin(randomX, randomY));
    }
  }
  generateBottles(bottleCount) {
    for (let i = 0; i < bottleCount; i++) {
      const randomX = Math.random() * this.level_end_x;
      const randomY = 200 + Math.random() * 300;
      this.bottles.push(new Bottle(randomX, randomY));
    }
  }
}
