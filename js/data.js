var controls = {
	up: false,
	left:false,
	right:false,
	down: false,
	space: false,
	esc: false
};

var colours = {
	PINK:'#fa7f9a',
	GREEN:'#adde7e',
	DARKGREY:'#333333',
	MIDGREY2:'#4d4d4d',
	MIDGREY:'#787878',
	LIGHTGREY:'#BCB2AF',
	PURPLE:'#804D6C',
	GOLD:'#FBDAA4',
	WHITE:'#EFF5F3',
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
	objectsInScene: []
};