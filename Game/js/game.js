var Game = {};

Game.preload = function() {
  game.load.image("background", "assets/background.png");
  game.load.image("ground", "assets/ground.png");
  game.load.image("gameover", "assets/game_over_sign.png");
  game.load.spritesheet("person", "assets/dude.png", 32, 48);

  // game theme audio file load
  game.load.audio("main", "assets/theme.mp3");
};

var platforms;
var player;
var ground;
var sky, signboard;
var mx = -100; 
var sx = 0; 
var my = -100; 
var sy = 0; 

Game.create = function() {
  music = game.add.audio("main");
  music.play();

  game.input.mouse.capture = true;

  //game size limit set to 2000 * 600
  game.world.setBounds(0, 0, 2000, 600);


  //background image
  game.add.tileSprite(0, 0, 800, 600, "background");

  // form a group of platforms so that i can use it any number of time as i want in my game
  platforms = game.add.group();
  platforms.enableBody = true;

  ground = platforms.create(0, game.world.height - 150, "ground");
  // ground.scale.x = 1.5;
  ground.scale.y = 1.5;
  ground.scale.setTo(3, 1);
  //make platform immovable so that character can stand in the platform
  ground.body.immovable = true;

  //end signboard to show the end of game size
  signboard = game.add.sprite(1810, game.world.height - 200, "gameover");
  signboard.scale.x = 0.3;
  signboard.scale.y = 0.3;
  game.add.text(1815, game.world.height - 170, " GameOver ", {
    fontSize: "17px",
    fill: "#000"
  });

  //add character sprite to the canvas
  player = game.add.sprite(0, game.world.height - 136, "person");
  player.scale.x = 1.5;
  player.scale.y = 1.5;
  //apply the physics to the character i.e. motion, garvity,bounce, collide etc
  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.collideWorldBounds = true;


  //character annimation for walking
  player.animations.add("left", [0, 1, 2, 3], 10, true);
  player.animations.add("right", [5, 6, 7, 8], 10, true);

  // background should follows the player so that character should visible in the playing zone i.e. 800*600 canvas
  game.camera.follow(player);
  // game.camera.deadzone = new Phaser.Rectangle(50,50,700,﻿500);
  // game.camera.deadzone.setTo(50,50,2000,500);

  
};

// var pointer = game.input.activePointer;
// var isMovingRight = 0;
// var isMovingLeft = 0;

var move = 0;
//var movey = 0;


Game.update = function() {
  //enable the collision between player and platforms.
  game.physics.arcade.collide(player, platforms);

  console.log("player.x: " + Math.floor(player.x))
  console.log("player.y: " +  Math.floor(player.y))
  // console.log("mx: " + mx)
  console.log("my: " + my)
  console.log("move: "+move)

  if (player.x>mx-1&&player.x<mx+1) {
    console.log("reached")
    player.body.velocity.x = 0;
    player.animations.stop();
    move = 0;
  }

  // if (player.y>my-3&&player.y<my+3) {
  //   player.body.velocity.y = 0;
  //   movey = 0;
  // }

  if (move==1) {
      if (Math.floor(player.x)<=mx) {
        //move right
        player.body.velocity.x = 100;
        player.animations.play("right");
      }
      else {
        player.body.velocity.x = -100;
        player.animations.play("left");
      } 

    // if (movey==1) 
    // {
    //   if (my<450&&player.y>450) {
    //       //move right
    //       player.body.velocity.y = -50;
    //       // player.animations.play("right");
    //   }
    //   else {
    //     if (Math.floor(player.y)<my) {
    //       player.body.velocity.y = 50;
    //     }
    //   }
    // }

  }

  // if mouseclick event occur player start to move with a velocity
  if (game.input.activePointer.leftButton.isDown) {
    mx = Math.floor(game.input.mousePointer.x);
    my = Math.floor(game.input.mousePointer.y);
    console.log("Mouse clicked")
    move = 1;
    movey = 1;
      
  }

};
