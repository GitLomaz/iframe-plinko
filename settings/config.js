//Once the requested config data is retreived, this variable (_CONFIG) will be overridden by the retreived data
//So, make sure to use the same property names as the retreived data
//In case you want to rename the properties, please read comment inside "ApplyCarltonOneConfig" function
var _CONFIG = {

}

var _DEFAULTDATA = {
    "background_image_url": "media/graphics/game/cups-background.jpg",
    "table_image_url": "media/graphics/game/table.png",
    "cup_image_url": "media/graphics/game/cup.png",
    "coin_image_url": "media/graphics/game/coin.png",
    "initial_screen_title_font_color": "#ffffff",
    "prize_screen_points_font_color": "#ffffff",
    "prize_screen_remaining_plays_description_font_color": "#ffffff",
    "prize_screen_play_again_button_active_background_color": "#f9c53a",
    "prize_screen_play_again_button_active_font_color": "#ffffff",
    "prize_screen_play_again_button_inactive_background_color": "#999999",
    "prize_screen_play_again_button_inactive_font_color": "#1e1e1b",
    "prize_screen_better_luck_font_color": "#ffffff",
    "member_language": "en",
    "translations": {
        "en": {
            "Choose one to win!": "Choose one to win!",
            "point!": "point!",
            "points!": "points!",
            "%d play remaining": "%d play remaining",
            "%d plays remaining": "%d plays remaining",
            "Play again": "Play again",
            //not on wiki
            "Better luck next time!" : "Better luck next time!"
        },
        "fr": {
            "Choose one to win!": "Choose one to win!",
            "point!": "point!",
            "points!": "points!",
            "%d play remaining": "%d play remaining",
            "%d plays remaining": "%d plays remaining",
            "Play again": "Play again",
            "Better luck next time!" : "Better luck next time!"
        }
    }
};

var _PLAY = {
    "isUpdated": false,
    //Once the requested play data is retreived, this property (data) will be overridden by the retreived data
    //So, make sure to use the same property names as the retreived data
    //In case you want to rename the properties, please read comment inside "ApplyCarltonOnePlay" function
    "data": {
        "points": 1000,
        "remainingMessage": "%d GAME PLAYS REMAINING",
        "remainingMessageVars": {
            "%d": 3
        },
        "remainingNumber": 3,
        "result": [
            1,
            1,
            0
        ]
    }
}

function checkEmptyParams(defObj, checkObj){
	for(var paramName in defObj){
		var checkData = checkObj[paramName]
		if(!checkData){
			checkObj[paramName] = defObj[paramName]
		} else {
			if(typeof(checkData) == 'object'){
				checkEmptyParams(defObj[paramName], checkObj[paramName])
			} else if(checkData == ""){
				checkObj[paramName] = defObj[paramName]
			}
		}
	}
}

function ApplyCarltonOneConfig(data) {
    if (data != null) _CONFIG = data;
    //feel free to modify it, in case you want to rename the properties based on the retrieved data
    //for example => _CONFIG.inactive_btn_text_color = data.prize_screen_play_again_button_inactive_background_color;

    //check essential data
    checkEmptyParams(_DEFAULTDATA, _CONFIG)

    PreloadImages();

    useCarltonApi = true;
}

function ApplyCarltonOnePlay(data) {
    if (data != null) _PLAY.data = data;

    _PLAY.isUpdated = true;
    //feel free to modify it, in case you want to rename the properties based on the retrieved data
    //for example => _PLAY.data.result = data.result;
}

function PreloadImages() {
    if (!ig.loader)
        return;

    // preload assets
    ig.loader._unloaded.push(_CONFIG.background_image_url);
    ig.loader._unloaded.push(_CONFIG.table_image_url);
    ig.loader._unloaded.push(_CONFIG.cup_image_url);
    ig.loader._unloaded.push(_CONFIG.coin_image_url);

    var background_image = new ig.Image(_CONFIG.background_image_url);
    background_image.loadCallback = ig.loader._loadCallbackBound;

    var table_image = new ig.Image(_CONFIG.table_image_url);
    table_image.loadCallback = ig.loader._loadCallbackBound;

    var cup_image = new ig.Image(_CONFIG.cup_image_url);
    cup_image.loadCallback = ig.loader._loadCallbackBound;

    var coin_image = new ig.Image(_CONFIG.coin_image_url);
    coin_image.loadCallback = ig.loader._loadCallbackBound;
}