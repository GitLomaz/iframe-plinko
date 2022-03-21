ig.module('game.entities.cup-game.text-play-remaining')
.requires(
	'game.entities.cup-game.text'
)
.defines(function() {
    EntityTextPlayRemaining = EntityText.extend({
        zIndex: 3,
        fontFamily: "montserrat",
        fontSize: 40,
        fontWeight: "bold",
        alpha: 0,
        ignoreVerticalScaling: false,

        init:function(x,y,settings){
			this.parent(x,y,settings);
            this.updateTextLimit();
            this.fontColor = _CONFIG.prize_screen_remaining_plays_description_font_color;
            var text = _PLAY.data.remainingNumber === 1 ? _STRINGS["%d play remaining"] : _STRINGS["%d plays remaining"];
            text = text.replace("%d", _PLAY.data.remainingNumber);
            this.setText(text);
			this.moveInTween();
		},

        updateTextLimit: function() {
            this.maxWidth = ig.system.width - 200;
            this.maxHeight = this._fontSize*1.25;
        },

        moveInTween: function(){
            this.tween({ alpha: 1 }, 0.3, { easing: ig.Tween.Easing.Circular.EaseIn }).start();
        },

        fadeOutTween: function(){
            this.tween({ alpha: 0 }, 0.3, {
                easing: ig.Tween.Easing.Circular.EaseOut
            }).start();
        },

        onResolutionChange: function() {
            this.parent();
            this.updateTextLimit();
            this.setText(this.text);
        }
    });
});