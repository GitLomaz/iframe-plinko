ig.module('game.entities.gameplay.block')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityBlock = ig.Entity.extend({
            tag: "block",
            gravityFactor: 0,
            zIndex: 101,
            collides: ig.Entity.COLLIDES.PASSIVE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            maxVel: {
                x: 0,
                y: 0
            },
            
            
            init: function (x, y, settings) {
                this.image=new ig.Image(_CONFIG.configuration.game_play_block_image_url);
                this.parent(x, y, settings);
                this.setAnimSheet();
            },
            update: function () {
                this.parent();
                this.centerPos = {
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y
                };
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
        });
    });