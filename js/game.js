let canvas;
let world;
let Keyboard = new KeyBoard();
let isMuted = false;

document.addEventListener("DOMContentLoaded", () => {
  const muteButton = document.getElementById("mute-button");
  if (muteButton) {
    muteButton.addEventListener("click", () => {
      if (world) {
        world.toggleMute();
        updateMuteButtonText();
      }
    });
  }
});

function updateMuteButtonText() {
  const muteButton = document.getElementById("mute-button");
  if (muteButton) {
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
  }
}

function initEventListeners() {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("resize", checkOrientation);

  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnJump = document.getElementById("btn-jump");
  const btnThrow = document.getElementById("btn-throw");

  /**
   * Adds touch event listeners to the left button.
   *
   * @function addTouchListener
   * @param {HTMLElement} btnLeft - The left button element.
   * @param {Function} touchStartHandler - The function to call on touch start.
   * @param {Function} touchEndHandler - The function to call on touch end.
   */
  addTouchListener(
    btnLeft,
    () => (Keyboard.LEFT = true),
    () => (Keyboard.LEFT = false)
  );

  /**
   * Adds touch event listeners to the right button.
   *
   * @function addTouchListener
   * @param {HTMLElement} btnRight - The right button element.
   * @param {Function} touchStartHandler - The function to call on touch start.
   * @param {Function} touchEndHandler - The function to call on touch end.
   */
  addTouchListener(
    btnRight,
    () => (Keyboard.RIGHT = true),
    () => (Keyboard.RIGHT = false)
  );

  /**
   * Adds touch event listeners to the jump button.
   *
   * @function addTouchListener
   * @param {HTMLElement} btnJump - The jump button element.
   * @param {Function} touchStartHandler - The function to call on touch start.
   * @param {Function} touchEndHandler - The function to call on touch end.
   */
  addTouchListener(
    btnJump,
    () => (Keyboard.SPACE = true),
    () => (Keyboard.SPACE = false)
  );

  /**
   * Adds touch event listeners to the throw button.
   *
   * @function addTouchListener
   * @param {HTMLElement} btnThrow - The throw button element.
   * @param {Function} touchStartHandler - The function to call on touch start.
   * @param {Function} touchEndHandler - The function to call on touch end.
   */
  addTouchListener(
    btnThrow,
    () => (Keyboard.D = true),
    () => (Keyboard.D = false)
  );
}

/**
 * Handles the keydown event.
 *
 * @function handleKeyDown
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyDown(e) {
  switch (e.keyCode) {
    case 39:
      Keyboard.RIGHT = true;
      break;
    case 37:
      Keyboard.LEFT = true;
      break;
    case 38:
      Keyboard.UP = true;
      break;
    case 40:
      Keyboard.DOWN = true;
      break;
    case 32:
      Keyboard.SPACE = true;
      break;
    case 68:
      Keyboard.D = true;
      break;
    case 77:
      Keyboard.M = true;
      if (!world) return;
      world.toggleMute();
      updateMuteButtonText();
      break;
  }
}

/**
 * Handles the keyup event.
 *
 * @function handleKeyUp
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyUp(e) {
  switch (e.keyCode) {
    case 39:
      Keyboard.RIGHT = false;
      break;
    case 37:
      Keyboard.LEFT = false;
      break;
    case 38:
      Keyboard.UP = false;
      break;
    case 40:
      Keyboard.DOWN = false;
      break;
    case 32:
      Keyboard.SPACE = false;
      break;
    case 68:
      Keyboard.D = false;
      break;
    case 77:
      Keyboard.M = false;
      break;
  }
}

/**
 * Adds touch event listeners to an element.
 *
 * @param {HTMLElement} element - The element to which the touch listeners will be added.
 * @param {Function} onStart - The callback function to be executed when a touchstart event occurs.
 * @param {Function} onEnd - The callback function to be executed when a touchend or touchcancel event occurs.
 */
