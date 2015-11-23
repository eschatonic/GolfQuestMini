function Flag(x,y){
	this.x = x;
	this.y = y;
	this.draw = function(frameCount){
		var animOffset = Math.sin((frameCount/10)/Math.PI) * 5;
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x,this.y);

		environment.ctx.lineTo(this.x,this.y - 60);
		environment.ctx.bezierCurveTo(
			this.x + 15, this.y - 60,
			this.x + 30, this.y - 40 - animOffset,
			this.x + 40, this.y - 40 + animOffset/2
		);
		environment.ctx.bezierCurveTo(
			this.x + 40, this.y - 40 + animOffset,
			this.x + 30, this.y - 30 - animOffset,
			this.x, this.y - 40
		);
		environment.ctx.fillStyle = colours.PURPLE;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.closePath();
		environment.ctx.fill();
		environment.ctx.stroke();
	}
}

function Windmill(x,y){
	this.x = x;
	this.y = y;
	this.draw = function(frameCount){
		//body+roof
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x - 40, this.y);
		environment.ctx.lineTo(this.x - 30, this.y - 100);
		environment.ctx.lineTo(this.x, this.y - 130);
		environment.ctx.lineTo(this.x + 30, this.y - 100);
		environment.ctx.lineTo(this.x + 40, this.y);
		environment.ctx.fillStyle = colours.PURPLE;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.closePath();
		environment.ctx.fill();
		environment.ctx.stroke();
		//body
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x - 40, this.y);
		environment.ctx.lineTo(this.x - 30, this.y - 100);
		environment.ctx.lineTo(this.x + 30, this.y - 100);
		environment.ctx.lineTo(this.x + 40, this.y);
		environment.ctx.fillStyle = colours.PINK;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.closePath();
		environment.ctx.fill();
		environment.ctx.stroke();
		//door
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x + 8, this.y);
		environment.ctx.lineTo(this.x + 8, this.y - 12);
		environment.ctx.arc(this.x + 16, this.y - 12, 8, Math.PI, 0, false);
		environment.ctx.lineTo(this.x + 24, this.y);
		environment.ctx.fillStyle = colours.WHITE;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.closePath();
		environment.ctx.fill();
		environment.ctx.stroke();
		//bricks
		environment.ctx.lineWidth = 2;
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x - 20, this.y - 20);
		environment.ctx.lineTo(this.x - 20, this.y - 44);
		environment.ctx.moveTo(this.x - 5, this.y - 40);
		environment.ctx.lineTo(this.x - 5, this.y - 50);
		environment.ctx.moveTo(this.x - 20, this.y - 70);
		environment.ctx.lineTo(this.x - 20, this.y - 90);
		environment.ctx.moveTo(this.x - 32, this.y - 30);
		environment.ctx.lineTo(this.x - 10, this.y - 30);
		environment.ctx.moveTo(this.x - 25, this.y - 40);
		environment.ctx.lineTo(this.x + 5, this.y - 40);
		environment.ctx.moveTo(this.x - 12, this.y - 12);
		environment.ctx.lineTo(this.x, this.y - 12);
		environment.ctx.moveTo(this.x - 28, this.y - 90);
		environment.ctx.lineTo(this.x - 20, this.y - 90);
		environment.ctx.moveTo(this.x - 20, this.y - 85);
		environment.ctx.lineTo(this.x - 8, this.y - 85);
		environment.ctx.closePath();
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.stroke();
		//blades
		var bx = this.x + 15;
		var by = this.y - 85;
		for (var i=0;i<4;i++){
			environment.ctx.save();
			environment.ctx.translate(bx,by);
			environment.ctx.rotate((90 * i) * Math.PI / 180 + (frameCount)/100);
			environment.ctx.beginPath();
			environment.ctx.moveTo(-5,0);
			environment.ctx.lineTo(-5,-80);
			environment.ctx.lineTo(20,-80);
			environment.ctx.lineTo(20,-15);
			environment.ctx.lineTo(0,-15);
			environment.ctx.lineTo(0,0);
			environment.ctx.closePath();
			environment.ctx.lineWidth = 3;
			environment.ctx.fillStyle = colours.PURPLE;
			environment.ctx.strokeStyle = colours.DARKGREY;
			environment.ctx.fill();
			environment.ctx.stroke();
			environment.ctx.restore();
		}
		environment.ctx.beginPath();
		environment.ctx.arc(bx,by,8,0,2*Math.PI);
		environment.ctx.closePath();
		environment.ctx.lineWidth = 3;
		environment.ctx.fillStyle = colours.PURPLE;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.fill();
		environment.ctx.stroke();
	}
}

