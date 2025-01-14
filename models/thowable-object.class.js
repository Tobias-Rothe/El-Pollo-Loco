/**
 * Represents a throwable object in the game.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /**
   * Indicates whether an object can be thrown.
   * @type {boolean}
   * @static
   */
  static canThrow = true;

  /**
   * Creates an instance of ThrowableObject.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   */
  constructor(x, y) {
    super();
    this.loadImage("./img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.speedX = 15;
    this.speedY = -15;
    this.groundY = 350;
    this.acceleration = 1;
    this.throw();
  }

  /**
   * Creates a new ThrowableObject if allowed.
   * @param {number} x - The x-coordinate for the new object.
   * @param {number} y - The y-coordinate for the new object.
   * @returns {ThrowableObject|null} The created ThrowableObject or null if not allowed.
   * @static
   */
  static create(x, y) {
    if (!ThrowableObject.canThrow) {
      return null;
    }
    ThrowableObject.canThrow = false;
    setTimeout(() => {
      ThrowableObject.canThrow = true;
    }, 1000);
    return new ThrowableObject(x, y);
  }

  /**
   * Initiates the throwing motion of the object.
   */
  throw() {
    this.applyGravity();
    const interval = setInterval(() => {
      this.x += this.speedX;
      this.speedX = Math.max(this.speedX - 0.1, 0);
      if (this.speedX === 0) clearInterval(interval);
    }, 1000 / 60);
  }

  /**
   * Applies gravity to the object, making it fall.
   */
  applyGravity() {
    const gravityInterval = setInterval(() => {
      if (this.y < this.groundY || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
      }
      if (this.y >= this.groundY) {
        this.y = this.groundY;
        clearInterval(gravityInterval);
        this.remove();
      }
    }, 1000 / 60);
  }

  /**
   * Removes the object from the game by setting its x-coordinate off-screen.
   */
  remove() {
    setTimeout(() => {
      this.x = -200;
    }, 100);
  }
}
