ig.module(
    'plugins.splash-loader-patch'
)
.requires(
    'plugins.carltonone-plugin'
)
.defines(function()
{
ig.SplashLoader.inject({
    init:function(gameClass,resources){
        this.parent(gameClass,resources);
        ig.loader = this;
    },

    end:function(){
        this.parent();
        ig.loader = null;
    },

    startLoad: function() {
        this.parent();
        
        if (!useCarltonApi) {
            _CONFIG = _DEFAULTDATA;
            PreloadImages();
        }
    }
});

});
