ig.module('game.entities.cup-game.text')
.requires(
	'game.entities.cup-game.base-entity'
)
.defines(function() {
    EntityText = BaseEntity.extend({
		text: "",
		texts: [],
		font: 'montserrat',
		fontSize: 42,
		fontWeight: false,
		fontColor: '#fff',
		fontStroke: false,
		fontStrokeSize: 0,
		fontShadow: false,
		fontShadowOffsetX: 0,
		fontShadowOffsetY: 0,
		textAlign: 'center',
		textBaseline: 'middle',
		lineHeight: 0,
		maxWidth: 1280,
		maxHeight: 0,
		textOffset: { x: 0, y: 0 },
		textOffsetAlignment: 'top',
		alpha: 1,
		boxColor: false,
		preserveWords: true,
		ignoreVerticalScaling: true,
		size: { x: 1, y: 1 },
		
        init:function(x,y,settings){
            this.parent(x,y,settings);
			this._fontSize = this.fontSize;
			this._lineHeight = this.lineHeight;
			if (settings.text)
				this.setText(settings.text);
        },
        draw:function(){
            this.parent();

			var ctx = ig.system.context;
			ctx.save();
			ctx.globalAlpha = this.alpha;
			
			// draw background
			if (this.boxColor) {
				ctx.fillStyle = this.boxColor;
				ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
			
			// draw texts
			if (this.texts && this.texts.length > 0) {
				var stroke = false;
				if (this.fontStroke && this.fontStrokeSize > 0) {
					stroke = true;
					ctx.strokeStyle = this.fontStroke;
					ctx.lineWidth = this.fontStrokeSize;
					ctx.lineJoin = 'round';
				}
				
				var font = this.fontSize*this.scale.y + 'px ' + this.font;
				if (this.fontWeight)
					font = this.fontWeight + ' ' + font;
				ctx.font = font;
				ctx.textAlign = this.textAlign;
				ctx.textBaseline = this.textBaseline;

				var lineHeight = this.lineHeight > 0 ? this.lineHeight : this.fontSize*1.25;
				lineHeight *= this.scale.y;
				var drawPosX = this.pos.x + this.textOffset.x*this.scale.x;
				var drawPosY = this.pos.y + this.textOffset.y*this.scale.y;
				if (this.textOffsetAlignment === "center" || this.textOffsetAlignment === "middle") {
					drawPosY -= lineHeight*(this.texts.length-1)*0.5;
				} else if (this.textOffsetAlignment === "bottom") {
					drawPosY -= lineHeight*(this.texts.length-1);
				}

				if (this.fontShadow && this.fontShadowOffsetX !== 0 && this.fontShadowOffsetY !== 0) {
					ctx.fillStyle = this.fontShadow;
					ig.drawMultiLinesText(this.texts, drawPosX + this.fontShadowOffsetX*this.scale.x, drawPosY + this.fontShadowOffsetY*this.scale.y, lineHeight, false);
				}
				ctx.fillStyle = this.fontColor;
				ig.drawMultiLinesText(this.texts, drawPosX, drawPosY, lineHeight, stroke);
			}
			
			ctx.restore();
        },

		setText: function(text) {
			this.text = text;
			var fontSize = this._fontSize;
			var lineHeight = this._lineHeight > 0 ? this._lineHeight : fontSize*1.25;
			do {
				this.texts = ig.wrapText(text, this.maxWidth, fontSize*this.scale.y, this.font, this.preserveWords);
				this.fontSize = fontSize;
				this.lineHeight = lineHeight;
				fontSize *= 0.75;
				lineHeight *= 0.75;
			} while (this.maxHeight > 0 && this.texts.length*this.lineHeight > this.maxHeight)
		},

		clearText: function() {
			this.text = "";
			this.texts =  [];
		}
    });
});