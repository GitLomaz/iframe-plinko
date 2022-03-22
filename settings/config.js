//Once the requested config data is retreived, this variable (_CONFIG) will be overridden by the retreived data
//So, make sure to use the same property names as the retreived data
//In case you want to rename the properties, please read comment inside "ApplyCarltonOneConfig" function
var _CONFIG = {
};

var _PLAY = {
    "isUpdated": false,
    "demoMode": false,
    //Once the requested play data is retreived, this property (data) will be overridden by the retreived data
    //So, make sure to use the same property names as the retreived data
    //In case you want to rename the properties, please read comment inside "ApplyCarltonOnePlay" function
    "action": "play",
    "data": {
        "points": 1000,
        "remainingMessage": "%d GAME PLAYS REMAINING",
        "remainingMessageVars": {
            "%d": 1100
        },
        "remainingNumber": 1100,
        "result": 0
    }
}

var _DEFAULTDATA = {
    "configuration":{
        "game_play_screen_background_image_url": "./media/graphics/game/plinko-background.png",
        "game_play_screen_coin_image_url": "./media/graphics/game/coin.png",
        "game_play_screen_present_image_url": "./media/graphics/game/present.png",
        "prize_modal_background_image_url": "./media/graphics/game/window-container.png",
        "game_play_bumper_image_url": "./media/graphics/game/bumper.png",
        "game_play_block_image_url": "./media/graphics/game/block.png",
        "game_play_light_enter_image_url": "./media/graphics/game/light-enter.png",
        "game_play_shadow_image_url": "./media/graphics/game/shadow.png",

        "prize_modal_prize_description_font_color":"#ffffff",
        "prize_modal_remaining_plays_description_font_color":"#830161",
        "prize_modal_play_again_button_active_background_color":"#830161",
        "prize_modal_play_again_button_inactive_background_color":"#651C52",
        "prize_modal_play_again_button_active_font_color":"#ffffff",
        "prize_modal_play_again_button_inactive_font_color":"#AAAAAA",
        
        "game_play_extended_background_color":"#470037",
        "game_play_wall_overlay_color":"#404040",
        "prize_modal_prize_description_font_shadow_color":"#DA8411",

        "loading_screen_background_color": "#222222",
        "loading_screen_empty_bar_color": "#FFFFFF",
        "loading_screen_fill_bar_color": "#222222"
    },

    "member_language": "en",
    "translations": {
        "en": {
            "point!": "point!",
            "points!": "points!",
            "%d play remaining": "%d play remaining",
            "%d plays remaining": "%d plays remaining",
            "Play again": "Play again",
            "Better luck next time!": "Better luck next time!"
        },
        "fr": {
            "point!": "point!",
            "points!": "points!",
            "%d play remaining": "%d play remaining",
            "%d plays remaining": "%d plays remaining",
            "Play again": "Play again",
            "Better luck next time!": "Better luck next time!"
        }
    }
};

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

    useCarltonApi = true;
}

function ApplyCarltonOnePlay(data) {
    if (data != null) _PLAY.data = data;

    _PLAY.isUpdated = true;
    //feel free to modify it, in case you want to rename the properties based on the retrieved data
    //for example => _PLAY.data.result = data.result;
}