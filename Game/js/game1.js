var Game = {};

Game.preload = function() {
  game.load.image("sky", "assets/back.jpg");
  game.load.image("ground", "assets/platform.png");
  game.load.image("gameover", "assets/game_over_sign.png");
  game.load.spritesheet("person", "assets/dude.png", 32, 48);

  // game theme audio file load
  game.load.audio("main", "assets/theme.mp3");
};

var platforms;
var player;
var ground;
var sky, signboard;

Game.create = function() {
  music = game.add.audio("main");
  music.play();

  //game size limit set to 2000 * 600
  game.world.setBounds(0, 0, 2000, 600);

  // game.world.setBounds(0, 0, 1920, 600);

  //background image
  game.add.tileSprite(0, 0, 2000, 600, "sky");

  // form a group of platforms so that i can use it any number of time as i want in my game
  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(0, game.world.height -56 , "ground");
  ground.scale.setTo(5, 1.75);
  //make platform immovable so that character can stand in the platform
  ground.body.immovable = true;

  //end signboard to show the end of game size
  signboard = game.add.sprite(1900, game.world.height - 200, "gameover");
  signboard.scale.x = 0.3;
  signboard.scale.y = 0.3;

  //add character sprite to the canvas
  player = game.add.sprite(0, game.world.height - 112, "person");
  player.scale.x = 1;
  player.scale.y = 1;
  //apply the physics to the character i.e. motion, garvity,bounce, collide etc
  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.collideWorldBounds = true;

  //to make character or player y axis motion stop gravity is max.
  player.body.gravity.y = 50000;

  //character annimation for walking
  player.animations.add("left", [0, 1, 2, 3], 10, true);
  player.animations.add("right", [5, 6, 7, 8], 20, true);

  // background should follows the player so that character should visible in the playing zone i.e. 800*600 canvas
  game.camera.follow(player);

  game.add.text(1910, game.world.height - 170, " GameOver ", {
    fontSize: "17px",
    fill: "#000"
  });
};

Game.update = function() {
  //enable the collision between player and platforms.
  game.physics.arcade.collide(player, platforms);

  //if mouseclick event occur player start to move with a velocity
  if (game.input.mousePointer.isDown) {
    game.physics.arcade.moveToPointer(player, 1000);
    player.animations.play("right");

    //  if it's overlapping the mouse, don't move any more
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.velocity.setTo(0, 0);
      player.animations.stop();
    }
  } else {
    player.body.velocity.setTo(0, 0);
    player.animations.stop();
  }
  // if (game.input.mousePointer.isDown && game.input.activePointer.x < player.x)  {
  //     game.physics.arcade.moveToPointer(player,400);
  //   ﻿ player.animations.play('left');

  //     if (Phaser.Rectangle.contains(player.body,game.input.x,game.input.y)) {
  //         player.body.velocity.setTo(0,0);
  //       }
  //   }﻿
};