function Cloud(x,y,scale){
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.move = function(){
		this.x += 0.6/this.scale;
		if (this.x > environment.canvas.width + 60*this.scale){
			this.x = -80*this.scale;
			this.y = environment.canvas.height * (2 * Math.random() / 3) + 40;
		}
	};
	this.draw = function(){
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x - 60*this.scale,this.y + 30*this.scale);
		environment.ctx.quadraticCurveTo(
			this.x - 60*this.scale, this.y - 10*this.scale,
			this.x - 30*this.scale, this.y - 10*this.scale
		);
		environment.ctx.bezierCurveTo(
			this.x - 20*this.scale, this.y - 50*this.scale,
			this.x + 30*this.scale, this.y - 50*this.scale,
			this.x + 40*this.scale, this.y - 15*this.scale
		);
		environment.ctx.quadraticCurveTo(
			this.x + 80*this.scale, this.y - 10*this.scale,
			this.x + 80*this.scale, this.y + 30*this.scale
		);
		environment.ctx.lineTo(this.x - 60*this.scale,this.y + 30*this.scale);
		environment.ctx.fillStyle = colours.WHITE;
		environment.ctx.strokeStyle = colours.LIGHTGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.closePath();
		environment.ctx.fill();
		environment.ctx.stroke();
	}
}

function MenuGrass(){
	this.draw = function(){
		environment.ctx.fillStyle = colours.GREEN;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.fillRect(-5,environment.canvas.height-82,environment.canvas.width+10,90);
		environment.ctx.strokeRect(-5,environment.canvas.height-82,environment.canvas.width+10,90);
	}
}
function MenuBushRight(){
	this.draw = function(){
		environment.ctx.beginPath();
		environment.ctx.moveTo(environment.canvas.width * 0.7,environment.canvas.height - 82);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width * 0.72, environment.canvas.height - 130,
			environment.canvas.width * 0.77, environment.canvas.height - 120
		);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width * 0.75, environment.canvas.height - 180,
			environment.canvas.width * 0.83, environment.canvas.height - 180
		);
		environment.ctx.bezierCurveTo(
			environment.canvas.width * 0.83, environment.canvas.height - 210,
			environment.canvas.width * 0.85, environment.canvas.height - 220,
			environment.canvas.width * 0.88, environment.canvas.height - 220
		);
		environment.ctx.bezierCurveTo(
			environment.canvas.width * 0.87, environment.canvas.height - 280,
			environment.canvas.width * 0.96, environment.canvas.height - 290,
			environment.canvas.width * 0.98, environment.canvas.height - 260
		);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width, environment.canvas.height - 280,
			environment.canvas.width + 50, environment.canvas.height - 260
		);
		environment.ctx.lineTo(environment.canvas.width + 5, environment.canvas.height - 82);
		environment.ctx.closePath();
		environment.ctx.fillStyle = colours.PURPLE;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.fill();
		environment.ctx.stroke();
	}
}
function MenuBushLeft(){
	this.draw = function(){
		environment.ctx.beginPath();
		environment.ctx.moveTo(environment.canvas.width * 0.3,environment.canvas.height - 82);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width * 0.29, environment.canvas.height - 140,
			environment.canvas.width * 0.25, environment.canvas.height - 140
		);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width * 0.26, environment.canvas.height - 200,
			environment.canvas.width * 0.2, environment.canvas.height - 200
		);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width * 0.21, environment.canvas.height - 270,
			environment.canvas.width * 0.12, environment.canvas.height - 260
		);
		environment.ctx.quadraticCurveTo(
			environment.canvas.width * 0.09, environment.canvas.height - 310,
			environment.canvas.width * 0.03, environment.canvas.height - 280
		);
		environment.ctx.quadraticCurveTo(
			0, environment.canvas.height - 290,
			-50, environment.canvas.height - 280
		);
		environment.ctx.lineTo(-5, environment.canvas.height - 82);
		environment.ctx.closePath();
		environment.ctx.fillStyle = colours.PURPLE;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		environment.ctx.fill();
		environment.ctx.stroke();
	}
}
function MenuTitle(){
	this.draw = function(){
		var tx = 150,
			ty = 35;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.fillStyle = colours.PURPLE;
		//title bubble
		roundRect(environment.ctx,tx+110,ty+230,280,115,50,true,true);
		roundRect(environment.ctx,tx-10,ty,520,280,50,true,true);
		environment.ctx.fillRect(tx+112,ty+277,276,6);
		//title text
		environment.ctx.textAlign = "center";
		environment.ctx.fillStyle = colours.GOLD;
		environment.ctx.font = "bold 112px" + environment.font;
		strokeFillText(environment.ctx,"GOLF",environment.canvas.width/2,ty + 95);
		environment.ctx.font = "bold 164px" + environment.font;
		strokeFillText(environment.ctx,"QUEST",environment.canvas.width/2+8,ty + 230);

		environment.ctx.font = "96px" + environment.font;
		environment.ctx.fillStyle = colours.GREEN;
		environment.ctx.setTransform (1, 0, -0.17, 1, 0, 0);
		strokeFillText(environment.ctx,"M",environment.canvas.width/2 - 10, ty+320);
		environment.ctx.setTransform (1, 0, -0.03, 1, 0, 0);
		strokeFillText(environment.ctx,"I",environment.canvas.width/2 + 2 , ty+320);
		environment.ctx.setTransform (1, 0, 0.10, 1, 0, 0);
		strokeFillText(environment.ctx,"N",environment.canvas.width/2 + 10, ty+320);
		environment.ctx.setTransform (1, 0, 0.21, 1, 0, 0);
		strokeFillText(environment.ctx,"I",environment.canvas.width/2 + 25, ty+320);
		environment.ctx.setTransform (1, 0, 0, 1, 0, 0);
	}
}
function MenuText(){
	this.draw = function(){
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.fillStyle = colours.WHITE;
		environment.ctx.font = "42px" + environment.font;
		strokeFillText(environment.ctx,"PRESS SPACE TO BEGIN",environment.canvas.width/2,environment.canvas.height - 25);
	}
}

