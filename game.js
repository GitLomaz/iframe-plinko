var _STRINGS={Ad:{Mobile:{Preroll:{ReadyIn:"The game is ready in ",Loading:"Your game is loading...",Close:"Close"},Header:{ReadyIn:"The game is ready in ",Loading:"Your game is loading...",Close:"Close"},End:{ReadyIn:"Advertisement ends in ",Loading:"Please wait ...",Close:"Close"}}},Splash:{Loading:"Loading ...",LogoLine1:"Some text here",LogoLine2:"powered by MarketJS",LogoLine3:"none",TapToStart:"TAP TO START"},Game:{SelectPlayer:"Select Player",Win:"You win!",Lose:"You lose!",Score:"Score",Time:"Time"},
Results:{Title:"High score"}};var _CONFIG={},_PLAY={isUpdated:!1,demoMode:!1,action:"play",data:{points:1E3,remainingMessage:"%d GAME PLAYS REMAINING",remainingMessageVars:{"%d":1100},remainingNumber:1100,result:0}},_DEFAULTDATA={configuration:{game_play_screen_background_image_url:"./media/graphics/game/plinko-background.png",game_play_screen_coin_image_url:"./media/graphics/game/coin.png",game_play_screen_present_image_url:"./media/graphics/game/present.png",prize_modal_background_image_url:"./media/graphics/game/window-container.png",
game_play_bumper_image_url:"./media/graphics/game/bumper.png",game_play_block_image_url:"./media/graphics/game/block.png",game_play_light_enter_image_url:"./media/graphics/game/light-enter.png",game_play_shadow_image_url:"./media/graphics/game/shadow.png",prize_modal_prize_description_font_color:"#ffffff",prize_modal_remaining_plays_description_font_color:"#830161",prize_modal_play_again_button_active_background_color:"#830161",prize_modal_play_again_button_inactive_background_color:"#651C52",prize_modal_play_again_button_active_font_color:"#ffffff",
prize_modal_play_again_button_inactive_font_color:"#AAAAAA",game_play_extended_background_color:"#470037",game_play_wall_overlay_color:"#404040",prize_modal_prize_description_font_shadow_color:"#DA8411",loading_screen_background_color:"#222222",loading_screen_empty_bar_color:"#FFFFFF",loading_screen_fill_bar_color:"#222222"},member_language:"en",translations:{en:{"point!":"point!","points!":"points!","%d play remaining":"%d play remaining","%d plays remaining":"%d plays remaining","Play again":"Play again",
"Better luck next time!":"Better luck next time!"},fr:{"point!":"point!","points!":"points!","%d play remaining":"%d play remaining","%d plays remaining":"%d plays remaining","Play again":"Play again","Better luck next time!":"Better luck next time!"}}};function checkEmptyParams(a,b){for(var c in a){var d=b[c];d?"object"==typeof d?checkEmptyParams(a[c],b[c]):""==d&&(b[c]=a[c]):b[c]=a[c]}}
function ApplyCarltonOneConfig(a){null!=a&&(_CONFIG=a);checkEmptyParams(_DEFAULTDATA,_CONFIG);useCarltonApi=!0}function ApplyCarltonOnePlay(a){null!=a&&(_PLAY.data=a);_PLAY.isUpdated=!0};var _SETTINGS={API:{Enabled:!0,Log:{Events:{InitializeGame:!0,EndGame:!0,Level:{Begin:!0,End:!0,Win:!0,Lose:!0,Draw:!0}}}},Ad:{Mobile:{Preroll:{Enabled:!1,Duration:5,Width:300,Height:250,Rotation:{Enabled:!1,Weight:{MobileAdInGamePreroll:40,MobileAdInGamePreroll2:40,MobileAdInGamePreroll3:20}}},Header:{Enabled:!1,Duration:5,Width:320,Height:50,Rotation:{Enabled:!1,Weight:{MobileAdInGameHeader:40,MobileAdInGameHeader2:40,MobileAdInGameHeader3:20}}},Footer:{Enabled:!1,Duration:5,Width:320,Height:50,
Rotation:{Enabled:!1,Weight:{MobileAdInGameFooter:40,MobileAdInGameFooter2:40,MobileAdInGameFooter3:20}}},End:{Enabled:!1,Duration:1,Width:300,Height:250,Rotation:{Enabled:!1,Weight:{MobileAdInGameEnd:40,MobileAdInGameEnd2:40,MobileAdInGameEnd3:20}}}}},Language:{Default:"en"},DeveloperBranding:{Splash:{Enabled:!1},Logo:{Enabled:!1,Link:"http://google.com",LinkEnabled:!1,NewWindow:!0,Width:166,Height:61}},Branding:{Splash:{Enabled:!1},Logo:{Enabled:!0,Link:"http://google.com",LinkEnabled:!1,NewWindow:!0,
Width:166,Height:61}},MoreGames:{Enabled:!1,Link:"http://www.marketjs.com/game/links/mobile",NewWindow:!0},TapToStartAudioUnlock:{Enabled:!1},Versioning:{Version:"1.0.0",Build:"18",DisplayLog:!0,DrawVersion:!0,FontSize:"16px",FontFamily:"Arial",FillStyle:"#000000"}};"undefined"!==typeof _SETTINGS.Versioning&&null!==_SETTINGS.Versioning&&!0===_SETTINGS.Versioning.DisplayLog&&console.log("Release: v"+_SETTINGS.Versioning.Version+"+build."+_SETTINGS.Versioning.Build);var MobileAdInGamePreroll={ad_duration:_SETTINGS.Ad.Mobile.Preroll.Duration,ad_width:_SETTINGS.Ad.Mobile.Preroll.Width,ad_height:_SETTINGS.Ad.Mobile.Preroll.Height,ready_in:_STRINGS.Ad.Mobile.Preroll.ReadyIn,loading:_STRINGS.Ad.Mobile.Preroll.Loading,close:_STRINGS.Ad.Mobile.Preroll.Close+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",Initialize:function(){if(_SETTINGS.Ad.Mobile.Preroll.Rotation.Enabled){var a=_SETTINGS.Ad.Mobile.Preroll.Rotation.Weight,b=a.MobileAdInGamePreroll,c=
b+a.MobileAdInGamePreroll2,a=c+a.MobileAdInGamePreroll3,d=Math.floor(100*Math.random());console.log("seed: ",d);d<=b?this.selectedOverlayName="MobileAdInGamePreroll":d<=c?this.selectedOverlayName="MobileAdInGamePreroll2":d<=a&&(this.selectedOverlayName="MobileAdInGamePreroll3");console.log("Ad rotating preroll enabled")}else this.selectedOverlayName="MobileAdInGamePreroll",console.log("Ad rotating preroll disabled");console.log("selected:",this.selectedOverlayName);this.overlay=$("#"+this.selectedOverlayName);
this.box=$("#"+this.selectedOverlayName+"-Box");this.game=$("#game");this.boxContents={footer:$("#"+this.selectedOverlayName+"-Box-Footer"),header:$("#"+this.selectedOverlayName+"-Box-Header"),close:$("#"+this.selectedOverlayName+"-Box-Close"),body:$("#"+this.selectedOverlayName+"-Box-Body")};this.box.width(this.ad_width);this.box.height(this.ad_height);this.box.css("left",(this.overlay.width()-this.box.width())/2);this.box.css("top",(this.overlay.height()-this.box.height()-this.boxContents.header.height()-
this.boxContents.footer.height())/2);this.overlay.show(this.Timer(this.ad_duration))},Timer:function(a){var b=a,c=setInterval(function(){MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in+b+"...");MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading);b--;0>b&&(clearInterval(c),MobileAdInGamePreroll.boxContents.close.css("left",MobileAdInGamePreroll.boxContents.body.width()-23),MobileAdInGamePreroll.boxContents.close.show(),MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close),
MobileAdInGamePreroll.boxContents.footer.text(""))},1E3)},Close:function(){this.boxContents.close.hide();this.overlay.hide()}};var MobileAdInGameHeader={ad_duration:_SETTINGS.Ad.Mobile.Header.Duration,ad_width:_SETTINGS.Ad.Mobile.Header.Width,ad_height:_SETTINGS.Ad.Mobile.Header.Height,Initialize:function(){if(_SETTINGS.Ad.Mobile.Header.Rotation.Enabled){var a=_SETTINGS.Ad.Mobile.Header.Rotation.Weight,b=a.MobileAdInGameHeader,c=b+a.MobileAdInGameHeader2,a=c+a.MobileAdInGameHeader3,d=Math.floor(100*Math.random());console.log("seed: ",d);d<=b?this.selectedOverlayName="MobileAdInGameHeader":d<=c?this.selectedOverlayName="MobileAdInGameHeader2":
d<=a&&(this.selectedOverlayName="MobileAdInGameHeader3");console.log("Ad rotating header enabled")}else this.selectedOverlayName="MobileAdInGameHeader",console.log("Ad rotating header disabled");this.div=$("#"+this.selectedOverlayName);this.game=$("#game");this.div.width(this.ad_width);this.div.height(this.ad_height);this.div.css("left",this.game.position().left+(this.game.width()-this.div.width())/2);this.div.css("top",0);this.div.show(this.Timer(this.ad_duration))},Timer:function(a){var b=setInterval(function(){a--;
0>a&&(MobileAdInGameHeader.div.hide(),clearInterval(b))},1E3)}};var MobileAdInGameFooter={ad_duration:_SETTINGS.Ad.Mobile.Footer.Duration,ad_width:_SETTINGS.Ad.Mobile.Footer.Width,ad_height:_SETTINGS.Ad.Mobile.Footer.Height,Initialize:function(){if(_SETTINGS.Ad.Mobile.Footer.Rotation.Enabled){var a=_SETTINGS.Ad.Mobile.Footer.Rotation.Weight,b=a.MobileAdInGameFooter,c=b+a.MobileAdInGameFooter2,a=c+a.MobileAdInGameFooter3,d=Math.floor(100*Math.random());console.log("seed: ",d);d<=b?this.selectedOverlayName="MobileAdInGameFooter":d<=c?this.selectedOverlayName="MobileAdInGameFooter2":
d<=a&&(this.selectedOverlayName="MobileAdInGameFooter3");console.log("Ad rotating footer enabled")}else this.selectedOverlayName="MobileAdInGameFooter",console.log("Ad rotating footer disabled");this.div=$("#"+this.selectedOverlayName);this.game=$("#game");this.div.width(this.ad_width);this.div.height(this.ad_height);this.div.css("left",this.game.position().left+(this.game.width()-this.div.width())/2);this.div.css("top",this.game.height()-this.div.height()-5);this.div.show(this.Timer(this.ad_duration))},
Timer:function(a){var b=setInterval(function(){a--;0>a&&(MobileAdInGameFooter.div.hide(),clearInterval(b))},1E3)}};var MobileAdInGameEnd={ad_duration:_SETTINGS.Ad.Mobile.End.Duration,ad_width:_SETTINGS.Ad.Mobile.End.Width,ad_height:_SETTINGS.Ad.Mobile.End.Height,ready_in:_STRINGS.Ad.Mobile.End.ReadyIn,loading:_STRINGS.Ad.Mobile.End.Loading,close:_STRINGS.Ad.Mobile.End.Close+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",Initialize:function(){if(_SETTINGS.Ad.Mobile.End.Rotation.Enabled){var a=_SETTINGS.Ad.Mobile.End.Rotation.Weight,b=a.MobileAdInGameEnd,c=b+a.MobileAdInGameEnd2,a=c+a.MobileAdInGameEnd3,
d=Math.floor(100*Math.random());console.log("seed: ",d);d<=b?this.selectedOverlayName="MobileAdInGameEnd":d<=c?this.selectedOverlayName="MobileAdInGameEnd2":d<=a&&(this.selectedOverlayName="MobileAdInGameEnd3");console.log("Ad rotating end enabled")}else this.selectedOverlayName="MobileAdInGameEnd",console.log("Ad rotating end disabled");console.log("selected:",this.selectedOverlayName);this.overlay=$("#"+this.selectedOverlayName);this.box=$("#"+this.selectedOverlayName+"-Box");this.game=$("#game");
this.boxContents={footer:$("#"+this.selectedOverlayName+"-Box-Footer"),header:$("#"+this.selectedOverlayName+"-Box-Header"),close:$("#"+this.selectedOverlayName+"-Box-Close"),body:$("#"+this.selectedOverlayName+"-Box-Body")};this.box.width(this.ad_width);this.box.height(this.ad_height);this.box.css("left",(this.overlay.width()-this.box.width())/2);this.box.css("top",(this.overlay.height()-this.box.height()-this.boxContents.header.height()-this.boxContents.footer.height())/2);this.overlay.show(this.Timer(this.ad_duration))},
Timer:function(a){var b=a,c=setInterval(function(){MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in+b+"...");MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading);b--;0>b&&(clearInterval(c),MobileAdInGameEnd.boxContents.close.css("left",MobileAdInGameEnd.boxContents.body.width()-23),MobileAdInGameEnd.boxContents.close.show(),MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close),MobileAdInGameEnd.boxContents.footer.text(""))},1E3)},Close:function(){this.boxContents.close.hide();
this.overlay.hide()}};
