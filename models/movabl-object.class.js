class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  isDead = false;

  applayGravaty() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else return this.y < 180;
  }

  isColliding(mo) {
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

  playAnimation(images) {
    let i = this.currentImage % images.length; //let i =  0 % 6 ;  0, rest 0
    // i = 0,1,2,3,4,5,0,1,2,3....
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }
}
