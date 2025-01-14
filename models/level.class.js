/**
 * Represents a level in the game, containing enemies, clouds, backgrounds, and collectible objects.
 */
class Level {
  /**
   * Array of enemies in the level.
   * @type {Array<Enemy>}
   */
  enemies;

  /**
   * Array of clouds in the level.
   * @type {Array<Cloud>}
   */
  clouds;

  /**
   * Array of background layers in the level.
   * @type {Array<Background>}
   */
  backgrounds;

  /**
   * Array of coins in the level.
   * @type {Array<Coin>}
   */
  coins = [];

  /**
   * Array of throwable objects in the level.
   * @type {Array<ThrowableObject>}
   */
  throwableObjects = [];

  /**
   * Array of bottles in the level.
   * @type {Array<Bottle>}
   */
  bottles = [];

  /**
   * The x-coordinate that marks the end of the level.
   * @type {number}
   */
  level_end_x = 3500;

  /**
   * Creates a new level instance.
   * @param {Array<Enemy>} enemies - The enemies present in the level.
   * @param {Array<Cloud>} clouds - The clouds present in the level.
   * @param {Array<Background>} backgrounds - The background layers of the level.
   * @param {number} coinCount - The number of coins to generate in the level.
   * @param {number} bottleCount - The number of bottles to generate in the level.
   * @param {Array<ThrowableObject>} throwableObjects - The throwable objects available in the level.
   */
  constructor(enemies, clouds, backgrounds, coinCount, bottleCount, throwableObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.throwableObjects = throwableObjects;
    this.generateCoins(coinCount);
    this.generateBottles(bottleCount);
  }

  /**
   * Generates a specified number of coins and places them randomly within the level.
   * @param {number} coinCount - The number of coins to generate.
   */
  generateCoins(coinCount) {
    for (let i = 0; i < coinCount; i++) {
      const randomX = Math.random() * this.level_end_x; // Random x-coordinate within the level bounds.
      const randomY = 200 + Math.random() * 10000; // Random y-coordinate within a defined range.
      this.coins.push(new Coin(randomX, randomY)); // Add a new coin to the coins array.
    }
  }

  /**
   * Generates a specified number of bottles and places them randomly within the level.
   * @param {number} bottleCount - The number of bottles to generate.
   */
  generateBottles(bottleCount) {
    for (let i = 0; i < bottleCount; i++) {
      const randomX = Math.random() * this.level_end_x; // Random x-coordinate within the level bounds.
      const randomY = 200 + Math.random() * 300; // Random y-coordinate within a smaller range compared to coins.
      this.bottles.push(new Bottle(randomX, randomY)); // Add a new bottle to the bottles array.
    }
  }
}
