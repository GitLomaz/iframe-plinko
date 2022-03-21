/**
 * FPS Limit Patch
 * to make sure the FPS is capped at 60 on displays with high refresh rate
 */
ig.module(
	"plugins.patches.fps-limit-patch"
).requires(
	'impact.impact'
).defines(function() {
	// Use requestAnimationFrame if available
	ig.normalizeVendorAttribute( window, 'requestAnimationFrame' );
	if( window.requestAnimationFrame ) {
		var next = 1,
			anims = {};
		window.ig.setAnimation = function( callback ) {
			var current = next++;
			anims[current] = true;
			
			var fps = ig.system.fps || 60, 
				last = performance.now();
			
			var animate = function( timestamp ) {
				if( !anims[current] ) { return; } // deleted?
				window.requestAnimationFrame( animate );
				callback();
				
				last = timestamp;
				while( performance.now() - timestamp < 1000/fps ) { /* wait, while we still have extra time before the next frame should start */ };
			};
			window.requestAnimationFrame( animate );
			return current;
		};
		window.ig.clearAnimation = function( id ) {
			delete anims[id];
		};
	}
});