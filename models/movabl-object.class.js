/**
 * Represents a movable object in the game, extending the functionality of DrawableObject.
 */
class MovableObject extends DrawableObject {
  /**
   * The horizontal speed of the object.
   * @type {number}
   */
  speed = 0.2;

  /**
   * Indicates whether the object is facing the other direction (e.g., left).
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The vertical speed of the object (used for gravity).
   * @type {number}
   */
  speedY = 0;

  /**
   * The acceleration applied to the vertical speed (gravity effect).
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * The object's energy level. If it reaches 0, the object "dies."
   * @type {number}
   */
  energy = 100;

  /**
   * The timestamp of the last hit (used to calculate if the object is "hurt").
   * @type {number}
   */
  lastHit = 0;

  /**
   * Indicates whether the object is dead.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Applies gravity to the object, causing it to fall until it reaches the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.y < 200 || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
        if (this.speedY > 10) {
          this.speedY = 10;
        }
      }

      if (this.y >= 200) {
        this.y = 200;
        this.speedY = 0;
      }
    }, 1000 / 60); // 60 frames per second
  }

  /**
   * Resets the object's position and state to its initial values.
   */
  reset() {
    this.isDead = false;
    this.x = this.startX;
    this.y = this.startY;
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above ground, otherwise false.
   */
  isAboveGround() {
    return this.y < 200;
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} True if the objects are colliding, otherwise false.
   */
  isColliding(otherObject) {
    const verticalTolerance = 10;
    const horizontalTolerance = 10;
    return (
      this.x + this.width - horizontalTolerance > otherObject.x &&
      this.x + horizontalTolerance < otherObject.x + otherObject.width &&
      this.y + this.height > otherObject.y - verticalTolerance &&
      this.y < otherObject.y + otherObject.height + verticalTolerance
    );
  }

  /**
   * Reduces the object's energy when it is hit. If energy reaches 0, the object dies.
   */
  hit() {
    if (!this.isDead) {
      this.energy -= 10;
      if (this.energy <= 0) {
        this.die();
      }
    }
  }

  /**
   * Marks the object as dead and logs a message.
   */
  die() {
    this.isDead = true;
  }

  /**
   * Checks if the object is currently hurt (recently hit within 1 second).
   * @returns {boolean} True if the object is hurt, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  /**
   * Checks if the object is dead based on its energy level.
   * @returns {boolean} True if the object's energy is 0, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right by increasing its x-coordinate.
   */
  moveRight() {
    this.x += this.speed;

    this.walking_sound.play();
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays an animation by cycling through a series of images at a given frame delay.
   * @param {Array<string>} images - The list of image paths for the animation.
   * @param {number} [frameDelay=100] - The delay between frames in milliseconds.
   */
  playAnimation(images, frameDelay = 15) {
    const now = Date.now();
    if (!this.lastFrameTime || now - this.lastFrameTime > frameDelay) {
      let i = Math.floor(this.currentImage / images.length) % images.length;
      let path = images[i];
      this.img = this.ImageCache[path];
      this.currentImage++;
      this.lastFrameTime = now;
    }
  }
}
