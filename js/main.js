function setup(){
	environment.canvas = document.createElement('canvas');
	environment.canvas.id = "canvas";
	environment.canvas.width = 800;
	environment.canvas.height = 600;
	document.getElementById("container").innerHTML = "";
	document.getElementById("container").appendChild(environment.canvas);
	environment.ctx = environment.canvas.getContext("2d");
	environment.ctx.font = "16px sans-serif";

	changeScene("intro");
	mainLoop();
}

function mainLoop(){
	window.requestAnimationFrame(mainLoop);
	var currentTime = (new Date()).getTime();
	var delta = currentTime - environment.lastTime;
	if (delta > environment.interval) {
		environment.frameCount++;
		environment.scenes[environment.currentScene].loop();
	}
}

setup();