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
				changeScene("menu");
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
	}
};