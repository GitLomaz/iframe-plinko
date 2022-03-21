ig.module('plugins.text-wrapper')
.requires(
).defines(function () {
	ig.wrapText = function(text, maxWidth, fontSize, font, preserveWordsFlag) {
		var ctx = ig.system.context;
		ctx.font = fontSize + "px " + font;

		var words = text.split(" ");
		var line = "";

		var arr = [];
		if(words.length == 1){
			for(var n=0, nl=text.length; n<nl; n++){
				var testLine = line + text[n];
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > maxWidth && n > 0) {
					arr.push(line);
					line = text[n];
				}
				else {
					line = testLine;
				}
			}
			arr.push(line);
		}else{
			//for each word
			for(var n=0, nl=words.length; n<nl; n++){
				//condition for splitting: if word length is too long
				var metrics = ctx.measureText(line + words[n]);
				if (!preserveWordsFlag && metrics.width > maxWidth){
					//for each character in the word
					for(var c=0, cl=words[n].length; c<cl; c++){
						var testLine = line + words[n][c];
						var metrics = ctx.measureText(testLine);
						var testWidth = metrics.width;
						if (testLine.indexOf('\n') !== -1 || testLine.indexOf('\r') !== -1 || testLine.indexOf(' \ n ') !== -1 || testLine.indexOf(' \ r ') !== -1 ){
							arr.push(line);
							line = words[n][c].replace(/[\n\r]/g, '');
						}
						else if (testWidth > maxWidth && c > 0) {
							arr.push(line);
							line = words[n][c];
						}
						else {
							line = testLine;
						}
					}
					line = line + " ";
				}else{
					var testLine = line + words[n] + " ";
					var metrics = ctx.measureText(testLine);
					var testWidth = metrics.width;
					if (testWidth > maxWidth && n > 0){
						arr.push(line);
						line = words[n] + " ";
					} else if (testLine.indexOf('\n') !== -1 || testLine.indexOf('\r') !== -1 || testLine.indexOf(' \ n ') !== -1 || testLine.indexOf(' \ r ') !== -1 ){
						line = line.replace(/[\n\r]/g, '');
						arr.push(line);
						line = words[n] + ' ';
						line = line.replace(/[\n\r]/g, '');
					}else{
						line = testLine;
					}
				}
			}
			arr.push(line);
		}

		return arr;
	};

	ig.drawMultiLinesText = function (textArray, x, y, lineHeight, drawStroke) {
		for (var i = 0; i < textArray.length; i++) {
			if (drawStroke)
				ig.system.context.strokeText(textArray[i], x, y + i * lineHeight);
			ig.system.context.fillText(textArray[i], x, y + i * lineHeight);
		}
	}
});