ig.module('game.entities.buttons.button-generic-child')
    .requires(
        'game.entities.buttons.button-generic'
    )
    .defines(function () {
        EntityButtonGenericChild = EntityButtonGeneric.extend({

		init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        
        draw:function() {

        },

        parentDraw:function(parentPos) {
            var ctx = ig.system.context;
            ctx.save();
            ctx.translate(
                ig.system.getDrawPos(this.pos.x - parentPos.x + this.size.x * (1 - this.scale.x) / 2),
                ig.system.getDrawPos(this.pos.y - parentPos.y + this.size.y * (1 - this.scale.y) / 2)
            );
            ctx.scale(this.scale.x, this.scale.y);

            if (ctx.globalAlpha>this.alpha)
                ctx.globalAlpha = this.alpha;
                
            if (this.currentImage) {
                this.currentImage.draw(0, 0);
            }
            if (this.withText) {
                this.drawText();
            }
            if (this.overlayEnabled && this.overlay) {
                this.overlay.draw(0, 0);
            }
            ctx.restore();
        },

        drawText: function() {
			ig.system.context.save();
            ig.system.context.textAlign = this.textFormat.align;
            ig.system.context.font = this.textFormat.font;
			ig.system.context.fillStyle = this.textFormat.fillStyle;
			ig.system.context.lineWidth = this.textFormat.lineWidth;
            ig.system.context.strokeStyle = this.textFormat.strokeStyle;
            ig.system.context.strokeText(this.textFormat.text, this.textFormat.x + this.textFormat.strokeOffset.y, this.textFormat.y + this.textFormat.strokeOffset.y);
            ig.system.context.fillText(this.textFormat.text,this.textFormat.x, this.textFormat.y);
            ig.system.context.restore();
		},

        });
    });
