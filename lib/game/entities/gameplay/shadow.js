ig.module('game.entities.gameplay.shadow')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityShadow = ig.Entity.extend({
            
            zIndex: 10,
            alpha:1,

            init: function (x, y, settings) {
                this.image=new ig.Image(_CONFIG.configuration.game_play_shadow_image_url);
                this.parent(x, y, settings);
                this.setAnimSheet();
            },
            update: function () {
                this.parent();
            },
            draw:function() {
                ig.system.context.globalAlpha = this.alpha;
                this.parent();
                ig.system.context.globalAlpha = 1;
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
                this.lightTween = this.tween({
                    alpha:1
                },
                0.3, {
                    easing: ig.Tween.Easing.Quadratic.EaseOut
                }
                );
                this.lightTween.start();
            }
        });
    });