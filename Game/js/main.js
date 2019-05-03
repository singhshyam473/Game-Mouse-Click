var game = new Phaser.Game(800, 600, Phaser.AUTO);
//game states
game.state.add("Game", Game);
game.state.add("Menu", Menu);
game.state.start("Menu");
