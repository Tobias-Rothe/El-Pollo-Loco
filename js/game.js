let canvas;
let world;
let Keyboard = new KeyBoard();

function initEventListeners() {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("resize", checkOrientation);

  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnJump = document.getElementById("btn-jump");
  const btnThrow = document.getElementById("btn-throw");

  addTouchListener(
    btnLeft,
    () => (Keyboard.LEFT = true),
    () => (Keyboard.LEFT = false)
  );
  addTouchListener(
    btnRight,
    () => (Keyboard.RIGHT = true),
    () => (Keyboard.RIGHT = false)
  );
  addTouchListener(
    btnJump,
    () => (Keyboard.SPACE = true),
    () => (Keyboard.SPACE = false)
  );
  addTouchListener(
    btnThrow,
    () => (Keyboard.D = true),
    () => (Keyboard.D = false)
  );
}

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
      world.toggleMute();
      break;
  }
}

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

function initCanvas() {
  canvas = document.getElementById("canvas");
  setCanvasSize(720, 480);
  world = new World(canvas, Keyboard);
}

function startGame() {
  hideElementById("start-screen");
  hideElementById("controlMenu");
  showElementById("canvas", "block");
  showElementById("mobile-controls", "flex");
  hideElementById("win-screen");
  hideElementById("game-over-screen");

  initCanvas();
}

function reloadPage() {
  location.reload();
}

function hideElementById(id) {
  document.getElementById(id).style.display = "none";
}

function showElementById(id, displayStyle) {
  document.getElementById(id).style.display = displayStyle;
}

function checkOrientation() {
  const overlay = document.getElementById("orientation-overlay");
  if (overlay) {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth <= 500;
    overlay.style.display = isPortrait && isMobile ? "flex" : "none";
  }
}

function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  checkOrientation();
  document.getElementById("controlButton").addEventListener("click", toggleControlMenu);
});

function toggleControlMenu() {
  const controlMenu = document.getElementById("controlMenu");
  controlMenu.style.display =
    controlMenu.style.display === "none" || controlMenu.style.display === "" ? "block" : "none";
}

function restartGame() {
  initCanvas();

  hideElementById("start-screen");
  hideElementById("controlMenu");
  showElementById("canvas", "block");
  showElementById("mobile-controls", "flex");
  hideElementById("win-screen");
  hideElementById("game-over-screen");
}
