class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinStatusBar = new StatusBarCoins();
  bottleStatusBar = new StatusBarBottle();

  coins = this.level.coins;
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();

    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkThrowObjects();
      this.collectCoins();
      this.collectBottles();
      this.checkBottleCollisions();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.bottleStatusBar.bottlesCollected > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.bottleStatusBar.setBottles(this.bottleStatusBar.bottlesCollected - 1);
        console.log("Flasche geworfen!");
      }
    }
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      // Prüfen, ob der Charakter und das Huhn kollidieren
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        const characterBottom = this.character.y + this.character.height;
        const enemyTop = enemy.y;

        // Bedingung: Charakter trifft auf das Huhn von oben, während er nach unten fällt
        const characterAboveEnemy = characterBottom - 20 < enemyTop; // Erhöhe den Wert für mehr Flexibilität
        const isFalling = this.character.speedY < 0;

        if (characterAboveEnemy && isFalling) {
          console.log("Gegner durch Sprung von oben getötet!");
          enemy.die();
          this.character.speedY = 15; // Leichter Rückstoß nach oben
        } else {
          // Falls die Kollision nicht von oben erfolgte (also seitlich oder unten)
          console.log("Der Charakter wurde vom Gegner getroffen!");
          this.character.hit();
          this.statusBar.setPercentages(this.character.energy);
        }
      }
    });
  }

  collectCoins() {
    this.coins.forEach((coin, index) => {
      if (coin.isCollected(this.character)) {
        console.log(`Münze bei Index ${index} eingesammelt!`);
        this.coins.splice(index, 1);
        this.coinStatusBar.setCoins(this.coinStatusBar.coinsCollected + 1);
      }
    });
  }

  collectBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (bottle.isCollected(this.character)) {
        console.log(`Flasche bei Index ${index} eingesammelt!`);
        this.level.bottles.splice(index, 1);
        this.bottleStatusBar.setBottles(this.bottleStatusBar.bottlesCollected + 1);
      }
    });
  }

  checkBottleCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          console.log("Gegner durch Flasche getroffen!");
          enemy.die();
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save(); // Speichern des aktuellen Kontextes

    this.ctx.translate(this.camera_x, 0); // Kamera verschieben
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.ctx.restore(); // Zurücksetzen des Kontextes

    // Statusleisten müssen nicht übersetzt werden
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
