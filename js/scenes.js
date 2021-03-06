// SCENE FUNCTIONS

function changeScene(scene, preserveFrameCount){
	environment.objectsInScene = [];
	environment.scenes[scene].setup();
	if (!preserveFrameCount) environment.frameCount = 0;
	environment.currentScene = scene;
	environment.moving = false;
	environment.loc = {
		x:0,
		y:0
	}
}

function moveScene(){
	if (environment.moving){
		var step = 0.05;
		if (environment.moving[0] < 0){ //up
			environment.moving[0]++;
			environment.loc.y -= step;
		} else if (environment.moving[0] > 0){ //down
			environment.moving[0]--;
			environment.loc.y += step;
		} else if (environment.moving[1] < 0){ //left
			environment.moving[1]++;
			environment.loc.x -= step;
		} else if (environment.moving[1] > 0){ //right
			environment.moving[1]--;
			environment.loc.x += step;
		}
		if (environment.moving[0] == 0 && environment.moving[1] == 0){
			environment.moving = false;
			environment.loc.x = Math.round(environment.loc.x);
			environment.loc.y = Math.round(environment.loc.y);
		}
	}
}

function clear(style){
	environment.ctx.fillStyle = style || "black";
	environment.ctx.fillRect(0,0,environment.canvas.width,environment.canvas.height);
}

function drawSprite(sprite,x,y,scale,align){
	scale = scale || 1;
	if (align === "center"){
		x -= sprite.width * scale/2;
		y -= sprite.height * scale/2;
	}
	environment.ctx.drawImage(sprite,x,y,sprite.width * scale,sprite.height * scale);
}

function queueEvent(event, eventData, time){
	if (time) {
		console.log("Time does nothing right now");
	} else {
		environment.eventQueue.push({event:event, eventData:eventData});
	}
}
function dismissEvent(index){
	environment.eventQueue.splice(environment.eventQueue[0],1);
}

function drawDialogue(eventData){
	//draw box for dialogue
	environment.ctx.fillStyle = colours.DEEPPURPLE;
	environment.ctx.fillRect(200,450,550,125);
	environment.ctx.fillStyle = colours.PINK;
	environment.ctx.strokeStyle = colours.DEEPPURPLE;
	strokeFillRect(environment.ctx,750-3,450-3,6,125+6);
	strokeFillRect(environment.ctx,200-3,450-3,550+6,6);
	strokeFillRect(environment.ctx,200-3,575-3,550+6,6);
	//draw continue triangle
	if (environment.eventQueue.length > 1 && environment.eventQueue[1].event === "dialogue"){
		environment.ctx.beginPath();
		environment.ctx.moveTo(720,550 - Math.abs(Math.sin(environment.frameCount/10)) * 5);
		environment.ctx.lineTo(740,550 - Math.abs(Math.sin(environment.frameCount/10)) * 5);
		environment.ctx.lineTo(730,560 - Math.abs(Math.sin(environment.frameCount/10)) * 5);
		environment.ctx.closePath();
		environment.ctx.fill();
	}
	//write eventData.dialogue
	environment.ctx.fillStyle = colours.WHITE;
	environment.ctx.font = "24px sans-serif";
	environment.ctx.textAlign = "left";
	environment.ctx.fillText(game.characters[eventData.character].name.toUpperCase(),212,484);
	environment.ctx.fillText('"' + eventData.dialogue.toUpperCase() + '"',212,524);
	//draw character portrait for eventData.character
	drawSprite(game.characters[eventData.character].portrait,50,440);
	//draw box for character portrait
	environment.ctx.fillStyle = colours.PINK;
	strokeFillRect(environment.ctx,50-3,440-3,150+6,6);
	strokeFillRect(environment.ctx,50-3,585-3,150+6,6);
	strokeFillRect(environment.ctx,200-3,440-3,6,145+6);
	strokeFillRect(environment.ctx,50-3,440-3,6,145+6);
	//draw golfball corners
	var ballLocs = [[50,440],[200,440],[50,584],[200,584],[750,450],[750,575]];
	environment.ctx.strokeStyle = colours.LIGHTGREY;
	environment.ctx.fillStyle = colours.WHITE;
	for (var loc in ballLocs){
		environment.ctx.beginPath();
		//environment.ctx.moveTo();
		environment.ctx.arc(ballLocs[loc][0],ballLocs[loc][1],7,0,Math.PI*2,false);
		environment.ctx.closePath();
		environment.ctx.stroke();
		environment.ctx.fill();
	}
}
function drawGrantItem(eventData){
	clear(colours.GREEN);
	//draw box
	var x = 250,
		y = 350,
		w = 300,
		h = 100;
	environment.ctx.fillStyle = colours.DEEPPURPLE;
	environment.ctx.fillRect(x,y,w,h);
	//draw sides
	environment.ctx.fillStyle = colours.PINK;
	environment.ctx.strokeStyle = colours.DEEPPURPLE;
	strokeFillRect(environment.ctx,x-3,y-3,w+6,6);
	strokeFillRect(environment.ctx,x-3,y+h-3,w+6,6);
	strokeFillRect(environment.ctx,x-3,y-3,6,h+6);
	strokeFillRect(environment.ctx,x+w-3,y-3,6,h+6);
	//draw text
	environment.ctx.fillStyle = colours.WHITE;
	environment.ctx.font = "24px sans-serif";
	environment.ctx.textAlign = "left";
	environment.ctx.fillText('RECEIVED',x+12,y+40);
	environment.ctx.fillText(game.items[eventData.item].name.toUpperCase(),x+12,y+74);
	//draw golfball corners
	var ballLocs = [[x,y],[x,y+h],[x+w,y],[x+w,y+h]];
	environment.ctx.strokeStyle = colours.LIGHTGREY;
	environment.ctx.fillStyle = colours.WHITE;
	for (var loc in ballLocs){
		environment.ctx.beginPath();
		//environment.ctx.moveTo();
		environment.ctx.arc(ballLocs[loc][0],ballLocs[loc][1],7,0,Math.PI*2,false);
		environment.ctx.closePath();
		environment.ctx.stroke();
		environment.ctx.fill();
	}
}

