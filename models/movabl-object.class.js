class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  isDead = false;

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
    }, 1000 / 60);
  }

  reset() {
    this.isDead = false;
    this.x = this.startX; // Setze Position zurück
    this.y = this.startY; // Setze Position zurück
    // Weitere Eigenschaften zurücksetzen, falls notwendig
  }

  isAboveGround() {
    return this.y < 200;
  }

  isColliding(mo) {
    const offsetX = 20;
    const offsetY = 5;
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    if (!this.isDead) {
      this.energy -= 10;
      if (this.energy <= 0) {
        this.die();
      }
    }
  }
  die() {
    this.isDead = true;
    console.log("Das Objekt ist gestorben!");
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;

    this.walking_sound.play();
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images, frameDelay = 100) {
    // frameDelay in Millisekunden
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
