ig.module('game.entities.controllers.game-controller')
.requires(
	'impact.entity',

    'game.entities.gameplay.ball',
    'game.entities.gameplay.invisible-edge',
    'game.entities.gameplay.bumper',
    'game.entities.gameplay.block',
    'game.entities.gameplay.present',
    'game.entities.gameplay.light',
    'game.entities.popups.post-game',
    'game.entities.gameplay.shadow'
)
.defines(function() {
    EntityGameController = ig.Entity.extend({
        isDropped:false,

        init:function(x,y,settings){
            this.backgroundImage = new ig.Image(_CONFIG.configuration.game_play_screen_background_image_url)
            this.bumperImage=new ig.Image(_CONFIG.configuration.game_play_bumper_image_url);

            if (!_PLAY.demoMode)
			    ig.carltonOne.getPlay()
            // this.enableInput = false;
            this.enableInput = true;
            this.prizeReady = false;

            this.parent(x,y,settings);

            ig.game.isPrizeTouched = false;
            

            this._gravity = 1500;//ig.game.gravity;
            ig.game.gravity = 0;

            this.bumperRows = 6;
            this.bumperColumns = 8;

            this.spawnEntities();
        },

        spawnEntities:function() {
            this.ball = ig.game.spawnEntity(EntityBall, 0, 0, {
                scale:{ x:1, y:1}
            });

            this.ball.pos.x = ig.system.width*0.5 - this.ball.size.x*0.5;
            this.ball.pos.y = ig.system.height - ig.responsive.originalHeight + 50;

            this.ball.startHorAnimation();

            this.bottomInvEdge = ig.game.spawnEntity(EntityInvisibleEdge, 0, 0,{
                size: {x:ig.responsive.originalWidth, y:30}
            });
            this.bottomInvEdge.setAnchoredPosition(-ig.responsive.originalWidth*0.5, -10, "center-bottom");

            this.leftInvEdge = ig.game.spawnEntity(EntityInvisibleEdge, 0, 0,{
                size: {x:10, y:ig.responsive.originalHeight}
            });
            this.leftInvEdge.setAnchoredPosition(-ig.responsive.originalWidth*0.5-5, -ig.responsive.originalHeight, "center-bottom");

            this.rightInvEdge = ig.game.spawnEntity(EntityInvisibleEdge, 0, 0,{
                size: {x:10, y:ig.responsive.originalHeight}
            });
            this.rightInvEdge.setAnchoredPosition(ig.responsive.originalWidth*0.5-5, -ig.responsive.originalHeight, "center-bottom");

            this.spawnObstacles();
            // this.callbackSpawnPostGamePopup();
        },

        spawnObstacles:function() {
            this.bumpers = [];
            var bumper;
            var bumperAreaWidthSize = ig.responsive.originalWidth - this.bumperImage.width*0.8;
            var bumperStartingX = -bumperAreaWidthSize*0.5;
            var bumperHorDivision = bumperAreaWidthSize/(this.bumperColumns-1);

            var x, y;

            for (var i = 0; i<this.bumperRows; i++) {
                for (var j = 0; j<this.bumperColumns; j++) {
                    if (i%2 == 1 && j==this.bumperColumns-1) continue;

                    bumper = ig.game.spawnEntity(EntityBumper, 0, 0);

                    x = bumperStartingX + bumperHorDivision*j - bumper.size.x*0.5;
                    y = -300 + -180*i - bumper.size.y*0.5;

                    if (i%2 == 1) x += bumperHorDivision*0.5;
                    

                    bumper.setAnchoredPosition(x, y, "center-bottom");
                    bumper.update();
                    this.bumpers.push(bumper);
                }
            }

            this.blocks = [];
            var block;

            var blockAreaWidthSize = ig.responsive.originalWidth;
            var blockStartingX = -blockAreaWidthSize*0.5;
            var blockHorDivision = blockAreaWidthSize/(this.bumperColumns);

            for (var i = 0; i<this.bumperColumns+1; i++) {
                block = ig.game.spawnEntity(EntityBlock, 0, 0);

                x = blockStartingX + blockHorDivision*i - block.size.x*0.5;
                y = -block.size.y;

                block.setAnchoredPosition(x, y, "center-bottom");
                block.update();
                this.blocks.push(block);
            }

            this.presents = [];
            var present;

            this.shadows = [];
            var shadow;

            for (var i = 0; i<this.bumperColumns; i++) {
                present = ig.game.spawnEntity(EntityPresent, 0, 0, {
                    callbackOpenPresent:this.callbackOpenPresent.bind(this),
                    callbackSpawnPostGamePopup:this.callbackSpawnPostGamePopup.bind(this),
                    callbackPrizeReady:this.callbackPrizeReady.bind(this)
                });

                x = blockStartingX + ((blockHorDivision+block.size.x*0.5)- present.size.x)*0.5 + blockHorDivision*i ;
                y = -130;

                present.setAnchoredPosition(x, y, "center-bottom");
                present.update();
                this.presents.push(present);

                present.startFloating();

                shadow = ig.game.spawnEntity(EntityShadow, 0, 0);

                x = blockStartingX + ((blockHorDivision+block.size.x*0.5)- shadow.size.x)*0.5 + blockHorDivision*i ;
                y = -30;

                shadow.setAnchoredPosition(x, y, "center-bottom");
                shadow.update();
                this.shadows.push(shadow);
            }
        },

        callbackPrizeReady:function(present) {
            this.prizeReady = true;
            this.currentPresent = present;
        },

        callbackOpenPresent:function(present) {
            this.spawnLight(present.anchoredPositionX + present.size.x*0.5);
        },

        callbackSpawnPostGamePopup:function() {
            this.spawnPostGamePopup();
        },

        spawnPostGamePopup:function() {
            this.popupPostGame = ig.game.spawnEntity(EntityPostGame, 0, 0);
            this.popupPostGame.setAnchoredPosition(-this.popupPostGame.size.x*0.5,-this.popupPostGame.size.y*0.5,"middle-center");

            this.popupPostGame.animateIn();
        },

        spawnLight:function(x) {
            this.light = ig.game.spawnEntity(EntityLight, 0, 0);
            this.light.setAnchoredPosition(x-this.light.size.x*0.5, -this.light.size.y, "center-bottom");

            this.light.animateIn();
        },

        update:function() {
            this.parent();

            if(this.prizeReady && (_PLAY.isUpdated || _PLAY.demoMode)){
                _PLAY.isUpdated = false;
                this.prizeReady = false;

                if (this.currentPresent) this.currentPresent.animatePrize(); 
			}

            if (ig.input.pressed('click') && ig.game.gravity == 0 && !this.isDropped && this.enableInput) {
                this.enableInput = false;
                ig.game.gravity = this._gravity;
                this.ball.stopHorAnimation();
                this.isDropped = true;
            }
        },

        draw:function() {
            this.parent();

            var anchoredPoint = ig.responsive.toAnchor(0, 0, "center-middle");
            var scale = 1;

            if (ig.system.height>this.backgroundImage.height) {
                scale = ig.system.height/this.backgroundImage.height;
            } else {
                scale = ig.system.height/this.backgroundImage.height;
            }

            ig.system.context.fillStyle = _CONFIG.configuration.game_play_extended_background_color;
            ig.system.context.fillRect(0,0,ig.system.width,ig.system.height);
            ig.responsive.drawScaledImage(this.backgroundImage, anchoredPoint.x, anchoredPoint.y, scale, scale, 0.5, 0.5);

            ig.system.context.globalAlpha = 0.5;
            ig.system.context.fillStyle = _CONFIG.configuration.game_play_wall_overlay_color;
            ig.system.context.fillRect(0,0,(ig.system.width-ig.responsive.originalWidth)*0.5,ig.system.height);
            ig.system.context.fillRect(ig.system.width - (ig.system.width-ig.responsive.originalWidth)*0.5,0, (ig.system.width-ig.responsive.originalWidth)*0.5,ig.system.height);
            ig.system.context.globalAlpha = 1;
        }

    });
});