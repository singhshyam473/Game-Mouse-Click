var game = new Phaser.Game(800, 600, Phaser.AUTO);

var currentScene = "firststage";

// player
var player;

// player position
var playerLeftX = 15,
  playerRightX = 760,
  playerX = 15,
  playerY = 500;
var signboard = null;

//game states
game.state.add("Game", Game);
game.state.add("Menu", Menu);
game.state.add("player", Player);
game.state.add("firststage", firststage);
game.state.add("secondstage", secondstage);
game.state.start("Game");
