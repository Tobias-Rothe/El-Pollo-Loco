/**
 * Represents the status bar for the Endboss's health in the game.
 * Extends the functionality of the DrawableObject class.
 */
class StatusBarEndboss extends DrawableObject {
  /**
   * An array of image paths representing different health levels of the Endboss.
   * @type {string[]}
   */
  IMAGES = [
    "./img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /**
   * The current health percentage of the Endboss.
   * @type {number}
   */
  percentage = 100;

  /**
   * Initializes the status bar for the Endboss with default settings.
   */
  constructor() {
    super();

    // Preload all health status images.
    this.loadImages(this.IMAGES);

    /**
     * The x-coordinate position of the status bar on the screen.
     * @type {number}
     */
    this.x = 500;

    /**
     * The y-coordinate position of the status bar on the screen.
     * @type {number}
     */
    this.y = 20;

    /**
     * The width of the status bar.
     * @type {number}
     */
    this.width = 200;

    /**
     * The height of the status bar.
     * @type {number}
     */
    this.height = 60;

    // Set the initial health to 100%.
    this.setPercentage(100);
  }

  /**
   * Updates the status bar's appearance based on the given health percentage.
   * @param {number} percentage - The current health percentage of the Endboss (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;

    // Determine the appropriate image for the current health percentage.
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current health percentage.
   * @returns {number} The index of the image corresponding to the current health percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    else if (this.percentage > 80) return 4;
    else if (this.percentage > 60) return 3;
    else if (this.percentage > 40) return 2;
    else if (this.percentage > 20) return 1;
    else return 0;
  }
}
