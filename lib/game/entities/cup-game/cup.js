ig.module('game.entities.cup-game.cup')
.requires(
	'game.entities.cup-game.base-entity'
)
.defines(function() {
    EntityCup = BaseEntity.extend({
        zIndex: 4,
        type:ig.Entity.TYPE.B,
        isClickable: false,
        cupID: 0,
        showDelay: 0,
        anchorType: "center-middle",
        ignoreVerticalScaling: true,

		init:function(x,y,settings){
			this.parent(x,y,settings);
            this.setImage(new ig.Image(_CONFIG.cup_image_url));
            this.slideTween();
        },

        clicked: function(){
            if (!this.isClickable)
                return;
            
            this.controller.selectCup(this.cupID);
            ig.soundHandler.sfxPlayer.play("button");
        },

        slideTween: function() {
            this.anchorUpdating = true;
            this.currentAnim.alpha = 0;
            this.anchoredOffsetX = -1227;
            this.tween({ currentAnim: { alpha: 1 }, anchoredOffsetX: 0 }, 0.5, {
                delay: this.showDelay,
				easing: ig.Tween.Easing.Circular.EaseOut,
                onStart: function(){
                    ig.soundHandler.sfxPlayer.play("slide");
                },
				onComplete:function(){
                    this.isClickable = true;
                    this.anchorUpdating = false;
				}.bind(this)
            }).start();
        },

		alphaTween: function(){
			this.tween({ currentAnim: { alpha: 0 } }, 0.3, { easing: ig.Tween.Easing.Circular.EaseOut }).start();
		},

        centerTween: function() {
            this.anchorUpdating = true;
            this.scaleUpdating = true;
            this.tween({ anchoredOriginX: 0, anchoredOffsetX: 0, entityScale: { x: 1.2, y: 1.2 } }, 1, {
                easing: ig.Tween.Easing.Circular.EaseOut,
                onComplete:function(){
                    // this.controller.showResult(this.cupID);
                    // this.popTween();
                    this.scaleUpdating = false;
                    this.controller.resultScreenReady = true;
                }.bind(this)
            }).start();
        },

        popTween: function() {
            this.anchorUpdating = true;
            ig.soundHandler.sfxPlayer.play("slide");
            this.tween({ anchoredOffsetY: -780, currentAnim: { alpha: 0 } }, 1, {
                easing: ig.Tween.Easing.Circular.EaseOut,
                onComplete:function(){
                    this.anchorUpdating = false;
                }.bind(this)
            }).start();
        }
    });
});