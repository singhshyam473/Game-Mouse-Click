// Player
Player = function() {
  this.sprite = null;
  this.isMoving = null;
};

Player.prototype = {
  preload: function() {},
  create: function() {
    this.sprite = game.add.sprite(playerX, playerY, "chibi-walk");
    console.log("playerX: " + playerX);
    console.log("playerY: " + playerY);
    this.sprite.anchor.setTo(0.5, 1);

    // walk animation
    this.isMoving = false;
    this.sprite.loadTexture("chibi-walk", 0);
    this.sprite.animations.add("chibi-walk");

    // move character on input down/tap
    game.input.onDown.add(this.moveCharacter, this);
  },
  moveCharacter: function(pointer) {
    var pointerX = pointer.x,
      pointerY = pointer.y,
      duration;

    // player facing left/right
    if (pointer.x > this.sprite.x) {
      this.sprite.scale.x = 1; // flip horizontally (moving right)
    } else {
      this.sprite.scale.x = -1; // flip horizontally (moving left)
    }

    // player moving
    this.isMoving = true;

    //  300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel
    duration =
      (game.physics.arcade.distanceToPointer(this.sprite, pointer) / 200) *
      1500;

    // limits
    if (pointerX < 10) {
      pointerX = 10;
    }
    if (pointerX > 795) {
      pointerX = 795;
    }
    if (pointerY < 430) {
      pointerY = 430;
    }
    if (pointerY > 580) {
      pointerY = 580;
    }

    tween = game.add
      .tween(this.sprite)
      .to(
        { x: pointerX, y: pointerY },
        duration,
        Phaser.Easing.Linear.None,
        true
      );
    tween.onComplete.add(function() {
      this.moveplayer(pointer);
    }, this);
  },
  moveplayer: function(pointer) {
    var pointerX = pointer.x,
      pointerY = pointer.y;

    this.isMoving = false;

    // limits
    if (pointerX <= 70) {
      // change scene
      this.nextStage(currentScene, "left");
    } else if (pointerX >= 650) {
      // change scene
      this.nextStage(currentScene, "right");
    }
  },
  update: function() {
    if (this.isMoving) {
      // player moving
      this.sprite.animations.play("chibi-walk", 4, true);
    } else {
      this.sprite.animations.stop();
    }
  },
  nextStage: function(currentScene, direction) {
    if (currentScene === "firststage") {
      if (direction === "right") {
        playerX = playerLeftX;
        game.state.start("secondstage");
      }
    } else if (currentScene === "secondstage") {
      if (direction === "left") {
        this.sprite.scale.x = -1;
        playerX = playerRightX;
        game.state.start("firststage");
      }
    }
  }
};
