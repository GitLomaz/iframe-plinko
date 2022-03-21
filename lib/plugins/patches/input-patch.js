/**
 * Input patch to correctly calculate mouse position
 * Attempt to unlock WebAudio
 */
ig.module(
    "plugins.patches.input-patch"
).requires(
    'impact.input'
).defines(function() {
    //inject
    ig.Input.inject({
        mousemove: function(event) {
            this.parent(event);

            /* attempt to unlock WebAudio */
            try {
                ig.soundHandler.unlockWebAudio();
            } catch (error) {}
        },

        keyup: function(event) {
            this.parent(event);

            if (ig.visibilityHandler) {
                ig.visibilityHandler.onChange("focus");
            }

            /* attempt to unlock WebAudio */
            try {
                ig.soundHandler.unlockWebAudio();
            } catch (error) {}
        }
    })
});