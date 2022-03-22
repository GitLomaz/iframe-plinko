ig.module('game.entities.gameplay.invisible-edge')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityInvisibleEdge = ig.Entity.extend({
            tag: "edge",
            gravityFactor: 0,
            zIndex: 100,
            collides: ig.Entity.COLLIDES.PASSIVE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            maxVel: {
                x: 0,
                y: 0
            },
            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },
            update: function () {
                this.parent();
            }
        });
    });