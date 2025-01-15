/**
 * Represents the game world and handles all game mechanics, objects, and rendering.
 */
class World {
  /**
   * Creates a new instance of the world.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   * @param {Object} keyboard - The keyboard controls for the character.
   */
  constructor(canvas, keyboard) {
    this.character = new Character();
    this.level = createLevel1();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.camera_x = 0;
    this.statusBar = new StatusBar();
    this.coinStatusBar = new StatusBarCoins();
    this.bottleStatusBar = new StatusBarBottle();
    this.isMuted = false;
    this.isRestartListenerAdded = false;
    this.background_sound = new Audio("./audio/background.mp3");
    this.bottleCollect_sound = new Audio("./audio/bottle.mp3");
    this.bottleThrow_sound = new Audio("./audio/glass-shatter.mp3");
    this.collectCoins_sound = new Audio("./audio/coin.mp3");
    this.coins = this.level.coins;
    this.throwableObjects = [];
    this.lastthrowbottle = new Date().getTime();
    this.draw();
    this.character.energy = 100;
    this.character.isDead = false;
    this.character.world = this;

    this.setWorld();
    this.playBackgroundSound();
    this.run();
  }

  /**
   * Plays the background sound if not muted.
   */
  playBackgroundSound() {
    this.stopAllSounds();
    if (!this.isMuted) {
      this.background_sound.loop = true;
      this.background_sound.volume = 0.1;
      this.background_sound.play();
    }
  }

  /**
   * Retrieves all game sounds including character, effect, and enemy sounds.
   * @returns {Audio[]} An array of all sounds in the game.
   */
  getAllGameSounds() {
    const allSounds = [
      ...this.getCharacterSounds(),
      ...this.getGameEffectSounds(),
      ...this.getEnemySounds(),
      click,
    ];

    return [...new Set(allSounds)];
  }

  /**
   * Retrieves all sounds related to the character.
   * @returns {Audio[]} An array of character-related sounds.
   */
  getCharacterSounds() {
    return [
      this.character.walking_sound,
      this.character.jumping_sound,
      this.character.die_sound,
      this.character.snore_sound,
      this.character.hurt_sound,
    ];
  }

  /**
   * Retrieves all game effect sounds.
   * @returns {Audio[]} An array of game effect sounds.
   */
  getGameEffectSounds() {
    return [
      this.bottleCollect_sound,
      this.bottleThrow_sound,
      this.collectCoins_sound,
      this.background_sound,
    ];
  }

  /**
   * Retrieves all sounds related to enemies.
   * @returns {Audio[]} An array of enemy-related sounds.
   */
  getEnemySounds() {
    return this.level.enemies.flatMap((enemy) => {
      const sounds = [];
      if (enemy instanceof BossSmallChicken && enemy.sound) {
        sounds.push(enemy.sound);
      }
      if (enemy.CHICKEN_SOUND) {
        sounds.push(enemy.CHICKEN_SOUND);
      }
      if (enemy instanceof Endboss && enemy.alertSound) {
        sounds.push(enemy.alertSound);
      }
      return sounds;
    });
  }

  /**
   * Stops the game, clears the interval, and stops all sounds.
   */
  stopGame() {
    this.gameStopped = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.stopAllSounds();
  }

  /**
   * Toggles the mute state of the game.
   */
  toggleMute() {
    WorldSounds.toggleMute(this);
  }

  /**
   * Stops all sounds in the game.
   */
  stopAllSounds() {
    WorldSounds.stopAllSounds(this);
  }

  /**
   * Sets the world for the character and enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      enemy.player = this.character;
    });
  }

  /**
   * Starts the game loop.
   */
  run() {
    this.intervalId = setInterval(() => {
      if (this.gameStopped) return;
      WorldCollisions.checkCollisions(this);
      this.checkThrowObjects();
      this.handleEndbossBehavior();
      this.checkGameOver();
    }, 100);
  }

  /**
   * Checks and updates the game state, including enemy collisions, object collections, and game over state.
   */
  checkGameState() {
    this.checkEnemyCollisions();
    this.checkThrowObjects();
    this.collectCoins();
    this.collectBottles();
    this.checkBottleCollisions();
    this.removeDeadEnemies();
    this.checkGameOver();
  }

