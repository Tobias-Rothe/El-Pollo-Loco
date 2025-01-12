class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 230;

  height = 10;
  width = 10;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.error(`Fehler beim Zeichnen des Bildes: ${this.img?.src}`, error);
    }
  }

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
   *@param {Array} array-
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
  }
}
