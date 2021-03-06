ig.module(
		'plugins.carltonone-plugin'
	)
	.requires(
		'impact.loader',
		'plugins.handlers.api-handler',
		'plugins.splash-loader'
	)
	.defines(function() {
		CarltonOnePlugin = ig.ApiHandler.inject({
			debug: false,
			timeOutDelay: 30, //in seconds
			configTimeOutFunction: null,
			playTimeOutFunction: null,
			isGameStarted: false,
			init: function() {
				this.setAlias();
				this.getRequiredQueryVariables();
				this.addOverlayError();
				this.addOverlayInternetError();
			},
			setAlias: function() {
				ig.carltonOne = this;
				ig.global.carltonOne = window.carltonOne = this;
				// window.parent.GAME = window;
			},
			loadGame: function() {
				//this function will be injected/overridden by a function in splash loader
			},
			getConfig: function() {
				window.parent.postMessage({
					type: 'gameMessage',
					action: 'getConfiguration'
				}, '*');

				if (this.configTimeOutFunction != null)
					clearTimeout(this.configTimeOutFunction);

				this.configTimeOutFunction = setTimeout(function() {
					console.log("Request Timeout : Config data couldn't be retreived. Loading the default config ...");
					ig.carltonOne.loadGame();
				}.bind(this), this.timeOutDelay * 1000);
			},
			getPlay: function() {
				_PLAY.isUpdated = false;
				window.parent.postMessage({
					type: 'gameMessage',
					action: 'play'
				}, '*');

				if (this.playTimeOutFunction != null)
					clearTimeout(this.playTimeOutFunction);

				this.playTimeOutFunction = setTimeout(function() {
					this.showError("Request Timeout : Play data couldn't be retreived");
				}.bind(this), this.timeOutDelay * 1000);
			},
			getQueryVariable: function(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
			},
			getRequiredQueryVariables: function() {
				if (this.getQueryVariable("debug") != null && this.getQueryVariable("debug") != "") {
					this.debug = this.getQueryVariable("debug") == "true" ? true : false;
				} else {
					this.debug = false;
				}
			},
			addOverlayError: function() {
				var overlayError = document.createElement("div");
				overlayError.id = "overlayError";
				overlayError.style.position = "absolute";
				overlayError.style.width = '100vw';
				overlayError.style.height = "100vh";
				overlayError.style.fontWeight = "bold";
				overlayError.style.textAlign = "center";
				overlayError.style.verticalAlign = "middle";
				overlayError.style.lineHeight = "100vh";
				overlayError.style.color = "white";
				overlayError.style.fontFamily = "Roboto";
				overlayError.style.fontSize = "1em";
				overlayError.style.wordBreak = "break-word";
				overlayError.style.zIndex = 100005;
				overlayError.innerHTML = "Error";
				overlayError.style.background = 'rgba(0, 0, 0, 0.8)';
				overlayError.style.display = 'none';

				document.body.appendChild(overlayError);
				$('#overlayError').animate({
					top: 0
				}, 0);
			},
			showError: function(text) {
				var overlayError = document.getElementById("overlayError");
				overlayError.innerHTML = text;
				overlayError.style.display = 'block';
			},
			hideError: function() {
				var overlayError = document.getElementById("overlayError");
				overlayError.style.display = 'none';
			},
			addOverlayInternetError: function() {
				var overlayError = document.createElement("div");
				overlayError.id = "overlayInternetError";
				overlayError.style.position = "absolute";
				overlayError.style.width = '100vw';
				overlayError.style.height = "1";
				overlayError.style.fontWeight = "bold";
				overlayError.style.textAlign = "center";
				overlayError.style.verticalAlign = "middle";
				overlayError.style.color = "white";
				overlayError.style.fontFamily = "Roboto";
				overlayError.style.fontSize = "0.7em";
				overlayError.style.zIndex = 100006;
				overlayError.innerHTML = "No internet connection.";
				overlayError.style.background = 'rgba(255, 70, 70, 0.7)';
				overlayError.style.display = 'none';

				document.body.appendChild(overlayError);
				$('#overlayInternetError').animate({
					top: 0
				}, 0);
			},
			showInternetError: function() {
				var overlayError = document.getElementById("overlayInternetError");
				overlayError.style.display = 'block';
			},
			hideInternetError: function() {
				var overlayError = document.getElementById("overlayInternetError");
				overlayError.style.display = 'none';
			},
			updateOnlineStatus: function(event) {
				if (navigator.onLine == true) {
					ig.carltonOne.hideInternetError();
				} else {
					ig.carltonOne.showInternetError();
				}
			}
		});

		ig.SplashLoader.inject({
			init: function(gameClass, resources) {
				this.parent(gameClass, resources);
				this.injectLoadGame();
				this.initEventListeners();
				this._intervalId = setInterval(this.draw.bind(this), 16);
			},
			load: function() {
				console.log("CarltonOne API: retrieving config ...");
			},
			injectLoadGame: function() {
				ig.carltonOne.loadGame = function() {
					this.startLoad();
					ig.carltonOne.isGameStarted = true;
					ig.carltonOne.hideError();
					if (ig.carltonOne.configTimeOutFunction != null)
						clearTimeout(ig.carltonOne.configTimeOutFunction);
				}.bind(this);
			},
			startLoad: function() {
				ig.system.clear('#000');

				if (!this.resources.length) {
					this.end();
					return;
				}

				for (var i = 0; i < this.resources.length; i++) {
					this.loadResource(this.resources[i]);
				}
			},
			draw: function() {
				this._drawStatus += (this.status - this._drawStatus) / 5;
				if (this._drawStatus < 0.1) this._drawStatus = 0.1;

				//Check the game screen. see if the font are loaded first. Removing the two lines below is safe :)
				if (this.drawCheck === 1) console.log('Font should be loaded before loader draw loop');
				if (this.drawCheck < 2) this.drawCheck++;

				var ctx = ig.system.context;

				// DIMENSIONS OF LOADING BAR
				var w, h, x, y;
				var p = 3; //padding
				if (ig.ua.mobile) {
					w = 300;
					h = 25;
					x = ig.system.width * 0.5 - w / 2;
					y = ig.system.height * 0.5;
				} else {
					w = 500;
					h = 30;
					x = ig.system.width * 0.5 - w / 2;
					y = ig.system.height * 0.5;
				}

				ctx.rect(0, 0, ig.system.width, ig.system.height);
				// create radial gradient
				var grd = ctx.createRadialGradient(ig.system.width / 2, ig.system.height / 2, 10, ig.system.width / 2, ig.system.height / 2, 500);
				// light blue
				grd.addColorStop(0, '#2FA6FE');
				// dark blue
				// grd.addColorStop(1, '#0087EA');

				ctx.fillStyle = grd;
				ctx.fill();

				this.roundRect(x - p, y - p, x + w + p, y + h + p, 20);
				ctx.fillStyle = '#FFFFFF';
				ctx.fill();

				ctx.save();
				this.roundRect(x, y, x + w * this._drawStatus, y + h, 20);
				ctx.fillStyle = '#C20269';
				ctx.fill();
				ctx.restore();

			},
			roundRect: function(x0, y0, x1, y1, r) {
				var ctx = ig.system.context;
				var w = x1 - x0;
				var h = y1 - y0;
				if (r > w / 2) r = w / 2;
				if (r > h / 2) r = h / 2;
				ctx.beginPath();
				ctx.moveTo(x1 - r, y0);
				ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
				ctx.lineTo(x1, y1 - r);
				ctx.quadraticCurveTo(x1, y1, x1 - r, y1);
				ctx.lineTo(x0 + r, y1);
				ctx.quadraticCurveTo(x0, y1, x0, y1 - r);
				ctx.lineTo(x0, y0 + r);
				ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
				ctx.closePath();
			},
			initEventListeners: function() {
				window.addEventListener('message', function(e) {
					var type = e.data.type;
					var action = e.data.action;
					if (type == "gameMessage" && e.data.data != null || type == "gameMessage" && ig.carltonOne.debug) {
						switch (action) {

							case "play":
								ApplyCarltonOnePlay(e.data.data);
								if (ig.carltonOne.playTimeOutFunction != null)
									clearTimeout(ig.carltonOne.playTimeOutFunction);
								ig.carltonOne.hideError();
								break;

							case "getConfiguration":
								if (!ig.carltonOne.isGameStarted) {
									console.log("CarltonOne API: config retrieved! Start the game ...");
									ig.carltonOne.loadGame();
								}
								ApplyCarltonOneConfig(e.data.data);
								break;

						}
					} else if (type == "gameMessage" && e.data.data == null && !ig.carltonOne.debug) {
						switch (action) {

							case "play":
								ig.carltonOne.showError("Error : Play data couldn't be retreived.");
								break;

							case "getConfiguration":
								// ig.carltonOne.showError("Error : Config data couldn't be retreived.");
								console.log("CarltonOne API: config couldn't be retrieved! Start the game with default config ...");
								ig.carltonOne.loadGame();
								break;

						}
					}
				}.bind(this));

				window.addEventListener('online', ig.carltonOne.updateOnlineStatus);
				window.addEventListener('offline', ig.carltonOne.updateOnlineStatus);

				ig.carltonOne.getConfig();
			}
		});

	});