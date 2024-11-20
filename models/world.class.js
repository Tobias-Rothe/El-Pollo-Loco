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
  isRestartListenerAdded = false;
  background_sound = new Audio("./audio/background.mp3");
  bottleCollect_sound = new Audio("./audio/bottle.mp3");
  bottleThrow_sound = new Audio("./audio/glass-shatter.mp3");
  collectCoins_sound = new Audio("./audio/coin.mp3");
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
    this.stopAllSounds();
    if (!this.isMuted) {
      this.background_sound.loop = true;
      this.background_sound.volume = 0.1;
      this.background_sound.play();
    }
  }

  getAllGameSounds() {
    return [...this.getCharacterSounds(), ...this.getGameEffectSounds(), ...this.getEnemySounds()];
  }

  getCharacterSounds() {
    return [this.character.walking_sound, this.character.jumping_sound, this.character.die_sound];
  }

  getGameEffectSounds() {
    return [
      this.bottleCollect_sound,
      this.bottleThrow_sound,
      this.collectCoins_sound,
      this.background_sound,
    ];
  }

  getEnemySounds() {
    return this.level.enemies
      .filter((enemy) => enemy.CHICKEN_SOUND)
      .map((enemy) => enemy.CHICKEN_SOUND);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    this.getAllGameSounds().forEach((sound) => {
      this.handleSoundMute(sound);
    });
  }

  handleSoundMute(sound) {
    if (!sound) return;

    sound.muted = this.isMuted;
    if (this.isMuted) {
      sound.pause();
    } else {
      this.playUnmutedSound(sound);
    }
  }

  playUnmutedSound(sound) {
    if (sound.loop || sound === this.background_sound) {
      sound.muted = false;
      sound.play();
    }
  }

  stopAllSounds() {
    this.stopSound(this.character.walking_sound);
    this.stopSound(this.character.jumping_sound);
    this.stopSound(this.character.die_sound);
    this.stopSound(this.background_sound);
  }

  stopSound(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      enemy.player = this.character;
    });
  }

  run() {
    this.intervalId = setInterval(() => {
      this.checkGameState();
      this.handleEndbossBehavior();
    }, 100);
  }

  checkGameState() {
    this.checkEnemyCollisions();
    this.checkThrowObjects();
    this.collectCoins();
    this.collectBottles();
    this.checkBottleCollisions();
    this.removeDeadEnemies();
    this.checkGameOver();
  }

  handleEndbossBehavior() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss && this.isCharacterNearEndboss() && !endboss.isDead) {
      if (!endboss.isAlerting) {
        endboss.animateAlert();
      }
      if (!endboss.isAttacking) {
        endboss.attack();
      }
    }
  }

  removeDeadEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isDead);
  }

  removeDeadEndboss(endboss) {
    this.level.enemies = this.level.enemies.filter((enemy) => enemy !== endboss);
  }

  checkEnemyCollisions() {
    if (!this.character || !this.character.isColliding) return;

    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        enemy instanceof SmallChicken
          ? this.handleSmallChickenCollision(enemy)
          : this.handleRegularEnemyCollision(enemy);
      }
    });
  }

  handleSmallChickenCollision(enemy) {
    if (this.character.isMoving()) {
      enemy.die();
    } else {
      this.reduceCharacterEnergy(enemy.damage || 5);
    }
  }

  handleRegularEnemyCollision(enemy) {
    const aboveEnemy = this.character.y + this.character.height - 20 < enemy.y;
    if (aboveEnemy && this.character.speedY < 0) {
      enemy.die();
      this.character.speedY = 15;
    } else {
      this.reduceCharacterEnergy(enemy.damage || 10);
    }
  }

  reduceCharacterEnergy(amount) {
    this.character.energy -= amount;
    this.statusBar.setPercentages(this.character.energy);

    if (this.character.energy <= 0) {
      this.character.energy = 0;
      this.character.isDead = true;
    }
  }

  collectCoins() {
    this.coins.forEach((coin, index) => {
      if (coin.isCollected(this.character)) {
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
        if (!this.isMuted) {
          this.bottleCollect_sound.play();
        }
        this.level.bottles.splice(index, 1);
        this.bottleStatusBar.setBottles(this.bottleStatusBar.bottlesCollected + 1);
      }
    });
  }
  showYouWinScreen() {
    setTimeout(() => {
      document.getElementById("win-screen").style.display = "block";
      document.getElementById("canvas").style.display = "none";
    }, 2000);
  }

  showGameOverScreen() {
    setTimeout(() => {
      document.getElementById("game-over-screen").style.display = "block";
      document.getElementById("canvas").style.display = "none";
    }, 1000);
  }

  checkGameOver() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);

    if (endboss && endboss.isDead && !this.endbossDefeated) {
      this.endbossDefeated = true;
      setTimeout(() => {
        this.stopAllSounds();
        this.showYouWinScreen();
      }, 2000);
      return;
    }

    if (this.character.energy <= 0 || this.character.isDead) {
      if (!this.characterDefeated) {
        this.characterDefeated = true;
        setTimeout(() => {
          this.stopAllSounds();
          this.showGameOverScreen();
        }, 2000);
      }
      return;
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.bottleStatusBar.bottlesCollected > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.bottleStatusBar.setBottles(this.bottleStatusBar.bottlesCollected - 1);
      }
    }
  }

  checkBottleCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          if (!this.isMuted) {
            this.bottleThrow_sound.play();
          }
          enemy.hit();
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  isCharacterNearEndboss() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss) {
      return Math.abs(this.character.x - endboss.x) < 500;
    }
    return false;
  }

  draw() {
    this.clearCanvas();
    this.ctx.save();
    this.translateCamera();
    this.drawLevelObjects();
    this.drawEndbossStatusBar();
    this.ctx.restore();
    this.drawStatusBars();
    this.scheduleNextFrame();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  translateCamera() {
    this.ctx.translate(this.camera_x, 0);
  }

  drawLevelObjects() {
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
  }

  drawEndbossStatusBar() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss && this.isCharacterNearEndboss()) {
      endboss.drawStatusBar(this.ctx);
    }
  }

  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
  }

  scheduleNextFrame() {
    requestAnimationFrame(() => this.draw());
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
