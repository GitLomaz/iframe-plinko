ig.module('game.entities.cup-game.coin')
.requires(
	'game.entities.cup-game.base-entity'
)
.defines(function() {
    EntityCoin = BaseEntity.extend({
        zIndex: 3,
        entityScale: {x: 0.5, y: 0.5},
        coinID: 0,
        anchorType: "center-middle",

        init:function(x,y,settings){
			this.parent(x,y,settings);
            this.setImage(new ig.Image(_CONFIG.coin_image_url));
            this.dropTween();
        },

        dropTween: function(){
            this.anchorUpdating = true;
            this.anchoredOffsetY = 82;
            this.tween({ anchoredOffsetY: 98 }, 0.5, {
                easing: ig.Tween.Easing.Circular.EaseOut,
                onComplete: function() {
                    this.anchorUpdating = false;
                    this.centerTween();
                }.bind(this)
            }).start();
        },

        centerTween: function(){
            this.anchorUpdating = true;
            this.tween({ anchoredOffsetY: 0 }, 0.75, {
                easing: ig.Tween.Easing.Sinusoidal.EaseInOut,
                onComplete: function() {
                    this.anchorUpdating = false;
                    this.scaleTween();
                    this.controller.showWinResultScreen();
                }.bind(this)
            }).start();
        },

        scaleTween: function(){
            this.scaleUpdating = true;
            this.anchorUpdating = true;
            ig.soundHandler.sfxPlayer.play("win");
            this.tween({ entityScale: { x: 1, y: 1 }, anchoredOffsetY: 0 }, 0.5, {
                easing: ig.Tween.Easing.Back.EaseInOut,
                onComplete: function() {
                    this.scaleUpdating = false;
                    this.anchorUpdating = false;
                }.bind(this)
            }).start();
        }
    });
});