var secondstage = function() {
  console.log("2 stage");
};
secondstage.prototype = {
  preload: function() {
    currentScene = "secondstage";
    player = new Player();
  },
  create: function() {
    this.game.add.image(0, 0, "sky");
    this.game.add.image(0, game.world.height - 190, "road");
    this.signboard = game.add.sprite(650, game.world.height - 300, "gameover");
    this.signboard.scale.x = 0.3;
    this.signboard.scale.y = 0.3;

    music = game.add.audio("main");
    music.play();

    this.game.add.text(660, game.world.height - 280, " GameOver ", {
      fontSize: "17px",
      fill: "#000"
    });

    player.create();
  },
  update: function() {
    player.update();
  }
};
