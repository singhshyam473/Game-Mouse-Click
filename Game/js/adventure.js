
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.hero = null;

    this.mouseTargetX = null;
    this.mouseTargeY = null;

    this.tween;

};

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        this.roomCreate();
        this.inventoryCreate();
        this.heroCreate();


        //this.lungurCreate();

	},

	update: function () {

        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.heroUpdate();


	},

    heroCreate: function(){
        this.hero = this.game.add.sprite(this.game.world.centerX, 450, 'hero');
        this.hero.anchor.setTo(0.5, 1);
        //this.hero.scale.setTo(2, 2);
        this.hero.animations.add('idle',[
            'walk-01.png'
        ]);
        this.hero.animations.add('walk',[
            'walk-01.png','walk-02.png','walk-03.png','walk-04.png','walk-05.png','walk-06.png','walk-07.png','walk-08.png'
        ]);
        this.hero.animations.play('idle', 6, true);
        this.hero.isWalking = false;

        this.game.input.onDown.add(this.moveSprite, this);
    },

    roomCreate: function(){

        //background
        this.bg = this.game.add.sprite(0,0, 'room');

        //lampkey
        this.lampkey = this.game.add.sprite(680, 220, 'lampkey');
        this.lampkey.anchor.setTo(0, 0);
        this.lampkey.animations.add('off',[
            'lampa.png'
        ]);
        this.lampkey.animations.add('on',[
            'lampa2.png'
        ]);
        this.lampkey.animations.play('off', 6, true);

        //enables all kind of input actions on this image (click, etc)
        this.lampkey.inputEnabled=true;

        this.lampkey.events.onInputDown.add(doSomething,this);

        function doSomething() {
            // will only ever be called once, when the the input is down
            console.log("123");
        }


    },
    inventoryCreate: function(){
        this.inventory = this.game.add.sprite(0,this.game.world.height - 173, 'inventory');
    },

    lungurCreate: function(){
        //
        /*


         this.hero = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'lungur');
         this.hero.anchor.setTo(0.5, 0.5);
         //this.hero.scale.setTo(2, 2);
         this.hero.animations.add('idle',[
         'idle00.png'
         ]);
         this.hero.animations.add('walk',[
         'walk01.png','walk02.png','walk04.png','walk05.png'
         ]);
         this.hero.animations.play('idle', 6, true);
         */

    },

    heroUpdate: function(){

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.hero.x -= 4;
            this.hero.isWalking = true;
            this.hero.scale.x = 1;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.hero.x += 4;
            this.hero.isWalking = true;
            this.hero.scale.x = -1;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.hero.y -= 4;
            this.hero.isWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.hero.y += 4;
            this.hero.isWalking = true;
        }  else if(this.mouseTargetX != null || this.mouseTargetY != null) {

            if(this.hero.x != this.mouseTargetX || this.hero.y != this.mouseTargetY){
                this.hero.isWalking = true;
            } else {
                this.hero.isWalking = false;
            }

        } else {
            this.hero.isWalking = false;
        }

        if(this.hero.isWalking){
            this.hero.animations.play('walk', 10, true);
        } else {
            this.hero.animations.play('idle', 10, true);
        }
    },

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.game.state.start('MainMenu');

	},

    moveSprite: function(pointer) {

        if (this.tween && this.tween.isRunning)
        {
            this.tween.stop();

        }

        console.log("pointer X = " + pointer.x);
        console.log("pointer Y = " + pointer.y);

        //BORDERS OF THE GAME ROOM
        if(pointer.x < 100 ){
            this.mouseTargetX = 100;
        }else if (pointer.x > 900 ){
            this.mouseTargetX = 900 - this.hero.body.halfWidth;
        } else {
            this.mouseTargetX = pointer.x;
        }

        if(pointer.y > 490){
            this.mouseTargetY = 490;
        }else if (pointer.y < 425 ){
            this.mouseTargetY = 425;
        } else {
            this.mouseTargetY = pointer.y;
        }


        //TODO

        var length = 1000,
            points = [
                {x: 0, y: 0},
                {x: 0, y: length},
                {x: length, y: 10},
                {x: -length, y: -10},
                {x: 0, y: -length},
                {x: 0, y: 0}
            ];

        console.log(this.isPointInPoly(points, {x:this.mouseTargetY, y:this.mouseTargetY}));


        //this.hero.rotation = this.game.physics.angleToPointer(this.hero, pointer);
        this.hero.isWalking = true;
        if(this.hero.x < this.mouseTargetX) {
            this.hero.scale.x = -1;
        } else {
            this.hero.scale.x = 1;
        }

        //  300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel
        var duration = (this.game.physics.distanceToXY(this.hero, this.mouseTargetX, this.mouseTargetY) / 300) * 1000;

        tween = this.game.add.tween(this.hero).to({ x: this.mouseTargetX, y: this.mouseTargetY }, duration, Phaser.Easing.Linear.None, true);

    }
    ,
    isPointInPoly :function(poly, pt){
        for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (c = !c);
        return c;
    }

};
