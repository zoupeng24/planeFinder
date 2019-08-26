// 飞机

define(function(require, exports, module){
	var Grid = require("../plane/Grid");

	// 方向，枚举
	var DIRECTION = {
		EAST: 1,
		SOUTH: 2,
		WEST: 3,
		NORTH: 4,
	}

	var Plane = function(headGrid, direction, id){
		// 方向
		this.direction = direction; 
		// 坐标列表
		this.gridList = new Array(10);
		this.gridList[0] = headGrid;
		this.id = id;

		if (this.direction === DIRECTION.EAST) { //机头朝东(右)
			this.gridList[1] = new Grid(headGrid.ordinate - 2, headGrid.abscissa - 1);
			this.gridList[2] = new Grid(headGrid.ordinate - 1, headGrid.abscissa - 1);
			this.gridList[3] = new Grid(headGrid.ordinate, headGrid.abscissa - 1);
			this.gridList[4] = new Grid(headGrid.ordinate + 1, headGrid.abscissa - 1);
			this.gridList[5] = new Grid(headGrid.ordinate + 2, headGrid.abscissa - 1);
			this.gridList[6] = new Grid(headGrid.ordinate, headGrid.abscissa - 2);	
			this.gridList[7] = new Grid(headGrid.ordinate - 1, headGrid.abscissa - 3);
			this.gridList[8] = new Grid(headGrid.ordinate, headGrid.abscissa - 3);
			this.gridList[9] = new Grid(headGrid.ordinate + 1, headGrid.abscissa - 3);
		}
		if (this.direction === DIRECTION.SOUTH) { //机头朝南(下)
			this.gridList[1] = new Grid(headGrid.ordinate - 1, headGrid.abscissa - 2);
			this.gridList[2] = new Grid(headGrid.ordinate - 1, headGrid.abscissa - 1);
			this.gridList[3] = new Grid(headGrid.ordinate - 1, headGrid.abscissa);
			this.gridList[4] = new Grid(headGrid.ordinate - 1, headGrid.abscissa + 1);
			this.gridList[5] = new Grid(headGrid.ordinate - 1, headGrid.abscissa + 2);
			this.gridList[6] = new Grid(headGrid.ordinate - 2, headGrid.abscissa);	
			this.gridList[7] = new Grid(headGrid.ordinate - 3, headGrid.abscissa - 1);
			this.gridList[8] = new Grid(headGrid.ordinate - 3, headGrid.abscissa);
			this.gridList[9] = new Grid(headGrid.ordinate - 3, headGrid.abscissa + 1);
		}
		if (this.direction === DIRECTION.WEST) { //机头朝西(左)
			this.gridList[1] = new Grid(headGrid.ordinate + 2, headGrid.abscissa + 1);
			this.gridList[2] = new Grid(headGrid.ordinate + 1, headGrid.abscissa + 1);
			this.gridList[3] = new Grid(headGrid.ordinate, headGrid.abscissa + 1);
			this.gridList[4] = new Grid(headGrid.ordinate - 1, headGrid.abscissa + 1);
			this.gridList[5] = new Grid(headGrid.ordinate - 2, headGrid.abscissa + 1);
			this.gridList[6] = new Grid(headGrid.ordinate, headGrid.abscissa + 2);	
			this.gridList[7] = new Grid(headGrid.ordinate + 1, headGrid.abscissa + 3);
			this.gridList[8] = new Grid(headGrid.ordinate, headGrid.abscissa + 3);
			this.gridList[9] = new Grid(headGrid.ordinate - 1, headGrid.abscissa + 3);
		}
		if (this.direction === DIRECTION.NORTH) { //机头朝北(上)
			this.gridList[1] = new Grid(headGrid.ordinate + 1, headGrid.abscissa - 2);
			this.gridList[2] = new Grid(headGrid.ordinate + 1, headGrid.abscissa - 1);
			this.gridList[3] = new Grid(headGrid.ordinate + 1, headGrid.abscissa);
			this.gridList[4] = new Grid(headGrid.ordinate + 1, headGrid.abscissa + 1);
			this.gridList[5] = new Grid(headGrid.ordinate + 1, headGrid.abscissa + 2);
			this.gridList[6] = new Grid(headGrid.ordinate + 2, headGrid.abscissa);	
			this.gridList[7] = new Grid(headGrid.ordinate + 3, headGrid.abscissa - 1);
			this.gridList[8] = new Grid(headGrid.ordinate + 3, headGrid.abscissa);
			this.gridList[9] = new Grid(headGrid.ordinate + 3, headGrid.abscissa + 1);
		}
	}

	module.exports = Plane;
})