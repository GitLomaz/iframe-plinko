ig.module('game.entities.cup-game.base-entity')
.requires(
	'impact.entity'
)
.defines(function() {
	BaseEntity = ig.Entity.extend({
        entityScale: { x: 1, y: 1 },
        anchorPivot: { x: 0.5, y: 0.5 },
        anchoredOriginX: 0,
        anchoredOriginY: 0,
        anchoredOffsetX: 0,
        anchoredOffsetY: 0,
        anchorUpdating: false,
        scaleUpdating: false,
        ignoreVerticalScaling: false,

		init:function(x,y,settings){
			this.parent(x,y,settings);
            this.setScale(this.entityScale.x, this.entityScale.y);
            this.anchoredOriginX = x;
            this.anchoredOriginY = y;
            this.setAnchoredPosition(x - this.size.x*this.anchorPivot.x, y - this.size.y*this.anchorPivot.y, this.anchorType);
		},

        update: function() {
            this.parent();

            if (this.scaleUpdating) {
                this.updateScale();
            }

            if (this.anchorUpdating) {
                this.updateAnchor();
            }
        },

        updateAnchor: function() {
            if (this.ignoreVerticalScaling) {
                this.anchoredPositionX = this.anchoredOriginX + this.anchoredOffsetX - this.size.x*this.anchorPivot.x;
                this.anchoredPositionY = this.anchoredOriginY + this.anchoredOffsetY - this.size.y*this.anchorPivot.y;
            } else {
                this.anchoredPositionX = (this.anchoredOriginX + this.anchoredOffsetX)*ig.game.verticalScale - this.size.x*this.anchorPivot.x;
                this.anchoredPositionY = (this.anchoredOriginY + this.anchoredOffsetY)*ig.game.verticalScale - this.size.y*this.anchorPivot.y;
            }
        },

        updateScale: function() {
            if (this.ignoreVerticalScaling) {
                this.setScale(this.entityScale.x, this.entityScale.y);
            } else {
                this.setScale(this.entityScale.x*ig.game.verticalScale, this.entityScale.y*ig.game.verticalScale);
            }
        },

        onResolutionChange: function() {
            this.updateScale();
            this.updateAnchor();
            var point = ig.responsive.toAnchor(this.anchoredPositionX, this.anchoredPositionY, this.anchorType);
            this.pos.x = point.x;
            this.pos.y = point.y;
        },

        setImage: function(image) {
            this.image = image;
            this.animSheet = new ig.AnimationSheet(this.image.path, this.image.width, this.image.height);
            this.addAnim('default', 1, [0]);
            this.size = { x: this.image.width, y: this.image.height };
            this._size = { x: this.image.width, y: this.image.height };
            this.onResolutionChange();
        },
	});
});