// SCENE FUNCTIONS

function changeScene(scene, preserveFrameCount){
	environment.objectsInScene = [];
	environment.scenes[scene].setup();
	if (!preserveFrameCount) environment.frameCount = 0;
	environment.currentScene = scene;
}
function clear(style){
	environment.ctx.fillStyle = style || "black";
	environment.ctx.fillRect(0,0,environment.canvas.width,environment.canvas.height);
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

// SCENE DATA

environment.scenes = {
	"menu": {
		setup: function(){
			for (var i=0; i<6; i++){
				environment.objectsInScene.push(new Cloud(environment.canvas.width/i + environment.canvas.width/5 * Math.random(), environment.canvas.height * (2 * Math.random() / 3) + 40, 0.7 + Math.random() * 0.6));
			}
			environment.objectsInScene.push(new MenuBushRight());
			environment.objectsInScene.push(new MenuBushLeft());
			environment.objectsInScene.push(new Flag(environment.canvas.width/2, environment.canvas.height - 82));
			environment.objectsInScene.push(new Windmill(environment.canvas.width*0.18, environment.canvas.height - 82));
			environment.objectsInScene.push(new MenuGrass());
			environment.objectsInScene.push(new MenuTitle());
			environment.objectsInScene.push(new MenuText());
		},
		loop: function(){
			//background
			clear(colours.PINK);

			//controls
			if (controls.space){
				changeScene("sandtrapsHouse");
				controls.space = false;
			}

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

			if (game.inventory.indexOf("mythrilPutter") === -1){
				queueEvent("dialogue", { character:"sandtraps", dialogue: "It's dangerous to go alone!" });
				queueEvent("dialogue", { character:"sandtraps", dialogue: "Take this" });
			}
		},
		loop: function(){
			//background
			clear(colours.MIDGREY);

			//move objects
			for (var obj in environment.objectsInScene){
				if (environment.objectsInScene[obj].move) environment.objectsInScene[obj].move();
			}
			//draw objects
			for (var obj in environment.objectsInScene){
				environment.objectsInScene[obj].draw(environment.frameCount);
			}

			environment.handleEvents();
		}
	}
};