define(function(require, exports, module){
	var Grid = require("../plane/Grid");

	var Plane = function(headGrid, direction, id){
		this.direction = direction;
		this.gridList = new Array(10);
		this.gridList[0] = headGrid;
		this.id = id;

		//direction : 1 means the plane fly toward east
		if (this.direction === 1) {
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
		//direction : 2 means the plane fly toward south
		if (this.direction === 2) {
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
		//direction : 3 means the plane fly toward west
		if (this.direction === 3) {
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
		//direction : 4 means the plane fly toward north
		if (this.direction === 4) {
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