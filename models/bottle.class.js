/**
 * Represents a bottle object in the game.
 * Extends the MovableObject class to allow positioning and interactions.
 */
class Bottle extends MovableObject {
  /**
   * Creates a new Bottle instance.
   * Sets the position, dimensions, and loads the bottle image.
   * @param {number} levelWidth - The width of the level, used to determine the bottle's horizontal position.
   */
  constructor(levelWidth) {
    super();
    this.loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = 400 + Math.random() * (levelWidth - 400);
    this.y = 380;
    this.width = 50;
    this.height = 50;
  }

  /**
   * Checks if the bottle has been collected by a character.
   * @param {MovableObject} character - The character to check collision with.
   * @returns {boolean} - Returns true if the bottle collides with the character.
   */
  isCollected(character) {
    return this.isColliding(character);
  }
}
