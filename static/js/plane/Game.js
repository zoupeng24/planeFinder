define(function(require, exports, module){

	var $ = require("jquery");
	var Grid = require('../plane/Grid');
	var Clock = require('../util/Clock');

	var Game = function(playground, limit){
		this.times = 0;
		this.playground = playground ? playground : null;
		this.limit = limit ? limit : Infinity;
		this.$time = $('.playgroundContainer span');
		this.$limit = $('.playgroundContainer i');
		var _this = this;
		this.clock = new Clock(function(){
			_this.$time.html(this.seconds);
		});
	}

	Game.prototype = {

		hitHandler : function(e){
			var _this = e.data.that;
			if (_this.times === 0) {
				_this.start();
			}
			_this.times ++;
			var playground = e.data.playground;
			that.playground = playground;
			var me = $(this);
			var coordinateStr = me.attr("data-coordinate");
			var coordinate = new Grid(Math.floor(coordinateStr / 10), coordinateStr % 10, false);
			
			playground.gridMatrix[coordinate.ordinate][coordinate.abscissa].setHurted(true);
			
			if ("undefined" === typeof me.attr("data-plane-id")) {
				//empty
				// console.log("empty");
				me.addClass(playground.emptyClassName);
			} else {
				//check the grid is head
				var planeId = me.attr("data-plane-id");
				//飞机与机场的映射
				var headHurted = false;
				for (var i = 0; i < playground.planeGroup.length; i++) {
					if (playground.planeGroup[i].id === planeId) {
						if (coordinate.ordinate === playground.planeGroup[i].gridList[0].ordinate && coordinate.abscissa === playground.planeGroup[i].gridList[0].abscissa) {
							headHurted = true;
							playground.alivePlaneNums--;	
						} else {
							headHurted = false;
						}
					} 
				}

				if (headHurted) {
					me.addClass(playground.deadClassName);
					playground.showPlane(planeId);
					//head then dead
					if (playground.alivePlaneNums <= 0) {
						setTimeout(function(){
							_this.win();
						}, 500);
					} else {
						// console.log("dead");	
					}
				} else {
					//body then hurt
					console.log("hurt");
					me.addClass(playground.hurtedClassName);
				}

			}
			_this.controlLimit();
		},

		controlLimit : function(){
			this.$limit.html(this.limit - this.times);
			var _this = this;
			setTimeout(function(){
				if(_this.times >= _this.limit){
					var msg = '对不起，子弹用光了，刷新再来'; 
					if (confirm(msg) == true){ 
						location.reload();
					}else{ 
						return false; 
					} 
				}
			}, 200);
		},

		start : function(){
			console.log('Game start');
			this.clock.start();
			this.$time.html(0);
			this.$limit.html(this.limit - 1);
		},

		win : function(){
			this.clock.stop();	
			var hurtEventSelector =  '.' + this.playground.playableGridClassName;
			$(hurtEventSelector).off("click", this.hitHandler);			
			var g = this.playground.gridNums;
			var clickScorePercent = 1 - this.times / g / g;
			console.log(g * g / 2 - this.clock.seconds > 0);
			console.log(g * g / 2 - this.clock.seconds / 40);
			var timeScorePercent = g * g / 2 - this.clock.seconds > 0 ? (g * g / 2 - this.clock.seconds) / 40 : 0;
			var score = 100 / 2 * (clickScorePercent +  timeScorePercent);			
			alert('恭喜你成功了! 得分：' + Math.round(score));
			$('.playgroundContainer').append('<section></section><a>重新开始</a>');
			$('.playgroundContainer a').on('click', function(){
				location.reload();
			})
		},

		bindHandler : function(){
			var hurtEventSelector =  '.' + this.playground.playableGridClassName;
			$(hurtEventSelector).on("click", {playground : this.playground, that : this}, this.hitHandler);
		},

		init : function() {
			this.bindHandler();
		}
	
	}

	module.exports = Game;

});
