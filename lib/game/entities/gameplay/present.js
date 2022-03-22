ig.module('game.entities.gameplay.present')
    .requires(
        'impact.entity'
        // 'game.entities.gameplay.coins',
        // 'game.entities.buttons.button-retry',
        // 'game.entities.buttons.button-collect'
    )
    .defines(function () {
        EntityPresent = ig.Entity.extend({
            tag: "prize",
            gravityFactor: 0,
            zIndex: 80,
            collides: ig.Entity.COLLIDES.NEVER,
            type: ig.Entity.TYPE.A,
            maxVel: {
                x: 0,
                y: 0
            },
            currentScale: {
                x: 0.1,
                y: 0.1
            },
            
            isInteractable: false,
            prizeList: [{
                    reward: 10,
                    chance: 0.1
                },
                {
                    reward: 5,
                    chance: 0.30
                },
                {
                    reward: 3,
                    chance: 0.70
                }
            ],
            init: function (x, y, settings) {
                this.image=new ig.Image(_CONFIG.configuration.game_play_screen_present_image_url);
                this.parent(x, y, settings);

                this.callbackOpenPresent = settings.callbackOpenPresent;
                this.callbackSpawnPostGamePopup = settings.callbackSpawnPostGamePopup;
                this.callbackPrizeReady = settings.callbackPrizeReady;

                this.setAnimSheet();
            },
            update: function () {
                this.parent();
                this.centerPos = {
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y
                };
                // this.setScale(this.currentScale.x, this.currentScale.y);
                var mouse = ig.game.io.getClickPos();
            },
            draw: function () {
                this.parent();

                var ctx = ig.system.context;
                ctx.save();
                ctx.font = '23px mainfont';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'pink';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 15;
                ctx.restore();
            },
            setAnimSheet: function (gridX, gridY) {
                var _gridX = gridX != null ? gridX : 1;
                var _gridY = gridY != null ? gridY : 1;
                var img = this.image;
                this.animSheet = new ig.AnimationSheet(img.path, img.width / _gridX, img.height / _gridY);
                this.addAnim("idle", 0.1, [0]);

                var _offset = 7;
                this.offset = {
                    x: _offset,
                    y: _offset
                }
                this._size = {
                    x: this.animSheet.width - _offset / 2,
                    y: this.animSheet.height - _offset / 2
                };
                this.size = {
                    x: this.animSheet.width - _offset / 2,
                    y: this.animSheet.height - _offset / 2
                };
                // this.setScale(this.currentScale.x, this.currentScale.y);
            },

            startFloating: function () {
                this.floatTween = this.tween({
                        anchoredPositionY:this.anchoredPositionY-10
                        // pos: {
                        //     y: this.pos.y - 10
                        // }
                    },
                    1, {
                        loop: ig.Tween.Loop.Reverse,
                        easing: ig.Tween.Easing.Quadratic.EaseInOut
                    }
                );
                this.floatTween.start();
                this.isFloat = true;
            },
            touchBounce: function () {
                this.callbackOpenPresent(this);
                // ig.soundHandler.sfxPlayer.play('startSound');

                this.isFloat = false;
                this.floatTween.stop();
                
                this.zIndex = 300;
                ig.game.sortEntitiesDeferred();
                //this.stopTweens();
                var tweenScale = {
                    x: this.currentScale.x*2,
                    y: this.currentScale.y*2
                };
                this.tween({
                        anchoredPositionY:this.anchoredPositionY-50
                        // pos: {
                        //     y: this.pos.y - 50
                        // },
                        /*currentScale: {
                            x: tweenScale.x,
                            y: tweenScale.y
                        }*/
                    },
                    0.3, {
                        easing: ig.Tween.Easing.Quadratic.EaseInOut,
                        onComplete: function () {
                            this.callbackPrizeReady(this);
                            // this.getPrize();
                        }.bind(this)
                    }).start();
            },

            animatePrize: function () {
                this.tween({
                        anchoredPositionY:this.anchoredPositionY+50
                    },
                    0.3, {
                        easing: ig.Tween.Easing.Quadratic.EaseInOut,
                        onComplete: function () {
                            this.getPrize();
                        }.bind(this)
                    }).start();
            },

            getPrize: function(){
                
                // ig.soundHandler.sfxPlayer.play('openSound');
                var tweenScale = {
                    x: 1,
                    y: 1
                };
                this.tween({
                        anchoredPositionX:-this.size.x*0.5,
                        anchoredPositionY:-ig.responsive.originalHeight*0.5,
                        // pos: {
                        //     x: ig.system.width / 2 - this.animSheet.width * tweenScale.x / 2,
                        //     y: ig.system.height / 2 - this.animSheet.height * tweenScale.y / 2
                        // },
                        currentScale: {
                            x: tweenScale.x,
                            y: tweenScale.y
                        }
                    },
                    0.3, {
                        easing: ig.Tween.Easing.Quadratic.EaseOut,
                        onComplete: function () {
                            this.openPrize();
                        }.bind(this)
                    }).start();
            },
            shakeTween: function () {
                this.tween({
                    anchoredPositionY:this.anchoredPositionY+25
                    // pos: {
                    //     y: this.pos.y + 25
                    // }
                }, 1, {
                    loop: ig.Tween.Loop.Reverse,
                    // loopCount: 8,
                    easing: ig.Tween.Easing.Quadratic.EaseInOut,
                }).start();
            },
            openPrize: function () {

                this.stopTweens();
                this.callbackSpawnPostGamePopup();
                // ig.game.manager.openPrizeCallback(this.prizeType);
                this.kill();
            },
            clicked: function () {
                if (!this.isInteractable) return;
                // this.openPrize();
            },
            getRandom: function () {
                var items = this.prizeList;
                var sum = 0;
                for (i = 0; i < items.length; i++) {
                    sum += items[i].chance;
                }
                var rnd = Math.floor(Math.random() * (sum * 100));
                console.log("The number is: " + rnd);
                var counter = 0;
                for (i = 0; i < items.length; i++) {
                    counter += items[i].chance * 100;
                    if (counter > rnd) {
                        console.log("you got coins : " + items[i].reward);
                        return items[i].reward;
                        // break;
                    }
                }
            },
            spawnCoins: function () {
                var coin = ig.game.spawnEntity(
                    EntityCoins, this.pos.x + this.animSheet.width / 2 * this.currentScale.x,
                    this.pos.y + this.animSheet.height / 2 * this.currentScale.y, {
                        // coinsValue: this.getRandom(),
                        coinsValue: ig.game.coinsValue,
                        currentScale: {
                            x: 0.1,
                            y: 0.1
                        },
                        zIndex: this.zIndex - 1,
                        globalAlpha: 0
                    });
                ig.game.sortEntitiesDeferred();
                coin.tween({
                    currentScale: {
                        x: 1,
                        y: 1
                    },
                    globalAlpha: 1
                }, 0.15, {
                    easing: ig.Tween.Easing.Quadratic.EaseOut,
                    // delay: 0.2,
                    onComplete: function () {
                        ig.game.isGameEnd = true;
                    }
                }).start();
            }
        });
    });