// SCENE DATA

environment.scenes = {
	"intro": {
		setup: function(){
			for (var i=0; i<6; i++){
				environment.objectsInScene.push(new Cloud(environment.canvas.width/i + environment.canvas.width/5 * Math.random(), environment.canvas.height * (2 * Math.random() / 3) + 40, 0.7 + Math.random() * 0.6));
			}
			environment.objectsInScene.push(new IntroBushRight());
			environment.objectsInScene.push(new IntroBushLeft());
			environment.objectsInScene.push(new Flag(environment.canvas.width/2, environment.canvas.height - 82));
			environment.objectsInScene.push(new Windmill(environment.canvas.width*0.18, environment.canvas.height - 82));
			environment.objectsInScene.push(new IntroGrass());
			environment.objectsInScene.push(new IntroTitle());
			environment.objectsInScene.push(new IntroText());
		},
		loop: function(){
			//background
			clear(colours.PINK);

			controls.scenes.intro();

			//move objects
			for (var obj in environment.objectsInScene){
				if (environment.objectsInScene[obj].move) environment.objectsInScene[obj].move();
			}
			//draw objects
			for (var obj in environment.objectsInScene){
				environment.objectsInScene[obj].draw(environment.frameCount);
			}
		}
	},
	"sandtrapsHouse": {
		setup: function(){
			environment.objectsInScene.push(new Bars(18,0,0,environment.canvas.width,environment.canvas.height));
			environment.objectsInScene.push(new SandtrapsBackWall());
			environment.objectsInScene.push(new SandtrapsBookshelf(-40,250));
			environment.objectsInScene.push(new SandtrapsBookshelf(environment.canvas.width-240,250));
			environment.objectsInScene.push(new SandtrapsTable(70,400));
			environment.objectsInScene.push(new SandtrapsTable(environment.canvas.width - 170,400));
			environment.objectsInScene.push(new Character("sandtraps","front",environment.canvas.width/2,150));
			environment.objectsInScene.push(new Character("ace","back",environment.canvas.width/2 + 40,280));
			environment.objectsInScene.push(new Character("lina","back",environment.canvas.width/2 + 140,360));
			environment.objectsInScene.push(new Character("wedge","back",environment.canvas.width/2 - 40,370));

			if (game.inventory.indexOf("mythrilPutter") === -1){
				queueEvent("dialogue", { character:"sandtraps", dialogue: "It's dangerous to go alone!" });
				queueEvent("dialogue", { character:"sandtraps", dialogue: "Take this" });
				queueEvent("grantItem", { character:"ace", item: "mythrilPutter" });
				queueEvent("dialogue", { character:"ace", dialogue: "Don't worry Professor..." });
				queueEvent("dialogue", { character:"ace", dialogue: "We're gonna sink 'em all!" });
			}
		},
		loop: function(){
			//background
			clear(colours.MIDGREY);

			controls.scenes.overworld();

			//move objects
			for (var obj in environment.objectsInScene){
				if (environment.objectsInScene[obj].move) environment.objectsInScene[obj].move();
			}
			//draw objects
			environment.ctx.save();
			environment.ctx.translate(environment.loc.x * -50,environment.loc.y * -50);
			for (var obj in environment.objectsInScene){
				environment.objectsInScene[obj].draw(environment.frameCount);
			}
			environment.ctx.restore();

			environment.handleEvents();
		}
	}
};