/**
 * Represents a background object in the game.
 * Extends the MovableObject class to allow positioning and movement.
 */
class Background extends MovableObject {
  /**
   * The width of the background in pixels.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background in pixels.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new Background instance.
   * Sets its position and loads the specified image.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The horizontal position of the background on the canvas.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; // Positions the background at the bottom of the canvas
  }
}
