ig.module('game.entities.cup-game.text-points')
.requires(
	'game.entities.cup-game.base-entity'
)
.defines(function() {
    EntityTextPoints = BaseEntity.extend({
        zIndex: 3,

        fontSize: 136,
        fontFamily: "montserrat",
        fontWeight: 'bold',
        fontShadow: 'rgba(0,0,0,0.5)',
        fontShadowDistance: 9,

        subFontSize: 58,
        subFontFamily: "montserrat",
        subFontWeight: '',
        subFontOffset: 104,
        subFontShadow: 'rgba(0,0,0,0.5)',
        subFontShadowDistance: 6,

        alpha: 0,

        init:function(x,y,settings){
			this.parent(x,y,settings);
			this.moveInTween();
		},

        draw: function() {
            var ctx = ig.system.context;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = this.fontWeight + " " + this.fontSize*ig.game.verticalScale + "px " + this.fontFamily;
            ctx.fillStyle = this.fontShadow;
            ctx.fillText(_PLAY.data.points, this.pos.x, this.pos.y + this.fontShadowDistance*ig.game.verticalScale);
            ctx.fillStyle = _CONFIG.prize_screen_points_font_color;
            ctx.fillText(_PLAY.data.points, this.pos.x, this.pos.y);

            var text = _PLAY.data.points === 1 ? _STRINGS["point!"] : _STRINGS["points!"];
            ctx.font = this.subFontWeight + " " + this.subFontSize*ig.game.verticalScale + "px " + this.subFontFamily;
            ctx.fillStyle = this.subFontShadow;
            ctx.fillText(text, this.pos.x, this.pos.y + this.subFontOffset*ig.game.verticalScale + this.subFontShadowDistance*ig.game.verticalScale);
            ctx.fillStyle = _CONFIG.prize_screen_points_font_color;
            ctx.fillText(text, this.pos.x, this.pos.y + this.subFontOffset*ig.game.verticalScale);
            ctx.restore();
        },

        moveInTween: function(){
            this.anchorUpdating = true;
            this.anchoredOffsetY = -120;
            this.tween({ anchoredOffsetY: 0, alpha: 1 }, 0.3, {
                delay: this.showDelay,
                easing: ig.Tween.Easing.Circular.EaseOut,
                onComplete: function() {
                    this.anchorUpdating = false;
                }.bind(this)
            }).start();
        },

        fadeOutTween: function(){
            this.tween({ alpha: 0 }, 0.3, {
                easing: ig.Tween.Easing.Circular.EaseOut
            }).start();
        }
    });
});