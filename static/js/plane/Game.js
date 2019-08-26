// 游戏

define(function(require, exports, module){

	var $ = require("jquery");
	var Grid = require('../plane/Grid');
	var Clock = require('../util/Clock');

	var Game = function(playground, limit){
		this.times = 0;
		// 棋盘
		this.playground = playground ? playground : null;
		// 剩余子弹数
		this.limit = limit ? limit : Infinity;
		// 时间dom元素
		this.$timeDom = $('.playgroundContainer span');
		// 剩余子弹
		this.$limitDom = $('.playgroundContainer i');
		var _this = this;
		// 计时器
		this.clock = new Clock(function(){
			_this.$timeDom.html(this.seconds);
		});
	}

	Game.prototype = {
		
		// 点击处理
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
			// 坐标
			var coordinate = new Grid(Math.floor(coordinateStr / 10), coordinateStr % 10, false);
			
			playground.gridMatrix[coordinate.ordinate][coordinate.abscissa].setHurted(true);
			
			if ("undefined" === typeof me.attr("data-plane-id")) { //打空了
				me.addClass(playground.emptyClassName);
			} else {
				var planeId = me.attr("data-plane-id");
				var headHurted = _this.checkIsHead(playground, coordinate, planeId);
				if (headHurted) { // 击中头部
					playground.alivePlaneNums--;	
					me.addClass(playground.deadClassName);
					playground.showPlane(planeId);
					if (playground.alivePlaneNums <= 0) {
						setTimeout(function(){
							_this.win();
						}, 500);
					}
				} else { // 击中身体
					me.addClass(playground.hurtedClassName);
				}

			}
			_this.checkLimit();
		},

		// 检测是否为头部
		checkIsHead: function(playground, coordinate, planeId){
			for (var i = 0; i < playground.planeGroup.length; i++) {
				if (playground.planeGroup[i].id === planeId) {
					if (coordinate.ordinate === playground.planeGroup[i].gridList[0].ordinate && coordinate.abscissa === playground.planeGroup[i].gridList[0].abscissa) {
						return true;
					} else {
						return false;
					}
				} 
			}
		},

		// 检测子弹数量
		checkLimit : function(){
			this.$limitDom.html(this.limit - this.times);
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

		// 比赛开始
		start : function(){
			console.log('Game start');
			this.clock.start();
			this.$timeDom.html(0);
			this.$limitDom.html(this.limit - 1);
		},

		// 比赛胜利
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
		
		init : function() {
			var hurtEventSelector =  '.' + this.playground.playableGridClassName;
			$(hurtEventSelector).on("click", {playground : this.playground, that : this}, this.hitHandler);
		}
	
	}

	module.exports = Game;

});
