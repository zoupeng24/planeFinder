define(function(require) {

	var Playground = require('./plane/Playground');
	var MusicPlayer = require("./util/musicPlayer");
	var Game = require('./plane/Game');

	var $ = require("jquery");

	var playground = new Playground();
	playground.init($(".playgroundContainer"));

	var game = new Game(playground, 30);
	game.init();

	// var musicPlayer = new MusicPlayer("music","musicTrigger");
	// musicPlayer.init();

})
