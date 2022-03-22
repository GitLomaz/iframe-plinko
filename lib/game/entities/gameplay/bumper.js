ig.module('game.entities.gameplay.bumper')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityBumper = ig.Entity.extend({
            tag: "bumper",
            zIndex: 100,
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            gravityFactor: 0,
            maxVel: {
                x: 0,
                y: 0
            },
            isGlowEnabled: false,
            currentScale: {
                x: 1,
                y: 1
            },
            
            init: function (x, y, settings) {
                this.image=new ig.Image(_CONFIG.configuration.game_play_bumper_image_url);
                this.parent(x, y, settings);
                // this._pos = this.pos;
                this.setAnimSheet();
            },
            update: function () {
                this.parent();
                this.centerPos = {
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y + this.size.y / 2
                };
                // this.setScale(this.currentScale.x, this.currentScale.y);
            },
            setGlow: function (vel) {
                this.stopTweens();
                // if (!ig.game.isPlayed) ig.soundHandler.sfxPlayer.play('bumperSound');
                ig.game.isPlayed = true;
                this.anchoredPositionX = this._pos.x;
                this.anchoredPositionY = this._pos.y;

                this.currentAnim = this.anims.glow;
                var base = Math.abs(vel.x) > Math.abs(vel.y) ? Math.abs(vel.x) : Math.abs(vel.y);
                var x = vel.x / base;
                var y = vel.y / base;
                this.tween({
                    anchoredPositionX:this.anchoredPositionX+x*10,
                    anchoredPositionY:this.anchoredPositionY+y*10
                }, 0.05, {
                    loop: ig.Tween.Loop.Reverse,
                    loopCount: 1,
                    onComplete: function () {
                        this.currentAnim = this.anims.idle;
                        this.anchoredPositionX = this._pos.x;
                        this.anchoredPositionY = this._pos.y;
                        // ig.game.isPlayed = true;
                    }.bind(this)
                }).start();
                this.tween({}, 0.17, {
                    onComplete: function () {
                        ig.game.isPlayed = false;
                    }.bind(this)
                }).start();
            },
            setAnimSheet: function () {
                var img = this.image;
                var _offset = 0;
                if (this.isGlowEnabled) {
                    this.animSheet = new ig.AnimationSheet(img.path, img.width / 2, img.height);
                    this.addAnim("idle", 0.1, [0]);
                    this.addAnim("glow", 0.3, [1]);
                    _offset = 15;
                } else {
                    this.animSheet = new ig.AnimationSheet(img.path, img.width, img.height);
                    this.addAnim("idle", 0.1, [0]);
                    this.addAnim("glow", 0.3, [0]);
                    _offset = 17;
                }
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
                this._pos = {
                    x: this.pos.x,
                    y: this.pos.y
                };
            },

            setAnchoredPosition:function(x, y, anchorTo) {
                this.parent(x, y, anchorTo);

                this._pos = {
                    x: x,
                    y: y
                };
            }
        });
    });