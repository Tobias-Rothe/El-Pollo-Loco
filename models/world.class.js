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
  isMuted = false;
  background_sound = new Audio("../audio/background.mp3");
  bottleCollect_sound = new Audio("../audio/bottle.mp3");
  bottleThrow_sound = new Audio("../audio/glass-shatter.mp3");
  collectCoins_sound = new Audio("../audio/coin.mp3");

  coins = this.level.coins;
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.character.energy = 100;
    this.character.isDead = false;
    this.isMuted = false;
    this.character.world = this;

    this.setWorld();
    this.playBackgroundSound();
    this.run();
  }

  playBackgroundSound() {
    if (!this.isMuted) {
      this.background_sound.loop = true;
      this.background_sound.volume = 0.1;
      this.background_sound.play();
    }
  }

  getAllGameSounds() {
    return [
      this.character.walking_sound,
      this.character.jumping_sound,
      this.character.die_sound,
      this.bottleCollect_sound,
      this.bottleThrow_sound,
      this.collectCoins_sound,
      this.background_sound,
      ...this.level.enemies
        .filter((enemy) => enemy instanceof Chicken)
        .map((chicken) => chicken.CHICKEN_SOUND),
    ];
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    this.getAllGameSounds().forEach((sound) => {
      if (sound) {
        sound.muted = this.isMuted;
        if (this.isMuted) {
          sound.pause();
        } else if (sound.loop || sound === this.background_sound) {
          sound.play();
        }
      }
    });
  }

  stopAllSounds() {
    if (this.character.walking_sound) {
      this.character.walking_sound.pause();
    }
    if (this.character.jumping_sound) {
      this.character.jumping_sound.pause();
    }
    if (this.character.die_sound) {
      this.character.die_sound.pause();
    }
  }

  setWorld() {
    this.character.world = this;
  }

  restartGame() {
    this.resetCharacterAndStatusBars();
    this.resetLevelAndEnemies();
    this.resetCanvasAndSounds();
    this.updateDisplayElements();
    this.restartProcesses();
  }

  resetCharacterAndStatusBars() {
    this.character = new Character();
    Object.assign(this.character, {
      world: this,
      energy: 100,
      isDead: false,
      x: 0,
      y: 200,
    });

    this.statusBar.setPercentages(100);
    this.coinStatusBar.setCoins(0);
    this.bottleStatusBar.setBottles(0);

    this.throwableObjects = [];
  }

  resetLevelAndEnemies() {
    this.level.enemies = [];

    for (let i = 0; i < 10; i++) {
      this.level.enemies.push(new Chicken());
    }

    this.level.enemies.push(new SmallChicken());
    this.level.enemies.push(new Endboss());
  }

  resetEnemy(enemy) {
    if (enemy.isDead) {
      enemy.isDead = false;
      enemy.x = enemy.startX;
      enemy.y = enemy.startY;
    }
  }

  resetCanvasAndSounds() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera_x = 0;

    this.getAllGameSounds().forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
        if (!this.isMuted && !sound.paused && sound.loop) {
          sound.play();
        }
      }
    });
  }

  updateDisplayElements() {
    this.toggleElementDisplay("gameOverScreen", "none");
    this.toggleElementDisplay("canvas", "block");
  }

  toggleElementDisplay(elementId, displayStyle) {
    const element = document.getElementById(elementId);
    if (element) element.style.display = displayStyle;
  }

  restartProcesses() {
    cancelAnimationFrame(this.animationFrameId);
    this.run();
    this.draw();
  }

  run() {
    this.intervalId = setInterval(() => {
      this.checkEnemyCollisions();
      this.checkThrowObjects();
      this.collectCoins();
      this.collectBottles();
      this.checkBottleCollisions();
      this.removeDeadEnemies();
      this.checkGameOver();
    }, 100);
  }

  removeDeadEnemies() {
    console.log("Vor dem Entfernen von toten Gegnern:", this.level.enemies);
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isDead);
    console.log("Nach dem Entfernen von toten Gegnern:", this.level.enemies);
  }

  checkEnemyCollisions() {
    if (this.character && this.character.isColliding) {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !enemy.isDead) {
          if (enemy instanceof SmallChicken) {
            this.character.isMoving()
              ? (enemy.die(), console.log("SmallChicken getötet!"))
              : ((this.character.energy -= enemy.damage || 5),
                console.log("SmallChicken verursacht Schaden!"));
            this.statusBar.setPercentages(this.character.energy);
          } else {
            const aboveEnemy = this.character.y + this.character.height - 20 < enemy.y;
            if (aboveEnemy && this.character.speedY < 0) {
              enemy.die();
              this.character.speedY = 15;
              console.log("Gegner von oben getötet!");
            } else {
              this.character.energy -= enemy.damage || 10;
              this.statusBar.setPercentages(this.character.energy);
            }
          }
        }
      });
    }
  }

  collectCoins() {
    this.coins.forEach((coin, index) => {
      if (coin.isCollected(this.character)) {
        console.log(`Münze bei Index ${index} eingesammelt!`);
        if (!this.isMuted) {
          this.collectCoins_sound.play();
        }
        this.coins.splice(index, 1);
        this.coinStatusBar.setCoins(this.coinStatusBar.coinsCollected + 1);
      }
    });
  }

  collectBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (bottle.isCollected(this.character)) {
        console.log(`Flasche bei Index ${index} eingesammelt!`);
        if (!this.isMuted) {
          this.bottleCollect_sound.play();
        }
        this.level.bottles.splice(index, 1);
        this.bottleStatusBar.setBottles(this.bottleStatusBar.bottlesCollected + 1);
      }
    });
  }

  checkGameOver() {
    if (this.character.energy <= 0 && !this.character.isDead) {
      this.character.isDead = true;
      this.character.triggerGameOverScreen();
    }
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

  checkBottleCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          console.log("Endboss durch Flasche getroffen!");
          if (!this.isMuted) {
            this.bottleThrow_sound.play();
          }
          enemy.hit();
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  checkGameOverDisplay() {
    if (this.character.isDead) {
      cancelAnimationFrame(this.animationFrameId);
      document.getElementById("canvas").style.display = "none";
      const gameOverScreen = document.getElementById("gameOverScreen");
      if (gameOverScreen) {
        gameOverScreen.style.display = "flex";
        const restartButton = document.getElementById("restartButton");
        if (restartButton) {
          restartButton.style.display = "block";
          restartButton.addEventListener("click", () => {
            this.restartGame();
          });
        }
      }
    }
  }

  isCharacterNearEndboss() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss) {
      return Math.abs(this.character.x - endboss.x) < 500;
    }
    return false;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss && this.isCharacterNearEndboss()) {
      endboss.drawStatusBar(this.ctx);
    }
    this.ctx.restore();
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
