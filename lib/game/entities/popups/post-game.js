ig.module('game.entities.popups.post-game')
    .requires(
        'impact.entity',
        'game.entities.buttons.button-generic-draw',
        'game.entities.text'
    )
    .defines(function () {
        EntityPostGame = ig.Entity.extend({
            zIndex: 200,
            alpha:0,
            scale:0.3,

            init: function (x, y, settings) {
                this.image=new ig.Image(_CONFIG.configuration.prize_modal_background_image_url);

                this.parent(x, y, settings);
                this.setAnimSheet();

                this.points = _PLAY.data.points;
                this.numberOfPlays = _PLAY.data.remainingNumber;

                if (!_PLAY.demoMode)
                   this.result = _PLAY.data.result;
                else {
                    if (Math.random() <= 0.5) {
                        this.result = 0;
                    } else {
                        this.result = 1;
                    }

                    this.points = Math.floor(1000*Math.random());
                }

                this.prizeTextFormat = {
                    align:'center',
                    font:'260px montserrat-bold',
                    fillStyle:_CONFIG.configuration.prize_modal_prize_description_font_color,
                    text:this.points,
                    x:0,
                    y:-100};

                this.prizeTextShadowFormat = {
                    align:'center',
                    font:'260px montserrat-bold',
                    fillStyle:_CONFIG.configuration.prize_modal_prize_description_font_shadow_color,
                    text:this.points,
                    x:0,
                    y:-88};

                this.pointsTextFormat = {
                    align:'center',
                    font:'100px montserrat-regular',
                    fillStyle:_CONFIG.configuration.prize_modal_prize_description_font_color,
                    text:this.points==1?_CONFIG.translations[_CONFIG.member_language]['point!']:_CONFIG.translations[_CONFIG.member_language]['points!'],
                    x:0,
                    y:10};

                this.pointsTextShadowFormat = {
                    align:'center',
                    font:'100px montserrat-regular',
                    fillStyle:_CONFIG.configuration.prize_modal_prize_description_font_shadow_color,
                    text:this.points==1?_CONFIG.translations[_CONFIG.member_language]['point!']:_CONFIG.translations[_CONFIG.member_language]['points!'],
                    x:0,
                    y:22};

                this.betterLuckNextTimeFormat = {
                    align:'center',
                    font:'112px montserrat-bold',
                    fillStyle:_CONFIG.configuration.prize_modal_prize_description_font_color,
                    text:_CONFIG.translations[_CONFIG.member_language]['Better luck next time!'],
                    x:0,
                    y:0
                };

                this.betterLuckNextTimeShadowFormat = {
                    align:'center',
                    font:'112px montserrat-bold',
                    fillStyle:_CONFIG.configuration.prize_modal_prize_description_font_shadow_color,
                    text:_CONFIG.translations[_CONFIG.member_language]['Better luck next time!'],
                    x:0,
                    y:0
                };

                this.betterLuckNextTimeTextBox = ig.game.spawnEntity(EntityText, 0, -110, {textFormat:this.betterLuckNextTimeFormat, width:this.size.x*0.65,height:60,zIndex:this.zIndex});
                this.betterLuckNextTimeShadowTextBox = ig.game.spawnEntity(EntityText, 0, -98, {textFormat:this.betterLuckNextTimeShadowFormat, width:this.size.x*0.65,height:60,zIndex:this.zIndex});

                this.playsTextFormat = {
                    align:'center',
                    font:'70px montserrat-medium',
                    fillStyle:_CONFIG.configuration.prize_modal_remaining_plays_description_font_color,
                    text:(this.numberOfPlays==1?_CONFIG.translations[_CONFIG.member_language]['%d play remaining']:_CONFIG.translations[_CONFIG.member_language]['%d plays remaining']).replace('%d', this.numberOfPlays),
                    x:0,
                    y:130};

                this.buttonRetry = ig.game.spawnEntity(EntityButtonGenericDraw, 0, 0, 
                    {buttonSize:{x:450,y:100},
                    fillStyle:this.numberOfPlays>0?_CONFIG.configuration.prize_modal_play_again_button_active_background_color:_CONFIG.configuration.prize_modal_play_again_button_inactive_background_color, 
                    callback:this.callbackRetry.bind(this), 
                    zIndex:this.zIndex+5});
                this.buttonRetry.setAnchoredPosition(-this.buttonRetry.size.x*0.5,-this.buttonRetry.size.y*0.5+250,"middle-center");
                this.buttonRetry.addText({font:'50px montserrat-bold',
                fillStyle:this.numberOfPlays>0?_CONFIG.configuration.prize_modal_play_again_button_active_font_color:_CONFIG.configuration.prize_modal_play_again_button_inactive_font_color,
                text:_CONFIG.translations[_CONFIG.member_language]['Play again'],
                offset:{x:0,y:0}});
                ig.game.sortEntitiesDeferred();

                this.updateScale();

                this.disableButtons();
            },
            callbackRetry:function() {
                ig.game.director.reloadLevel();
            },
            update: function () {
                this.parent();

                this.updateScale();
            },
            updateScale:function() {
                var scale = ig.responsive.scaleX;

                if (scale > ig.responsive.originalHeight / ig.responsive.originalWidth)
                    scale = ig.responsive.originalHeight / ig.responsive.originalWidth;

                if (this.scaleX == scale && this.scale == 1) return;

                this.scaleX = scale;
                this.scaleY = scale;
                
                this.buttonRetry.alpha = this.alpha;
                this.buttonRetry.scaleHitboxSize(scale*this.scale);
                this.buttonRetry.anchoredPositionX = -this.buttonRetry.size.x*0.5;
                this.buttonRetry.anchoredPositionY = -this.buttonRetry.size.y*0.5+250*scale*this.scale;
            },
            draw:function() {
                ig.system.context.save();
                ig.system.context.globalAlpha = this.alpha;
                ig.system.context.translate(this.pos.x + this.size.x*0.5,this.pos.y + this.size.y*0.5);
                ig.system.context.scale(this.scale*this.scaleX, this.scale*this.scaleY);
                // this.buttonRetry.parentDraw(this.pos);
                ig.system.context.translate(-(this.pos.x + this.size.x*0.5),-(this.pos.y + this.size.y*0.5));
                
                this.parent();
                
                ig.system.context.translate(this.pos.x + this.size.x*0.5,this.pos.y + this.size.y*0.5);
                if (this.points != 0 && this.result == 1) {
                    this.drawText(this.prizeTextShadowFormat);
                    this.drawText(this.prizeTextFormat);
                    this.drawText(this.pointsTextShadowFormat);
                    this.drawText(this.pointsTextFormat);
                } else {
                    // this.drawText(this.betterLuckNextTimeShadowFormat);
                    // this.drawText(this.betterLuckNextTimeFormat);
                    this.betterLuckNextTimeShadowTextBox.parentDraw({x:0,y:0});
                    this.betterLuckNextTimeTextBox.parentDraw({x:0,y:0});
                }
                

                this.drawText(this.playsTextFormat);
                ig.system.context.restore();
            },
            drawText:function(textFormat) {
                ig.system.context.save();
                ig.system.context.translate(textFormat.x, textFormat.y);
                ig.system.context.textAlign = textFormat.align;
                ig.system.context.font = textFormat.font;
                ig.system.context.fillStyle = textFormat.fillStyle;
                ig.system.context.fillText(textFormat.text,0,0);
                ig.system.context.restore();
            },
            setAnimSheet: function (gridX, gridY) {
                var _gridX = gridX != null ? gridX : 1;
                var _gridY = gridY != null ? gridY : 1;
                var img = this.image;
                this.animSheet = new ig.AnimationSheet(img.path, img.width / _gridX, img.height / _gridY);
                this.addAnim("idle", 0.1, [0]);

                var _offset = 0;
                this.offset = {
                    x: _offset,
                    y: _offset
                }
                this._size = {
                    x: this.animSheet.width - _offset * 2,
                    y: this.animSheet.height - _offset * 2
                };
                this.size = {
                    x: this.animSheet.width - _offset * 2,
                    y: this.animSheet.height - _offset * 2
                };
            },
            animateIn:function() {
                // ig.soundHandler.sfxPlayer.play('prizeSound');

                this.popupTween = this.tween({
                    alpha:1,
                    scale:1
                },
                0.3, {
                    easing: ig.Tween.Easing.Quadratic.EaseOut,
                    onComplete:this.callbackAnimateInCompleted.bind(this)
                }
                );
                this.popupTween.start();
            },
            callbackAnimateInCompleted:function() {
                this.enableButtons();
            },

            enableButtons:function() {
                if (this.numberOfPlays > 0)this.buttonRetry.enable(true);
            },

            disableButtons:function() {
                this.buttonRetry.enable(false);
            }
        });
    });