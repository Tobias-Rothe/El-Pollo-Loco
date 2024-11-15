let canvas;
let world;
let Keyboard = new KeyBoard();

function init() {
  canvas = document.getElementById("canvas");

  setCanvasSize(720, 480);
  world = new World(canvas, Keyboard);
  console.log("Mein Charakter ist", world.character);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    Keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    Keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    Keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    Keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    Keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    Keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    Keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    Keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    Keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    Keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    Keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    Keyboard.D = false;
  }
});

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  const canvas = document.getElementById("canvas");
  canvas.style.display = "block";
  init();
}

function restartGame() {
  location.reload();
}

function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

function toggleFullscreen() {
  const canvasContainer = document.getElementById("canvas-container");

  if (!document.fullscreenElement) {
    if (canvasContainer.requestFullscreen) {
      canvasContainer.requestFullscreen();
    } else if (canvasContainer.mozRequestFullScreen) {
      canvasContainer.mozRequestFullScreen();
    } else if (canvasContainer.webkitRequestFullscreen) {
      canvasContainer.webkitRequestFullscreen();
    } else if (canvasContainer.msRequestFullscreen) {
      canvasContainer.msRequestFullscreen();
    }

    canvas.classList.add("fullscreen");
    resizeCanvasToFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    canvas.classList.remove("fullscreen");
    setCanvasSize(720, 480);
  }
}

function resizeCanvasToFullscreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    resizeCanvasToFullscreen();
  } else {
    setCanvasSize(720, 480);
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    canvas.classList.add("fullscreen");
  } else {
    canvas.classList.remove("fullscreen");
    setCanvasSize(720, 480);
  }
});

function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    setCanvasSize(window.innerWidth, window.innerHeight);
  } else {
    setCanvasSize(720, 480);
  }
});

function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    setCanvasSize(screen.width, screen.height);
  } else {
    setCanvasSize(720, 480);
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    setCanvasSize(window.innerWidth, window.innerHeight);
  } else {
    setCanvasSize(720, 480);
  }
});

function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}

window.onload = function () {
  showStartScreen();
};

function showStartScreen() {
  const startScreen = document.getElementById("start-screen");
  const canvas = document.getElementById("canvas");
  canvas.style.display = "none";
  startScreen.style.display = "block";
  const ctx = canvas.getContext("2d");
  const backgroundImage = new Image();
  backgroundImage.src = "../img/9_intro_outro_screens/start/startscreen_2.png";
  backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Willkommen zu El Pollo Loco!", 150, 100);
  ctx.fillText("Klicke auf 'Spiel starten'", 150, 200);
}