  /**
   * Handles the behavior of the endboss when the character is near.
   */
  handleEndbossBehavior() {
    if (this.gameStopped) return;
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

  /**
   * Removes dead enemies from the level.
   */
  removeDeadEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isRemoved);
  }

  /**
   * Reduces the character's energy and handles the hurt state.
   * @param {number} amount - The amount of energy to reduce.
   */
  reduceCharacterEnergy(amount) {
    this.character.energy -= amount;
    this.character.isHurt = true;
    this.statusBar.setPercentages(this.character.energy);
    if (!this.isMuted && this.character.hurt_sound) {
      this.character.hurt_sound.play();
    }

    setTimeout(() => {
      this.character.isHurt = false;
    }, 1000);
    if (this.character.energy <= 0) {
      this.character.energy = 0;
      this.character.isDead = true;
      if (!this.isMuted && this.character.die_sound) {
        this.character.die_sound.play();
      }
    }
  }

  /**
   * Collects bottles when the character interacts with them.
   */
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

  /**
   * Displays the "You Win" screen when the player wins.
   */
  /**
   * Displays the "You Win" screen when the player wins.
   */
  /**
   * Displays the "You Win" screen when the player wins.
   */
  showYouWinScreen() {
    this.stopGame();
    WorldSounds.stopAllSounds(this);
    this.getAllGameSounds().forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });

    setTimeout(() => {
      document.getElementById("win-screen").style.display = "flex";
      document.getElementById("canvas").style.display = "none";
      document.getElementById("mobile-controls").style.display = "none";
    }, 100);
  }

  /**
   * Displays the "Game Over" screen when the game ends.
   */
  showGameOverScreen() {
    this.stopGame();
    WorldSounds.stopAllSounds(this);
    this.getAllGameSounds().forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });

    setTimeout(() => {
      document.getElementById("game-over-screen").style.display = "flex";
      document.getElementById("canvas").style.display = "none";
      document.getElementById("mobile-controls").style.display = "none";
    }, 200);
  }

  /**
   * Checks if the game is over based on the character's energy or death.
   */
  checkGameOver() {
    if (this.gameStopped) return;

    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss && endboss.isDead && !this.endbossDefeated) {
      this.endbossDefeated = true;

      this.stopAllSounds();
      WorldSounds.stopAllSounds(this);

      setTimeout(() => {
        this.showYouWinScreen();
      }, 100);
      return;
    }

    if (this.character.energy <= 0 || this.character.isDead) {
      if (!this.characterDefeated) {
        this.characterDefeated = true;

        this.stopAllSounds();
        WorldSounds.stopAllSounds(this);

        setTimeout(() => {
          this.showGameOverScreen();
        }, 100);
      }
      return;
    }
  }

  /**
   * Checks if the character is near the endboss and handles object throwing.
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.lastthrowbottle + 1000 < new Date().getTime()) {
        if (this.bottleStatusBar.bottlesCollected > 0) {
          let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
          this.throwableObjects.push(bottle);
          this.bottleStatusBar.setBottles(this.bottleStatusBar.bottlesCollected - 1);
          this.lastthrowbottle = new Date().getTime();
        }
      }
    }
  }

  /**
   * Checks if the character is near the endboss.
   * @returns {boolean} True if the character is close to the endboss, false otherwise.
   */
  isCharacterNearEndboss() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss) {
      return Math.abs(this.character.x - endboss.x) < 500;
    }
    return false;
  }

  /**
   * Draws the game world on the canvas.
   */
  draw() {
    if (this.gameStopped) {
      return;
    }
    this.clearCanvas();
    this.ctx.save();
    this.translateCamera();
    this.drawLevelObjects();
    this.drawEndbossStatusBar();
    this.ctx.restore();
    this.drawStatusBars();
    this.scheduleNextFrame();
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Translates the camera to simulate scrolling.
   */
  translateCamera() {
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws all objects in the level.
   */
  drawLevelObjects() {
    this.removeDeadEnemies();
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
  }

  /**
   * Draws the status bar of the endboss if near.
   */
  drawEndbossStatusBar() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss && this.isCharacterNearEndboss()) {
      endboss.drawStatusBar(this.ctx);
    }
  }

  /**
   * Draws all status bars (character energy, coins, bottles).
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
  }

  /**
   * Schedules the next frame to draw.
   */
  scheduleNextFrame() {
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds objects to the map (level items, characters, etc.).
   * @param {Object[]} objects - An array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an individual object to the map.
   * @param {Object} mo - The object to add to the map.
   */
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

  /**
   * Flips an image horizontally.
   * @param {Object} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Resets the image flip after drawing.
   * @param {Object} mo - The object to reset flip for.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
