/**
 * Represents the status bar for bottles collected in the game.
 * Extends the functionality of the DrawableObject class.
 */
class StatusBarBottle extends DrawableObject {
  /**
   * An array of image paths representing different states of the bottle status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /**
   * The current percentage of bottles collected, ranging from 0 to 100.
   * @type {number}
   */
  percentage = 100;

  /**
   * Initializes the status bar with default properties and preloads all status bar images.
   */
  constructor() {
    super();

    // Preload all images in the IMAGES array.
    this.loadImages(this.IMAGES);

    /**
     * The x-coordinate position of the status bar on the screen.
     * @type {number}
     */
    this.x = 5;

    /**
     * The y-coordinate position of the status bar on the screen.
     * @type {number}
     */
    this.y = 1;

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

    // Initialize the status bar with 0 bottles collected.
    this.setBottles(0);
  }

  /**
   * Sets the number of bottles collected and updates the status bar's appearance.
   * @param {number} bottles - The number of bottles collected (0 to 5).
   */
  setBottles(bottles) {
    /**
     * The number of bottles currently collected by the player.
     * @type {number}
     */
    this.bottlesCollected = bottles;

    // Calculate the percentage of bottles collected based on the maximum of 5.
    this.percentage = (bottles / 5) * 100;

    // Update the status bar image based on the percentage.
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * Resolves the appropriate image index for the current percentage of bottles collected.
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5; // Full status bar.
    return Math.floor(this.percentage / 20); // Determine image index based on percentage.
  }
}
