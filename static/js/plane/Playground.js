// 棋盘

define(function(require, exports, module){

	var $ = require('jquery');
	var util = require('../util/util');
	var Plane = require('../plane/Plane');
	var Grid = require('../plane/Grid');

	// 方向，枚举
	var DIRECTION = {
		EAST: 1,
		SOUTH: 2,
		WEST: 3,
		NORTH: 4,
	}
	
	var Playground = function(id) {
		// 棋盘格子数量
		this.gridNums = 9;
		// 纵轴数量
		this.columnNums = this.gridNums;
		// 横轴数量
		this.rowNums = this.gridNums;
		this.id = id ? id : 'playground';
		// 棋盘css类名
		this.playgroundClassName = 'playground';
		// 坐标格子css类名
		this.coordinateGridClassName = 'coordinateGrid';
		this.playableGridClassName = 'playableGrid';
		this.gridWrapperClassName = 'gridWrapper';
		this.originClassName = 'origin';
		this.planeGridClassName = 'planeGrid';
		this.planeDefaultClassName = 'planeDefault';
		this.emptyClassName = 'emptyGrid';
		this.hurtedClassName = 'hurtedGrid';
		this.deadClassName = 'deadGrid';
		// 飞机数组
		this.planeGroup = new Array();
		// 存活飞机数量
		this.alivePlaneNums = 0;
		// 格子二维数组
		this.gridMatrix = new Array(this.gridNums + 1);
		for (var i = 0; i < this.gridMatrix.length; i++) {
			this.gridMatrix[i] = new Array(this.gridNums + 1);
			for (var j = 0; j < this.gridMatrix[i].length; j++) {
				var setable = true;
				if (i === 0 || j === 0) {
					setable = false;
				} else {
					setable = true;
				}
				this.gridMatrix[i][j] = new Grid(i, j, setable);
			}
		}
	}

	Playground.prototype = {

		// 创建html模板
		creatPlaygroundHtml : function(container){
			container = container ? container : $('body');
			var tableHtmlStr = '<table id="' + this.id + '" class="' + this.playgroundClassName + '">';

			for ( var row = 0; row <= this.rowNums; row++) {
				if (row === 0) {
					tableHtmlStr += '<thead>';
				}
				if (row === 1) {
					tableHtmlStr += '<tbody>';
				}
				tableHtmlStr += '<tr>';

				for ( var column = 0; column <= this.columnNums; column++) {
					var tdClassName = (column === 0 || row === 0) ? this.coordinateGridClassName : this.playableGridClassName;
					if(column ===0 && row === 0) {
						tdClassName += ' ' + this.originClassName;
					}
					tableHtmlStr += '<td class="' + tdClassName + '" data-coordinate="' + 
					row.toString() + column + '"><div class="' + this.gridWrapperClassName + '">';
					if(row === 0 && column !== 0) {
						tableHtmlStr += column;
					}else if (column === 0 && row !== 0) {
						tableHtmlStr += row;
					}else{

					}
					tableHtmlStr += '</div></td>';
				}

				tableHtmlStr += '</tr>';
				if (row === 0) {
					tableHtmlStr += '</thead>';
				}
				if (row === this.rowNums) {
					tableHtmlStr += '</tbody>';
				}
			}
			tableHtmlStr += '</table>';
			container.append(tableHtmlStr);
		},

		// 检测格子是否可以放置
		checkGridSetable : function(grid) {
			return this.gridMatrix[grid.ordinate][grid.abscissa].setable;
		},

		// 随机设置飞机头位置
		getRandomHeadGrid : function(direction) {
			var miniOrdinate,
				maxiOrdinate,
				miniAbscissa,
				maxiAbscissa;
			if (direction === DIRECTION.EAST) { //机头朝东(右)
				miniOrdinate = 3;
				maxiOrdinate = this.gridNums - 2;
				miniAbscissa = 4;
				maxiAbscissa = this.gridNums;
			}
			if (direction === DIRECTION.SOUTH) { //机头朝南(下)
				miniOrdinate = 4;
				maxiOrdinate = this.gridNums;
				miniAbscissa = 3;
				maxiAbscissa = this.gridNums - 2;
			}
			if (direction === DIRECTION.WEST) { //机头朝西(左)
				miniOrdinate = 3;
				maxiOrdinate = this.gridNums - 2;
				miniAbscissa = 1;
				maxiAbscissa = this.gridNums - 3;
			}
			if (direction === DIRECTION.NORTH) { //机头朝北(上)
				miniOrdinate = 1;
				maxiOrdinate = this.gridNums - 3;
				miniAbscissa = 3;
				maxiAbscissa = this.gridNums - 2;
			}

			//随机次数限制 limit =  每个方向机头位置可能 * 4方向 * 随机数可能数(4方向 * 每个方向机头位置可能)
			var limit = ((this.gridNums - 3) * (this.gridNums - 2 - 2) * 4) * ((this.gridNums - 3) * (this.gridNums - 2 - 2) * 4);

			for (var i = 0; i < limit; i++) {
				var ordinate = util.randomInt(miniOrdinate, maxiOrdinate);
				var abscissa = util.randomInt(miniAbscissa, maxiAbscissa);
				var headGrid = new Grid(ordinate, abscissa);
				if (this.checkGridSetable(headGrid)) {
					return headGrid;
				} else {
					continue;
				}
			}
		},

		hasDiSetable : function(plane) {
			var hasDiSetable = false;
 			for (var i = 0; i < plane.gridList.length; i++) {
 				if (!this.checkGridSetable(plane.gridList[i])) {
 					hasDiSetable = true;
 					break;
 				}
 			}
 			 return hasDiSetable;
		},

		// 随机创建一架飞机
		creatRandomPlane : function(planeId){
			//随机次数限制 limit =  每个方向机头位置可能 * 4方向 * 随机数可能数(4方向 * 每个方向机头位置可能)
			var limit = ((this.gridNums - 3) * (this.gridNums - 2 - 2) * 4) * ((this.gridNums - 3) * (this.gridNums - 2 - 2) * 4);
			for (var i = 0; i < limit; i++) {
				var direction = util.randomInt(1,4);
				var headGrid = this.getRandomHeadGrid(direction);
				var plane = new Plane(headGrid, direction, planeId);
				//判断飞机机身是否有disetable
				if (this.hasDiSetable(plane)) {
					continue;
				} else {
					return plane;
				}	
			}
			
		},

		// 展示飞机位置
		showPlane : function(planeId){
			var selector = '[data-plane-id=' + planeId + ']';;
			$(selector).addClass(this.planeGridClassName).addClass(this.planeDefaultClassName + (this.alivePlaneNums + 1));
		},

		// 增加一架飞机
		addPlane : function(plane) {
			for(var i = 0; i < plane.gridList.length; i++) {
				this.gridMatrix[plane.gridList[i].ordinate][plane.gridList[i].abscissa].setable = false;
				var selector = "." 
						+ this.playgroundClassName 
						+ " [data-coordinate='" 
						+ plane.gridList[i].ordinate.toString() 
						+ plane.gridList[i].abscissa.toString() 
						+ "']";
				$(selector).attr("data-plane-id", plane.id);
			}
		},

		// 删除一架飞机
		removePlane : function(id) {
			for(var i = 0; i < plane.gridList.length; i++) {
				this.gridMatrix[plane.gridList[i].ordinate][plane.gridList[i].abscissa].setable = true;
			}
		},

		init : function(playgroundContainer){
			this.creatPlaygroundHtml(playgroundContainer);
			// 飞机数量
			var planeNums = 3;
			for (var i = 0; i < planeNums; i++) {
				var planeId = this.id + "_No" + (i + 1);
				this.planeGroup[i] = this.creatRandomPlane(planeId);
				//如果不能生成随机飞机位置，则删除之前的飞机，再生成
				if ('undefined' === typeof this.planeGroup[i]) {
					this.removePlane(plane);
					i -= 2;
				} else {
					this.addPlane(this.planeGroup[i]);
					this.alivePlaneNums++;
				}

			}

		}
		
	}

	module.exports = Playground;
	
});