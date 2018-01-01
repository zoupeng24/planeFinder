/**
 * Playground
 *
 *
 * @class plane.css
 * @author MikeZou
 * @date 2015-06-01
 * 
 *
 */

define(function(require, exports, module){

	var $ = require('jquery');
	var util = require('../util/util');
	var Plane = require('../plane/Plane');
	var Grid = require('../plane/Grid');
	
	var Playground = function(id) {
		this.gridNums = 9;
		this.columnNums = this.gridNums;
		this.rowNums = this.gridNums;
		this.id = id ? id : 'playground';
		this.playgroundClassName = 'playground';
		this.coordinateGridClassName = 'coordinateGrid';
		this.playableGridClassName = 'playableGrid';
		this.gridWrapperClassName = 'gridWrapper';
		this.originClassName = 'origin';
		this.planeGridClassName = 'planeGrid';
		this.planeDefaultClassName = 'planeDefault';
		this.emptyClassName = 'emptyGrid';
		this.hurtedClassName = 'hurtedGrid';
		this.deadClassName = 'deadGrid';
		this.planeGroup = new Array();
		this.alivePlaneNums = 0;
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

		checkGridSetable : function(grid) {
			return this.gridMatrix[grid.ordinate][grid.abscissa].setable;
		},

		getRandomHeadGrid : function(direction) {
			var miniOrdinate,
				maxiOrdinate,
				miniAbscissa,
				maxiAbscissa;
			//direction : 1 means the plane fly toward east
			if (direction === 1) {
				miniOrdinate = 3;
				maxiOrdinate = this.gridNums - 2;
				miniAbscissa = 4;
				maxiAbscissa = this.gridNums;
			}
			//direction : 2 means the plane fly toward south
			if (direction === 2) {
				miniOrdinate = 4;
				maxiOrdinate = this.gridNums;
				miniAbscissa = 3;
				maxiAbscissa = this.gridNums - 2;
			}
			//direction : 3 means the plane fly toward west
			if (direction === 3) {
				miniOrdinate = 3;
				maxiOrdinate = this.gridNums - 2;
				miniAbscissa = 1;
				maxiAbscissa = this.gridNums - 3;
			}
			//direction : 4 means the plane fly toward north
			if (direction === 4) {
				miniOrdinate = 1;
				maxiOrdinate = this.gridNums - 3;
				miniAbscissa = 3;
				maxiAbscissa = this.gridNums - 2;
			}

			//随机次数限制 limit =  每个方向机头位置可能 * 4方向 * 随机数可能数(4方向 * 每个方向机头位置可能)
			var limit = ((this.gridNums - 3) * (this.gridNums - 2 - 2) * 4) * ((this.gridNums - 3) * (this.gridNums - 2 - 2) * 4);

			for (var i = 0; i < limit; i++) {
				var headGrid = new Grid(util.randomInt(miniOrdinate, maxiOrdinate), util.randomInt(miniAbscissa, maxiAbscissa));
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

		showPlane : function(planeId){
			var selector = '[data-plane-id=' + planeId + ']';;
			$(selector).addClass(this.planeGridClassName).addClass(this.planeDefaultClassName + (this.alivePlaneNums + 1));
		},

		addPlane : function(plane) {
			for(var i = 0; i < plane.gridList.length; i++) {
				this.gridMatrix[plane.gridList[i].ordinate][plane.gridList[i].abscissa].setable = false;
				var selector = "." 
						+ this.playgroundClassName 
						+ " [data-coordinate='" 
						+ plane.gridList[i].ordinate.toString() 
						+ plane.gridList[i].abscissa.toString() 
						+ "']";
				//set planeId in html				
				$(selector).attr("data-plane-id", plane.id);
			}
		},

		removePlane : function(id) {
			for(var i = 0; i < plane.gridList.length; i++) {
				this.gridMatrix[plane.gridList[i].ordinate][plane.gridList[i].abscissa].setable = true;
			}
		},

		init : function(playgroundContainer){
			//create playground
			this.creatPlaygroundHtml(playgroundContainer);

			//create random planes on the playground
			var planeNums = 3;
			for (var i = 0; i < planeNums; i++) {
				var planeId = this.id + "_No" + (i + 1);
				this.planeGroup[i] = this.creatRandomPlane(planeId);
				//couldn't get random plane then remove previous plane and regenerate one.
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
