ig.module('game.entities.cup-game.text-instruction')
.requires(
	'game.entities.cup-game.text'
)
.defines(function() {
    EntityTextInstruction = EntityText.extend({
        zIndex: 3,
        fontFamily: "montserrat",
        fontSize: 91,
        fontWeight: "bold",
        textOffsetAlignment: "bottom",
        alpha: 0,
        showDelay: 0,

        init:function(x,y,settings){
			this.parent(x,y,settings);
            this.updateTextLimit();
            this.fontColor = _CONFIG.initial_screen_title_font_color;
            this.setText(_STRINGS["Choose one to win!"]);
			this.moveInTween();
		},

        updateTextLimit: function() {
            this.maxWidth = ig.system.width - 200;
            this.maxHeight = ig.system.height * 0.25;
        },

        moveInTween: function() {
            this.anchorUpdating = true;
            this.anchoredOffsetY = -80;
            this.tween({ anchoredOffsetY: 0, alpha: 1 }, 0.3, {
                delay: this.showDelay,
                easing: ig.Tween.Easing.Circular.EaseOut,
                onComplete: function() {
                    this.anchorUpdating = false;
                }.bind(this)
            }).start();
        },

        fadeOutTween: function() {
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