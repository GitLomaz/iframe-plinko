ig.module('game.entities.cup-game.game-controller')
.requires(
	'impact.entity',
    'game.entities.cup-game.cup',
    'game.entities.cup-game.coin',
    'game.entities.buttons.button-play-again',
    'game.entities.cup-game.text-instruction',
    'game.entities.cup-game.text-points',
    'game.entities.cup-game.text-play-remaining',
    'game.entities.cup-game.text-better-next-time'
)
.defines(function() {
    EntityGameController = ig.Entity.extend({
        resultScreenReady: false,
        resultShowed: false,
        test_mode: true,

        init: function (x, y, settings) {
			this.parent(x, y, settings);
            if (ig.global.wm)
                return;
            
            _STRINGS = _CONFIG['translations'][_CONFIG.member_language]

            this.background_img = new ig.Image(_CONFIG.background_image_url);
            this.table_img = new ig.Image(_CONFIG.table_image_url);
            this.cups = [
                ig.game.spawnEntity(EntityCup, 480, 96, { controller: this, cupID: 0, showDelay: 0 }),
                ig.game.spawnEntity(EntityCup, 0, 96, { controller: this, cupID: 1, showDelay: 0.5 }),
                ig.game.spawnEntity(EntityCup, -480, 96, { controller: this, cupID: 2, showDelay: 1 })
            ];

            this.text_instruction = ig.game.spawnEntity(EntityTextInstruction, 0, -270, {
                anchorType: "center-middle",
                showDelay: 1.5,
            });
            ig.game.sortEntitiesDeferred();
        },

        update: function() {
            this.parent();

            // check if data is retrieved before showing the result
            if (!this.resultShowed && this.resultScreenReady && (_PLAY.isUpdated || ig.game.test_mode)) {
                this.showResult();
            }
        },

        draw: function() {
            this.parent();

            // draw background color
            var center = ig.responsive.toAnchor(0, 0, "center-middle");
            var fillScale = ig.responsive.fillScale;
            ig.responsive.drawScaledImage(this.background_img, center.x, center.y, fillScale, fillScale, 0.5, 0.5);

            // draw table
            var pos = ig.responsive.toAnchor(0, 192, "center-middle");
            var fillScale = ig.responsive.width < ig.responsive.height ? ig.responsive.width/this.table_img.width : Math.max(ig.responsive.width, ig.responsive.height)/this.table_img.width;
            ig.responsive.drawScaledImage(this.table_img, pos.x, pos.y, fillScale, fillScale, 0.5, 0);
        },

        selectCup: function(cupID) {
            for (var i = 0; i < this.cups.length; i++) {
                if (this.cups[i].anchorUpdating)
                    return;
            }

            this.selectedCupID = cupID;
            this.text_instruction.fadeOutTween();

            for (var i = 0; i < this.cups.length; i++) {
                var cup = this.cups[i];
                cup.isClickable = false;

                if (cup.cupID === cupID) {
                    cup.centerTween();
                } else {
                    cup.alphaTween();
                }
            }

            // api get points data
            if (!ig.game.test_mode)
                ig.carltonOne.getPlay();
        },

        showResult: function() {
            this.cups[this.selectedCupID].popTween();
            var win = _PLAY.data.result[this.selectedCupID];
            if (win) {
                // spawn reward coin
                this.reward = ig.game.spawnEntity(EntityCoin, 0, 0, { controller: this, anchorType: "center-middle" });
            } else {
                // spawn try again text
                this.text_betterLuck = ig.game.spawnEntity(EntityTextBetterNextTime, 0, -50, { controller: this, anchorType: "center-middle", showDelay: 0.5 });
            }

            this.resultShowed = true;
            ig.game.sortEntitiesDeferred();
        },

        showWinResultScreen: function() {
            var btn_lock = _PLAY.data.remainingNumber <= 0;
            this.btn_playAgain = ig.game.spawnEntity(EntityButtonPlayAgain, 0, 268, { controller: this, isLocked: btn_lock });
            this.text_points = ig.game.spawnEntity(EntityTextPoints, 0, -278, { anchorType: "center-middle" });
            this.text_remaining = ig.game.spawnEntity(EntityTextPlayRemaining, 0, 164, { anchorType: "center-middle" });
            ig.game.sortEntitiesDeferred();
        },

        showLoseResultScreen: function() {
            var btn_lock = _PLAY.data.remainingNumber <= 0;
            this.btn_playAgain = ig.game.spawnEntity(EntityButtonPlayAgain, 0, 268, { controller: this, isLocked: btn_lock });
            this.text_remaining = ig.game.spawnEntity(EntityTextPlayRemaining, 0, 164, { anchorType: "center-middle" });
            ig.game.sortEntitiesDeferred();
        },

        playAgain: function() {
            ig.game.director.jumpTo(LevelGameplay);
        }
    });
});