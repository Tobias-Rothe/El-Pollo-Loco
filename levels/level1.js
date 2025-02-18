/**
 * Creates and returns the first level of the game.
 *
 * @returns {Level} The first level of the game.
 */
function createLevel1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Endboss(),
    ],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    [
      new Background("./img/5_background/layers/air.png", -719),
      new Background("./img/5_background/layers/3_third_layer/2.png", -719),
      new Background("./img/5_background/layers/2_second_layer/2.png", -719),
      new Background("./img/5_background/layers/1_first_layer/2.png", -719),

      new Background("./img/5_background/layers/air.png", 0),
      new Background("./img/5_background/layers/3_third_layer/1.png", 0),
      new Background("./img/5_background/layers/2_second_layer/1.png", 0),
      new Background("./img/5_background/layers/1_first_layer/1.png", 0),

      new Background("./img/5_background/layers/air.png", 719),
      new Background("./img/5_background/layers/3_third_layer/2.png", 719),
      new Background("./img/5_background/layers/2_second_layer/2.png", 719),
      new Background("./img/5_background/layers/1_first_layer/2.png", 719),

      new Background("./img/5_background/layers/air.png", 719 * 2),
      new Background("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new Background("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new Background("./img/5_background/layers/1_first_layer/1.png", 719 * 2),

      new Background("./img/5_background/layers/air.png", 719 * 3),
      new Background("./img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new Background("./img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new Background("./img/5_background/layers/1_first_layer/2.png", 719 * 3),

      new Background("./img/5_background/layers/air.png", 719 * 4),
      new Background("./img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new Background("./img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new Background("./img/5_background/layers/1_first_layer/1.png", 719 * 4),

      new Background("./img/5_background/layers/air.png", 719 * 5),
      new Background("./img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new Background("./img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new Background("./img/5_background/layers/1_first_layer/2.png", 719 * 5),
    ],
    5,
    5,
    [new ThrowableObject()]
  );
}
