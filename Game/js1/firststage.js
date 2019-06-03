var firststage = function() {
  console.log("1 stage");
};
firststage.prototype = {
  preload: function() {
    currentScene = "firststage";
    player = new Player();
  },
  create: function() {
    this.game.add.image(0, 0, "background");
    this.game.add.image(0, game.world.height - 190, "road");

    music = game.add.audio("main");
    music.play();

    player.create();
  },
  update: function() {
    player.update();
  }
};
