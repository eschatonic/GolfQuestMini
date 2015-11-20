function setup(){
	environment.canvas = document.createElement('canvas');
	environment.canvas.id = "canvas";
	environment.canvas.width = 800;
	environment.canvas.height = 600;
	document.getElementById("container").innerHTML = "";
	document.getElementById("container").appendChild(environment.canvas);
	environment.ctx = environment.canvas.getContext("2d");
	environment.ctx.font = "16px sans-serif";

	changeScene("menu");
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

window.onkeydown = function(event){
	var key = event.keyCode || event.which;
	if (key == 37) {
		controls.left = true;
	} else if (key == 39) {
		controls.right = true;
	} else if (key == 38) {
		controls.up = true;
	} else if (key == 40) {
		controls.down = true;
	} else if (key == 32){
		controls.space = true;
	} else if (key == 27){
		controls.esc = true;
	}
};
window.onkeyup = function(event){
	var key = event.keyCode || event.which;
	if (key == 37) {
		controls.left = false;
	} else if (key == 39) {
		controls.right = false;
	} else if (key == 38) {
		controls.up = false;
	} else if (key == 40) {
		controls.down = false;
	} else if (key == 32){
		controls.space = false;
	} else if (key == 27){
		controls.esc = false;
	}
};

setup();