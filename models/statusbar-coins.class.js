/**
 * Represents the status bar for coins collected in the game.
 * Extends the functionality of the DrawableObject class.
 */
class StatusBarCoins extends DrawableObject {
  /**
   * An array of image paths representing different states of the coin status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * The number of coins currently collected by the player.
   * @type {number}
   */
  coinsCollected = 0;

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
    this.y = 90;

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

    // Initialize the status bar with 0 coins collected.
    this.setCoins(0);
  }

  /**
   * Sets the number of coins collected and updates the status bar's appearance.
   * @param {number} coins - The number of coins collected by the player (up to a maximum of 5).
   */
  setCoins(coins) {
    this.coinsCollected = coins;

    // Update the status bar image based on the number of coins collected.
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * Resolves the appropriate image index for the current number of coins collected.
   * @returns {number} The index of the image corresponding to the current number of coins.
   */
  resolveImageIndex() {
    // Ensure the image index does not exceed the maximum value of 5.
    return Math.min(this.coinsCollected, 5);
  }
}