function Bars(bars,x,y,w,h,colour,lineWidth){
	this.bars = bars;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.colour = colour;
	this.lineWidth = lineWidth;
	this.draw = function(){
		for (var i=1;i<this.bars;i++){
			environment.ctx.beginPath();
			environment.ctx.moveTo(i * (this.w/this.bars) + this.x, this.y);
			environment.ctx.lineTo(i * (this.w/this.bars) + this.x, this.y + this.h);
			environment.ctx.strokeStyle = this.colour || colours.DARKGREY;
			environment.ctx.lineWidth = this.lineWidth || 2;
			environment.ctx.closePath();
			environment.ctx.stroke();
		}
	}
}

function SandtrapsBackWall(){
	this.draw = function(){
		environment.ctx.fillStyle = colours.LIGHTGREY;
		environment.ctx.strokeStyle = colours.DARKGREY;
		environment.ctx.lineWidth = 3;
		strokeFillRect(environment.ctx,-10,-10,environment.canvas.width+20,90);
		environment.ctx.fillStyle = colours.MIDGREY;
		strokeFillRect(environment.ctx,-10,20,environment.canvas.width+20,20);
		environment.ctx.fillStyle = colours.MIDGREY2;
		strokeFillRect(environment.ctx,100,-10,150,90);
	}
}
function SandtrapsBookshelf(x,y){
	this.x = x;
	this.y = y;
	this.bars1 = new Bars(15, x + 10, y - 45, 280, 30, colours.DARKORANGE, 3);
	this.bars2 = new Bars(15, x + 10, y - 85, 280, 30, colours.DARKORANGE, 3);
	this.draw = function(){
		//outline
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x,this.y);
		environment.ctx.lineTo(this.x,this.y-100);
		environment.ctx.quadraticCurveTo(this.x,this.y-120,this.x+20,this.y-120);
		environment.ctx.lineTo(this.x+280,this.y-120);
		environment.ctx.quadraticCurveTo(this.x+300,this.y-120,this.x+300,this.y-100);
		environment.ctx.lineTo(this.x+300,this.y);
		environment.ctx.closePath();
		environment.ctx.fillStyle = colours.ORANGE;
		environment.ctx.strokeStyle = colours.DARKORANGE;
		environment.ctx.lineWidth = 3;
		environment.ctx.fill();
		environment.ctx.stroke();
		//uppershelf
		environment.ctx.fillStyle = colours.MIDORANGE;
		strokeFillRect(environment.ctx,this.x + 10,this.y - 45, 280, 30);
		this.bars1.draw();
		strokeFillRect(environment.ctx,this.x + 10,this.y - 85, 280, 30);
		this.bars2.draw();
	}
}
function SandtrapsTable(x,y){
	this.x = x;
	this.y = y;
	this.chair1 = new SandtrapsChair(x+15,y-60);
	this.chair2 = new SandtrapsChair(x+70,y-60);
	this.chair3 = new SandtrapsChair(x+15,y+10);
	this.chair4 = new SandtrapsChair(x+70,y+10);
	this.draw = function(){
		this.chair1.draw();
		this.chair2.draw();
		environment.ctx.fillStyle = colours.GOLD;
		environment.ctx.strokeStyle = colours.DARKORANGE;
		environment.ctx.lineWidth = 3;
		strokeFillRect(environment.ctx,this.x,this.y - 70, 120, 70);
		this.chair3.draw();
		this.chair4.draw();
	}
}
function SandtrapsChair(x,y){
	this.x = x;
	this.y = y;
	this.draw = function(){
		environment.ctx.beginPath();
		environment.ctx.moveTo(this.x,this.y);
		environment.ctx.lineTo(this.x+5,this.y-30);
		environment.ctx.lineTo(this.x+30,this.y-30);
		environment.ctx.lineTo(this.x+35,this.y);
		environment.ctx.closePath();
		environment.ctx.fillStyle = colours.ORANGE;
		environment.ctx.strokeStyle = colours.DARKORANGE;
		environment.ctx.lineWidth = 3;
		environment.ctx.fill();
		environment.ctx.stroke();
	}
}

function Character(name,facing,x,y){
	this.name = name;
	this.facing = facing;
	this.x = x;
	this.y = y;
	this.draw = function(){
		drawSprite(game.characters[this.name][this.facing],this.x,this.y,0.8,"center");
	}
}