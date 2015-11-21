var controls = {
	up: false,
	left:false,
	right:false,
	down: false,
	space: false,
	esc: false
};

var colours = {
	WHITE:'#EFF5F3',
	PINK:'#fa7f9a',
	PURPLE:'#804D6C',
	GREEN:'#adde7e',

	DARKGREY:'#333333',
	MIDGREY2:'#4d4d4d',
	MIDGREY:'#787878',
	LIGHTGREY:'#BCB2AF',

	GOLD:'#FBDAA4',
	ORANGE:'#E7B28A',
	MIDORANGE:'#CA8265',
	DARKORANGE:'#B35541'
};

var environment = {
	interval: 1000 / 60, //target framerate
	lastTime: 0,
	frameCount: 0,

	//font: " guinea_pigsregular, sans-serif",
	font: " iregularegular, sans-serif",

	currentScene: "menu",
	objectsInScene: [],

	eventQueue: [],
	handleEvents: function(){
		if (environment.eventQueue.length > 0){
			var e = environment.eventQueue[0];
			if (e.event === "dialogue"){
				if (controls.space){
					dismissEvent(0);
					controls.space = false;
				}
			}
		}
	}
};

var game = {
	characters: {
		ace:{},
		lina:{},
		wedge:{},
		sandtraps:{}
	},
	inventory:[]
};