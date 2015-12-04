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

var controls = {
	up: false,
	left: false,
	right: false,
	down: false,
	space: false,
	esc: false,

	scenes: {
		intro: function(){
			if (controls.space){
				changeScene("sandtrapsHouse");
				controls.space = false;
			}
		},
		overworld: function () {
			if (environment.eventQueue.length < 1) {
				if (!environment.moving) {
					if (controls.up) {
						environment.moving = [-1 * game.moveSpeed, 0];
					} else if (controls.down) {
						environment.moving = [game.moveSpeed, 0];
					} else if (controls.left) {
						environment.moving = [0, -1 * game.moveSpeed];
					} else if (controls.right) {
						environment.moving = [0, game.moveSpeed];
					}
				}
				moveScene();
			}
		},
		battle: function(){

		},
		menu: function(){

		}
	}
};