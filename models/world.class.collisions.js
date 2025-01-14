/**
 * Handles all collision checks and item collections in the game world.
 */
/**
 * The WorldCollisions object contains methods to handle various collisions and collections in the game world.
 *
 * @namespace WorldCollisions
 *
 * @property {Function} checkCollisions - Checks various collisions and collections in the game world.
 * @property {Function} checkEnemyCollisions - Checks for collisions between the character and enemies.
 * @property {Function} isLandedOnEnemy - Determines if the character has landed on an enemy.
 * @property {Function} handleLandedEnemies - Handles the event when the character lands on enemies.
 * @property {Function} handleEnemyCollisions - Handles collisions with specific enemy types.
 * @property {Function} handleRegularEnemyCollision - Handles collisions with regular enemies.
 * @property {Function} checkBottleCollisions - Checks for collisions between throwable bottles and enemies.
 * @property {Function} collectCoins - Handles the collection of coins by the character.
 * @property {Function} collectBottles - Handles the collection of bottles by the character.
 */
const WorldCollisions = {
  /**
   * Checks various collisions and collections in the game world.
   * @param {Object} world - The game world object containing character, enemies, items, etc.
   */
  checkCollisions(world) {
    this.checkEnemyCollisions(world);
    this.checkBottleCollisions(world);
    this.collectCoins(world);
    this.collectBottles(world);
  },

  /**
   * Checks for collisions between the character and enemies.
   * @param {Object} world - The game world object.
   */
  checkEnemyCollisions(world) {
    const enemiesLandedOn = [];

    world.level.enemies.forEach((enemy) => {
      if (world.character.isColliding(enemy) && !enemy.isDead) {
        const landedOnEnemy = this.isLandedOnEnemy(world, enemy);
        if (landedOnEnemy) {
          enemiesLandedOn.push(enemy);
        } else {
          this.handleRegularEnemyCollision(world, enemy);
        }
      }
    });

    if (enemiesLandedOn.length > 0) {
      this.handleLandedEnemies(world, enemiesLandedOn);
    }
  },

  isLandedOnEnemy(world, enemy) {
    const tolerance = 20;
    return (
      world.character.y + world.character.height > enemy.y - tolerance &&
      world.character.y + world.character.height < enemy.y + enemy.height / 1.5 + tolerance &&
      world.character.speedY > 0
    );
  },

  handleLandedEnemies(world, enemies) {
    enemies.forEach((enemy) => {
      enemy.die();
    });

    world.character.speedY = -6;
    world.character.y = Math.min(...enemies.map((enemy) => enemy.y)) - world.character.height;
  },

  /**
   * Handles collisions with specific enemy types.
   * @param {Object} world - The game world object.
   * @param {Object} enemy - The enemy object.
   */
  handleEnemyCollisions(world, enemy) {
    if (enemy instanceof BossSmallChicken) {
      this.handleThrownSmallChickenCollision(world, enemy);
    } else if (enemy instanceof SmallChicken) {
      this.handleSmallChickenCollision(world, enemy);
    } else {
      this.handleRegularEnemyCollision(world, enemy);
    }
  },

  handleThrownSmallChickenCollision(world, enemy) {
    if (world.character.isMoving()) {
      enemy.die();
      world.level.enemies = world.level.enemies.filter((e) => e !== enemy);
    } else {
      world.reduceCharacterEnergy(enemy.damage || 5);
    }
  },

  /**
   * Handles collisions with small chickens.
   * @param {Object} world - The game world object.
   * @param {Object} enemy - The small chicken enemy.
   */

  /**
   * Handles collisions with regular enemies.
   * @param {Object} world - The game world object.
   * @param {Object} enemy - The regular enemy.
   */
  handleRegularEnemyCollision(world, enemy) {
    if (!enemy.isDead) {
      const damage = enemy instanceof SmallChicken ? enemy.damage || 5 : enemy.damage || 10;
      world.reduceCharacterEnergy(damage);
    }
  },

  /**
   * Checks for collisions between throwable bottles and enemies.
   * @param {Object} world - The game world object.
   */
  checkBottleCollisions(world) {
    world.throwableObjects.forEach((bottle, index) => {
      world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          if (!isMuted) {
            world.bottleThrow_sound.play();
          }
          enemy.hit();
          world.throwableObjects.splice(index, 1);
        }
      });
    });
  },

  /**
   * Handles the collection of coins by the character.
   * @param {Object} world - The game world object.
   */
  collectCoins(world) {
    world.coins.forEach((coin, index) => {
      const shrink = { w: 5, h: 20 };
      const cL = coin.x + shrink.w,
        cR = coin.x + coin.width - shrink.w;
      const cT = coin.y + shrink.h,
        cB = coin.y + coin.height - shrink.h;
      const char = world.character,
        chL = char.x,
        chR = char.x + char.width;
      const chT = char.y,
        chB = char.y + char.height;
      if (chR > cL && chL < cR && chB > cT && chT < cB) {
        if (!isMuted) world.collectCoins_sound.play();
        world.coins.splice(index, 1);
        world.coinStatusBar.setCoins(world.coinStatusBar.coinsCollected + 1);
      }
    });
  },

  /**
   * Handles the collection of bottles by the character.
   * @param {Object} world - The game world object.
   */
  collectBottles(world) {
    world.level.bottles.forEach((bottle, index) => {
      if (bottle.isCollected(world.character)) {
        if (!isMuted) {
          world.bottleCollect_sound.play();
        }
        world.level.bottles.splice(index, 1);
        world.bottleStatusBar.setBottles(world.bottleStatusBar.bottlesCollected + 1);
      }
    });
  },
};
