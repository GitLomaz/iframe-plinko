ig.module('game.entities.text')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityText = ig.Entity.extend({
		gravityFactor:0,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);

			this.size = {x:settings.width, y:settings.height}
			this.zIndex = settings.zIndex+1;

			this.verticalAlignment = "center";

			this.textFormat = settings.textFormat;
			this.textFormat.wordWraptextLines = [];

			this.lineHeight = parseInt(this.textFormat.font.substr(0, this.textFormat.font.indexOf("px ")));
			this.textPos = {x:0, y:this.lineHeight};

			this.updateTextWrap();
		},

		setVericalAlignment:function(vAlignment) {
			this.verticalAlignment = vAlignment;
			this.updateVerticalAlignment();
		},

		updateVerticalAlignment:function() {
			if (this.verticalAlignment == "top") {
				this.textPos = {x:0, y:this.lineHeight*0.5};
			} else if (this.verticalAlignment == "center") {
				this.textPos = {x:0, y:this.lineHeight*0.5 - this.textFormat.wordWraptextLines.length*this.lineHeight*0.5};
			} else if (this.verticalAlignment == "bottom") {
				this.textPos = {x:0, y:this.lineHeight*0.5 - (this.textFormat.wordWraptextLines.length-1)*this.lineHeight};
			}
		},

		updateTextWrap:function() {
			this.textFormat.wordWraptextLines = [];

            var words = this.textFormat.text.split(' ');
            var line = '';
			ig.system.context.font = this.textFormat.font;

            for(var n = 0; n < words.length; n++) {
                var testLine;

				if (n == 0)
					testLine = words[n] ;
				else
					testLine = line + ' ' + words[n] ;
				
                var metrics = ig.system.context.measureText(testLine);
				var testWidth = metrics.width;
				
				if (testWidth > this.size.x && n > 0) {
					var lineToPush = line;

					if (n+1 == words.length && words.length > 2) {
						line = words[n-1] + " " + words[n];
						lineToPush = lineToPush.replace((" " + words[n-1]), "")
					} else {
						line = words[n];
					}

					this.textFormat.wordWraptextLines.push(lineToPush); 
                }   else {
                    line = testLine;
                }
			}
			
			this.textFormat.wordWraptextLines.push(line);

			this.updateVerticalAlignment();
		},

		updateText:function(text) {
			this.textFormat.text = text;
			this.updateTextWrap();
		},
		
		draw:function(){
			this.parent();

			// ig.system.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		},

		parentDraw:function(parentPos) {
			ig.system.context.save();
			ig.system.context.translate(
                ig.system.getDrawPos(this.pos.x - parentPos.x),
                ig.system.getDrawPos(this.pos.y - parentPos.y)
            );
            ig.system.context.textAlign = this.textFormat.align;
			ig.system.context.font = this.textFormat.font;
			
			if (this.textFormat.lineWidth) ig.system.context.lineWidth = this.textFormat.lineWidth;
            if (this.textFormat.strokeStyle) ig.system.context.strokeStyle = this.textFormat.strokeStyle;
            if (this.textFormat.strokeOffset) {
				for (var i = 0; i < this.textFormat.wordWraptextLines.length; i++) {
					ig.system.context.strokeText(this.textFormat.wordWraptextLines[i],this.textPos.x + this.textFormat.strokeOffset.x,this.textPos.y + this.textFormat.strokeOffset.y + this.lineHeight * i);
				}
			} 
            

			ig.system.context.fillStyle = this.textFormat.fillStyle;
			
			for (var i = 0; i < this.textFormat.wordWraptextLines.length; i++) {
				ig.system.context.fillText(this.textFormat.wordWraptextLines[i],this.textPos.x,this.textPos.y + this.lineHeight * i);
			}
            
            ig.system.context.restore();
		},

		parentDraw2:function() {
			ig.system.context.save();
			ig.system.context.translate(
                ig.system.getDrawPos(this.pos.x),
                ig.system.getDrawPos(this.pos.y)
            );
            ig.system.context.textAlign = this.textFormat.align;
			ig.system.context.font = this.textFormat.font;
			
			if (this.textFormat.lineWidth) ig.system.context.lineWidth = this.textFormat.lineWidth;
            if (this.textFormat.strokeStyle) ig.system.context.strokeStyle = this.textFormat.strokeStyle;
            if (this.textFormat.strokeOffset) {
				for (var i = 0; i < this.textFormat.wordWraptextLines.length; i++) {
					ig.system.context.strokeText(this.textFormat.wordWraptextLines[i], this.textFormat.strokeOffset.x, this.textFormat.strokeOffset.y + this.lineHeight * i);
				}
			} 
            

			ig.system.context.fillStyle = this.textFormat.fillStyle;
			
			for (var i = 0; i < this.textFormat.wordWraptextLines.length; i++) {
				ig.system.context.fillText(this.textFormat.wordWraptextLines[i],this.textPos.x,this.textPos.y + this.lineHeight * i);
			}
            
            ig.system.context.restore();
		}
		
	});

});