/**
 * Represents a small chicken enemy, extending the functionality of the Chicken class.
 */
class SmallChicken extends Chicken {
  /**
   * Initializes a SmallChicken instance with predefined dimensions, position, damage, and animations.
   */
  constructor() {
    super();
    /**
     * The width of the small chicken.
     * @type {number}
     */
    this.width = 50;

    /**
     * The height of the small chicken.
     * @type {number}
     */
    this.height = 50;

    /**
     * The vertical position of the small chicken on the ground.
     * @type {number}
     */
    this.y = 380;

    /**
     * The damage caused by the small chicken to the player or other objects.
     * @type {number}
     */
    this.damage = 5;

    /**
     * Array of image paths for the walking animation of the small chicken.
     * @type {string[]}
     */
    this.IMAGES_WALKING = [
      "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    // Load the first image for the small chicken and preload the walking animation frames.
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    /**
     * The horizontal position of the small chicken, randomly placed between 200 and 3300.
     * @type {number}
     */
    this.x = 300 + Math.random() * 3100;

    /**
     * The horizontal speed of the small chicken, randomly set between 0.1 and 0.3.
     * @type {number}
     */
    this.speed = 0.1 + Math.random() * 0.2;

    // Start the animation for the small chicken.
    this.animate();
  }

  /**
   * Resets the small chicken's position and state to its initial values.
   */
  reset() {
    this.isDead = false;

    /**
     * Resets the x-coordinate of the small chicken.
     * @type {number}
     */
    this.x = 0;

    /**
     * Resets the y-coordinate of the small chicken.
     * @type {number}
     */
    this.y = 0;
  }

  /**
   * Updates the state of the small chicken (placeholder for future implementation).
   */
  update() {}
}
