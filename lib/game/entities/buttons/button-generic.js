ig.module('game.entities.buttons.button-generic')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityButtonGeneric = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.A,
		layer: 0,
		isClicked: false,
		enabled: true,
		withText: false,
		isNotControls: true,
		isOver: false,
		scale: {
			x: 1,
			y: 1
		},
		alpha:1,
		ignorePause: true,

		init: function (x, y, settings) {
			this.offsetX = 0;
			this.offsetY = 0;
            this.parent(x, y, settings);

            this.callback = settings.callback;

            if (settings.idleImage) this.idleImage = settings.idleImage;
			if (settings.clickImage) this.clickImage = settings.clickImage;
			this.overlay = settings.overlay;
			this.currentImage = this.idleImage;
            this.size.x = this.currentImage.width;
            this.size.y = this.currentImage.height;

			this.imageSize = {x:this.size.x, y:this.size.y};

			this.overlayEnabled = false;

			this.tweenEnabled = false;

			this.layer = ig.game.currentLayer;
			
			if (settings.zIndex == null)
				this.zIndex = ig.game.currentLayer + 3;
			else
				this.zIndex = settings.zIndex;
			// handle scales and size
			this.scaleX0 = this.scale.x;
			this.scaleY0 = this.scale.y;
			this.scaleX1 = this.scaleX0 * 0.9;
			this.scaleY1 = this.scaleY0 * 0.9;
			this.scaleX2 = this.scaleX0 * 1.04;
			this.scaleY2 = this.scaleY0 * 1.04;
			this.scaleX3 = this.scaleX0 * 1.1;
			this.scaleY3 = this.scaleY0 * 1.1;
		},

		scaleHitboxSize:function(scale) {
			this.size.x = this.currentImage.width*scale;
            this.size.y = this.currentImage.height*scale;

			this.updateButtonScaling(scale);
			this.scale.x = scale;
			this.scale.y = scale;
		},

		updateButtonScaling:function(newScale) {
			this.scaleX0 = newScale;
			this.scaleY0 = newScale;
			this.scaleX1 = this.scaleX0 * 0.9;
			this.scaleY1 = this.scaleY0 * 0.9;
			this.scaleX2 = this.scaleX0 * 1.04;
			this.scaleY2 = this.scaleY0 * 1.04;
			this.scaleX3 = this.scaleX0 * 1.1;
			this.scaleY3 = this.scaleY0 * 1.1;
		},

		updateIdleImage:function(newImage) {
			this.idleImage = newImage;
			this.currentImage = newImage;

			// this.size.x = this.currentImage.width * this.scale.x;
            // this.size.y = this.currentImage.height * this.scale.y;
		},

		ready: function () {
			this.parent();

			// handle spamming/double click
			this.clickTime = ig.system.clock.delta();
		},

		clicked: function () {
			// save timer
			var temp = this.clickTime;
			// reset timer
			this.clickTime = ig.system.clock.delta();
			if (this.clickTime - temp < 0.1) {
				// handle spamming/double click
				return;
			}

			if (!this.enabled) return;
			if (ig.game.currentLayer != this.layer) return;

			// handle click
			this.isClicked = true;
			// ig.soundHandler.sfxPlayer.play('clickSound');

            if (this.clickImage != null)
                this.currentImage = this.clickImage;

			this.tweenScale = this.tween({
				scale: {
					x: this.scaleX1,
					y: this.scaleY1
				}
            },
            0.025);

			this.tweenScale.start();
        },

		clicking: function () {
		},

		released: function () {
			if (this.isClicked && this.enabled) {
                this.currentImage = this.idleImage;
				this.isClicked = false;
				this.tweenScale = this.tween({
					scale: {
						x: this.scaleX0,
						y: this.scaleY0
					}
				}, 0.025, {
					onComplete: function () {
						ig.domHandler.getElementById("#canvas").css("cursor", "default");
						// ig.soundHandler.sfxPlayer.play("button");
						this.buttonCallback();
					}.bind(this)
				});

				this.tweenScale.start();
			}
		},

		leave: function () {
            if (!this.enabled) return;
            this.currentImage = this.idleImage;
			this.isClicked = false;
			this.isOver = false;
			ig.domHandler.getElementById("#canvas").css("cursor", "default");
			this.tweenScale = this.tween({
				scale: {
					x: this.scaleX0,
					y: this.scaleY0
				}
			}, 0.025);
			this.tweenScale.start();

		},

		over: function () {
			
			if (ig.game.currentLayer != this.layer) return;
			if (this.enabled) {
				ig.domHandler.getElementById("#canvas").css("cursor", "pointer");
				this.isOver = true;
				this.tweenScale = this.tween({
					scale: {
						x: this.scaleX2,
						y: this.scaleY2
					}
				}, 0.025);

				this.tweenScale.start();
			}
		},

		update:function() {
			if (this._killed) return;
			
			this.parent();

			// this.size.x = this.imageSize.x * this.scale.x;
            // this.size.y = this.imageSize.y * this.scale.y;
		},

		enableOverlay:function() {
			this.overlayEnabled = true;
		},

		disableOverlay:function() {
			this.overlayEnabled = false;
		},

		updateOverlay:function(overlay) {
			this.overlay = overlay;
		},

		draw: function () {
				var ctx = ig.system.context;
				ctx.save();
				ctx.globalAlpha = this.alpha;
				ctx.translate(
					ig.system.getDrawPos(this.pos.x.round() + this.offsetX - ig.game.screen.x + this.imageSize.x * (this.scaleX0 - this.scale.x) / 2 - this.offset.x),
					ig.system.getDrawPos(this.pos.y.round() + this.offsetY - ig.game.screen.y + this.imageSize.y * (this.scaleY0 - this.scale.y) / 2 - this.offset.y)
				);
				ctx.scale(this.scale.x, this.scale.y);
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
        
        addText:function (textFormat) {
            this.withText = true;

            this.updateTextFormat(textFormat);
		},
		
		updateTextFormat:function(textFormat) {
			this.textFormat = {
				align:textFormat.align?textFormat.align:'center',
				font:textFormat.font?textFormat.font:'42px troika',
				fillStyle:textFormat.fillStyle?textFormat.fillStyle:'#FFFFFF',
				text:textFormat.text?textFormat.text:'DEFAULT',
				lineWidth: textFormat.lineWidth?textFormat.lineWidth:0,
				strokeStyle: textFormat.strokeStyle?textFormat.strokeStyle:'#000000',
				strokeOffset: textFormat.strokeOffset?textFormat.strokeOffset:{x:0,y:0},
				x:this.currentImage.width * 0.5 + (textFormat.offset?textFormat.offset.x:0),
				y:this.currentImage.height * 0.5 + 8 + (textFormat.offset?textFormat.offset.y:0)};
		},

		drawText: function() {
			ig.system.context.save();
			// ig.system.context.globalAlpha = this.alpha;
            // ig.system.context.translate(this.textFormat.x, this.textFormat.y);
            // ig.system.context.scale(1, 1);
            ig.system.context.textAlign = this.textFormat.align;
            ig.system.context.font = this.textFormat.font;
			ig.system.context.fillStyle = this.textFormat.fillStyle;
			ig.system.context.lineWidth = this.textFormat.lineWidth;
            ig.system.context.strokeStyle = this.textFormat.strokeStyle;
            ig.system.context.strokeText(this.textFormat.text, this.textFormat.x + this.textFormat.strokeOffset.y, this.textFormat.y + this.textFormat.strokeOffset.y + 5);
            ig.system.context.fillText(this.textFormat.text,this.textFormat.x,this.textFormat.y + 5);
            ig.system.context.restore();
		},

		updateText:function(text) {
			if (this.textFormat != null)
				this.textFormat.text = text;
		},

		buttonCallback:function() {
			if (this.callback != null) this.callback();
		},

		enableTween: function () {
			this.tweenEnabled = true;

			this.tweenScale = this.tween({
				scale: {
					x: this.scaleX3,
					y: this.scaleY3
				}
            },
			0.3,
			{loop:ig.Tween.Loop.Reverse});
			this.tweenScale.start();
		},

		disableTween: function() {
			this.tweenEnabled = false;

			if (this.tweenScale != null) {
				this.tweenScale.stop();
				this.tweenScale = null;
			}

			this.tweenScale = this.tween({
				scale: {
					x: this.scaleX0,
					y: this.scaleY0
				}
            },
			0.1);

			this.tweenScale.start();
		},

		enable: function (enabled) {
			if (this.enabled && enabled) return;
			this.enabled = enabled;
			this.isOver = false;
		},

		setToUnclickable: function() {
			this.type = ig.Entity.TYPE.NONE;
		},

		setToClickable: function() {
			this.type = ig.Entity.TYPE.A;
		},

		kill:function() {
			this.parent();

			this.killed = true;

			if (this.tweenScale)this.tweenScale.stop();
			this.tweenScale = null;

			this.offsetX = null;
			this.offsetY = null;
			this.callback = null;

            this.idleImage = null;
            this.clickImage = null;
            this.currentImage = null;
            this.size = null;
			this.layer = null;

			this.scaleX0 = null;
			this.scaleY0 = null;
			this.scaleX1 = null;
			this.scaleY1 = null;
			this.scaleX2 = null;
			this.scaleY2 = null;
		}
        });
    });
