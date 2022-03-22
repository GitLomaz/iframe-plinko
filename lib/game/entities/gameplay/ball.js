ig.module('game.entities.gameplay.ball')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityBall = ig.Entity.extend({
            zIndex: 100,
            gravityFactor: 2,
            bounciness: 0.8,
            maxVel: {
                x: 1500,
                y: 1500
            },
            friction: {
                x: 25,
                y: 0
            },
            collides: ig.Entity.COLLIDES.ACTIVE,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.BOTH,
            

            angularVel: 0,

            horAnimationEnabled:false,
            horAnimationToRight:true,
            horAnimationSpeed:1000,
            isKilled:false,
            init: function (x, y, settings) {
                this.image=new ig.Image(_CONFIG.configuration.game_play_screen_coin_image_url);
                this.parent(x, y, settings);

                this.setAnimSheet();

                this.horAnimMaxLimit = ig.responsive.originalWidth*0.98 - this.size.x * 0.5;
                this.horAnimMinLimit = ig.responsive.originalWidth*0.02 - this.size.x * 0.5;  
            },
            update: function () {
                this.parent();

                this.horAnimationUpdate();

                this.angularVel = this.vel.x * ig.game.degToRad(0.05);;
                this.currentAnim.angle += this.angularVel;
                this.centerPos = {
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y + this.size.y / 2
                };

                if (ig.game.isPrizeTouched) this.kill();
            },

            horAnimationUpdate:function() {
                if (this.horAnimationEnabled) {
                    if (this.horAnimationToRight) {
                        this.pos.x += this.horAnimationSpeed * ig.system.tick;

                        if (this.pos.x > this.horAnimMaxLimit + (ig.system.width-ig.responsive.originalWidth) * 0.5) {
                            this.pos.x = this.horAnimMaxLimit + (ig.system.width-ig.responsive.originalWidth) * 0.5;
                            this.horAnimationToRight = false;
                        }
                    } else {
                        this.pos.x -= this.horAnimationSpeed * ig.system.tick;

                        if (this.pos.x < this.horAnimMinLimit + (ig.system.width-ig.responsive.originalWidth) * 0.5) {
                            this.pos.x = this.horAnimMinLimit + (ig.system.width-ig.responsive.originalWidth) * 0.5;
                            this.horAnimationToRight = true;
                        }
                    }
                }
            },

            startHorAnimation:function() {
                this.horAnimationEnabled = true;
            },

            stopHorAnimation:function() {
                this.horAnimationEnabled = false;
            },

            draw:function() {
                this.parent();
            },
            
            check: function (other) {
                if (other.tag == "bumper") {
                    var distanceX = this.centerPos.x - other.centerPos.x;
                    var distanceY = this.centerPos.y - other.centerPos.y;
                    if (this.centerPos.y < other.centerPos.y) {
                        this.vel.x = distanceX * 10;

                        var minVelX = 50;
                        var maxVelX = 150;
                        var powerVel = 90;
                        if (this.vel.x > maxVelX) {
                            this.vel.x = maxVelX;
                        } else if (this.vel.x < -maxVelX) {
                            this.vel.x = -maxVelX;
                        } else if (this.vel.x < minVelX && this.vel.x > 0) {
                            this.vel.x = minVelX;
                        } else if (this.vel.x > -minVelX && this.vel.x < 0) {
                            this.vel.x = -minVelX;
                        }
                        this.vel.y = powerVel * this.gravityFactor + this.vel.y * 0.5;
                        // console.log(this.vel.x);
                    }

                    other.setGlow(this.vel);
                }

                if (other.tag == "block") {
                    var distanceX = this.centerPos.x - other.centerPos.x;
                    var distanceY = this.centerPos.y - other.centerPos.y;
                    if (this.centerPos.y < other.centerPos.y) {
                        this.vel.x = distanceX * 10;

                        var minVelX = 40;
                        var maxVelX = 80;
                        var powerVel = 80;
                        if (this.vel.x > maxVelX) {
                            this.vel.x = maxVelX;
                        } else if (this.vel.x < -maxVelX) {
                            this.vel.x = -maxVelX;
                        } else if (this.vel.x < minVelX && this.vel.x > 0) {
                            this.vel.x = minVelX;
                        } else if (this.vel.x > -minVelX && this.vel.x < 0) {
                            this.vel.x = -minVelX;
                        }
                        this.vel.y = powerVel * this.gravityFactor + this.vel.y * 0.5;

                    }
                }

                if (other.tag == "prize") {
                    if (!ig.game.isPrizeTouched && this.pos.y > other.pos.y){//Math.abs(this.vel.x) < 100) {
                        ig.game.isPrizeTouched = true;
                        //console.log("touchBounce!");
                        other.touchBounce();
                    }
                    /*if (!ig.game.isPrizeOpened && Math.abs(this.vel.x) < 1 && Math.abs(this.vel.y) < 40) {
                        ig.game.isPrizeOpened = true;
                        console.log("isPrizeOpened!");
                        other.getPrize();
                    }*/
                }
                // console.log(this.vel);
            },
            setAnimSheet: function () {
                var img = this.image;
                this.animSheet = new ig.AnimationSheet(img.path, img.width, img.height);
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

            updateOnOrientationChange:function() {
                

                this.pos.x = this.pos.x + ((ig.system.width-ig.game.lastSystemSize.x))*0.5;
                this.pos.y = this.pos.y + ((ig.system.height-ig.game.lastSystemSize.y));

                // console.log(this.pos.x);

                // if (this.anchorType != "" && this.anchorType != "none") {
                    // var point = ig.responsive.toAnchor(this.pos.x, this.pos.y, "center-bottom");
                    // this.pos.x = point.x;
                    // this.pos.y = point.y;
                // }

                // { x: x + this.halfWidth, y: y + this.height };
            },

            kill:function() {
                if (!this.isKilled) {
                    this.isKilled = true;
                    this.parent();
                }
                
            }
        });
    });