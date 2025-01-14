/**
 * Represents the health status bar for the main character in the game.
 * Extends the DrawableObject class to manage images and positions.
 */
class StatusBar extends DrawableObject {
  /**
   * Array of image paths representing health levels in increments of 20%.
   * @type {string[]}
   */
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * The current health percentage of the character.
   * @type {number}
   */
  percentage = 100;

  /**
   * Initializes the status bar with default settings and loads all health level images.
   */
  constructor() {
    super();

    // Load all health level images into the cache.
    this.loadImages(this.IMAGES);

    /**
     * The x-coordinate of the status bar on the screen.
     * @type {number}
     */
    this.x = 5;

    /**
     * The y-coordinate of the status bar on the screen.
     * @type {number}
     */
    this.y = 45;

    /**
     * The height of the status bar.
     * @type {number}
     */
    this.height = 60;

    /**
     * The width of the status bar.
     * @type {number}
     */
    this.width = 150;

    // Set the initial health to 100%.
    this.setPercentages(100);
  }

  /**
   * Updates the displayed image based on the current health percentage.
   * @param {number} percentage - The current health percentage (0-100).
   */
  setPercentages(percentage) {
    this.percentage = percentage;

    // Determine the image path for the current health percentage.
    let path = this.IMAGES[this.resolveImageIndex()];

    // Update the displayed image.
    this.img = this.ImageCache[path];
  }

  /**
   * Determines the image index corresponding to the current health percentage.
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    return this.getIndexForPercentage(this.percentage);
  }

  /**
   * Maps a percentage to the appropriate image index in the IMAGES array.
   * @param {number} percentage - The current health percentage (0-100).
   * @returns {number} The index of the image corresponding to the given percentage.
   */
  getIndexForPercentage(percentage) {
    if (percentage === 100) return 5;
    if (percentage > 80) return 4;
    if (percentage > 60) return 3;
    if (percentage > 40) return 2;
    if (percentage > 20) return 1;
    return 0;
  }
}
