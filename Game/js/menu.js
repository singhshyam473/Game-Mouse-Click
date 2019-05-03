var Menu = function() {
  console.log("gamestate menu");
};

Menu.prototype = {
  preload: preloadMain,
  create: createMain,
  update: updateMain
};

//load button and background image.
function preloadMain() {
  game.load.image("start", "assets/start.png");
  game.load.image("sky", "assets/sky.png");
}

var startButton;
//show the button and background image to the canvas of 800*600;
function createMain() {
  game.add.sprite(0, 0, "sky");

  startButton = game.add.button(
    game.world.centerX - 95,
    250,
    "start",
    startGame,
    this
  );
}

function updateMain() {}

// onlclick to go to main game state i.e. game.js
var startGame = function() {
  game.state.start("Game");
};