function addTouchListener(element, onStart, onEnd) {
  element.addEventListener("touchstart", (e) => {
    e.preventDefault();
    onStart();
  });
  element.addEventListener("touchend", (e) => {
    e.preventDefault();
    onEnd();
  });
  element.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    onEnd();
  });
}

/**
 * Initializes the canvas element and sets up the game world.
 *
 * This function performs the following steps:
 * 1. Retrieves the canvas element by its ID.
 * 2. Sets the size of the canvas to 720x480 pixels.
 * 3. Initializes the game world with the canvas and keyboard input.
 */
function initCanvas() {
  canvas = document.getElementById("canvas");
  setCanvasSize(720, 480);
  world = new World(canvas, Keyboard);
}

/**
 * Initializes and starts the game by setting up the necessary UI elements and canvas.
 *
 * This function performs the following actions:
 * - Hides the start screen and control menu.
 * - Displays the game canvas and mobile controls.
 * - Hides the win screen and game over screen.
 * - Initializes the game canvas.
 */
function startGame() {
  hideElementById("start-screen");
  hideElementById("controlMenu");
  showElementById("canvas", "block");
  showElementById("mobile-controls", "flex");
  hideElementById("win-screen");
  hideElementById("game-over-screen");

  initCanvas();
}

/**
 * Reloads the current page.
 */
function reloadPage() {
  location.reload();
}

/**
 * Hides an HTML element by setting its display style to "none".
 *
 * @param {string} id - The ID of the HTML element to hide.
 */
function hideElementById(id) {
  document.getElementById(id).style.display = "none";
}

/**
 * Displays or hides an HTML element by its ID.
 *
 * @param {string} id - The ID of the HTML element to show or hide.
 * @param {string} displayStyle - The CSS display style to apply (e.g., 'block', 'none').
 */
function showElementById(id, displayStyle) {
  document.getElementById(id).style.display = displayStyle;
}

/**
 * Checks the orientation of the device and displays or hides the orientation overlay accordingly.
 * The overlay is shown if the device is in portrait mode and the screen width is 500 pixels or less.
 */
function checkOrientation() {
  const overlay = document.getElementById("orientation-overlay");
  if (overlay) {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth <= 500;
    overlay.style.display = isPortrait && isMobile ? "flex" : "none";
  }
}

/**
 * Sets the size of the canvas element.
 *
 * @param {number} width - The desired width of the canvas in pixels.
 * @param {number} height - The desired height of the canvas in pixels.
 */
function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

/**
 * Adds event listeners after the DOM content has been fully loaded.
 * This ensures all DOM elements are available before adding interactions.
 */
document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  checkOrientation();
  document.getElementById("controlButton").addEventListener("click", toggleControlMenu);
});

/**
 * Toggles the visibility of the control menu.
 * If the control menu is currently hidden, it will be displayed.
 * If the control menu is currently displayed, it will be hidden.
 */
function toggleControlMenu() {
  const controlMenu = document.getElementById("controlMenu");
  controlMenu.style.display =
    controlMenu.style.display === "none" || controlMenu.style.display === "" ? "block" : "none";
}

/**
 * Restarts the game by reinitializing the canvas and updating the visibility of various game elements.
 *
 * This function performs the following actions:
 * - Initializes the game canvas.
 * - Hides the start screen and control menu.
 * - Shows the game canvas and mobile controls.
 * - Hides the win screen and game over screen.
 */
function restartGame() {
  initCanvas();
  checkSounds();

  hideElementById("start-screen");
  hideElementById("controlMenu");
  showElementById("canvas", "block");
  showElementById("mobile-controls", "flex");
  hideElementById("win-screen");
  hideElementById("game-over-screen");
}

function checkSounds() {
  const sounds = world.getAllGameSounds();
  sounds.forEach((sound) => {
    WorldSounds.manageSounds(sound);
  });
}
