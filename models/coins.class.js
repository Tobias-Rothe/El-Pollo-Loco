/**
 * Represents a coin object in the game.
 * Extends the MovableObject class and defines properties for appearance, position, and interaction.
 */
class Coin extends MovableObject {
  /**
   * Creates a new Coin object.
   * The coin is initialized with a random position within the level boundaries.
   * @param {number} levelWidth - The width of the level, used to randomize the coin's horizontal position.
   */
  constructor(levelWidth) {
    super();
    this.loadImage("./img/8_coin/coin_1.png");

    /** @type {number} Random horizontal position of the coin within the level boundaries. */
    this.x = 350 + Math.random() * (levelWidth - 200);

    /** @type {number} Random vertical position of the coin. */
    this.y = 100 + Math.random() * 200;

    /** @type {number} The width of the coin in pixels. */
    this.width = 100;

    /** @type {number} The height of the coin in pixels. */
    this.height = 100;
  }

  /**
   * Checks if the coin has been collected by the character.
   * Uses collision detection to determine if the coin overlaps with the character.
   * @param {Character} character - The character object to check for collision.
   * @returns {boolean} True if the coin is collected; otherwise, false.
   */
  isCollected(character) {
    return this.isColliding(character);
  }

  /**
   * Generates multiple coins within the level.
   * Creates new coin instances and pushes them into the `coins` array.
   * @param {number} coinCount - The number of coins to generate.
   */
  generateCoins(coinCount) {
    for (let i = 0; i < coinCount; i++) {
      this.coins.push(new Coin(this.level_end_x));
    }
  }
}
