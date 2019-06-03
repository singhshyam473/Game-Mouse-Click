var Game = function() {
  console.log("Game state");
};

Game.prototype = {
  preload: function() {
    game.load.spritesheet("chibi-walk", "assets/chibi-walk.png", 46, 76, 2);

    game.load.image("background", "assets/background.png");
    game.load.image("sky", "assets/sky.png");
    game.load.image("road", "assets/ground.png");
    game.load.image("gameover", "assets/game_over_sign.png");

    // game theme audio file load
    game.load.audio("main", "assets/theme.mp3");
  },
  create: function() {
    game.state.start("Menu");
  },
  update: function() {}
};
