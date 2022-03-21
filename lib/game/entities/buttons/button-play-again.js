ig.module('game.entities.buttons.button-play-again')
.requires(
	'game.entities.cup-game.base-entity',
	'game.entities.cup-game.text'
)
.defines(function() {
	EntityButtonPlayAgain = BaseEntity.extend({
        zIndex: 4,
		type: ig.Entity.TYPE.A,
		size: { x:376,y:105 },
		entityScale: { x: 1, y: 1 },
        anchorPivot: { x: 0.5, y: 0.5 },
        isClicked: false,
		isLocked: false,
		anchorType: "center-middle",
		cornerRadius: 28,
		shadowDistance: 5,
		alpha: 0,

		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.label = _STRINGS["Play again"];
			var labelColor = this.isLocked ? _CONFIG.prize_screen_play_again_button_inactive_font_color : _CONFIG.prize_screen_play_again_button_active_font_color;
			this.text = ig.game.spawnEntity(EntityText, x, y, {
				zIndex: this.zIndex + 1,
				text: this.label,
				font: 'montserrat',
				fontSize: 42,
				fontWeight: 'bold',
				fontColor: labelColor,
				maxWidth: this.size.x,
				maxHeight: 53,
				ignoreVerticalScaling: false,
				anchorType: this.anchorType
			});
            this.alphaTween();
		},

		draw: function() {
			this.parent();
			var ctx = ig.system.context;
			ctx.save();
			ctx.globalAlpha = this.alpha;

			// draw background
			var fillStyle = this.isLocked ? _CONFIG.prize_screen_play_again_button_inactive_background_color : _CONFIG.prize_screen_play_again_button_active_background_color;
			ctx.fillStyle = fillStyle;
			ctx.roundRect(this.pos.x, this.pos.y + this.shadowDistance*this.scale.y, this.size.x, this.size.y, this.cornerRadius * this.scale.y, true, false);
			
			ctx.fillStyle = 'rgba(0,0,0,0.25)';
			ctx.roundRect(this.pos.x, this.pos.y + this.shadowDistance*this.scale.y, this.size.x, this.size.y, this.cornerRadius * this.scale.y, true, false);

			ctx.fillStyle = fillStyle;
			ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.cornerRadius * this.scale.y, true, false);

			ctx.restore();
		},

        alphaTween: function() {
			this.alpha = 0;
            this.tween({ alpha:1 }, 0.3, { easing: ig.Tween.Easing.Circular.EaseIn }).start();
			this.text.alpha = 0;
			this.text.tween({alpha:1}, 0.3, { easing: ig.Tween.Easing.Circular.EaseIn }).start();
        },

		clicked:function(){
			if (this.isLocked)
				return;

			this.isClicked = true;
			this.onClicked();
		},
		clicking:function(){
		},
		released:function(){
			if (this.isClicked) {
				this.onReleased();
			}

			this.isClicked = false;
			this.over();
		},
		releasedOutside:function(){
			this.isClicked = false;
		},
		onClicked: function(){

		},
		onReleased: function(){
			this.controller.playAgain();
			ig.soundHandler.sfxPlayer.play("button");
		},
		over: function(){
			if (this.isLocked)
				return;
		},
		leave: function(){
			if (this.isLocked)
				return;
		},
	});
});