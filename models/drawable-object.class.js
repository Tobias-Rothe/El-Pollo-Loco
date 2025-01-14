/**
 * Represents a drawable object that can be rendered on a canvas.
 * Provides methods to load images, draw them, and manage image caching.
 */
class DrawableObject {
  /**
   * The current image to be drawn.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * A cache of loaded images.
   * @type {Object<string, HTMLImageElement>}
   */
  ImageCache = {};

  /**
   * The index of the currently displayed image (for animations).
   * @type {number}
   */
  currentImage = 0;

  /**
   * The x-coordinate of the object on the canvas.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate of the object on the canvas.
   * @type {number}
   */
  y = 230;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 10;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 10;

  /**
   * Loads an image from a given file path.
   * @param {string} path - The file path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image on the canvas.
   * If an error occurs, it logs the error to the console.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.error(`Fehler beim Zeichnen des Bildes: ${this.img?.src}`, error);
    }
  }

  /**
   * Draws a frame around the object if it is an instance of specific classes
   * (Character, Chicken, or Endboss).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} array - An array of file paths for the images to load.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
  }
}
