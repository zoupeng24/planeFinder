define(function(require, exports, module) {

	var $ = require("jquery");

	var MusicPlayer = function(musicId, triggerId) {
		this.music = document.getElementById(musicId);
		this.trigger = document.getElementById(triggerId);
	}

	MusicPlayer.prototype = {
		setMusicId : function(id) {
			this.music = document.getElementById(id);
		},
		setTriggerId : function(id) {
			this.trigger = document.getElementById(id);
		},
		play : function() {
			this.music.play();
		},
		pause : function() {
			this.music.pause();
		},
		bindEvents : function() {
			var that = this;
			$(that.trigger).on('touchstart',function() {
				if($(that.trigger).hasClass("paused")) {
					$(that.trigger).addClass("playing").removeClass("paused"); 
					that.play();
					} else {
					$(that.trigger).addClass("paused").removeClass("playing"); 
					that.pause();
				}
			});
		},
		init : function(){

			this.bindEvents();

			if($(this.trigger).hasClass("playing")) {
				this.play();
			} else {
				this.pause();
			}
		}
	}

	module.exports = MusicPlayer;

})